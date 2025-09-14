const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Route تجريبية
app.get("/", (req, res) => {
    res.send("Hello from Backend 🚀");
});

// تحديد البورت
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(✅ Server running on port ${PORT});
});