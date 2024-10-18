"use client";

import { userDetails } from "@/actions/login";
import { useEffect, useState } from "react";

// export async function getServerSideProps() {
//   try {
//     const userData = await userDetails();
//     return { props: { userData } };
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     return { props: { userData: null } }; // Return null or some default object
//   }
// }

interface UserData {
  name: string;
  email: string;
  sub: string;
  iat: number;
  exp: number;
  jti: string;
}
const HomePage = () => {

    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
      const fetchUserData = async () => {
        const response: UserData = await userDetails();
        setUserData(response);
      };
      fetchUserData();
    }, []);

  if (!userData) {
    return (
      <div className="flex justify-center">
        <div className="flex flex-col">
          <h1 className="text-7xl font-bold mb-4">Error fetching user data.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <h1 className="text-7xl font-bold mb-4">Hi!</h1>
        <p className="text-4xl font-semibold mb-2">{userData?.name}</p>
        <p className="text-xl mb-4">{userData?.email}</p>
        <h3 className="text-lg mt-2">
          The Time is{" "}
          <span className="font-bold">
            {new Date().toLocaleTimeString([], {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
        </h3>
      </div>
    </div>
  );
}

export default HomePage;