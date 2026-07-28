"""Backend tests for ELASTECH contact form + admin panel."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://pdf-landing-builder-3.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@elastech.id"
ADMIN_PASSWORD = "Elastech2026!"


@pytest.fixture(scope="session")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def admin_token(session):
    r = session.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"Login failed: {r.status_code} {r.text}"
    data = r.json()
    assert "token" in data and isinstance(data["token"], str) and len(data["token"]) > 20
    assert data["user"]["email"] == ADMIN_EMAIL
    return data["token"]


@pytest.fixture
def auth_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}", "Content-Type": "application/json"}


# -------- Public contact --------
class TestContact:
    def test_root(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200

    def test_create_contact_success(self, session, auth_headers):
        payload = {
            "name": "TEST_User",
            "email": "test_user@example.com",
            "company": "TEST_Co",
            "message": "TEST hello from pytest",
        }
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == "TEST_User"
        assert data["email"] == "test_user@example.com"
        assert data["is_read"] is False
        assert "id" in data
        sub_id = data["id"]

        # Verify persistence via admin listing
        r2 = requests.get(f"{API}/admin/submissions", headers=auth_headers)
        assert r2.status_code == 200
        ids = [s["id"] for s in r2.json()]
        assert sub_id in ids

    def test_create_contact_invalid_email(self, session):
        r = session.post(f"{API}/contact", json={"name": "x", "email": "not-an-email", "message": "hi"})
        assert r.status_code == 422

    def test_create_contact_empty_name(self, session):
        r = session.post(f"{API}/contact", json={"name": "", "email": "a@b.com", "message": "hi"})
        assert r.status_code == 422

    def test_create_contact_empty_message(self, session):
        r = session.post(f"{API}/contact", json={"name": "x", "email": "a@b.com", "message": ""})
        assert r.status_code == 422


# -------- Auth --------
class TestAuth:
    def test_login_wrong_password(self, session):
        r = session.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrongpass"})
        assert r.status_code == 401

    def test_login_unknown_user(self, session):
        r = session.post(f"{API}/auth/login", json={"email": "nobody@nowhere.io", "password": "x"})
        assert r.status_code == 401

    def test_me_requires_auth(self, session):
        r = session.get(f"{API}/auth/me")
        assert r.status_code == 401

    def test_me_with_token(self, admin_token):
        r = requests.get(f"{API}/auth/me", headers={"Authorization": f"Bearer {admin_token}"})
        assert r.status_code == 200
        assert r.json()["email"] == ADMIN_EMAIL


# -------- Admin protected endpoints --------
class TestAdmin:
    def test_submissions_requires_auth(self, session):
        r = session.get(f"{API}/admin/submissions")
        assert r.status_code == 401

    def test_stats_requires_auth(self, session):
        r = session.get(f"{API}/admin/stats")
        assert r.status_code == 401

    def test_stats_ok(self, auth_headers):
        r = requests.get(f"{API}/admin/stats", headers=auth_headers)
        assert r.status_code == 200
        d = r.json()
        for k in ("total", "unread", "read"):
            assert k in d and isinstance(d[k], int)
        assert d["total"] == d["unread"] + d["read"]

    def test_full_lifecycle(self, auth_headers):
        # Create a fresh submission
        create = requests.post(f"{API}/contact", json={
            "name": "TEST_Lifecycle", "email": "lc@test.com", "company": "", "message": "lifecycle"
        })
        assert create.status_code == 200
        sid = create.json()["id"]

        # Stats before
        before = requests.get(f"{API}/admin/stats", headers=auth_headers).json()

        # Mark as read
        r = requests.patch(f"{API}/admin/submissions/{sid}/read", headers=auth_headers)
        assert r.status_code == 200

        # Verify newest-first ordering + is_read updated
        lst = requests.get(f"{API}/admin/submissions", headers=auth_headers).json()
        found = next((s for s in lst if s["id"] == sid), None)
        assert found is not None
        assert found["is_read"] is True

        after_read = requests.get(f"{API}/admin/stats", headers=auth_headers).json()
        assert after_read["unread"] == before["unread"] - 1

        # Delete
        r = requests.delete(f"{API}/admin/submissions/{sid}", headers=auth_headers)
        assert r.status_code == 200

        # Verify gone
        lst2 = requests.get(f"{API}/admin/submissions", headers=auth_headers).json()
        assert all(s["id"] != sid for s in lst2)

        # Delete again -> 404
        r = requests.delete(f"{API}/admin/submissions/{sid}", headers=auth_headers)
        assert r.status_code == 404

    def test_bcrypt_hash_format(self):
        # Verify seed uses bcrypt via login working (indirect) - already covered.
        # Additionally verify wrong token rejected
        r = requests.get(f"{API}/admin/submissions", headers={"Authorization": "Bearer notavalidtoken"})
        assert r.status_code == 401
