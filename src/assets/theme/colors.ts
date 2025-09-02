import { DefaultTheme } from "react-native-paper";

export const colors = {
  primary300: '#CBCFB4',
  primary500: '#5e6e32',
  primary700: '#283718',
  secondary500: '#DDA25E',
  secondary700: '#66472B',
  borderLightGrey: '#E4E4E4',
  backgroundGrey: '#F3F3F3',
  textInputBackgroundColor: "#F0F0F0",
  //
  green: '#4CAF50',
  red: '#D1462F',
  black: '#000000',
  white: '#ffffff',
}

// Custom theme to match the colors in the design
export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5e6e32', // Dark green color from header
    secondary: '#BC6C25',
    background: '#dcdfc9', // Light beige background
    accent: '#b3864e', // Color for the recover password text
    alert: '#D1462F', // Red color for error messages
  },
};