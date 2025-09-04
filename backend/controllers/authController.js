import User from "../models/User.js";

// Signin (without bcrypt)
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      res.json({
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
