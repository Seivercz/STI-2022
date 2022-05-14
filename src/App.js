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
function RenderServerResponse(props) {
    const buttonClicked=props.buttonClicked, currTime = props.currTime, botName=props.botName,
        exchangeRate=props.exchangeRate, lower_recommended= props.lowerRecommended, average_recommended=props.averageRecommended,
    average_recommendedAmount=props.averageRecommendedAmount, lowerReccomendedAmount=props.lowerRecommendedAmount
    return (
        <>
        <div className="response-text" key={currTime}>
            {buttonClicked ? "Zpráva ze serveru:" : ""}
            <br/>
            {currTime ==="None" || currTime==="Null" ? "" : currTime}
            <br/>
            {botName==="None" || botName==="Null" ? "" : botName}
            <br/>
            {exchangeRate==="None" || exchangeRate==="Null" ? "" : exchangeRate}
            <br/>
            {lower_recommended==="True" || average_recommended==="True" ? "Zhodnocením dle kritérií níže se koupě EUR DOPORUČUJE" :
            ""}

            <br/>
            {lower_recommended==="False"  ? "Rozdíl ceny za poslední 3 dny kvůli rozdílu "+lowerReccomendedAmount+ " EUR se nedoporučuje koupě" :
                                            ""}
            {lower_recommended==="True"  ? "Rozdíl ceny za poslední 3 dny  kvůli rozdílu "+lowerReccomendedAmount+" EUR se doporučuje" :
                                            ""}
            <br/>
            {average_recommended==="False"  ? "Kvůli zvýšení průměru za poslední 3 dny o "+average_recommendedAmount+ " % se nedoporučuje koupě" :
                ""}
            {average_recommended==="True"  ? "Kvůli rozdílu průměru za poslední 3 dny o "+average_recommendedAmount+ " % se doporučuje koupě" :
                ""}
        </div>
        </>
    )
}
let unique_key = 0;
function App() {
    const [isChecked1, setIsChecked1] = useState(true);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [currTime, setCurrTime] = useState("None")
    const [botName, setBotName] = useState("None")
    const [exchangeRate, setExchangeRate] = useState("None")
    const [lowerRecommendedBool, setLowerRecommendedBool] = useState("None")
    const [lowerRecommendedAmount, setLowerRecommendedAmount] = useState("None")
    const [averageRecommendedBool, setAverageRecommendedBool] = useState("None")
    const [averageRecommendedAmount, setAverageRecommendedAmount] = useState("None")
    const [responseComponents, setResponseComponents] = useState([]);

    function prettify(text) {
       // "{True: -0.23493244322530416}"
        if (text ==="Null") {
            return "Null"
        }
        let one = text.slice(1, text.length-1)
        let final = one.split(" ")
        final[0] = final[0].slice(0, final[0].length-1)
        // ['{True:', '-0.23493244322530416']
        return final
    }

    const handleChange1 = () => {
        setIsChecked1(!isChecked1);
    };
    const handleChange2 = () => {
        setIsChecked2(!isChecked2);
    };
    const handleChange3 = () => {
        setIsChecked3(!isChecked3);
    };
    const handleChange4 = () => {
        setIsChecked4(!isChecked4);
    };
    function handleButtonClear() {
        setResponseComponents([])
    }
     const handleButtonClick = () => {
        let requestData = ""
        //let requestUrl = "https://stibotbackend2022.herokuapp.com/api/getData?"
        let requestUrl = "http://127.0.0.1:5000/api/getData?"
        if (isChecked1) requestData += "time=1&"
        else requestData += "time=0&"
        if (isChecked2) requestData += "name=1&"
        else requestData += "name=0&"
        if (isChecked3) requestData += "exchangeRate=1&"
        else requestData += "exchangeRate=0&"
        if (isChecked4) requestData += "buyRecomendation=1"
        else requestData += "buyRecomendation=0"
        let full_link = requestUrl+requestData
        fetch(full_link).then(response => response.json())
            .then(response => {
                let data = response;
                setCurrTime(data.time);
                setBotName(data.name);
                setExchangeRate(data.rate);
                setLowerRecommendedBool(prettify(data.lower_recommended)[0]);
                setLowerRecommendedAmount(prettify(data.lower_recommended)[1])
                setAverageRecommendedBool(prettify(data.average_recomended)[0]);
                setAverageRecommendedAmount(prettify(data.average_recomended)[1])
                if (data.time ==="Null" && data.name==="Null" && data.rate==="Null" &&
                    data.lower_reccomended==="Null" && data.average_reccomended==="Null") {
                    setButtonClicked(false)
                }
                else {
                    setButtonClicked(true)
                    setResponseComponents([...responseComponents, <RenderServerResponse key={unique_key}
                                                buttonClicked={buttonClicked} currTime={currTime} botName={botName}
                                                exchangeRate={exchangeRate} lowerRecommended={lowerRecommendedBool}
                                                averageRecommended={averageRecommendedBool}
                                                lowerRecommendedAmount={lowerRecommendedAmount}
                                                averageRecommendedAmount={averageRecommendedAmount} />])

                    // {setResponseComponents(responseComponents.concat(
                    //     <RenderServerResponse key={unique_key} buttonClicked={buttonClicked} currTime={currTime} botName={botName}
                    //                           exchangeRate={exchangeRate} lowerRecommendedBool={lowerRecommendedBool}
                    //                           averageRecommendedBool={averageRecommendedBool} />))
                    // }
                    unique_key = unique_key + 1;
                }
            });
    }


    return (
        <>
        <div className="App-whole">
            <h1>Hello</h1>
            <Checkbox label={"Čas"} id={"currTime"} isChecked={isChecked1} handleChange={handleChange1} />
            <Checkbox label={"Jméno"} id={"serverName"} isChecked={isChecked2} handleChange={handleChange2} />
            <Checkbox label={"Kurz CZK/EUR"} id={"exchangeRate"} isChecked={isChecked3} handleChange={handleChange3} />
            <Checkbox label={"Doporučení koupě EUR"} id={"buyRecomendation"} isChecked={isChecked4} handleChange={handleChange4} />
        </div>
        <div className="chosen-boxes">
            Je Vybráno:
                {isChecked1 ? "Čas " : " "}
                {isChecked2 ? "Jméno " : " "}
                {isChecked3 ? "Kurz CZK/EUR " : " "}
                {isChecked4 ? "Doporučení koupě EUR " : " "}
            <br />
            <button type="button" onClick={handleButtonClick}>Poslat</button>
            <button type="button" onClick={handleButtonClear}>Clear historie</button>
        </div>
            {/*{responseComponents.map((item) => (*/}
            {/*    <RenderServerResponse key={item} buttonClicked={buttonClicked} currTime={currTime} botName={botName} exchangeRate={exchangeRate}*/}
            {/*                          lowerRecommendedBool={lowerRecommendedBool} averageRecommendedBool={averageRecommendedBool} />*/}
            {/*))}*/}
            {responseComponents}
        </>
    );
}

export default App;
