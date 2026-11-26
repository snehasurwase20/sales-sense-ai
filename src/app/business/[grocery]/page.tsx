import Link from "next/link";

export const instant = false;

const businesses: Record<
  string,
  { title: string; icon: string; color: string }
> = {
  grocery: {
    title: "Grocery & Kirana",
    icon: "🛒",
    color: "bg-emerald-100",
  },
  general: {
    title: "General & Stationery",
    icon: "🏪",
    color: "bg-blue-100",
  },
  retail: {
    title: "Retail & Shopping",
    icon: "🛍️",
    color: "bg-purple-100",
  },
  salon: {
    title: "Salon & Beauty",
    icon: "💇",
    color: "bg-pink-100",
  },
};

export default async function BusinessDashboard({
  params,
}: {
  params: Promise<{ grocery: string }>;
}) {
  const { grocery: id } = await params;
  const business = businesses[id];

  if (!business) {
    return <main className="p-10">Business not found.</main>;
  }

  const modules = [
    {
      icon: "📂",
      title: "Upload Business Records",
      description: "Upload your business bills, CSV and Excel records.",
      path: "upload",
    },
    {
      icon: "📊",
      title: "Business Analytics",
      description: "Explore revenue, performance and business trends.",
      path: "analytics",
    },
    {
      icon: "🤖",
      title: "AI Business Advisor",
      description: "Discover insights and smarter business decisions.",
      path: "insights",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="flex justify-between border-b bg-white px-8 py-5">
        <Link href="/" className="text-2xl font-black">
          SalesSense <span className="text-indigo-600">AI</span>
        </Link>
        <span className="font-semibold">{business.title}</span>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <p className="font-bold tracking-widest text-indigo-600">
          YOUR BUSINESS WORKSPACE
        </p>

        <h1 className="mt-3 text-4xl font-black">
          {business.icon} {business.title} Dashboard
        </h1>

        <p className="mt-3 text-slate-500">
          Understand your business and grow smarter with AI.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.path}
              href={`/business/${id}/${module.path}`}
              className="rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${business.color} text-3xl`}>
                {module.icon}
              </div>

              <h2 className="mt-6 text-xl font-black">{module.title}</h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {module.description}
              </p>

              <div className="mt-7 rounded-xl bg-indigo-600 px-5 py-3 text-center font-bold text-white">
                Open Workspace →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}