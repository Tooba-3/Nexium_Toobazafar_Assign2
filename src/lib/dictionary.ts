export function translateToUrdu(text: string): string {
  const dictionary: Record<string, string> = {
    "artificial intelligence": "مصنوعی ذہانت",
    "data": "ڈیٹا",
    "model": "ماڈل",
    "models": "ماڈل",
    "learn": "سیکھنا",
    "learning": "سیکھنا",
    "learned": "سیکھا",
    "we": "ہم",
    "love": "پسند کرتے ہیں",
    "blog": "بلاگ"
  };

  const sortedKeys = Object.keys(dictionary).sort((a, b) => b.length - a.length);

  let translated = text;

  for (const en of sortedKeys) {
    const regex = new RegExp(`\\b${en}\\b`, "gi");
    translated = translated.replace(regex, dictionary[en]);
  }

  return translated;
}
