import { NextApiRequest, NextApiResponse } from "next"
import { getUsers } from "../../../database/index"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const users = await getUsers()
        res.json(users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
