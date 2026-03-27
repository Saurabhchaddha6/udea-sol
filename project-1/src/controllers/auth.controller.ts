import { Request,Response} from "express";
import * as authService from "../services/user.service"
import jwt from "jsonwebtoken"

export const register = async (req: Request, res: Response) => {
    const {email,password} = req.body

    const user = await authService.registerUser(email,password)
    res.status(201).json({ message: "User registered successfully", user })
}

export const login = async (req: Request, res: Response) => {
    const {email,password} = req.body

    try {
        const user = await authService.loginUser(email,password)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: "7d" })
        res.status(200).json({ message: "Login successful", token })
    } catch (error) {
        res.status(401).json({ message: (error as Error).message })
    }
}