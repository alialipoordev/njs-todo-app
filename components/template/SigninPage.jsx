import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { status } = useSession();

  const router = useRouter();

  const signInHandler = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!res.error) router.push("/");
  };

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);

  return (
    <div className="signin-form">
      <h3>Login Form</h3>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signInHandler}>Login</button>
      <div>
        <p>Create an Account?</p>
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default SigninPage;
