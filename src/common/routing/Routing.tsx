import { Main } from "@/app/Main.tsx"
import { Route, Routes } from "react-router"
import { Login } from "@/features/auth/ui/Login/Login.tsx"
import { PageNotFound } from "@/common/components/PageNotFound/PageNotFound.tsx"
import { Faq } from "@/common/components/Faq/Faq.tsx"
import { ProtectedRoute } from "@/common/components"
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice.ts"

export const Path = {
  Main: "/",
  Login: "/login",
  Faq: "/faq",
  notFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  return (
    <Routes>
      <Route
        path={Path.Main}
        element={
          <ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Login}>
            <Main />
          </ProtectedRoute>
        }
      />

      <Route
        path={Path.Login}
        element={
          <ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Login}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route path={Path.notFound} element={<PageNotFound />} />
      <Route
        path={Path.Faq}
        element={
          <ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Login}>
            <Faq />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  )
}
