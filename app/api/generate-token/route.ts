import { Success } from "@/lib/helper/responses";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  console.log(req);

  return Success("Data?");
};
