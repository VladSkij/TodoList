import { selectThemeMode, setIsLoggedInAC } from "@/app/app-slice"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import s from "./Login.module.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/features/auth/lib/schemas"
import { LoginInputs } from "@/features/auth/lib/schemas/LoginSchema.ts"
import { useLoginMutation } from "@/features/auth/api/authApi.ts"
import { ResaultCode } from "@/common/enums"
import { AUTH_TOKEN, EMAIL } from "@/common/constants"
import { useGetCaptchaQuery } from "@/features/auth/api/captchaApi.ts"
import { useState } from "react"


export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()


  const [isCaptchaRequired, setCaptchaRequired] = useState(false)

  const { data:captchaData } = useGetCaptchaQuery(undefined, {
    skip: !isCaptchaRequired,
  })

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "free@samuraijs.com",
      password: "free",
      rememberMe: true,
      captcha: "Enter the code from the image",
    },
  })

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    login(data)
      .unwrap()
      .then((res) => {
      if (res.resultCode === ResaultCode.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: true }))
        localStorage.setItem(AUTH_TOKEN, res.data.token)
        localStorage.setItem(EMAIL, data.email)
      }
      if (res.resultCode === ResaultCode.CaptchaError) {
        setCaptchaRequired(true)
      }
    })
    reset()
  }

  return (
    <Grid container justifyContent={"center"}>
      <FormControl>
        <div>
          <p>
            To login get registered
            <a
              style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
              href="https://social-network.samuraijs.com"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>
            <b>Email:</b> free@samuraijs.com
          </p>
          <p>
            <b>Password:</b> free
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Email"
                  helperText={errors.email && errors.email.message}
                  margin="normal"
                  {...field}
                  error={!!errors.email}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  type="password"
                  helperText={errors.password && errors.password.message}
                  label="Password"
                  margin="normal"
                  error={!!errors.password}
                  {...field}
                />
              )}
            />

            {isCaptchaRequired && (
              <>
                <img src={captchaData?.url} />
                <Controller name="captcha" control={control} render={({ field }) => <TextField {...field} />} />
              </>
            )}

            {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}

            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} />
                  )}
                />
              }
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  )
}
