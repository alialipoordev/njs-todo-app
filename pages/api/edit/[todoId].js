import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const body = { ...req.body };
  const { todoId } = req.query;
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
        .json({ status: "success", message: "Invalid Data!" });
    }

    const result = await User.updateOne(
      { "todos._id": todoId },
      {
        $set: {
          "todos.$.title": title,
          "todos.$.status": status,
          "todos.$.description": description,
        },
      }
    );

    res.status(200).json({ status: "success" });
  } else if (req.method === "GET") {
    const result = user.todos.find((i) => i._id == todoId);

    if (!result) {
      res.json({ status: "failed", message: "Todo Not Found!" });
    }

    res.status(200).json({ status: "success", data: result });
  }
}
