const otpSchema = new mongoose.Schema({
  email: String,
  code: String,
  expiresAt: { type: Date, default: () => Date.now() + 5 * 60 * 1000 }, // 5 mins
});
