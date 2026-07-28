import Image from "next/image";
import { GiSpray, GiWaterDrop, GiLotus } from "react-icons/gi";

const steps = [
  {
    id: 1,
    icon: GiSpray,
    title: "Cleaning Face",
    description:
      "Suspendisse potenti in neque molestie et mentum libero maximus tiam in enim vestibulum suscipit sem quis molestie.",
  },
  {
    id: 2,
    icon: GiWaterDrop,
    title: "Washing Procedure",
    description:
      "Phasellus euismod libero in neque molestie et mentum libero aximu tiam in enim vestibulum sem quis molestie nibh.",
  },
  {
    id: 3,
    icon: GiLotus,
    title: "Go To Treatment",
    description:
      "Vivamus aliquam tincidunt mauris ultricies pulvinar abitant morbi tristique senectus et netus et malesuada tiam in enim vestib.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1250px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        {/* Overlapping images */}
        <div className="relative h-[520px]">
          <div className="absolute top-0 left-0 w-[85%] h-[420px] rounded-lg overflow-hidden">
            <Image
              src="/about/eyebrow-treatment.jpg"
              alt="Eyebrow treatment"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[62%] h-[260px] rounded-lg overflow-hidden border-4 border-white shadow-lg">
            <Image
              src="/about/facial-mask.jpg"
              alt="Facial mask application"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div>
          <span className="text-[#c47c5a] font-semibold tracking-wide text-sm uppercase">
            Services Procedure
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#2c1810] mt-3 mb-4 leading-tight">
            Your Journey To Impeccable Style Starts Here
          </h2>
          <p className="text-[#2c1810]/70 mb-10">
            Semper risus in hendrerit gravida rutrum quisque non tellus
            celerisque varius morbi enim nunc faucibus a pellentesque sit amet.
          </p>

          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.id} className="flex gap-5">
                <div className="w-16 h-16 rounded-full bg-[#f9f3f0] flex items-center justify-center shrink-0">
                  <step.icon size={28} className="text-[#c47c5a]" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-[#2c1810] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#2c1810]/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
