import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import fileOperations from "@/utils/fileOperations";

export async function GET() {
  const categories = await fileOperations.readDataFromFile();
  return NextResponse.json(categories);
}

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const categories = await fileOperations.readDataFromFile();
  const updatedCategories = categories
    .filter((category) => category.id !== id)
    .map((category, index) => {
      return {
        ...category,
        order: category.isReadonly ? 10000 : index,
      };
    });

  await fileOperations.writeDataToFile(updatedCategories);
  return NextResponse.json({ message: "Category deleted successfully" });
}

export async function POST(req) {
  const { title, isVisible, isReadonly } = await req.json();
  const categories = await fileOperations.readDataFromFile();
  const newCategory = {
    id: uuidv4(),
    title,
    order: categories.length - 1,
    isVisible,
    isReadonly,
  };
  categories.push(newCategory);
  await fileOperations.writeDataToFile(
    categories
      .map((category, index) => {
        return {
          ...category,
          order: category.isReadonly ? 10000 : index,
        };
      })
      .sort((a, b) => a.order - b.order)
  );

  return NextResponse.json({
    message: "Category added successfully",
    newCategory,
  });
}

export async function PUT(req) {
  const newOrder = await req.json();
  const categories = await fileOperations.readDataFromFile();
  if (!Array.isArray(newOrder) || newOrder.length !== categories.length) {
    return NextResponse.json(
      { message: "Invalid category order data" },
      { status: 400 }
    );
  }

  const updatedCategories = newOrder.map((categoryId, index) => ({
    ...categories.find((category) => category.id === categoryId),
    order: index,
  }));

  await fileOperations.writeDataToFile(updatedCategories);

  return NextResponse.json({
    message: "Category order updated successfully",
    updatedCategories,
  });
}

export async function PATCH(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const categories = await fileOperations.readDataFromFile();
  const updatedCategory = categories.find((category) => category.id === id);
  if (!updatedCategory) {
    return NextResponse.json(
      { message: "Invalid category id" },
      { status: 400 }
    );
  }

  updatedCategory.isVisible = !updatedCategory.isVisible;
  await fileOperations.writeDataToFile(categories);
  return NextResponse.json({
    message: "Category visibility updated successfully",
    updatedCategory,
  });
}
