import { promises as fs } from "fs";
import path from "path";

const jsonDirectory = path.join(process.cwd(), "src", "data");
const dataFilePathNew = jsonDirectory + "/categories.json";

const readDataFromFile = async () => {
  try {
    const fileContents = await fs.readFile(dataFilePathNew, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading data from the file2:", error);
    return [];
  }
};

const writeDataToFile = async (data) => {
  try {
    await fs.writeFile(dataFilePathNew, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing data to the file:", error);
  }
};

const fileOperations = {
  readDataFromFile,
  writeDataToFile,
};

export default fileOperations;
