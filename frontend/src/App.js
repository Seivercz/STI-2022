
import './App.css';
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
const SubmitButton = ({label, id, handleChange}) => {

}

function App() {
    const [isChecked1, setIsChecked1] = useState(true);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);

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
        /*
        TODO ziskani dat na request pro server
        TODO GET na server
         */
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
            <button type="button" value="Poslat" onClick={handleButtonClick} />
        </div>
        </>
    );
}

export default App;
