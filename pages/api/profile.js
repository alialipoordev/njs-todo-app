import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const body = { ...req.body };
  delete req.body;

  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Error In Connecting To DB" });
    return;
  }

  const session = await getSession({ req });
  console.log(session);

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
    const { name, lastName, password } = body;

    if (!name || !lastName || !password) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid Data!" });
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res
        .status(422)
        .json({ status: "failed", message: "Password is Incorrect!" });
    }

    user.name = name;
    user.lastName = lastName;
    user.save();

    res.status(200).json({
      status: "success",
      data: { name, lastName, email: session.user.email },
    });
  } else if (req.method === "GET") {
    res.status(200).json({
      status: "success",
      data: { name: user.name, lastName: user.lastName, email: user.email },
    });
  }
}
