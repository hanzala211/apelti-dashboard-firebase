import { AuthButton, Input, Select } from "@components"
import { ROUTES } from "@constants"
import { useAuth } from "@context"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginForm, LoginFormSchema } from "@types"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export const LoginPage: React.FC = () => {
  const { setIsRemember, login, errorMessage } = useAuth()
  const { register, control, handleSubmit, formState: { errors } } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      role: "admin"
    }
  })

  const onSubmit: SubmitHandler<LoginFormSchema> = (e) => {
    console.log(e)
    login(e)
  }

  const loginSelect = [
    { label: "Admin", value: "admin" },
    { label: "Clerk", value: "clerk" },
    { label: "Payer", value: "payer" },
    { label: "Amount", value: "amount" },
    { label: "Accountant", value: "accountant" },
  ]

  return <div className="lg:w-[30rem] w-[22rem] mx-auto h-screen flex flex-col gap-3 justify-center">
    <h1 className="text-[25px] font-semibold">Sign In</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Input type="email" label="Email" error={errors["email"]?.message} register={register("email")} />
      <Input type="password" label="Password" error={errors["password"]?.message} register={register("password")} />
      <Select<LoginFormSchema> name="role" label="Role" control={control} data={loginSelect} />

      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <input type="checkbox" id="remember" onChange={(e) => setIsRemember(e.target.checked)} className="accent-basicBlack scale-110" />
          <label htmlFor="remember" className="text-grayTxt text-[14px]">Remember me</label>
        </div>
        <button type="button" className="text-basicBlack underline font-medium text-[14px]">Forgot Password</button>
      </div>

      {errorMessage.length > 0 && <p className="text-basicRed">{errorMessage}</p>}
      <AuthButton text="Sign In" />
      <div>
        <p className="text-[13px] text-grayTxt">Here to receive a payment from a Apelti customer?</p>
        <Link to={`${ROUTES.auth}/${ROUTES.signup}`} className="text-[14px] underline font-medium">Sign up for Apelti. It's free!</Link>
      </div>
    </form>
  </div>
}

export default LoginPage