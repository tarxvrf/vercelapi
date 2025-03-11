import type { NextApiRequest, NextApiResponse } from "next";



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
   if(req.method === 'POST'){
    const { name } = req.body;

    if(name){
        res.status(200).json({ message: `Hello, ${name}!` });
    }





   }
}
