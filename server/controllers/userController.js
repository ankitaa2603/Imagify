import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";

/* ===============================
   AUTH CONTROLLERS
================================ */

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ===============================
   RAZORPAY SETUP (SAFE)
================================ */

let razorpayInstance = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

/* ===============================
   PAYMENT CONTROLLERS
================================ */

const paymentRazorpay = async (req, res) => {
  try {
    if (!razorpayInstance) {
      return res.json({
        success: false,
        message: "Payments are currently disabled",
      });
    }

    const { userId, planId } = req.body;

    if (!userId || !planId) {
      return res.json({ success: false, message: "Missing details" });
    }

    let credits, plan, amount;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;

      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;

      default:
        return res.json({ success: false, message: "Plan not found!" });
    }

    const transactionData = await transactionModel.create({
      userId,
      plan,
      amount,
      credits,
      date: Date.now(),
    });

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY || "INR",
      receipt: transactionData._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    if (!razorpayInstance) {
      return res.json({
        success: false,
        message: "Payments are currently disabled",
      });
    }

    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(
      razorpay_order_id
    );

    if (orderInfo.status !== "paid") {
      return res.json({ success: false, message: "Payment Failed" });
    }

    const transactionData = await transactionModel.findById(
      orderInfo.receipt
    );

    if (transactionData.payment) {
      return res.json({ success: false, message: "Payment already verified" });
    }

    const userData = await userModel.findById(transactionData.userId);

    const updatedCredits =
      userData.creditBalance + transactionData.credits;

    await userModel.findByIdAndUpdate(userData._id, {
      creditBalance: updatedCredits,
    });

    await transactionModel.findByIdAndUpdate(transactionData._id, {
      payment: true,
    });

    res.json({ success: true, message: "Credits Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/* ===============================
   EXPORTS
================================ */

export {
  registerUser,
  loginUser,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
};
