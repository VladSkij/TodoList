import { Header } from "@/common/components/Header/Header"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { selectThemeMode, setIsLoggedInAC } from "@/app/app-slice.ts"
import { ErrorSnackbar } from "@/common/components"
import { Routing } from "@/common/routing"
import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material"
import s from "./App.module.css"
import { useMeQuery } from "@/features/auth/api/authApi.ts"
import { ResaultCode } from "@/common/enums"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  const [isInit, setIsInit] = useState(false)
  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (isLoading) return
    if (data?.resultCode === ResaultCode.Success) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    }
    setIsInit(true)
  }, [isLoading])

  if (!isInit) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <div className={s.app}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
