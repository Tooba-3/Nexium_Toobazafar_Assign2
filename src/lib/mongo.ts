import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in .env.local");
}

// Fix: declare global to safely store the cached connection
declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Initialize the global cache if not already present
const globalWithCache = global as typeof globalThis & {
  mongooseCache?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

if (!globalWithCache.mongooseCache) {
  globalWithCache.mongooseCache = { conn: null, promise: null };
}

export async function connectMongo() {
  const cached = globalWithCache.mongooseCache!;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      dbName: "blogSummarizer",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// ✅ Blog model export
const blogSchema = new mongoose.Schema(
  {
    url: String,
    fullText: String,
  },
  { timestamps: true }
);

export const Blog =
  mongoose.models.Blog || mongoose.model("Blog", blogSchema);
