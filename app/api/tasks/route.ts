import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createTaskSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createTaskSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newTask = await prisma.task.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newTask, { status: 201 });
}

export async function GET(request: NextRequest) {
  const tasks = await prisma.task.findMany();

  return NextResponse.json(tasks, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  if (!body.id) {
    return NextResponse.json(
      { error: "Task ID not provided in the request body" },
      { status: 400 }
    );
  }

  const existingTask = await prisma.task.findUnique({
    where: { id: Number(body.id) },
  });

  if (!existingTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  await prisma.task.delete({ where: { id: Number(body.id) } });

  return NextResponse.json({ success: true }, { status: 200 });
}
