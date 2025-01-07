"use client";

import { Button } from "@mui/joy";
import styles from "./page.module.css";

import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { useRouter } from "next/navigation";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {},
      },
    },
  },
});

export default function Home() {
  const router = useRouter();
  return (
    <CssVarsProvider theme={theme}>
      <div className={styles.page}>
        VI
        <Button
          color="primary"
          variant="plain"
          onClick={() => router.push("/home")}
        >
          go to homepage
        </Button>
      </div>
    </CssVarsProvider>
  );
}
