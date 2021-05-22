import { NextApiRequest, NextApiResponse } from "next"
import { returnBook } from "../../database/index"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    const { username, bookID } = req.body
    if (!username || !bookID) {
        return res.status(400).json({
            message: "username and return book ID are both required",
        })
    }
    const result = await returnBook(username, bookID)
    if (result) {
        return res.status(200).end()
    }
    res.status(404).end()
}
