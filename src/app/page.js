import React from "react";
import HomePage from "../components/HomePage/HomePage";
const getData = async () => {
  const res = await fetch(
    `http://localhost:3000/api/user`, {
    cache: "no-store",
  }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch quiz questions");
  }

  return res.json();
};

export default async function Home() {
  const user = await getData();

  return (
    <main className="container">
      <HomePage user={user} />
    </main>
  )
}
