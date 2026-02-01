import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/nerdblog';
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

export const connectDB = async (): Promise<void> => {
  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('✅ MongoDB connected successfully');
      return;
    } catch (error) {
      retries++;
      console.error(`❌ MongoDB connection attempt ${retries}/${MAX_RETRIES} failed:`, error instanceof Error ? error.message : error);
      
      if (retries < MAX_RETRIES) {
        console.log(`⏳ Retrying in ${RETRY_DELAY / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      } else {
        console.error('❌ Max retries reached. Could not connect to MongoDB.');
        process.exit(1);
      }
    }
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});
