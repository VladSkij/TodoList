import { selectThemeMode } from "@/app/app-slice"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import s from "./Login.module.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/features/auth/lib/schemas"
import { LoginInputs } from "@/features/auth/lib/schemas/LoginSchema.ts"
import { loginTC } from "@/features/auth/model/auth-slice.ts"

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  // const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  const {
    handleSubmit,
    formState: { errors },
    //reset,
    control,
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "free@samuraijs.com", password: "free", rememberMe: true },
  })

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    dispatch(loginTC(data))
    // reset()
  }
  // const navigate = useNavigate()
  // if(isLoggedIn) {
  //   navigate(Path.Main)
  // }

  //var 1
  // const navigate = useNavigate()
  // useEffect(() => {
  //   if (isLoggedIn) {
  //      navigate(Path.Main)
  //   }
  // },[isLoggedIn])

  //var2
  // if (isLoggedIn) {
  //   return <Navigate to={Path.Main} />
  // }

  //var3
  // const navigate = useNavigate()
  // const onSubmit: SubmitHandler<LoginInputs> = (data) => {
  //   dispatch(loginTC(data))
  //     .unwrap()
  //     .then((res)=>{
  //       debugger
  //       navigate(Path.Main)
  //     })
  //     .catch((err)=>{
  //       debugger
  //     })
  //   // reset()
  // }

  return (
    <Grid container justifyContent={"center"}>
      <FormControl>
        <FormLabel>
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
        </FormLabel>
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

            {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
            {/*<FormControlLabel label="Remember me" control={<Checkbox />} {...register("rememberMe")} />*/}
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

            {/*<FormControlLabel*/}
            {/*  label="Remember me"*/}
            {/*  control={*/}
            {/*    <Controller*/}
            {/*      name="rememberMe"*/}
            {/*      control={control}*/}
            {/*      render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}*/}
            {/*    />*/}
            {/*  }*/}
            {/*/>*/}

            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  )
}
