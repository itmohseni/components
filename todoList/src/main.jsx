import React from "react";
import reactdom from "react-dom/client"
import App from "./App";
import "./index.css"
const root = reactdom.createRoot(document.querySelector("#root"))

root.render(<App/>)