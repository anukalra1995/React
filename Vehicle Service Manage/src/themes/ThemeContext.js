import React from "react";

export const themes = {
  dark: {
    color: 'red',
    background: 'azure',
    padding: '5px'
  },
  light: {
    color: 'black',
    background: 'white',
    padding: '5px'
  }
};

export const ThemeContext = React.createContext(themes.dark);

// export default ThemeContext;