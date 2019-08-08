import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
 
import CalciteThemeProvider from 'calcite-react/CalciteThemeProvider';
 
ReactDOM.render(
  <CalciteThemeProvider>
    <App />
  </CalciteThemeProvider>,
  document.getElementById('root')
);