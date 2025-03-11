import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import ytdl from "@distube/ytdl-core";
import { Middleware } from "./middleware";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 await Middleware(req, res);

  if (req.method === "GET") {
   // const { url } = req.query;
    await Middleware(req, res);  
    try {
      ytdl("http://www.youtube.com/watch?v=aqz-KE-bpKQ").pipe(require("fs").createWriteStream("video.mp4"));

      // Get video info
      ytdl.getBasicInfo("http://www.youtube.com/watch?v=aqz-KE-bpKQ").then(info => {
        console.log(info.videoDetails.title);
      });
      
      // Get video info with download formats
      ytdl.getInfo("http://www.youtube.com/watch?v=aqz-KE-bpKQ").then(info => {
        console.log(info.formats);
      });

      //const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=Zc1dDymXaoI`);
     // const formats = ytdl.filterFormats(info.formats, "videoandaudio");

      //if (!formats) {
       // return res
       //   .status(404)
         // .json({ error: "No valid formats found for this video" });
     // }
     // return res.status(200).json({
        //title: info.videoDetails.title,
       // formats: formats, // Mengirimkan format yang valid
      //});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Uppss Failed to fetch video infox" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
