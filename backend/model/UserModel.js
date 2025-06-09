const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});


// // ✅ Only hash the password here
// userSchema.pre("save", async function () {
//   this.passwosrd = await bcrypt.hash(this.password, 12);
// });


// // ✅ Add method to compare password during login
// userSchema.methods.correctPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model("User", userSchema);
