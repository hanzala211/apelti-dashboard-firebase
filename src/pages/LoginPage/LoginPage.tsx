import { Input } from "@components"
import { ROUTES } from "@constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginForm, LoginFormSchema } from "@types"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"


export const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginForm)
  })

  const onSubmit: SubmitHandler<LoginFormSchema> = (e) => {
    console.log(e)
  }

  return <div className="lg:w-[30rem] w-[25rem] mx-auto h-screen flex flex-col gap-3 justify-center">
    <h1 className="text-[25px] font-semibold">Sign In</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Input type="email" label="Email" error={errors["email"]?.message} register={register("email")} />
      <Input type="password" label="Password" error={errors["password"]?.message} register={register("password")} />
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <input type="checkbox" id="remember" className="accent-blue-800 scale-110" />
          <label htmlFor="remember" className="text-grayTxt text-[14px]">Remember me</label>
        </div>
        <button type="button" className="text-basicBlack underline font-medium text-[14px]">Forgot Password</button>
      </div>
      <button type="submit" className="bg-basicBlack text-basicWhite rounded-full py-2 transition-all duration-200 hover:bg-opacity-80">Sign In</button>
      <div>
        <p className="text-[13px] text-grayTxt">Here to receive a payment from a Apelti customer?</p>
        <Link to={`${ROUTES.auth}/${ROUTES.signup}`} className="text-[14px] underline font-medium">Sign up for Apelti. It's free!</Link>
      </div>
    </form>
  </div>
}

export default LoginPage