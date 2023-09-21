import React from "react";
import HomePage from "../components/HomePage/HomePage";
const getData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    cache: "no-store",
  }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch quiz questions");
  }

  return res.json();
};

export const runtime = "edge";
export default async function Home() {
  // Fetch user data when the home page loads. This is to mimic user login. Assuming user is logged in and data is receiveved from the server
  const user = await getData();

  return (
    <main className="container">
      <HomePage user={user} />
    </main>
  )
}
