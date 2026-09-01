import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[#fdf8f5] text-gray-800">

      {/* Header */}
      <section className="bg-[#c78c67] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase text-sm tracking-[0.25em] font-medium mb-4">
            Beauty Salon
          </p>

          <h1 className="text-4xl md:text-6xl font-serif font-bold">
            Terms & Conditions
          </h1>

          <p className="mt-6 text-white/90 max-w-2xl mx-auto leading-7">
            Please read these terms and conditions carefully before using
            our beauty parlour booking management system.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-12 md:py-16">

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#c78c67] mb-4">
            1. Introduction
          </h2>

          <p className="leading-8 text-gray-600">
            Welcome to our Beauty Salon Booking Management System. This
            web-based platform allows customers to view available beauty
            services, make appointments, manage their profiles, and
            receive information about their bookings.
          </p>

          <p className="leading-8 text-gray-600 mt-4">
            By accessing or using this website, you agree to follow these
            Terms & Conditions. If you do not agree with any part of these
            terms, please do not use the website.
          </p>
        </div>

        {/* Account Registration */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#c78c67] mb-4">
            2. User Registration
          </h2>

          <p className="leading-8 text-gray-600">
            Customers may be required to create an account to use certain
            features of the booking system. You are responsible for
            providing accurate and complete information during registration.
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-3 text-gray-600">
            <li>
              You must provide accurate personal information.
            </li>

            <li>
              You are responsible for keeping your login credentials
              confidential.
            </li>

            <li>
              You should notify the salon if you believe your account has
              been accessed without permission.
            </li>

            <li>
              One account should not be used to impersonate another person.
            </li>
          </ul>
        </div>

        {/* Appointments */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#c78c67] mb-4">
            3. Appointment Booking
          </h2>

          <p className="leading-8 text-gray-600">
            Customers can use the website to book available beauty
            services and appointment times. An appointment is considered
            confirmed only when the booking has been successfully recorded
            by the system.
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-3 text-gray-600">
            <li>
              Customers should select the correct service, date, and time.
            </li>

            <li>
              Customers should arrive on time for their scheduled
              appointment.
            </li>

            <li>
              Appointment availability depends on the salon's operating
              hours and staff availability.
            </li>

            <li>
              The salon may contact customers if an appointment needs to
              be changed or cancelled.
            </li>
          </ul>
        </div>

        {/* Cancellation */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#c78c67] mb-4">
            4. Cancellation and Rescheduling
          </h2>

          <p className="leading-8 text-gray-600">
            Customers may cancel or request to reschedule an appointment
            according to the salon's cancellation policy.
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-3 text-gray-600">
            <li>
              Customers should cancel appointments as early as possible.
            </li>

            <li>
              Repeated late cancellations or no-shows may affect future
              booking privileges.
            </li>

            <li>
              The salon reserves the right to cancel an appointment when
              necessary due to staff availability, technical problems, or
              other unexpected circumstances.
            </li>
          </ul>
        </div>

        {/* Services and Pricing */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#c78c67] mb-4">
            5. Services and Pricing
          </h2>

          <p className="leading-8 text-gray-600">
            The website displays information about beauty services and
            their prices. Services may include manicure, pedicure, body
            scrub, face treatment, and other beauty and wellness services.
          </p>

          <p className="leading-8 text-gray-600 mt-4">
            Prices and available services may be changed by the salon
            without prior notice. The price applicable at the time of
            booking will be displayed through the booking system.
          </p>
        </div>

        {/* Payments */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#c78c67] mb-4">
            6. Payments
          </h2>

          <p className="leading-8 text-gray-600">
            If online payment is supported by the system, customers are
            responsible for providing correct payment information and
            completing the payment process successfully.
          </p>

          <p className="leading-8 text-gray-600 mt-4">
            The salon is not responsible for payment failures caused by
            incorrect information, banking issues, internet connectivity,
            or third-party payment service problems.
          </p>
        </div>

        {/* Customer Responsibilities */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#c78c67] mb-4">
            7. Customer Responsibilities
          </h2>

          <p className="leading-8 text-gray-600">
            Customers are expected to use the booking system responsibly
            and provide truthful information.
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-3 text-gray-600">
            <li>
              Do not provide false or misleading information.
            </li>

            <li>
              Do not attempt to access another customer's account.
            </li>

            <li>
              Do not misuse, damage, or interfere with the booking system.
            </li>

            <li>
              Respect salon staff and other customers.
            </li>
          </ul>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#c78c67] mb-4">
            8. Privacy and Personal Information
          </h2>

          <p className="leading-8 text-gray-600">
            The booking system may collect information such as the
            customer's name, email address, phone number, appointment
            details, and other information required to provide the
            service.
          </p>

          <p className="leading-8 text-gray-600 mt-4">
            Customer information should be used only for legitimate
            purposes such as account management, appointment processing,
            communication, and improving salon services.
          </p>
        </div>

        {/* Website Availability */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#c78c67] mb-4">
            9. Website Availability
          </h2>

          <p className="leading-8 text-gray-600">
            We aim to keep the booking system available and functioning
            properly. However, the website may occasionally be unavailable
            because of maintenance, technical problems, server issues,
            internet connectivity, or other circumstances beyond our
            control.
          </p>
        </div>

        {/* Changes */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#c78c67] mb-4">
            10. Changes to These Terms
          </h2>

          <p className="leading-8 text-gray-600">
            We reserve the right to update or modify these Terms &
            Conditions when necessary. Any changes will be reflected on
            this page. Customers are encouraged to review this page
            regularly.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#c78c67] mb-4">
            11. Contact Us
          </h2>

          <p className="leading-8 text-gray-600">
            If you have any questions regarding these Terms & Conditions,
            you can contact our Beauty Salon using the information below.
          </p>

          <div className="mt-6 space-y-3 text-gray-600">
            <p>
              <strong>Location:</strong> Kathmandu, Nepal
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+9779766464003"
                className="text-[#c78c67] hover:underline"
              >
                +977 9766464003
              </a>
            </p>

            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@beautysalon.com"
                className="text-[#c78c67] hover:underline"
              >
                info@beautysalon.com
              </a>
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center text-gray-500 text-sm mb-10">
          <p>Last Updated: September 2026</p>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-[#c78c67] text-white px-8 py-3 rounded-md hover:bg-[#b87955] transition"
          >
            Back to Home
          </Link>
        </div>

      </section>
    </main>
  );
}