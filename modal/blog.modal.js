import mongoose from "mongoose";

const BlogModal = new mongoose.Schema(
  {
    title: { type: String },
    tags: { type: String },
    image: {
      type: String,
      default:
        "https://revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic-1030x584.png",
    },
    description: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Blog = mongoose.modelBlog || mongoose.model("Blog", BlogModal);
export default Blog;
