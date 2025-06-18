import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    if (!userId) {
        throw new Error("User ID is required to generate token");
    }

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d', 
    });

    return token;
}

export default generateToken;