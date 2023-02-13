import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { filename, target } = req.query;
    // Setting the headers
    res.writeHead(200, {
      "Content-Type": "image/png",
    });
    // Reading the file
    fs.readFile(`./public/${target}/${filename}`, function (err, content) {
      // Serving the image
      res.end(content);
    });
  } catch (error: any) {
    res.status(500).json({
      message: `Error: no se pudo crear usuario. ${error.message}`,
    });
  }
}
