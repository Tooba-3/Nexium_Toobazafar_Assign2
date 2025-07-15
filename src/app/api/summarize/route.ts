import { NextRequest } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(JSON.stringify({ error: "URL is required." }), {
        status: 400,
      });
    }

    // Fetch HTML
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract paragraphs
    const paragraphs = $("p").map((i, el) => $(el).text()).get();
    const fullText = paragraphs.join(" ").slice(0, 5000);

    if (!fullText || fullText.length < 50) {
      return new Response(
        JSON.stringify({ error: "Could not extract valid content." }),
        { status: 400 }
      );
    }

    // Make a simple summary
    const sentences = fullText.split(". ");
    const summary = sentences.slice(0, 7).join(". ") + ".";

    const urduTranslation =
      "اردو ترجمہ فی الحال دستیاب نہیں۔ ترجمے کے لیے OpenAI API کی ضرورت ہے۔";

    return Response.json({ summary, urduTranslation });
  } catch (err) {
    console.error("API error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
