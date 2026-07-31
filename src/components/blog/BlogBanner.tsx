export default function BlogBanner() {
  return (
    <section className="relative bg-[#f7f3f1] h-[500px] flex items-center overflow-hidden">
      {/* Decorative Star */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-5xl text-gray-500">
        ✧
      </div>

      {/* Decorative Circle */}
      <div className="absolute -bottom-44 -right-44">
        <div className="w-[500px] h-[500px] rounded-full border-[80px] border-[#eadfd8] opacity-80"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 lg:px-12 w-full">
        <div className="max-w-xl">
          <h1 className="text-7xl font-serif text-[#2f2f2f] mb-6">
            Blog
          </h1>

          <div className="flex items-center gap-3 text-lg">
            <span className="text-gray-600">Home</span>

            <span className="text-gray-400">•</span>

            <span className="text-[#c48a6a]">Blog</span>
          </div>
        </div>
      </div>
    </section>
  );
}