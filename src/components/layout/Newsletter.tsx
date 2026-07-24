export default function Newsletter() {
  return (
    <section className="bg-[#c88b67] text-white py-24">
      <div className="container mx-auto px-4 text-center">
        <p className="uppercase text-sm">The Best Pricing</p>

        <h2 className="text-5xl font-bold mt-4 mb-10">
          Want To Get Updates On Aesthetic & Wellness News?
        </h2>

        <div className="max-w-2xl mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 text-black"
          />

          <button className="bg-white text-[#c88b67] px-8 py-3">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}