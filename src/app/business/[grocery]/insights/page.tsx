"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type RecordRow = Record<string, unknown>;

export default function InsightsPage() {
  const [records, setRecords] = useState<RecordRow[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loaded, setLoaded] = useState(false);

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
    setLoaded(true);
  }, []);

  const normalize = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]/g, "");

  const getValue = (row: RecordRow, candidates: string[]) => {
    const key = Object.keys(row).find((k) =>
      candidates.includes(normalize(k))
    );
    return key ? row[key] : undefined;
  };

  const getAmount = (row: RecordRow) => {
    const value = getValue(row, [
      "totalinr", "billinr", "revenue", "sales",
      "amount", "total", "billamount", "price"
    ]);
    if (value === undefined) return 0;
    const amount = Number(String(value).replace(/[₹,\s]/g, ""));
    return Number.isFinite(amount) ? amount : 0;
  };

  const revenue = records.reduce((sum, row) => sum + getAmount(row), 0);
  const average = records.length ? revenue / records.length : 0;

  const productTotals: Record<string, number> = {};

  records.forEach((row) => {
    const item = getValue(row, [
      "product", "productname", "item", "itemname",
      "services", "servicestaken", "service"
    ]);

    if (item) {
      const name = String(item);
      productTotals[name] = (productTotals[name] || 0) + getAmount(row);
    }
  });

  const topItem = Object.entries(productTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  function askAdvisor(text = question) {
    const q = text.toLowerCase();

    if (!records.length) {
      setAnswer("Please upload your business records first so I can analyse your data.");
      return;
    }

    if (q.includes("revenue") || q.includes("sales") || q.includes("earning")) {
      setAnswer(
        `Your total recorded revenue is ₹${revenue.toLocaleString("en-IN")}. You have ${records.length} records, with an average value of ₹${average.toFixed(2)} per record.`
      );
    } else if (
      q.includes("product") || q.includes("service") ||
      q.includes("best") || q.includes("popular")
    ) {
      setAnswer(
        topItem
          ? `Your highest-revenue recorded product or service is "${topItem[0]}" with ₹${topItem[1].toLocaleString("en-IN")} in recorded revenue.`
          : "I couldn't identify a product or service column in your uploaded records."
      );
    } else if (q.includes("average")) {
      setAnswer(`Your average recorded sale is ₹${average.toFixed(2)}.`);
    } else if (q.includes("improve") || q.includes("grow") || q.includes("advice")) {
      setAnswer(
        `You have ${records.length} records and ₹${revenue.toLocaleString("en-IN")} in recorded revenue. Track your sales regularly, promote your highest-revenue products or services, and review low-performing items. These are general suggestions based on the available data.`
      );
    } else {
      setAnswer(
        `I analysed ${records.length} uploaded records. Total revenue: ₹${revenue.toLocaleString("en-IN")}. Average sale: ₹${average.toFixed(2)}. Ask me about sales, revenue, products, services or business growth.`
      );
    }
  }

  if (!loaded) return <main className="p-10">Loading advisor...</main>;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/business/grocery" className="font-bold text-indigo-600">
          ← Back to Dashboard
        </Link>

        <h1 className="mt-8 text-4xl font-black">
          🤖 AI Business Advisor
        </h1>

        <p className="mt-3 text-slate-500">
          Your business data assistant. Ask questions and explore your records.
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
            <h2 className="mt-2 text-2xl font-black">{records.length}</h2>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Average Sale</p>
            <h2 className="mt-2 text-2xl font-black">
              ₹{average.toFixed(2)}
            </h2>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold">Ask Your Business Advisor</h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "What are my total sales?",
              "Which product performs best?",
              "What is my average sale?",
              "How can I grow my business?"
            ].map((item) => (
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
            onSubmit={(e) => {
              e.preventDefault();
              askAdvisor();
            }}
          >
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask something about your business..."
              className="min-w-0 flex-1 rounded-xl border p-4 outline-none focus:border-indigo-500"
            />

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-7 py-4 font-bold text-white hover:bg-indigo-700"
            >
              Ask →
            </button>
          </form>

          {answer && (
            <div className="mt-6 rounded-2xl bg-indigo-50 p-6">
              <p className="font-bold text-indigo-800">Advisor Response</p>
              <p className="mt-3 leading-7 text-slate-700">{answer}</p>
            </div>
          )}

          {!records.length && (
            <p className="mt-6 text-sm text-amber-700">
              No uploaded records found. Upload a CSV or Excel file first.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}