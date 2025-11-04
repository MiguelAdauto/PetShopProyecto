// src/components/Dashboard/Card.tsx
import React from "react";
import "./Card.css";

type CardProps = {
  title: string;
  value: string | number;
  icon?: string;
  rightContent?: React.ReactNode; // calendario u otro elemento
};

const Card: React.FC<CardProps> = ({ title, value, icon, rightContent }) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <div className="dashboard-card-title">
          {icon && <i className={`bi ${icon}`}></i>}
          <h3>{title}</h3>
        </div>
        <div className="dashboard-card-actions">{rightContent}</div>
      </div>
      <div className="dashboard-card-value">{value}</div>
    </div>
  );
};

export default Card;
