import { Input } from "@components"
import { ROUTES } from "@constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupForm, SignupFormSchema } from "@types"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export const SignupPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupForm),
    defaultValues: {
      companySize: "Small Firm"
    }
  })

  const onSubmit: SubmitHandler<SignupFormSchema> = (e) => {
    console.log(e)
  }

  return <div className="w-[25rem] lg:w-[35rem] mx-auto h-screen flex flex-col gap-3 justify-center">
    <h1 className="text-[25px] font-semibold">Sign Up</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="flex gap-5">
        <Input register={register("firstName")} label="First Name" type="string" error={errors["firstName"]?.message} />
        <Input register={register("lastName")} label="Last Name" type="string" error={errors["lastName"]?.message} />
      </div>
      <div className="flex gap-5">
        <Input register={register("email")} label="Email" type="string" error={errors["email"]?.message} />
        <Input register={register("password")} label="Password" type="string" error={errors["password"]?.message} />
      </div>
      <div className="flex gap-5">
        <Input register={register("companyName")} label="Company Name" type="string" error={errors["companyName"]?.message} />
        <Input register={register("noOfEmployes", { valueAsNumber: true })} label="Number of Employes" type="number" error={errors["noOfEmployes"]?.message} />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">I'm with a:</h3>
        <div className="space-x-1.5">
          <input type="radio" id="small" className="accent-black" value="Small Firm" {...register("companySize")} />
          <label htmlFor="small" className="text-grayTxt text-[14px]">Small or midsize business</label>
        </div>
        <div className="space-x-1.5">
          <input type="radio" id="firm" className="accent-black" value="Accounting Firm" {...register("companySize")} />
          <label htmlFor="firm" className="text-grayTxt text-[14px]">Accounting Firm</label>
        </div>
      </div>
      <button type="submit" className="bg-basicBlack text-basicWhite rounded-full py-2 transition-all duration-200 hover:bg-opacity-80">Sign Up</button>
      <div className="flex gap-3 items-center">
        <p className="text-[13px] text-grayTxt">Already have an account</p>
        <Link to={`${ROUTES.auth}/${ROUTES.login}`} className="text-[14px] underline font-medium">Login</Link>
      </div>
    </form>
  </div>
}

export default SignupPage