import React from "react";

type CardProps = {
  title: string;
  value: string | number;
};

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        flex: 1,
        margin: "10px",
        minWidth: 150,
        textAlign: "center",
        transition: "transform 0.2s",
      }}
    >
      <h3 style={{ marginBottom: 10, color: "#555", fontSize: "1rem" }}>{title}</h3>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2c3e50" }}>{value}</p>
    </div>
  );
};

export default Card;
