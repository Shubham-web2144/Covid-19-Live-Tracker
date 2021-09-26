import React from "react";
import "./App.css";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";

function StatsBox({ title, cases, total }) {
  return (
    <div className="statsbox">
      <Card sx={{ minWidth: 160 }}>
        <CardContent sx={{ width: 240, padding: 2}}>
          <h3 className="statsbox_title">{title}</h3>
          <h2 className="statsbox_cases">+{cases}</h2>
          <h1 className="statsbox_total">
            +{total}
            <span>Total</span>
          </h1>
        </CardContent>
      </Card>
    </div>
  );
}

export default StatsBox;
