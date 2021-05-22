import { NextApiRequest, NextApiResponse } from "next"
import { borrowBook } from "../../database/index"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    const { username, bookID } = req.body
    if (!username || !bookID) {
        return res.status(400).json({
            message: "username and borrow book ID are both required",
        })
    }
    const result = await borrowBook(username, bookID)
    if (result) {
        return res.status(200).end()
    }
    res.status(404).end()
}
