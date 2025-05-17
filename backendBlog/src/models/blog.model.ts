import mongoose, { Schema, type Document } from 'mongoose';

export interface IBlog extends Document {
    author: mongoose.Types.ObjectId;
    title: string;
    content: string;
    tags: string[];
    status: 'draft' | 'published';
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            trim: true,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IBlog>('Blog', BlogSchema);
