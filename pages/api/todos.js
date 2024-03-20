import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { sortTodos } from "@/utils/sortTodos";

import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const body = { ...req.body };
  delete req.body;

  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Error In Connecting To DB" });
  }

  const session = await getSession({ req });

  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You Are Not Logged In!" });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't Exist!" });
  }

  if (req.method === "POST") {
    const { title, status, description } = body;

    if (!title || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid Data!" });
    }

    user.todos.push({ title, status, description });
    user.save();

    res.status(201).json({ status: "success", message: "Todo Created!" });
  } else if (req.method === "GET") {
    const sortedData = sortTodos(user.todos);
    res.status(200).json({ status: "succes", data: { todos: sortedData } });
  } else if (req.method === "PATCH") {
    const { id, status } = body;

    if (!id || !status) {
      return res
        .status(422)
        .json({ status: "success", message: "Invalid Data!" });
    }

    const result = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } }
    );

    res.status(200).json({ status: "success" });
  }
}
