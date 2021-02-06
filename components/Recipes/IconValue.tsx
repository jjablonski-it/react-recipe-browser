import React from "react";

interface Props {
  icon: JSX.Element;
  value: string | number;
}

const IconValue = ({ icon, value }: Props) => {
  return (
    <span
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: 20,
      }}
    >
      {icon}
      {value}
    </span>
  );
};

export default IconValue;
