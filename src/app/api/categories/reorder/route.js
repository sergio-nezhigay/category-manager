import { NextResponse } from "next/server";

import fileOperations from "@/utils/fileOperations";

export async function PUT(req) {
  const updatedCategories = await req.json();
  await fileOperations.writeDataToFile(updatedCategories);

  return NextResponse.json({
    message: "Category order updated successfully",
    updatedCategories,
  });
}
