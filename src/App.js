import * as React from 'react';
import { useState } from "react"

/*
checkbox požadavky: jaký je čas, jméno (bot/server část jméno), kurz CZK/ÉUR.
 */
const Checkbox = ({label, id, isChecked, handleChange}) => {
    return (
        <label>
            <input
                type="checkbox"
                id={id}
                name={id}
                value={label}
                onChange={handleChange}
                checked={isChecked}
            />
            {label}
        </label>
    );
};
function renderServerResponse(buttonClicked, currTime, botName, exchangeRate) {

    return (
        <>
        <div className="response-text">
            {buttonClicked ? "Zpráva ze serveru:" : ""}
            <br/>
            {currTime ==="None" || currTime==="Null" ? "" : currTime}
            <br/>
            {botName==="None" || botName==="Null" ? "" : botName}
            <br/>
            {exchangeRate==="None" || exchangeRate==="Null" ? "" : exchangeRate}
        </div>
        </>
    )
}

function App() {
    const [isChecked1, setIsChecked1] = useState(true);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [currTime, setCurrTime] = useState("None")
    const [botName, setBotName] = useState("None")
    const [exchangeRate, setExchangeRate] = useState("None")

    const handleChange1 = () => {
        setIsChecked1(!isChecked1);
    };
    const handleChange2 = () => {
        setIsChecked2(!isChecked2);
    };
    const handleChange3 = () => {
        setIsChecked3(!isChecked3);
    };

    const handleButtonClick = () => {
        let requestData = ""
        let requestUrl = "https://stibotbackend2022.herokuapp.com/api/getData?"
        // let testRequestUrl = "http://127.0.0.1:5000/api/getData?"
        if (isChecked1) requestData += "time=1&"
        else requestData += "time=0&"
        if (isChecked2) requestData += "name=1&"
        else requestData += "name=0&"
        if (isChecked3) requestData += "exchangeRate=1"
        else requestData += "exchangeRate=0"
        let full_link = requestUrl+requestData
        fetch(full_link).then(response => response.json())
            .then(response => {
                let data = response;
                setCurrTime(data.time);
                setBotName(data.name);
                setExchangeRate(data.rate);
                if (data.time ==="Null" && data.name==="Null" && data.rate==="Null") setButtonClicked(false)
                else setButtonClicked(true)
            });
    }


    return (
        <>
        <div className="App-whole">
            <h1>Hello</h1>
            <Checkbox label={"Čas"} id={"currTime"} isChecked={isChecked1} handleChange={handleChange1} />
            <Checkbox label={"Jméno"} id={"serverName"} isChecked={isChecked2} handleChange={handleChange2} />
            <Checkbox label={"Kurz CZK/EUR"} id={"exchangeRate"} isChecked={isChecked3} handleChange={handleChange3} />
        </div>
        <div className="chosen-boxes">
            Je Vybráno: {isChecked1 ? "Čas " : " "}
                {isChecked2 ? "Jméno " : " "}
                {isChecked3 ? "Kurz CZK/EUR " : " "}
            <br />
            <button type="button" onClick={handleButtonClick}>Poslat</button>
        </div>
        {renderServerResponse(buttonClicked, currTime, botName, exchangeRate)}
        </>
    );
}

export default App;
