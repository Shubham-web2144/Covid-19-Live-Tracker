import React, { useCallback, useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './App.css';
import StatsBox from './StatsBox';
import Table from './Table';
import { Card, CardContent } from '@mui/material';
// import MapPage from './MapPage';
import { sortData } from './util';
// import Chart from './Chart';
import { numeral } from 'numeral';
import FullInfo from './FullInfo';

function App() {
  const [countries,setCountries] = useState([]);
  const [ inputLabel, setInputLabel] = useState('worlwide');
  const [caseNum,setCaseNum] = useState({});
  const [tableData, setTableData] = useState([]);
  const [caseType,setCaseType] = useState('worldwide');
  const [active,setActive] = useState({})
  const [flag, setFlag] = useState('');

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all/").
    then((response) => response.json())
    .then((data) => {
      setCaseNum(data);
      setActive(data);
    })
}, []);
 
  useEffect(() =>{
    const getCountry = () =>{
      fetch("https://disease.sh/v3/covid-19/countries/")
      .then((response) => response.json())
      .then((data) => {
        console.log("my data", data);
        const countryData = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }))

        const sortedData = sortData(data);
        setCountries(countryData);
        setTableData(sortedData);
        // setCaseType(data)
        // setCaseNum(countryData);
      })
    }
    getCountry();
  }, []);

  const onChangeInput = async (event) =>{
    const Label = event.target.value;
    const URL = Label === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${Label}`;
    
    await fetch(URL)
    .then((response) => response.json())
    .then((data) => {
    Label === 'worldwide' ? setFlag('') : setFlag(data.countryInfo.flag);

      console.log("flag is her", flag);
      setInputLabel(Label);
      setCaseNum(data);
      setActive(data);
      setCaseType(Label)
    })   
  }
  return (
    <div className="app">
      {console.log(caseNum)}
      <div className="app_main">
        <div className="app_header">
          <h1 className="app_title">COVID-19 LIVE TRACKER</h1>
          <FormControl>
            <Select
              value={inputLabel}
              onChange={onChangeInput}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_statsbox">
          <StatsBox
            // onClick ={(e) => {setCaseType('cases')}}
            title={"CoronaVirus Cases"}
            cases={caseNum.todayCases}
            total={caseNum.cases}
          />
          {
            console.log("demo",caseNum)
          }
          <StatsBox
            // onClick={(e) => {setCaseType('recoverd')}}
            title={" Recoverd"}
            cases={caseNum.todayRecovered}
            total={caseNum.recovered}
          />
          <StatsBox
            // onClick={(e) => {setCaseType('deaths')}}
            title={"Deaths"}
            cases={caseNum.todayDeaths}
            total={caseNum.deaths}
          />
        </div>

       <Card sx={{marginTop: 2}}>
         <CardContent>
           <FullInfo
           active={active.active}
           total={active.cases}
           todayCase={ active.todayCases}
          countryTpe={active.country}
          flagUrl={flag}
          test={active.tests}
          toadayDeaths={active.todayDeaths}
          totalDeaths={active.deaths}
          totalRecover={active.recovered}
          critical={active.critical}
          todayRecover={active.todayRecovered}
           />
         </CardContent>
       </Card>
      </div>

      {/* sidebar */}
      <Card className="app_secondary">
        <Card className="app_sidebar">
          <CardContent className="sidebar_table">
            <h3>Country By Cases</h3>
            <Table countries={tableData} />
            {console.log("table data", tableData)}
          </CardContent>
        </Card>
       
      </Card>
    </div>
  );
}

export default App;

