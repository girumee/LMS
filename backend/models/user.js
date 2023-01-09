import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
      requied: true,
    },
    // secondname: {
    //   type: String,
    //   trim: true,
    //   requied: true,
    // },
    email: {
      type: String,
      trim: true,
      requied: true,
      unique: true,
    },
    password: {
      type: String,
      requied: true,
      min: 6,
      max: 64,
    },
    picture: {
      type: String,
      requied: true,
      default: "/avater.png",
    },
    role: {
      type: [String],
      default: ["Subscriber"],
      enum: ["Subscriber", "Instructor", "Admin"],
    },
    sctrip_account_id: "",
    strip_seller: {},
    stripSession: {},
    passwordResetCode: {
      data: String,
      default: "",
    },  
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
