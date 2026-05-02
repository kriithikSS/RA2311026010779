"use client"

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
})

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
