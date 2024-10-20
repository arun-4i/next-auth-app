import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { connectToDB } from "@/lib/utils";
import { User } from "@/models/user-model";
import { hash } from "bcryptjs";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = () => {
  const signUp = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!name || !email || !password) {
      throw new Error("Please fill all the fields");
      }
      
      await connectToDB();

    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hash(password, 10);

      console.log("hashed password: ", hashedPassword);

    const res  = await User.create({
      name,
      email,
      password: hashedPassword,
    });
      console.log("User Created: ", res);
    redirect("/login");
  };

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={signUp} className="flex flex-col gap-4">
            <Input type="text" placeholder="Name" name="name" />
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Password" name="password" />
            <Button type="submit">Sign Up</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>Or</span>
          <form action="">
            <Button type="submit" variant={"outline"}>
              Login with Google
            </Button>
          </form>
          <Link href="/login">Already have an account? Login</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
