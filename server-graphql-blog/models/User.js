const {Schema, model} = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
// consultando no aparece, pero en la creación del user si
      select: false
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ,
        "Please provide a valid email address",
      ],
    },
    nickname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("User", userSchema);

