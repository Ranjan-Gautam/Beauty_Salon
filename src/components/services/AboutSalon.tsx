import Image from "next/image";
import { UserRound, Award } from "lucide-react";

export default function AboutSalon() {
  return (
    <section className="bg-[#f7f3f1] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="text-[#c48a6a] uppercase text-sm font-medium mb-4">
              About Salon
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-serif text-[#2f2f2f] leading-tight mb-6 md:mb-8">
              Where Your Well Being Is Our Priority
            </h2>

            <p className="text-gray-600 leading-7 md:leading-8 mb-10 md:mb-14">
              We believe true beauty care goes beyond the surface. Every
              treatment here is guided by expertise, patience, and a genuine
              interest in how you feel when you walk out our doors.
            </p>

            {/* Feature 1 */}
            <div className="flex gap-4 md:gap-5 mb-8 md:mb-12">
              <div className="text-[#c48a6a] shrink-0">
                <UserRound size={36} className="md:w-12 md:h-12" />
              </div>

              <div>
                <h3 className="text-xl md:text-3xl font-serif text-[#2f2f2f] mb-2 md:mb-3">
                  Experienced And Qualified
                </h3>

                <p className="text-gray-600 leading-7 md:leading-8">
                  Our specialists bring years of hands-on training and a genuine
                  passion for skincare, styling, and personal care.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 md:gap-5">
              <div className="text-[#c48a6a] shrink-0">
                <Award size={36} className="md:w-12 md:h-12" />
              </div>

              <div>
                <h3 className="text-xl md:text-3xl font-serif text-[#2f2f2f] mb-2 md:mb-3">
                  Exceptional Customer Service
                </h3>

                <p className="text-gray-600 leading-7 md:leading-8">
                  From your first message to your last visit, we treat every
                  client with the attention and care they deserve.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <Image
              src="/aboutsalon/about_salon.jpg"
              alt="About Salon"
              width={1000}
              height={1200}
              quality={100}
              className="w-full h-72 sm:h-96 lg:h-162.5 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
