import React from "react";
import HomePage from "../components/HomePage/HomePage";
// const getData = async (page, cat) => {
//   const res = await fetch(
//     `http://localhost:3000/api/quiz`, {
//     cache: "no-store",
//   }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch quiz questions");
//   }

//   return res.json();
// };

export default async function Home() {

  return (
    <main className="container">
      <HomePage />
    </main>
  )
}
