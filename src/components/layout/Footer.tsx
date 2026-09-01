import Link from "next/link";
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
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Appointment", href: "/appointment" },
    { name: "Latest News", href: "/news" },
  ];

  return (
    <footer className="bg-[#c78c67] text-white">

      {/* Newsletter Section */}
      <div className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-12 md:pb-16 text-center">
        <p className="uppercase text-sm font-semibold tracking-wider mb-4">
          The Best Pricing
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-6xl font-serif font-bold leading-tight mb-8 md:mb-12">
          Want To Get Updates On Aesthetic
          <br className="hidden sm:block" />
          & Wellness News?
        </h2>

        <div className="max-w-3xl mx-auto flex flex-col md:flex-row">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-transparent border-b border-white py-4 px-2 placeholder-white focus:outline-none"
          />

          <button
            type="button"
            className="bg-white text-[#c78c67] px-10 py-4 font-medium md:ml-4 mt-4 md:mt-0 hover:bg-gray-100 transition"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">

          {/* Beauty Salon */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Beauty Salon
            </h3>

            <p className="leading-8 text-white/90 mb-8">
              Discover personalized beauty services, experienced
              professionals, and a seamless booking experience all in one
              place.
            </p>

            {/* Social Media */}
            <div className="flex gap-4">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#c78c67] transition"
              >
                <FaFacebookF size={14} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#c78c67] transition"
              >
                <FaTwitter size={14} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#c78c67] transition"
              >
                <FaLinkedinIn size={14} />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#c78c67] transition"
              >
                <FaYoutube size={14} />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 hover:translate-x-1 transition-all"
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services - NOT LINKS */}
          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6">
              Our Services
            </h3>

            <ul className="space-y-4">
              {[
                "Pedicure",
                "Manicure",
                "Body Scrub",
                "Face Treatment",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3"
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Details */}
          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6">
              Our Details
            </h3>

            <ul className="space-y-6">

              {/* Location */}
              <li className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0" />

                <span>
                  Kathmandu, Nepal
                </span>
              </li>

              {/* Phone */}
              <li className="flex gap-3">
                <FaPhoneAlt className="mt-1 shrink-0" />

                <a
                  href="tel:+9779766464003"
                  className="hover:underline"
                >
                  +977 9766464003
                </a>
              </li>

              {/* Email */}
              <li className="flex gap-3">
                <FaEnvelope className="mt-1 shrink-0" />

                <a
                  href="mailto:info@beautysalon.com"
                  className="hover:underline"
                >
                  info@beautysalon.com
                </a>
              </li>

              {/* Opening Hours */}
              <li className="flex gap-3">
                <FaClock className="mt-1 shrink-0" />

                <span>
                  Fri-Sat: 8AM - 10PM
                </span>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">

          <p>
            © Beauty Salon. All rights reserved.
          </p>

          <Link
            href="/terms"
            className="hover:underline"
          >
            Terms & Conditions
          </Link>

        </div>
      </div>

    </footer>
  );
}