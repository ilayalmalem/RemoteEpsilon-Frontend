import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './assets/main.css';
import rtl from "jss-rtl";
import {
    StylesProvider,
    jssPreset
} from "@material-ui/core/styles";
import { create } from "jss";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

ReactDOM.render(
  <React.StrictMode>
      <StylesProvider jss={jss}>
          <App />
      </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);