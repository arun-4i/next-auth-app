import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loginform } from "@/components/ui/client/form";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async() => {

  const session = await auth();
  if(session?.user) redirect("/");
    
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
                <Loginform/>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>Or</span>
                  <form action={async () => {
                      "use server"
                      await signIn("google");
          }}>
            <Button type="submit" variant={"outline"}>
              Login with Google
            </Button>
          </form>
          <Link href="/signup">Don&apos;t have an account? Signup</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
