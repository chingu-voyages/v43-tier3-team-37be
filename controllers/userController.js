const UserModel = require('../model/user');
const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {
    const { password, email } = req.body;

    const hasedPassword = await bcrypt.hash(password, 12);
    try {
        const user = await UserModel.findOne({ email: email });
        console.log(user)
        if (user) {
            return res.status(404).json({ message: 'User is already existed' })
        }
        const newuser = new UserModel({
            ...req.body, password: hasedPassword
        });
        newuser.save();
        req.session.islogin = true;
        req.session.user = newuser._id;
        res.status(201).json({ message: 'You have successfully registered.' })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const login = async (req, res, next) => {
    console.log(req.body);
    const { password, email } = req.body;

    try {
        const user = await UserModel.findOne({ email: email });
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: 'Invalid email or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(404).json({ message: 'Invalid email or password' })
        }

        req.session.islogin = true;
        req.session.user = user._id;
        user.password = undefined;
        res.status(200).json({ message: 'you have login successfully', user });

    } catch (error) {
        res.status(500).json({ message: error });
    }


}

const logout = async (req, res, next) => {
    req.session.islogin = false;
    res.status(200).json({ message: 'you have logout successfully', });   
}

const isLognin = async (req, res, next) => {
    if (req.session?.islogin && req.session?.user) {

        const user = await UserModel.findById(req.session.user);
        const newUser = {
            email: user.email,
            role: user.role,
            username: user.username
        }
        res.status(200).json(newUser);
    } else {
        res.status(404).json({ message: 'User is not login' })
    }
}

module.exports = { signup, login, logout, isLognin }