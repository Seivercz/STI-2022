// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom';
// import "@babel/preset-react"
import TestRenderer from "react-test-renderer";
import App from './App';

const testRenderer = TestRenderer.create(<App />)
const testInstance = testRenderer.root;

test("checkbox 1 checked",
    () => {
        expect(testInstance.findByProps({label: "Čas"})).toBeChecked
    })


test("Button exists",
    () => {
        expect(testInstance.findByProps({id: "send"})).toBeVisible
    })

test("checkbox 2 unchecked",
    () => {
        expect(testInstance.findByProps({label: "Jméno"})).not.toBeChecked
    })

test("checkbox 1 onCLick uncheck",
    () => {
        expect(testInstance.findByProps({label: "Jméno"}).props.onClick).not.toBeChecked
    })
