import path from "path";

export const fileDestinationRemove = (
  customerFolder,
  subFolder,
  rawFileName
) => {
  const filePath = `${customerFolder}/${subFolder}/`;
  const fileName = `${path.parse(rawFileName).name}${
    path.parse(rawFileName).ext
  }`;

  return filePath + fileName;
};
