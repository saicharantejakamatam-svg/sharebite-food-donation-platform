import mongoose from 'mongoose';

// Validate configuration at request time, not module import/build time.
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is missing. Add it to Vercel project environment variables.');
  if (cached.conn) return cached.conn;
  if (!cached.promise) cached.promise = mongoose.connect(uri, { bufferCommands: false }).then(m => m);
  try { cached.conn = await cached.promise; return cached.conn; }
  catch (error) { cached.promise = null; throw error; }
}
