import { createUser } from "@/app/lib/actions/create-user";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const formData = req.body;
        const result = await createUser({}, formData);
        res.status(200).json(result);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}