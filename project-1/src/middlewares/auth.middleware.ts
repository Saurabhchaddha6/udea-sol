import {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken"

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHead = req.headers.authorization

    if (!authHead || !authHead.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const token = authHead.split(" ")[1]


    if (!process.env.JWT_SECRET) {
        console.log("JWT SECRET MISSING")
        return res.status(500).json({ message: "Server configuration error" })
    }
    

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string }

        // 🔥 4. Check decoded payload
        
        (req as any).userId = decoded.userId

        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}