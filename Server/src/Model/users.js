const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
        type: Number,
        required: true,
        trim: true,
    },

    role: {
      type: String,
      enum: ["user", "dealer", "admin"],
      default: "user"
    }
  },
  { timestamps: true }
);

const Users = mongoose.model("User", userSchema);

module.exports = Users;
