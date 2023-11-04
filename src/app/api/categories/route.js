import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { promises as fs } from "fs";
import path from "path";

const jsonDirectory = path.join(process.cwd(), "src", "data");
const dataFilePathNew = jsonDirectory + "/categories.json";

async function readDataFromFile() {
  try {
    const fileContents = await fs.readFile(dataFilePathNew, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading data from the file2:", error);
    return [];
  }
}

async function writeDataToFile(data) {
  try {
    await fs.writeFile(dataFilePathNew, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing data to the file:", error);
  }
}
// initial read
export async function GET() {
  const categories = await readDataFromFile();
  return NextResponse.json(categories);
}
// delete category
export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const categories = await readDataFromFile();
  const updatedCategories = categories.filter((category) => category.id !== id);
  await writeDataToFile(updatedCategories);
  return NextResponse.json({ message: "Category deleted successfully" });
}

// export async function POST(req) {
//   const { title, isVisible, isReadonly } = await req.json();
//   const newCategory = {
//     id: uuidv4(),
//     title,
//     order: categories.length,
//     isVisible,
//     isReadonly,
//   };
//   categories.push(newCategory);
//   writeDataToFile(categories); // Save the updated data to the file

//   return NextResponse.json({
//     message: "Category added successfully",
//     newCategory,
//   });
// }

// export async function PUT(req) {
//   const newOrder = await req.json();

//   if (!Array.isArray(newOrder) || newOrder.length !== categories.length) {
//     return NextResponse.json(
//       { message: "Invalid category order data" },
//       { status: 400 }
//     );
//   }

//   categories = newOrder.map((categoryId, index) => ({
//     ...categories.find((category) => category.id === categoryId),
//     order: index,
//   }));

//   writeDataToFile(categories); // Save the updated data to the file

//   return NextResponse.json({
//     message: "Category order updated successfully",
//     updatedCategories: categories,
//   });
// }

export async function PATCH(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const categories = await readDataFromFile();
  const updatedCategory = categories.find((category) => category.id === id);
  if (!updatedCategory) {
    return NextResponse.json(
      { message: "Invalid category id" },
      { status: 400 }
    );
  }

  updatedCategory.isVisible = !updatedCategory.isVisible;
  await writeDataToFile(categories);
  return NextResponse.json({
    message: "Category visibility updated successfully",
    updatedCategory,
  });
}
