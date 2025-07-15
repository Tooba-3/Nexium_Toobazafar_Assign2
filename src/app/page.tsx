"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [urdu, setUrdu] = useState("");

  const handleSubmit = async () => {
    if (!url) return;
    setLoading(true);
    setSummary("");
    setUrdu("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const raw = await res.text();
      if (!res.ok) throw new Error(raw);

      const data = JSON.parse(raw);
      setSummary(data.summary);
      setUrdu(data.urduTranslation);
    } catch (error) {
      alert("Something went wrong!");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-mint-50 flex flex-col items-center justify-center px-4 py-12 gap-10 transition-all duration-300">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-mint-700 tracking-tight text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        🧠 Blog Summarizer
      </motion.h1>

      <motion.p
        className="text-mint-600 dark:text-mint-300 text-lg text-center max-w-xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Read less. Know more. Summarize smarter.
      </motion.p>
      
      <motion.div
        className="flex flex-col sm:flex-row gap-2 w-full max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Input
          placeholder="Paste blog URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="rounded-xl border border-mint-300 focus:border-mint-500 bg-white focus:ring-2 focus:ring-mint-200 transition-all duration-200"
        />
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-mint-500 hover:bg-mint-600 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200"
        >
          {loading ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              🔄
            </motion.span>
          ) : (
            "Summarize"
          )}
        </Button>
      </motion.div>

      {summary && (
        <motion.div
          className="w-full max-w-2xl space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
        >
          <div className="rounded-2xl p-6 bg-white shadow-md border border-mint-100 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
            <h2 className="text-xl font-semibold text-mint-700 mb-2">
              📄 Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>

          <div className="rounded-2xl p-6 bg-white shadow-md border border-mint-100 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
            <h2 className="text-xl font-semibold text-mint-700 mb-2">
              🌐 Urdu Translation
            </h2>
            <p className="text-right text-gray-700 font-urdu leading-relaxed">{urdu}</p>
          </div>
        </motion.div>
      )}

      <motion.footer
        className="mt-12 text-center text-sm text-mint-700 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div>© {new Date().getFullYear()} Tooba&apos;s Blog Summarizer</div>
        <div className="flex gap-4">
          <a
            href="https://github.com/yourusername/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-mint-900"
          >
            GitHub Repository
          </a>
          <a
            href="https://your-app.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-mint-900"
          >
            Live on Vercel
          </a>
        </div>
      </motion.footer>
    </main>
  );
}
