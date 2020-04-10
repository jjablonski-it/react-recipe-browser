import React from "react";
import { FaUser, FaClock, FaFire } from "react-icons/fa";

const RecipeIcons = ({ recipe }) => {
  const { totalTime, calories } = recipe;
  const _yield = recipe.yield;

  const twoDigitsFormat = (number) => (number < 10 ? "0" + number : number);

  return (
    <div className="d-flex justify-content-around">
      <span>
        <FaUser /> {_yield}
      </span>
      {!!totalTime && (
        <span>
          <FaClock />{" "}
          {twoDigitsFormat(
            Math.floor(totalTime / 60) + ":" + twoDigitsFormat(totalTime % 60)
          )}
        </span>
      )}

      <span>
        <FaFire /> {(calories / 1000).toFixed(2)}kcal
      </span>
    </div>
  );
};

export default RecipeIcons;
