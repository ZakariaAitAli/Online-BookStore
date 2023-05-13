import "../styles/globals.css";
import { CssBaseline, createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SSRProvider } from "@react-aria/ssr";

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      primary: "#4ADE",
      secondary: "#F9CB80",
      error: "#FCC5D8",
    },
  },
});

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      primary: "#4ADE",
      secondary: "#F9CB80",
      error: "#FCC5D8",
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <SSRProvider>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider theme={lightTheme}>
          <Component {...pageProps} />
        </NextUIProvider>
      </NextThemesProvider>
    </SSRProvider>
  );
}
