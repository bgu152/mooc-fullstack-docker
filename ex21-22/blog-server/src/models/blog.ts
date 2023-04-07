import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';

export interface IBlog extends Document {
    title: string;
    author: string;
    url: string;
    likes?: number;
    user?: IUser;
}

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            minLength: 3,
        },
        author: {
            type: String,
            required: true,
            minLength: 3,
        },
        url: {
            type: String,
            required: true,
            unique: true,
            minLength: 8,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        likes: {
            type: Number,
            default: 0,
        },
        comments:{
            type: [String],
            default:[]
        }
    },
    { timestamps: false }
);

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export default mongoose.model<IBlog>('Blog', blogSchema);
