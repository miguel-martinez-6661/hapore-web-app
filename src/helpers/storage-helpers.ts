import fs from "fs";

const URI = process.env.NEXT_PUBLIC_API_URL;

export const base64ToFile = (
  file: { base64: string; fileName: string },
  targetFolder: string
) => {
  const fileName = `${Date.now().toString()}${file.fileName}`;
  const fileContents = file.base64.replace(/^data:image\/png;base64,/, "");

  fs.mkdirSync(`./public/${targetFolder}`, { recursive: true });

  const fileFullName = `./public/${targetFolder}/${fileName}`;

  fs.writeFile(fileFullName, fileContents, "base64", function (err) {
    console.log(err);
  });

  return `${URI}/${targetFolder}/${fileName}`;
};
