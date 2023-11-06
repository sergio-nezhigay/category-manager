import { NextResponse } from "next/server";

import fileOperations from "@/utils/fileOperations";

export async function PUT(req) {
  const newOrder = await req.json();
  const categories = await fileOperations.readDataFromFile();
  if (!Array.isArray(newOrder) || newOrder.length !== categories.length) {
    return NextResponse.json(
      { message: "Invalid category order data" },
      { status: 400 }
    );
  }

  const updatedCategories = newOrder.map((categoryId, index) => {
    const foundCategory = categories.find(
      (category) => category.id === categoryId
    );
    return {
      ...foundCategory,
      order: foundCategory.isReadonly ? -1 : index,
    };
  });

  await fileOperations.writeDataToFile(updatedCategories);

  return NextResponse.json({
    message: "Category order updated successfully",
    updatedCategories,
  });
}
