"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const businessKnowledge: Record<string, {
  name: string;
  recommendations: string[];
  complementary: string[];
}> = {
  grocery: {
    name: "Grocery & Kirana",
    recommendations: [
      "Stock rice, wheat flour, pulses and cooking oil.",
      "Consider healthy snacks, dry fruits and breakfast products.",
      "Explore seasonal products based on local demand.",
      "Keep household cleaning and personal care products."
    ],
    complementary: [
      "Create monthly grocery combo packs.",
      "Offer discounts on bulk purchases.",
      "Keep frequently purchased products available."
    ]
  },

  general: {
    name: "General & Stationery",
    recommendations: [
      "Expand notebooks, pens, pencils and school stationery.",
      "Consider art supplies, craft materials and project kits.",
      "Stock exam preparation materials.",
      "Explore office supplies, files and printer paper."
    ],
    complementary: [
      "Create school stationery kits.",
      "Offer notebook and pen combinations.",
      "Introduce seasonal back-to-school bundles."
    ]
  },

  retail: {
    name: "Retail & Shopping",
    recommendations: [
      "Explore casual clothing and seasonal collections.",
      "Offer different sizes and colour options.",
      "Consider handbags, belts and fashion accessories.",
      "Explore everyday footwear and fashion essentials."
    ],
    complementary: [
      "Create outfit combinations.",
      "Offer accessories alongside clothing.",
      "Introduce seasonal collections."
    ]
  },

  salon: {
    name: "Salon & Beauty",
    recommendations: [
      "Consider shampoos, conditioners and professional hair serums.",
      "Explore skincare products and facial care essentials.",
      "Consider hair spa and deep conditioning services.",
      "Explore manicure, pedicure and nail art services.",
      "Consider keratin treatments if appropriately trained."
    ],
    complementary: [
      "Create haircut and hair spa packages.",
      "Offer facial and threading combinations.",
      "Introduce monthly grooming packages.",
      "Consider selling professional aftercare products."
    ]
  }
};

type Row = Record<string, unknown>;

