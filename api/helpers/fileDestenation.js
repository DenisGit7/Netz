import path from "path";

export const fileDestination = (customerFolder, subFolder, rawFileName) => {
  const filePath = `${customerFolder}/${subFolder}/`;
  const date = new Date();
  const day =
    date.getDate().toString() +
    (date.getMonth() + 1).toString() +
    date.getFullYear().toString();
  const time =
    date.getHours().toString() +
    date.getMinutes().toString() +
    date.getMilliseconds().toString();
  const uploadDate = `${day}_${time}`;
  const fileName = `${uploadDate}_${path.parse(rawFileName).name}${
    path.parse(rawFileName).ext
  }`;

  return filePath + fileName;
};
