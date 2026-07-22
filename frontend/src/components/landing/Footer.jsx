import { motion } from "framer-motion";
import { MaskLine } from "./Reveal";

export const Footer = () => {
  return (
    <footer
      data-testid="footer-section"
      className="relative bg-ink-0 border-t border-white/10 overflow-hidden"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-24 md:pt-32 pb-10">
        {/* Big thank you */}
        <div className="text-center md:text-left">
          <div className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-8 flex items-center gap-3 md:justify-start justify-center">
            <span className="w-8 h-px bg-acid-cyan" />
            <span>Penutup</span>
          </div>
          <h2 className="font-display font-black text-[22vw] md:text-[15vw] leading-[0.85] tracking-[-0.05em]">
            <MaskLine>Terima</MaskLine>
            <MaskLine delay={0.15}>
              <span className="italic font-light text-white/70 inline-flex items-center gap-6">
                Kasih
                <span className="hidden md:inline-block w-24 h-[3px] bg-acid-cyan align-middle" />
              </span>
            </MaskLine>
          </h2>
        </div>

        {/* Bottom row */}
        <div className="mt-24 grid grid-cols-12 gap-8 border-t border-white/10 pt-10 text-xs uppercase tracking-[0.25em] text-white/50">
          <div className="col-span-12 md:col-span-4 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-acid-cyan animate-pulse" />
            <span>ELASTECH PRODUCTION © 2026</span>
          </div>
          <div className="col-span-6 md:col-span-4 md:text-center">
            <span>Jakarta — Indonesia</span>
          </div>
          <div className="col-span-6 md:col-span-4 md:text-right flex md:justify-end gap-6">
            <a href="#" data-testid="footer-social-ig" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" data-testid="footer-social-li" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" data-testid="footer-social-x" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
