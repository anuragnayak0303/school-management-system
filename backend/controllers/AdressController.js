import Addressmodel from "../models/adressmodel.js";
import multer from "multer";
import path from "path";
import userModel from "../models/userModel.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
export { upload };

// Create or Update Address
export const saveAddress = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      phone,
      state,
      city,
      country,
      postalcode,
      stateCode,
      countryCode,
      image,
    } = req.body;
   

    const Address = await Addressmodel.findOne({ userId: req.user });

    if (Address) {
      await userModel.findByIdAndUpdate(req.user, {
        name,
        email,
        profileImage: req.file ? req.file.filename : image,
      });

      await Addressmodel.findOneAndUpdate(
        { userId: req.user },
        {
          userId: req.user,
          address,
          phone,
          state,
          city,
          country,
          postalcode,
          stateCode,
          countryCode,
        }
      );

      return res.status(201).send({ message: "Update Successfully !!" });
    }

    await userModel.findByIdAndUpdate(req.user, {
      name,
      email,
      profileImage: req.file ? req.file.filename : "",
    });

    const NewAddress = new Addressmodel({
      userId: req.user,
      address,
      phone,
      state,
      city,
      country,
      postalcode,
      stateCode,
      countryCode,
    });
    await NewAddress.save();

    res.status(201).json({ message: "Address created", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const getAddress = async (req, res) => {
  try {
    const address = await Addressmodel.findOne({ userId: req.user }).populate(
      "userId"
    );
    if (!address) return res.status(404).json({ message: "Address not found" });
    res.status(200).json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
