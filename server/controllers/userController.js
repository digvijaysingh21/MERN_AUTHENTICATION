import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    // const { userId } = req.body;
    const userId = req.userId; // ✅ take from middleware

    if (!userId) {
      return res.json({ success: false, message: "userId is required" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userdata: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
