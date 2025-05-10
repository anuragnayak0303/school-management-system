import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: { type: String },
    phone: { type: String },
    city: { type: String },
    state:{ type: String },
    country: { type: String },
    postalcode:{ type: String },
    stateCode: { type: String },
    countryCode: { type: String },
  },
  { timestamps: true }
);

const Addressmodel = mongoose.model("Address", addressSchema);

export default Addressmodel;
