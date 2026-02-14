import {
  changeThemeModeAC,
  selectAppStatus,
  selectIsLoggedIn,
  selectNickname,
  selectThemeMode,
  setIsLoggedInAC,
} from "@/app/app-slice.ts"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { containerSx } from "@/common/styles"
import { getTheme } from "@/common/theme"
import { NavButton } from "@/common/components/NavButton/NavButton"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import { LinearProgress } from "@mui/material"
import { NavLink } from "react-router"
import { Path } from "@/common/routing/Routing.tsx"
import { useLogoutMutation } from "@/features/auth/api/authApi.ts"
import { ResaultCode } from "@/common/enums"
import { AUTH_TOKEN, EMAIL } from "@/common/constants"
import { clearDataAC } from "@/common/actions"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()
  const theme = getTheme(themeMode)
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const email = useAppSelector(selectNickname)
  const nickname = email ? email.split("@")[0] : ""

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }
  const [logout] = useLogoutMutation()

  const logoutHandler = () => {
    logout().unwrap()
      .then((res) => {
      if (res.resultCode === ResaultCode.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: false }))
        localStorage.removeItem(AUTH_TOKEN)
        localStorage.removeItem(EMAIL)
        dispatch(clearDataAC())
      }
    })
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {isLoggedIn && <div>{nickname}</div>}
            <NavLink style={{ color: "white", paddingLeft: "20px" }} to={Path.Main}>
              Main
            </NavLink>
            <NavLink style={{ color: "white", paddingLeft: "20px" }} to={Path.Faq}>
              FAQ
            </NavLink>
            {isLoggedIn && <NavButton onClick={logoutHandler}>Log out</NavButton>}
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
