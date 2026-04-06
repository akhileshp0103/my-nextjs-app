import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { errorResponse } from "@/lib/utils";
// Add proper types for NextRequest and params
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return NextResponse.json({ message: 'GET request successful', params: resolvedParams });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return NextResponse.json({ message: 'PATCH request successful', params: resolvedParams });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return NextResponse.json({ message: 'DELETE request successful', params: resolvedParams });
}
import { z } from "zod";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return errorResponse("UNAUTHORIZED", "Not signed in", 401);

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? "20")));
  const search = searchParams.get("search") ?? undefined;

  const where = {
    userId: session.user.id,
    ...(search ? { title: { contains: search, mode: "insensitive" as const } } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.item.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: { id: true, title: true, status: true, createdAt: true },
    }),
    prisma.item.count({ where }),
  ]);

  return NextResponse.json({
    data: items,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

const createSchema = z.object({
  title: z.string().min(1, "Required").max(255),
  description: z.string().max(1000).optional(),
  status: z.enum(["active", "inactive"]).default("active"),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return errorResponse("UNAUTHORIZED", "Not signed in", 401);

  const body = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    const details = parsed.error.issues.map((i) => ({
      field: i.path.join("."),
      issue: i.message,
    }));
    return errorResponse("VALIDATION_ERROR", "Validation failed", 400, details);
  }

  const item = await prisma.item.create({
    data: { ...parsed.data, userId: session.user.id },
  });

  return NextResponse.json(item, { status: 201 });
}
