import { NextApiRequest, NextApiResponse } from "next"

import { deleteUser } from "../../../database/index"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "DELETE") {
        res.setHeader("Allow", ["DELETE"])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    const { username } = req.query
    if (!username || typeof username !== "string") {
        return res.status(400).json({
            message: "username is required",
        })
    }
    const result = await deleteUser(username)
    if (result) {
        return res.status(200).end()
    }
    return res.status(404).end()
}
