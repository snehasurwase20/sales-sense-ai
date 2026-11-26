"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import * as XLSX from "xlsx";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUpload() {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    setLoading(true);
    setMessage("Analysing your business records...");

    try {
      let records: any[] = [];

      if (file.name.endsWith(".csv")) {
        records = await new Promise((resolve, reject) => {
          Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
           complete: (result: Papa.ParseResult<any>) => resolve(result.data),
            error: reject,
          });
        });
      } else if (
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls")
      ) {
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        records = XLSX.utils.sheet_to_json(sheet);
      } else {
        throw new Error("PDF analysis will be connected separately.");
      }

      if (!records.length) {
        throw new Error("No records found in this file.");
      }

      localStorage.setItem("grocerySales", JSON.stringify(records));

      router.push("/business/grocery/analytics");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to analyse file."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <a href="/business/grocery" className="font-bold text-indigo-600">
          ← Back to Dashboard
        </a>

        <h1 className="mt-8 text-4xl font-black">
          Upload Business Records
        </h1>

        <p className="mt-3 text-slate-500">
          Upload your sales and business records for analysis.
        </p>

        <div className="mt-10 rounded-3xl border-2 border-dashed border-indigo-300 bg-white p-12 text-center">
          <div className="text-5xl">📂</div>

          <h2 className="mt-5 text-xl font-bold">
            Choose your business file
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            CSV and Excel supported · Maximum 10 MB
          </p>

          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setMessage("");
            }}
            className="mt-8 block w-full rounded-xl border p-3"
          />

          {file && (
            <p className="mt-4 font-bold text-emerald-600">
              ✓ {file.name}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="mt-7 w-full rounded-xl bg-indigo-600 px-6 py-4 font-bold text-white disabled:opacity-50"
          >
            {loading ? "Analysing..." : "Continue to Analysis →"}
          </button>

          {message && (
            <p className="mt-5 font-semibold text-indigo-600">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}