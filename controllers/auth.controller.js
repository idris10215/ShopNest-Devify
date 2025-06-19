import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";


const register = async (req, res) => {
    try {

        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({message: "Please fill all the fields"});
        }

        const user = await User.findOne({email});
        
        if(user) {
            return res.status(400).json({message: "User already exists"});
        }

        const newUser = new User({
            name,
            email,
            password,
            role: "user"  
        });

        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            token: generateToken(newUser._id)
        });


    } catch(error) {
        console.error("Registration Error:", error);
        res.status(500).json({message: "Server error"});
    }
}


const login = async (req, res) => {
    try {

        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message: "Please fill all the fields"});
        }

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message: "User does not exist"});
        }

        const isMatch = await user.matchPassword(password);
        if(!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });

    } catch(error) {
        res.status(500).json({message: "Server error"});
    }
}

export { register, login };