// /pages/api/set-password.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: "Missing data" });

  await prisma.user.update({
    where: { email },
    data: { password }, // 🔐 remember to hash in production
  });

  res.status(200).json({ success: true });
}
