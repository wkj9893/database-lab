import { NextApiRequest, NextApiResponse } from "next"
import { getBooks, BookQuery } from "../../../database/index"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET", "POST"])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    try {
        const { id, title, author, type, publisher, sqlLike } = req.query
        const query = {
            id,
            title,
            author,
            type,
            publisher,
        } as BookQuery
        query.sqlLike = sqlLike === "true" ? true : false
        const books = await getBooks(query)
        return res.json(books)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
}
