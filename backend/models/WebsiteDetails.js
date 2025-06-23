// models/BrandingSetting.js
import mongoose from 'mongoose';

const brandingSchema = new mongoose.Schema({
  logos: {
    dark: { type: String }, // URL or file path
    light: { type: String },
    favicon: { type: String },
  },
  homepageLogo: {
    type: String,
    enum: ['dark', 'light', 'favicon'],
    default: '',
  },
  schoolInfo: {
    name: { type: String },
    principal: { type: String },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    description: { type: String },
  },
  marqueeText: {
    type: String,
  },
  socialLinks: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    youtube: { type: String },
    linkedin: { type: String },
  },
}, {
  timestamps: true,
});

const BrandingSetting = mongoose.model('BrandingSetting', brandingSchema);

export default BrandingSetting;
