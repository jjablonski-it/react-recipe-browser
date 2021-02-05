import React, { useContext } from "react";
import Recipe from "../components/Recipes/Recipe";
import { Context } from "../context/Context";
import { useRouter } from "next/router";

const DetailedRecipe = () => {
  const router = useRouter();
  const { items } = useContext(Context);
  const id = +router.query["id"]!;
  const recipe = items[id];

  if (!recipe) return <div>Recipe not found</div>;
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Recipe recipe={recipe} id={id} />
    </div>
  );
};

export default DetailedRecipe;
