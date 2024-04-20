const bcrypt = require("bcrypt");
const { Timestamp } = require("mongodb");
const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Please Enter your Email."],
      unique: true, // Ensure uniqueness
    },
    password: {
      type: String,
      require: [true, "Please Enre tour Password."],
      minlength :  [8, "Must have at least 8 characters."],
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Custom validation to check if email already exists
UserSchema.path("email").validate(async function(value) {
  const userCount = await mongoose.models.User.countDocuments({ email: value });
  return !userCount; // Return true if email doesn't exist, false if it does
}, "Already taken.");

const User = mongoose.model("User",UserSchema);
module.exports = User ;