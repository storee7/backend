const mongoose = require("mongoose");

// هنا بعرّف شكل الـ User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // لازم يبقى فيه اسم
  },
  email: {
    type: String,
    required: true, // لازم يبقى فيه ايميل
    unique: true,   // ماينفعش اتنين بنفس الايميل
  },
  password: {
    type: String,
    required: true, // لازم باسورد
  }
}, { timestamps: true }); // timestamps = بيضيف createdAt و updatedAt أوتوماتيك

// بعمل الموديل
const User = mongoose.model("User", userSchema);

module.exports = User;