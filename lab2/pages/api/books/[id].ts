import { NextApiRequest, NextApiResponse } from "next"
import { addOneBook } from "../../../database/index"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET" && req.method !== "POST") {
        res.setHeader("Allow", ["GET", "POST"])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    if (req.method === "GET") {
        console.log(req.query)
        return res.json({ hello: req.query })
    }

    if (req.method === "POST") {
        const { id } = req.query
        const { title, author, type, publisher, description } = req.body
        console.log(id, title, author, type, publisher, description)
        console.log(typeof id !== "string")
        if (
            typeof id !== "string" ||
            !id ||
            !title ||
            !author ||
            typeof type === "undefined" ||
            !publisher ||
            !description
        ) {
            return res.status(400).json({
                message:
                    "id and author and type and publisher and description are both required",
            })
        }
        const result = await addOneBook({
            id,
            title,
            author,
            type,
            publisher,
            description,
        })
        if (result) {
            return res.status(200).end()
        }
        return res.status(404).end()
    }
}
