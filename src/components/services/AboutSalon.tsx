import Image from "next/image";
import { UserRound, Award } from "lucide-react";

export default function AboutSalon() {
  return (
    <section className="bg-[#f7f3f1] py-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="text-[#c48a6a] uppercase text-sm font-medium mb-4">
              About Salon
            </p>

            <h2 className="text-5xl lg:text-6xl font-serif text-[#2f2f2f] leading-tight mb-8">
              Where Your Well Being Is Our Priority
            </h2>

            <p className="text-gray-600 leading-8 mb-14">
              Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
              eiusmod tempor incididunt ut labore.
            </p>

            {/* Feature 1 */}
            <div className="flex gap-5 mb-12">
              <div className="text-[#c48a6a]">
                <UserRound size={48} />
              </div>

              <div>
                <h3 className="text-3xl font-serif text-[#2f2f2f] mb-3">
                  Experienced And Qualified
                </h3>

                <p className="text-gray-600 leading-8">
                  Suspendisse potenti in neque molestie et mentum libero
                  maximus tiam in enim vestibulum suscipit sem quis molestie.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-5">
              <div className="text-[#c48a6a]">
                <Award size={48} />
              </div>

              <div>
                <h3 className="text-3xl font-serif text-[#2f2f2f] mb-3">
                  Exceptional Customer Service
                </h3>

                <p className="text-gray-600 leading-8">
                  Suspendisse potenti in neque molestie et mentum libero
                  maximus tiam in enim vestibulum suscipit sem quis molestie.
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
              className="w-full h-162.5 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}