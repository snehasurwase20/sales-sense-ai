const businesses = [
  {
    id: "grocery",
    icon: "🛒",
    title: "Grocery & Kirana",
    description: "Manage grocery sales, products, inventory and daily demand.",
    tags: ["Inventory", "Sales", "Forecasting"],
    color: "from-emerald-400 to-green-600",
    bg: "bg-emerald-50",
  },
  {
    id: "general",
    icon: "🏪",
    title: "General & Stationery",
    description: "Smart insights for stationery, bookshops and general stores.",
    tags: ["Products", "Stock", "Analytics"],
    color: "from-blue-400 to-indigo-600",
    bg: "bg-blue-50",
  },
  {
    id: "retail",
    icon: "🛍️",
    title: "Retail & Shopping",
    description: "Understand product performance and customer buying trends.",
    tags: ["Products", "Trends", "Revenue"],
    color: "from-violet-400 to-purple-600",
    bg: "bg-violet-50",
  },
  {
    id: "salon",
    icon: "💇",
    title: "Salon & Beauty",
    description: "Analyse services, appointments, revenue and business growth.",
    tags: ["Services", "Customers", "Growth"],
    color: "from-pink-400 to-rose-600",
    bg: "bg-pink-50",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafbff] text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-xl text-white shadow-lg shadow-indigo-200">
              ✦
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                SalesSense<span className="text-indigo-600"> AI</span>
              </h1>
              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-slate-400">
                Business Intelligence
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#businesses" className="transition hover:text-indigo-600">
              Businesses
            </a>
            <a href="#features" className="transition hover:text-indigo-600">
              Features
            </a>
            <a href="#about" className="transition hover:text-indigo-600">
              About
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="hidden px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 sm:block"
            >
              Log in
            </a>
            <a
              href="/register"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              Get Started →
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pb-16 pt-20 md:pb-24 md:pt-28">
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-bold text-indigo-700 shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            INTELLIGENCE FOR EVERY BUSINESS
          </div>

          <h2 className="text-5xl font-black leading-[1.12] tracking-tight sm:text-6xl md:text-7xl">
            Your Business.
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-500 bg-clip-text text-transparent">
              Smarter with AI.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            Turn everyday business records into powerful insights.
            Understand your sales, manage inventory and make smarter
            decisions with your personal AI business intelligence platform.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#businesses"
              className="rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-xl shadow-indigo-200 transition hover:-translate-y-1 hover:bg-indigo-700"
            >
              Explore Your Business →
            </a>
            <a
              href="#features"
              className="rounded-xl border border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
            >
              Discover Features
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
            <span>✓ AI-powered insights</span>
            <span>✓ Smart analytics</span>
            <span>✓ Simple business management</span>
          </div>
        </div>
      </section>

      {/* Business Categories */}
      <section id="businesses" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[3px] text-indigo-600">
              ONE PLATFORM. MANY POSSIBILITIES.
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              What kind of business do you own?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-500">
              Select your business category to discover intelligent tools
              designed around the way your business works.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {businesses.map((business) => (
              <a
                key={business.id}
               href={`/business/${business.id}`}
                className="group rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/70"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${business.bg} text-3xl transition group-hover:scale-110`}
                >
                  {business.icon}
                </div>

                <h3 className="mt-6 text-xl font-extrabold">
                  {business.title}
                </h3>

                <p className="mt-3 min-h-16 text-sm leading-6 text-slate-500">
                  {business.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {business.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className={`mt-7 flex items-center justify-between rounded-xl bg-gradient-to-r ${business.color} px-4 py-3 text-sm font-bold text-white`}
                >
                  Explore Business <span>→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[3px] text-indigo-600">
              POWERED BY INTELLIGENCE
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Everything your business needs
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "📂",
                title: "Smart Data Upload",
                description:
                  "Bring your existing Excel, CSV, PDF and business records together.",
              },
              {
                icon: "📊",
                title: "Business Analytics",
                description:
                  "Understand sales, products, revenue and performance through visual reports.",
              },
              {
                icon: "🤖",
                title: "AI Business Advisor",
                description:
                  "Ask questions about your business and receive insights based on your records.",
              },
              {
                icon: "📈",
                title: "Sales Forecasting",
                description:
                  "Discover sales patterns and estimate future business demand.",
              },
              {
                icon: "📦",
                title: "Inventory Intelligence",
                description:
                  "Monitor stock levels, identify low-stock products and plan restocking.",
              },
              {
                icon: "⚡",
                title: "Smart Decisions",
                description:
                  "Turn complex business information into simple, actionable recommendations.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100/50"
              >
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="mt-6 text-lg font-extrabold">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="px-6 pb-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 px-8 py-16 text-center text-white shadow-2xl shadow-indigo-200 sm:px-16">
          <p className="text-xs font-bold uppercase tracking-[3px] text-indigo-200">
            THE FUTURE OF LOCAL BUSINESS
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black sm:text-5xl">
            Make every business decision count.
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-indigo-100">
            Your records hold valuable insights. Let SalesSense AI help you
            discover them.
          </p>
          <a
            href="#businesses"
            className="mt-9 inline-flex rounded-xl bg-white px-8 py-4 font-bold text-indigo-700 transition hover:-translate-y-1 hover:bg-indigo-50"
          >
            Get Started Today →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <h2 className="text-lg font-black">
            SalesSense<span className="text-indigo-600"> AI</span>
          </h2>
          <p className="text-center text-xs text-slate-400">
            © 2026 SalesSense AI. Intelligent insights. Smarter businesses.
          </p>
          <p className="text-xs font-semibold text-slate-500">
            Built for local businesses.
          </p>
        </div>
      </footer>
    </main>
  );
}