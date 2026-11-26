"use client";

import { useEffect, useState } from "react";

export default function Analytics() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("grocerySales");
    if (saved) setData(JSON.parse(saved));
  }, []);

 const revenue = data.reduce((sum, row) => {
  const amount =
    row["Total (INR)"] ??
    row["total"] ??
    row["Total"] ??
    row["sales"] ??
    row["amount"] ??
    row["revenue"] ??
    0;

  return sum + Number(String(amount).replace(/,/g, "")) || sum;
}, 0);
  const transactions = data.length;
  const average = transactions ? revenue / transactions : 0;

  const metrics = [
    { title: "Total Revenue", value: `₹${revenue.toLocaleString("en-IN")}`, icon: "💰" },
    { title: "Transactions", value: transactions, icon: "🧾" },
    { title: "Average Sales", value: `₹${average.toFixed(2)}`, icon: "📊" },
    { title: "Records Analysed", value: transactions, icon: "📁" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <a href="/business/grocery" className="font-bold text-indigo-600">
          ← Dashboard
        </a>

        <h1 className="mt-8 text-4xl font-black">Business Analytics</h1>
        <p className="mt-3 text-slate-500">
          Understand your grocery business performance.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.title} className="rounded-2xl border bg-white p-7 shadow-sm">
              <div className="text-3xl">{metric.icon}</div>
              <p className="mt-5 text-sm text-slate-500">{metric.title}</p>
              <h2 className="mt-2 text-2xl font-black">{metric.value}</h2>
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-3xl border bg-white p-8">
          <h2 className="text-xl font-black">Business Performance</h2>

          {data.length === 0 ? (
            <p className="mt-5 text-slate-500">
              No uploaded data found. Upload your sales records first.
            </p>
          ) : (
            <div className="mt-6">
              <p className="text-emerald-600 font-bold">
                ✓ {data.length} records loaded successfully.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b text-slate-500">
                      {Object.keys(data[0]).map((key) => (
                        <th key={key} className="p-3">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(0, 10).map((row, i) => (
                      <tr key={i} className="border-b">
                        {Object.values(row).map((value, j) => (
                          <td key={j} className="p-3">{String(value)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}