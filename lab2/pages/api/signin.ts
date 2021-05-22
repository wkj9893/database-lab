import { NextApiRequest, NextApiResponse } from "next"
import { findOneAdmin, findOneUser } from "../../database/index"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    const { username, password, role } = req.body
    if (!username || !password || !role) {
        return res.status(400).json({
            message: "username and password and role are both required",
        })
    }
    if (role === "admin") {
        const result = await findOneAdmin({
            username,
            password,
        })
        if (result) {
            return res.status(200).end()
        }
    }
    if (role === "user") {
        const result = await findOneUser({
            username,
            password,
        })
        if (result) {
            return res.status(200).end()
        }
    }

    return res.status(400).json({ error: "user not found" })
}
