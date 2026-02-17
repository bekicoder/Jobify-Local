import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white text-[#0a2540] overflow-x-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="pt-32 pb-24 px-6 bg-gradient-to-br from-[#f6f9fc] to-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">

          <div className="flex-1 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Find Your Dream Job <br />
              <span className="text-sky-600">Faster & Smarter</span>
            </h1>

            <p className="text-gray-600 text-lg">
              Discover thousands of verified jobs. Connect with top companies.
              Apply in seconds. Build your future with Jobify.
            </p>

            {/* Search Box */}
            <div className="bg-white shadow-xl rounded-2xl p-3 flex flex-col md:flex-row gap-3">
              <input
                type="text"
                placeholder="Job title or keyword"
                className="flex-1 px-4 py-3 outline-none rounded-xl bg-[#f6f9fc]"
              />
              <input
                type="text"
                placeholder="Location"
                className="flex-1 px-4 py-3 outline-none rounded-xl bg-[#f6f9fc]"
              />
              <Link
                href="/jobs"
                className="px-6 py-3 bg-sky-600 text-white rounded-xl font-semibold hover:bg-[#0a2540] transition"
              >
                Search Jobs
              </Link>
            </div>

            <div className="flex gap-6 text-sm text-gray-500 pt-2">
              <span>150k+ Jobs</span>
              <span>50k+ Candidates</span>
              <span>10k+ Companies</span>
            </div>
          </div>

          <div className="flex-1">
            <img
              src="/vintage-style-office-workers-having-desk-job.jpg"
              className="rounded-3xl shadow-2xl"
              alt="office"
            />
          </div>
        </div>
      </section>

      {/* ================= TRUSTED COMPANIES ================= */}
      <section className="py-16 px-6 bg-white text-center">
        <p className="text-gray-500 mb-10">Trusted by leading companies</p>
        <div className="flex flex-wrap justify-center gap-10 text-gray-400 text-xl font-semibold">
          <span>Google</span>
          <span>Amazon</span>
          <span>Microsoft</span>
          <span>Meta</span>
          <span>Netflix</span>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 px-6 bg-[#f6f9fc]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">
            How Jobify Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="text-sky-600 text-4xl mb-4">
                <i className="fa-solid fa-user-plus"></i>
              </div>
              <h3 className="font-semibold text-xl mb-2">Create Account</h3>
              <p className="text-gray-500">
                Sign up in seconds and build your professional profile.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="text-sky-600 text-4xl mb-4">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <h3 className="font-semibold text-xl mb-2">Search Jobs</h3>
              <p className="text-gray-500">
                Explore thousands of jobs tailored to your skills.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="text-sky-600 text-4xl mb-4">
                <i className="fa-solid fa-paper-plane"></i>
              </div>
              <h3 className="font-semibold text-xl mb-2">Apply Instantly</h3>
              <p className="text-gray-500">
                Submit applications in just one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED JOBS ================= */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Featured Jobs
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            {[
              "Frontend Developer",
              "UI/UX Designer",
              "Backend Engineer",
              "Marketing Manager",
            ].map((job, index) => (
              <div
                key={index}
                className="p-6 border rounded-2xl hover:shadow-xl transition"
              >
                <h3 className="font-semibold text-xl mb-2">{job}</h3>
                <p className="text-gray-500 mb-3">
                  Full Time • Remote • Competitive Salary
                </p>
                <Link
                  href="/jobs"
                  className="text-sky-600 font-semibold"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 px-6 bg-[#f6f9fc]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>
            <img
              src="/construction-workers-welding-steel-beams.jpg"
              className="rounded-3xl shadow-xl"
              alt="workers"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-6">
              Why Choose Jobify?
            </h2>
            <ul className="space-y-4 text-gray-600">
              <li>✔ Verified Employers</li>
              <li>✔ AI Powered Matching</li>
              <li>✔ Secure & Trusted Platform</li>
              <li>✔ Global Opportunities</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 px-6 bg-white text-center">
        <h2 className="text-4xl font-bold mb-16">
          What Our Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["Amazing platform!", "Got hired in 2 weeks!", "Very easy to use!"].map(
            (text, i) => (
              <div
                key={i}
                className="bg-[#f6f9fc] p-8 rounded-2xl shadow-md"
              >
                <p className="text-gray-600 mb-4">"{text}"</p>
                <span className="font-semibold">★★★★★</span>
              </div>
            )
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 px-6 bg-sky-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Take the Next Step?
        </h2>
        <p className="mb-8 text-lg">
          Join thousands of professionals building their careers today.
        </p>
        <Link
          href="/account"
          className="px-8 py-4 bg-white text-sky-600 rounded-full font-bold hover:bg-gray-200 transition"
        >
          Get Started Now
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#0a2540] text-white py-12 text-center">
        <p className="text-gray-400">
          © 2026 Jobify. Built with ❤️ by Bereket Girma.
        </p>
      </footer>

    </main>
  );
}
