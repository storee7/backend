// 🟢 Imports
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// 🟢 Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// 🟢 Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// 🟢 MongoDB Models

// User Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});
const User = mongoose.model("User", userSchema);

// Product Model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  stock: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
const Product = mongoose.model("Product", productSchema);

// 🟢 Routes

// Root
app.get("/", (req, res) => {
  res.send("🎉 Hello نوران! Backend is working perfectly 👌");
});

// About
app.get("/about", (req, res) => {
  res.send("دي صفحة About 😉");
});

// Contact
app.get("/contact", (req, res) => {
  res.send("دي صفحة Contact 📩");
});

// ➕ إضافة يوزر جديد
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: "❌ لازم تدخلي الاسم والإيميل" });

    const newUser = new User({ name, email });
    await newUser.save();
    res.json({ message: "✅ User added", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📋 عرض كل اليوزرز
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➕ إضافة منتج جديد
app.post("/products", async (req, res) => {
  try {
    const { name, price, description, image, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const newProduct = new Product({ name, price, description, image, createdBy: userId });
    await newProduct.save();

    res.json({ message: "✅ Product added", product: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📦 عرض كل المنتجات مع بيانات اليوزر
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find().populate("createdBy", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏ تحديث منتج
app.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "✅ Product updated", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑 حذف منتج
app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB error:", err));