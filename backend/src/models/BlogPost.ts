import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  content: string;
  author: string;
  authorEmail: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  slug: string;
}

const BlogPostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  authorEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tags: [{ type: String }],
  slug: { type: String, required: true, unique: true }
});

// Update the updatedAt timestamp before saving
BlogPostSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
