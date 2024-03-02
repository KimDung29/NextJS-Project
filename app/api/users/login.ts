import  { login } from "@/app/lib/actions/login";
import { authMiddleware } from "@/authMiddleware";
import { NextApiRequest, NextApiResponse } from "next";


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = req.customUser;
    if (req.method === 'POST') {
        const formData = req.body;
        const result = await login( {}, formData);
        res.status(200).json(result);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}

export default handler;