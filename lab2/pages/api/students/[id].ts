import { NextApiRequest, NextApiResponse } from "next"
import { addOneStudent } from "../../../database/index"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET" && req.method !== "POST") {
        res.setHeader("Allow", ["GET", "POST"])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    //  TODO: get one student according to his id
    if (req.method === "GET") {
        console.log(req.query)
        return res.json({ hello: req.query })
    }

    if (req.method === "POST") {
        const { id } = req.query
        const { name, gender, age, department } = req.body
        if (
            typeof id !== "string" ||
            !id ||
            !name ||
            !gender ||
            !age ||
            !department
        ) {
            return res.status(400).json({
                message:
                    "id and name and gender and age and department are both required",
            })
        }
        const result = await addOneStudent({
            id,
            name,
            gender,
            age,
            department,
        })
        if (result) {
            return res.status(200).end()
        }
        return res.status(404).end()
    }
}
