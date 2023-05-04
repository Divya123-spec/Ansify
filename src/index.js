import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "rgb(0,49,86)",
        colorSecondary: "rgb(2,84,151)",
      },
    }}
  >
    <App />
  </ConfigProvider>
);

reportWebVitals();
