import {
  FiSend,
  FiClock,
  FiMail,
  FiPhone,
} from "react-icons/fi";

export default function ContactSection() {
  const contactInfo = [
    {
      icon: <FiSend size={32} />,
      title: "Our Location",
      text: "2560 Hickory Lane, DC 20904",
    },
    {
      icon: <FiClock size={32} />,
      title: "Working Hours",
      text: "Mon-Sat: 09AM-09PM",
    },
    {
      icon: <FiMail size={32} />,
      title: "Email Us",
      text: "contact@domain.com",
    },
    {
      icon: <FiPhone size={32} />,
      title: "Call Us",
      text: "800 2345 7890",
    },
  ];

  return (
    <section className="bg-[#f7f3f1] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          
          <div className="grid sm:grid-cols-2 gap-5">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-[#c78b67] text-white h-[180px] flex flex-col items-center justify-center text-center p-6"
              >
                <div className="mb-4">{item.icon}</div>

                <h3 className="text-[18px] font-serif font-semibold mb-2">
                  {item.title}
                </h3>

                <p className="text-[14px]">{item.text}</p>
              </div>
            ))}
          </div>

          <div>
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full h-[46px] border-2 border-[#d8a58c] px-4 text-sm text-gray-600 placeholder-gray-500 focus:outline-none"
                />

                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full h-[46px] border-2 border-[#d8a58c] px-4 text-sm text-gray-600 placeholder-gray-500 focus:outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full h-[46px] border-2 border-[#d8a58c] px-4 text-sm text-gray-600 placeholder-gray-500 focus:outline-none"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full h-[46px] border-2 border-[#d8a58c] px-4 text-sm text-gray-600 placeholder-gray-500 focus:outline-none"
                />
              </div>

              <textarea
                rows={8}
                placeholder="Message"
                className="w-full border-2 border-[#d8a58c] px-4 py-4 text-sm text-gray-600 placeholder-gray-500 focus:outline-none resize-y"
              />

              <button
                type="submit"
                className="bg-[#c78b67] text-white px-12 py-3 text-sm font-semibold hover:bg-[#b67b57] transition"
              >
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}