import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI;

if (!MONGODB_URL) {
    throw new Error ('MONGODB connection failed')
}

interface MongooseCashe {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: MongooseCashe | undefined;
}

const cached: MongooseCashe = global.mongoose || {conn: null, promise: null }

if (!global.mongoose) {
    global.mongoose = cached;
}

async function connectDB() {
    if (!MONGODB_URL) {
        throw new Error('MONGODB connection failed')
    }
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };

        cached.promise = mongoose.connect(MONGODB_URL, opts);
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null;
        throw error
    }
    return cached.conn
}

export default connectDB