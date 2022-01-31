import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "./store/storeShared";


const App: React.FC = () => (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
        <div>Name: store</div>
        <div>Framework: react</div>
        <div>Language: JavaScript</div>
        <div>CSS: Tailwind</div>
    </div>
);

ReactDOM.render(
    <StoreProvider>
        <App />
    </StoreProvider>, document.getElementById("app"));
