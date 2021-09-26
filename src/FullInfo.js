import { CardContent, Card } from "@mui/material";
import React from "react";
import "./App.css";

function FullInfo({
  active,
  total,
  todayCase = 0,
  countryTpe = "Worldwide",
  flagUrl,
  test,
  todayRecover,
  todayDeaths,
  totalDeaths,
  totalRecover,
  critical
}) {
  return (
    <div className="fullinfo">
      <h3>Detailed Information {countryTpe}</h3>
      <div className="fullinfo_flag">
        <img src={flagUrl} />
        {/* <p>{flagUrl}</p> */}
      </div>
      <Card className="fullinfo_detail">
        <CardContent className="fullinfo_cases box">
            <h3>Corona Virus Cases </h3>
          <span>Active Cases : {active}</span>
          <span>New Cases : {todayCase}</span>
          <span>Total Cases : {total}</span>
        </CardContent>
        <Card className="fullinfo_recover box">
            <h3> Recoverd </h3>
          <span>Test: {test}</span>
          <span>Today Recoverd : {todayRecover}</span>
          <span>Total Recoverd : {totalRecover}</span>
        </Card>
        <Card className="fullinfo_death box">
            <h3>Deaths</h3>
          <span>Critical Cases : {critical}</span>
          <span>Today Deaths : {todayDeaths}</span>
          <span>Total Deaths : {totalDeaths}</span>
        </Card>
      </Card>
    </div>
  );
}

export default FullInfo;
