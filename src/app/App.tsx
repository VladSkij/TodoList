import "./App.css"
import { Header } from "@/common/components/Header/Header"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { selectThemeMode } from "@/app/app-slice.ts"
import { ErrorSnackbar } from "@/common/components"
import { Routing } from "@/common/routing"
import { useEffect } from "react"
import { meTC } from "@/features/auth/model/auth-slice.ts"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(meTC())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
