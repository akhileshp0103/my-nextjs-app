import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { errorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return errorResponse("UNAUTHORIZED", "Not signed in", 401);

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  if (!user) return errorResponse("NOT_FOUND", "User not found", 404);
  return NextResponse.json(user);
}

const updateSchema = z.object({
  name: z.string().min(1).max(100),
});

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return errorResponse("UNAUTHORIZED", "Not signed in", 401);

  const body = await req.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    const details = parsed.error.issues.map((i) => ({
      field: i.path.join("."),
      issue: i.message,
    }));
    return errorResponse("VALIDATION_ERROR", "Validation failed", 400, details);
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { name: parsed.data.name },
    select: { id: true, name: true, email: true },
  });

  return NextResponse.json(user);
}
