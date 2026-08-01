import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaCheck,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#c78c67] text-white">
      <div className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-12 md:pb-16 text-center">
        <p className="uppercase text-sm font-semibold tracking-wider mb-4">
          The Best Pricing
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-6xl font-serif font-bold leading-tight mb-8 md:mb-12">
          Want To Get Updates On Aesthetic
          <br className="hidden sm:block" />& Wellness News?
        </h2>

        <div className="max-w-3xl mx-auto flex flex-col md:flex-row">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-transparent border-b border-white py-4 placeholder-white focus:outline-none"
          />

          <button className="bg-white text-[#c78c67] px-10 py-4 font-medium md:ml-4 mt-4 md:mt-0">
            Subscribe
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Beauty Salon
            </h3>

            <p className="leading-8 text-white/90 mb-8">
              Pellentesque blandit nibh eget egestas molestie justo diam itudin
              dolor diam vitae orci seieed.
            </p>

            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#c78c67] transition"
                  >
                    <Icon size={14} />
                  </div>
                ),
              )}
            </div>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {["About Us", "Pricing", "Appointment", "Latest News"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3">
                    <FaCheck size={12} />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6">
              Our Services
            </h3>

            <ul className="space-y-4">
              {["Pedicure", "Manicure", "Body Scrub", "Face Treatment"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3">
                    <FaCheck size={12} />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6">
              Our Details
            </h3>

            <ul className="space-y-6">
              <li className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0" />
                <span>30 Edington Smyrnd, GA 30082</span>
              </li>

              <li className="flex gap-3">
                <FaPhoneAlt className="mt-1 shrink-0" />
                <span>1 501-448-5781</span>
              </li>

              <li className="flex gap-3">
                <FaEnvelope className="mt-1 shrink-0" />
                <span>info@beautysalon.com</span>
              </li>

              <li className="flex gap-3">
                <FaClock className="mt-1 shrink-0" />
                <span>Fri-Sat: 8AM - 10PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p>© Beauty Salon. All rights reserved.</p>

          <div className="flex gap-6"># #</div>
        </div>
      </div>
    </footer>
  );
}
