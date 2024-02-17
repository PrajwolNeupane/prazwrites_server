import Blog from "../modal/blog.modal.js";

export async function getAllBlogs(req, res) {
  try {
    let limit = req.query.blogs ? parseInt(req.query.blogs) : 6;
    let skip = req.query.page ? parseInt(req.query.page) * limit : 0;
    if (limit > 0) {
      const [blogs, totalBlogs] = await Promise.all([
        Blog.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
        Blog.countDocuments(),
      ]);
      res.json({ blogs, totalBlogs });
    }
  } catch (e) {
    res.status(500).json({
      message: "Cannot get all blogs",
    });
    console.log("Error on getAllBlogs");
    console.log(e);
  }
}

export async function getBlogByTitle(req, res) {
  try {
    if (!req.params.title) {
      res.status(400).json({
        message: "Title parameter is required",
      });
      return;
    }
    const title = req.params.title;
    var blog = await Blog.find({ title: { $regex: new RegExp(title, "i") } });
    if (blog.length > 0) {
      res.json({
        message: "Blog found",
        blog: blog[0],
      });
    } else {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Cannot get blog",
    });
    console.log("Error on getBlogByTitle");
    console.log(e);
  }
}

export async function getBlogsByCategory(req, res) {
  try {
    if (!req.params.category) {
      res.status(400).json({
        message: "Category parameter is required",
      });
      return;
    }
    const category = req.params.category;
    var blogs = await Blog.find({ tags: category }).sort({ createdAt: -1 });
    if (blogs.length > 0) {
      return res.json({
        message: "Blogs Found",
        blogs: blogs,
      });
    } else {
      return res.status(200).json({
        message: "Blog not found",
        blogs: [],
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Cannot get blogs by category",
    });
    console.log("Error on getBlogsByCategory");
    console.log(e);
  }
}

export async function addBlog(req, res) {
  try {
    if (!req.body.title) {
      res.status(409).json({
        message: "Blog title is required",
      });
      return;
    }
    if (!req.body.tags) {
      res.status(409).json({
        message: "Blog tag is required",
      });
      return;
    }
    if (!req.body.description) {
      res.status(409).json({
        message: "Blog description is required",
      });
      return;
    }
    var blog;
    if (req.body.image) {
      blog = new Blog({
        title: req.body.title,
        tags: req.body.tags,
        image: req.body.image,
        description: req.body.description,
      });
    } else {
      blog = new Blog({
        title: req.body.title,
        tags: req.body.tags,
        description: req.body.description,
      });
    }
    blog = await blog.save();
    res.status(201).json({
      message: "Blog Added",
      blogs: blog,
    });
  } catch (e) {
    res.status(500).json({
      message: "Cannot add blog",
    });
    console.log("Error on addBlog");
    console.log(e);
  }
}
