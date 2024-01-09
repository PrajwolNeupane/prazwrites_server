import "dotenv/config";

export default function (req, res, next) {
  const apiKey = req.headers["api-key"];
  if (apiKey && apiKey === process.env.SUPER_ADMIN_KEY) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
