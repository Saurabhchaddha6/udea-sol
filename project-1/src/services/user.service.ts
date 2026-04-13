import {User} from "../models/user.model"
import bcrypt from "bcrypt"
import { sendMail } from "../utils/mailer"

export const registerUser = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new Error("User already exists")
  }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ email, password: hashedPassword })
    return await user.save()
}

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error("Invalid email or password")
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error("Invalid email or password")
  }
  await sendMail({
    to: email,
    subject: "Login Notification",
    text: `You have successfully logged in at ${new Date().toLocaleString()}`,
  })
  return user
}
