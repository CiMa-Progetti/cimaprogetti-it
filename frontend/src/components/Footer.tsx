import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-20 px-6 lg:px-12 border-t border-outline-variant/20 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo + Social */}
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <span className="text-2xl font-black uppercase tracking-tight text-on-surface">
                CIMA PROGETTI Srls
              </span>
            </div>
            <div className="flex space-y-3 flex-col w-full">
              <p className="text-secondary font-medium">
                Scoprirci anche sui nostri canali social
              </p>
              <div className="flex gap-4 w-full">
                {/* Facebook */}
                <a
                  className="hover:opacity-80 transition-opacity"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 16.9913 5.65684 21.1283 10.4375 21.8785V14.8906H7.89844V12H10.4375V9.79688C10.4375 7.29063 11.9305 5.90625 14.2146 5.90625C15.3088 5.90625 16.4531 6.10156 16.4531 6.10156V8.5625H15.1922C13.95 8.5625 13.5625 9.33313 13.5625 10.1242V12H16.3359L15.8926 14.8906H13.5625V21.8785C18.3432 21.1283 22 16.9913 22 12Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  className="hover:opacity-80 transition-opacity"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M12 2.16338C15.2037 2.16338 15.5842 2.17575 16.8517 2.23388C18.0229 2.28713 18.6592 2.48288 19.0822 2.64713C19.6429 2.86463 20.0426 3.123 20.463 3.54338C20.8834 3.96375 21.1414 4.3635 21.3589 4.92413C21.5231 5.34713 21.7192 5.9835 21.7725 7.15463C21.8306 8.42213 21.843 8.80238 21.843 12C21.843 15.1976 21.8306 15.5779 21.7725 16.8454C21.7192 18.0165 21.5231 18.6529 21.3589 19.0759C21.1414 19.6365 20.8834 20.0363 20.463 20.4566C20.0426 20.877 19.6429 21.135 19.0822 21.3525C18.6592 21.5168 18.0229 21.7129 16.8517 21.7661C15.5842 21.8243 15.2037 21.8366 12 21.8366C8.79637 21.8366 8.41575 21.8243 7.14825 21.7661C5.97712 21.7129 5.34075 21.5168 4.91775 21.3525C4.35712 21.135 3.95737 20.877 3.537 20.4566C3.11662 20.0363 2.85862 19.6365 2.64112 19.0759C2.47687 18.6529 2.28075 18.0165 2.2275 16.8454C2.16937 15.5779 2.157 15.1976 2.157 12C2.157 8.80238 2.16937 8.42213 2.2275 7.15463C2.28075 5.9835 2.47687 5.34713 2.64112 4.92413C2.85862 4.3635 3.11662 3.96375 3.537 3.54338C3.95737 3.123 4.35712 2.86463 4.91775 2.64713C5.34075 2.48288 5.97712 2.28713 7.14825 2.23388C8.41575 2.17575 8.79637 2.16338 12 2.16338ZM12 0C8.74125 0 8.33325 0.013875 7.053 0.072375C5.77537 0.1305 4.90275 0.33375 4.143 0.628875C3.35775 0.93375 2.69062 1.34175 2.02575 2.007C1.36012 2.67188 0.9525 3.33938 0.647625 4.12463C0.352125 4.88438 0.14925 5.75738 0.091125 7.035C0.032625 8.31525 0.01875 8.72325 0.01875 11.9816C0.01875 15.2396 0.032625 15.6476 0.091125 16.9279C0.14925 18.2055 0.352125 19.0781 0.647625 19.8379C0.9525 20.6231 1.36012 21.2906 2.02575 21.9555C2.69062 22.6204 3.35812 23.0284 4.14337 23.3332C4.90312 23.6288 5.77612 23.8316 7.05375 23.8898C8.334 23.9482 8.742 23.9621 12.0004 23.9621C15.2584 23.9621 15.6664 23.9482 16.9466 23.8898C18.2242 23.8316 19.0969 23.6288 19.8566 23.3332C20.6419 23.0284 21.3094 22.6204 21.9742 21.9555C22.6395 21.2906 23.0475 20.6231 23.3524 19.8379C23.6479 19.0781 23.8507 18.2051 23.9089 16.9275C23.9674 15.6472 23.9812 15.2393 23.9812 11.9809C23.9812 8.7225 23.9674 8.3145 23.9089 7.03425C23.8507 5.75662 23.6479 4.884 23.3524 4.12425C23.0475 3.339 22.6395 2.6715 21.9742 2.00663C21.3094 1.34138 20.6419 0.933375 19.8566 0.6285C19.0969 0.333375 18.2239 0.1305 16.9463 0.072C15.666 0.0135 15.258 0 11.9996 0H12Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 5.8275C8.59087 5.8275 5.82712 8.59125 5.82712 12C5.82712 15.4088 8.59087 18.1725 12 18.1725C15.4091 18.1725 18.1729 15.4088 18.1729 12C18.1729 8.59125 15.4091 5.8275 12 5.8275ZM12 16.0151C9.78262 16.0151 7.98487 14.2174 7.98487 12C7.98487 9.78263 9.78262 7.98488 12 7.98488C14.2174 7.98488 16.0151 9.78263 16.0151 12C16.0151 14.2174 14.2174 16.0151 12 16.0151Z"
                      fill="currentColor"
                    />
                    <path
                      d="M18.4219 4.14C17.6227 4.14 16.9763 4.7865 16.9763 5.58562C16.9763 6.38475 17.6227 7.03125 18.4219 7.03125C19.221 7.03125 19.8675 6.38475 19.8675 5.58562C19.8675 4.7865 19.221 4.14 18.4219 4.14Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  className="hover:opacity-80 transition-opacity"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M20.4472 20.452H16.8904V14.88C16.8904 13.5524 16.8656 11.8448 15.0424 11.8448C13.1936 11.8448 12.9096 13.2888 12.9096 14.784V20.452H9.3528V8.9952H12.7656V10.5624H12.8136C13.2888 9.6616 14.4496 8.712 16.1816 8.712C19.7832 8.712 20.4472 11.0824 20.4472 14.168V20.452ZM5.3376 7.4336C4.1976 7.4336 3.2736 6.5096 3.2736 5.372C3.2736 4.2344 4.1976 3.3104 5.3376 3.3104C6.4752 3.3104 7.4016 4.2344 7.4016 5.372C7.4016 6.5096 6.4752 7.4336 5.3376 7.4336ZM7.1192 20.452H3.5552V8.9952H7.1192V20.452ZM22.2256 0H1.7712C0.792 0 0 0.7744 0 1.7296V22.2688C0 23.224 0.792 24 1.7712 24H22.2216C23.2 24 24 23.224 24 22.2688V1.7296C24 0.7744 23.2 0 22.2256 0Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                {/* TikTok */}
                <a
                  className="hover:opacity-80 transition-opacity"
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.3 0 .59.04.86.11V9a6.27 6.27 0 0 0-.86-.06 6.33 6.33 0 0 0-6.33 6.33A6.33 6.33 0 0 0 9.49 21.6a6.33 6.33 0 0 0 6.33-6.33V8.78a8.18 8.18 0 0 0 3.77.92V6.69Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Legals */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-on-surface">
              Legals
            </h4>
            <div className="space-y-4 text-secondary font-medium">
              <p>
                Via Otranto 39
                <br />
                00192 Roma, Italia
              </p>
              <p>P.IVA 18328621000</p>
              <p>REA RM-1778381</p>
            </div>
          </div>

          {/* Supporto */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-on-surface">
              Supporto
            </h4>
            <ul className="space-y-4 text-secondary font-medium">
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  Termini e Condizioni
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-on-surface">
              Contatti
            </h4>
            <ul className="space-y-4 text-secondary font-medium">
              <li>
                <a
                  href="mailto:info@cimaprogetti.it"
                  className="hover:text-primary transition-colors"
                >
                  info@cimaprogetti.it
                </a>
              </li>
              <li>
                <a
                  href="tel:+393382451171"
                  className="hover:text-primary transition-colors"
                >
                  +39 338 245 1171
                </a>
              </li>
              <li>
                <a
                  href="mailto:cima.progetti@pec-societa.it"
                  className="hover:text-primary transition-colors"
                >
                  cima.progetti@pec-societa.it
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-outline-variant/20 text-center">
          <p className="text-on-surface-variant/60 text-xs font-medium uppercase tracking-[0.2em]">
            &copy; 2026 CIMA PROGETTI. Soluzioni Digitali.
          </p>
        </div>
      </div>

      {/* Watermark */}
      <span className="hidden lg:block absolute bottom-0 right-0 text-[210px] font-black tracking-tighter leading-none select-none pointer-events-none text-on-surface/10 translate-x-4 translate-y-12 transition-colors duration-300">
        CIMA
      </span>
    </footer>
  );
}
