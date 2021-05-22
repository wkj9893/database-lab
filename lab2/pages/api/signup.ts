import { NextApiRequest, NextApiResponse } from "next"
import { addOneUser } from "../../database/index"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    const { username, password, id } = req.body
    if (!username || !password || !id) {
        return res.status(400).json({
            message: "username and password are both required",
        })
    }
    const result = await addOneUser({ username, password, id })
    if (result) {
        return res.status(200).end()
    }
    return res.status(400).end()
}
