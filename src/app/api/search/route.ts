import { NextRequest, NextResponse } from "next/server";

import { mockContent } from "@/data/mockContent";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = (searchParams.get("q") || "").trim().toLowerCase();

  if (!query) {
    return NextResponse.json({
      items: [],
      source: "mock",
    });
  }

  const items = mockContent.filter((item) => {
    const searchableText = [
      item.title,
      item.description,
      item.category,
      item.sourceName,
      item.author || "",
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query);
  });

  return NextResponse.json({
    items,
    source: "mock",
  });
}
