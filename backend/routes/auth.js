import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "Email already exists" });

        const user = await User.create({ name, email, password, role: "customer" });
        res.status(201).json({ user: user.name, email: user.email });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});


// Login 
router.post("/login", async (req, res) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    res.json({ 
        user: { 
            name: user.name, 
            email: user.email, 
            role: user.role 
        } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;