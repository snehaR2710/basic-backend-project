const User = require("../models/userModel")

const home = (req, res) => {
    res.send("Hello world!");
}

// data send in database
const createUser = async (req, res) => {
    // extract info
    try {
        const {name, email, password} = req.body

        // if (!name || !email) {
        //     throw new Error("Name and Email are required")
        // }
        // const userExists = User.findOne({name})

        // if (userExists) {
        //     throw new Error("User already exists")
        // }

        const user = await User.create({
           name,
           email,
           password
        })

        res.status(201).json({
            success: true,
            message: "User created successfully.", user
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// to get data from database
const getUsers = async (req, res) => {
    try {
        const users = await User.find({})

        if (!users) {
            throw new Error("There is no any user exists")
        }
        res.status(200).json({
            success: true,
            message: users
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// Edit users from database
const editUsers = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: [user, "updated successfully"]
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// delete data from database
const deleteUsers = async (req, res) => {
    try {
        /* we takes data from users two types 1-> through body and 2-> trough url
         If we data through body so we write -> req.body And if we geta data through
         url then we write -> req.params.id*/
       const userId = req.params.id 
        const user = await User.findByIdAndDelete(userId)
        res.status(200).json({
            success: true,
            message: [user, " this User deleted successfully."]
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = {
    home,
    createUser,
    getUsers,
    editUsers,
    deleteUsers
}