export default function AdvisorClient({
  businessId
}: {
  businessId: string;
}) {
  const business =
    businessKnowledge[businessId] || businessKnowledge.grocery;

  const [records, setRecords] = useState<Row[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("grocerySales");

      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setRecords(parsed);
      }
    } catch {
      setRecords([]);
    }
  }, []);

  const normalize = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]/g, "");

  function getAmount(row: Row) {
    const keys = [
      "billinr", "totalinr", "revenue",
      "amount", "sales", "total", "billamount"
    ];

    const key = Object.keys(row).find(k =>
      keys.includes(normalize(k))
    );

    if (!key) return 0;

    const value = Number(
      String(row[key] ?? "").replace(/[₹,\s]/g, "")
    );

    return Number.isFinite(value) ? value : 0;
  }

  function getItem(row: Row) {
    const keys = [
      "product", "productname", "item",
      "itemname", "service", "servicestaken"
    ];

    const key = Object.keys(row).find(k =>
      keys.includes(normalize(k))
    );

    return key ? String(row[key]) : "";
  }

  const revenue = records.reduce(
    (sum, row) => sum + getAmount(row), 0
  );

  const average = records.length
    ? revenue / records.length
    : 0;

  const itemTotals: Record<string, number> = {};

  records.forEach(row => {
    const item = getItem(row);

    if (item) {
      itemTotals[item] =
        (itemTotals[item] || 0) + getAmount(row);
    }
  });

  const topItem = Object.entries(itemTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  function askAdvisor(text = question) {
    const q = text.toLowerCase();

    if (!q.trim()) {
      setAnswer("Please enter a business question.");
      return;
    }

    // New product or service recommendations
    if (
      q.includes("start selling") ||
      q.includes("what product") ||
      q.includes("which product") ||
      q.includes("what should i buy") ||
      q.includes("purchase") ||
      q.includes("stock") ||
      q.includes("new product") ||
      q.includes("product should") ||
      q.includes("add product")
    ) {
      setAnswer(
        `Recommendations for ${business.name}:\n\n` +
        business.recommendations.map(
          (item, i) => `${i + 1}. ${item}`
        ).join("\n\n") +
        "\n\nThese are general suggestions. Check local customer demand, supplier prices and profit margins before purchasing."
      );
      return;
    }

    // Services
    if (
      q.includes("service") ||
      q.includes("introduce") ||
      q.includes("offer") ||
      q.includes("expand")
    ) {
      setAnswer(
        `Expansion ideas for ${business.name}:\n\n` +
        business.recommendations.map(
          (item, i) => `${i + 1}. ${item}`
        ).join("\n\n") +
        "\n\nTest customer interest before investing heavily."
      );
      return;
    }

    // Actual recorded sales
    if (
      q.includes("revenue") ||
      q.includes("total sales") ||
      q.includes("earning") ||
      q.includes("income")
    ) {
      setAnswer(
        `Your uploaded records show total revenue of ₹${revenue.toLocaleString("en-IN")} across ${records.length} records. Average recorded sale: ₹${average.toFixed(2)}.`
      );
      return;
    }

    // Best-performing items
    if (
      q.includes("best selling") ||
      q.includes("top selling") ||
      q.includes("most popular") ||
      q.includes("perform best")
    ) {
      setAnswer(
        topItem
          ? `"${topItem[0]}" has the highest recorded revenue of ₹${topItem[1].toLocaleString("en-IN")}.`
          : "Your uploaded records don't contain identifiable product or service names."
      );
      return;
    }

    if (q.includes("average")) {
      setAnswer(
        `Your average recorded sale is ₹${average.toFixed(2)}.`
      );
      return;
    }

    if (
      q.includes("grow") ||
      q.includes("improve") ||
      q.includes("increase") ||
      q.includes("business")
    ) {
      setAnswer(
        `Growth suggestions for ${business.name}:\n\n` +
        business.complementary.map(
          (item, i) => `${i + 1}. ${item}`
        ).join("\n\n") +
        `\n\n${records.length} records are available for analysis, with recognised revenue of ₹${revenue.toLocaleString("en-IN")}.`
      );
      return;
    }

    setAnswer(
      `I can help with ${business.name}:\n\n` +
      "• Products to start selling\n" +
      "• Services to introduce\n" +
      "• Business growth ideas\n" +
      "• Revenue and sales analysis\n" +
      "• Best-performing products or services\n\n" +
      "Try asking one of these questions."
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">

        <Link
          href={`/business/${businessId}`}
          className="font-bold text-indigo-600"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="mt-8 text-4xl font-black">
          🤖 AI Business Advisor
        </h1>

        <p className="mt-3 text-slate-500">
          Your {business.name} business assistant.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Total Revenue</p>
            <h2 className="mt-2 text-2xl font-black">
              ₹{revenue.toLocaleString("en-IN")}
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Records</p>
            <h2 className="mt-2 text-2xl font-black">
              {records.length}
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Average Sale</p>
            <h2 className="mt-2 text-2xl font-black">
              ₹{average.toFixed(2)}
            </h2>
          </div>

        </div>

        <section className="mt-8 rounded-3xl border bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Ask Your Business Advisor
          </h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "What products should I start selling?",
              "What new services should I introduce?",
              "How can I grow my business?",
              "What are my total sales?",
              "Which product performs best?"
            ].map(item => (
              <button
                key={item}
                onClick={() => {
                  setQuestion(item);
                  askAdvisor(item);
                }}
                className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100"
              >
                {item}
              </button>
            ))}
          </div>

          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            onSubmit={e => {
              e.preventDefault();
              askAdvisor();
            }}
          >
            <input
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Ask anything about your business..."
              className="min-w-0 flex-1 rounded-xl border p-4 outline-none focus:border-indigo-500"
            />

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-7 py-4 font-bold text-white"
            >
              Ask →
            </button>
          </form>

          {answer && (
            <div className="mt-6 whitespace-pre-line rounded-2xl bg-indigo-50 p-6">
              <p className="font-bold text-indigo-800">
                Advisor Response
              </p>

              <p className="mt-3 leading-7 text-slate-700">
                {answer}
              </p>
            </div>
          )}

          <p className="mt-6 text-xs text-slate-400">
            Recommendations use predefined business knowledge and uploaded records. Verify local demand and costs before making purchasing decisions.
          </p>

        </section>
      </div>
    </main>
  );
}