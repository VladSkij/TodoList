import { selectThemeMode } from "@/app/app-slice"
import { useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import s from "./Login.module.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/features/auth/lib/schemas"
import { LoginInputs } from "@/features/auth/lib/schemas/LoginSchema.ts"

export const Login = () => {

  // type LoginInputs = {
  //   email: string
  //   password: string
  //   rememberMe: boolean
  // }



  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  const {
    register,
    handleSubmit,
    formState:{errors},
    reset,
    control
  } = useForm <LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues:{email:'test@gmail.com', password:'123456', rememberMe:true}
  })

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data)
    reset()
  }
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
            <TextField
              label="Email"
              helperText={errors.email && errors.email.message}
              margin="normal"
              error={!!errors.email}
              {...register("email")}
            />
            <TextField
              type="password"
              label="Password"
              margin="normal"
              error={!!errors.password}
              {...register("password", {
                required: { value: true, message: "Password can't be empty" },
                maxLength: { value: 6, message: "MaxValue is 6" },
              })}
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

            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field:{value, ...rest} }) => (
                    <Checkbox {...rest} checked={value}/>
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
