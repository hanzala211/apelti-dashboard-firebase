import { AuthButton, ErrorMessage, Input, PhoneNumberInput } from '@components';
import { ROUTES } from '@constants';
import { useAuth } from '@context';
import { zodResolver } from '@hookform/resolvers/zod';
import { googleLoginDataForm, GoogleLoginDataFormSchema } from '@types';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

export const GoogleLoginDataPage: React.FC = () => {
  const { errorMessage, isAuthLoading, updateData, newGoogleAcc } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<GoogleLoginDataFormSchema>({
    resolver: zodResolver(googleLoginDataForm),
    defaultValues: {
      businessType: 'Small or midsize business',
    },
  });
  const navigate = useNavigate()

  useEffect(() => {
    if (!newGoogleAcc) {
      navigate(`${ROUTES.auth}/${ROUTES.login}`)
    }
  }, [newGoogleAcc])

  const onSubmit: SubmitHandler<GoogleLoginDataFormSchema> = (e) => {
    console.log(e);
    updateData({
      companyName: e.companyName,
      numberOfEmployees: e.numberOfEmployees,
      businessType: e.businessType,
      users: []
    }, e.phone)
  };

  return (
    <div
      className={`w-[22rem] relative lg:w-[35rem] mx-auto h-screen flex flex-col gap-3 justify-center ${isAuthLoading ? 'opacity-70' : ''
        } `}
    >
      {isAuthLoading && (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <MoonLoader />
        </div>
      )}
      <h1 className="text-[25px] font-semibold">Update</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className='w-full'>
          <Input
            register={register('companyName')}
            label="Company Name"
            type="string"
            error={errors['companyName']?.message}
          />
        </div>
        <div className='w-full'>
          <Input
            register={register('numberOfEmployees', { valueAsNumber: true })}
            label="Number of Employes"
            type="number"
            error={errors['numberOfEmployees']?.message}
          />
        </div>
        <div className="w-full">
          <PhoneNumberInput label="Phone" name="phone" control={control} />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">I'm with a:</h3>
          <div className="space-x-1.5">
            <input
              type="radio"
              id="small"
              className="accent-black"
              value="Small or midsize business"
              {...register('businessType')}
            />
            <label htmlFor="small" className="text-grayTxt text-[14px]">
              Small or midsize business
            </label>
          </div>
          <div className="space-x-1.5">
            <input
              type="radio"
              id="firm"
              className="accent-black"
              value="Accounting Firm"
              {...register('businessType')}
            />
            <label htmlFor="firm" className="text-grayTxt text-[14px]">
              Accounting Firm
            </label>
          </div>
        </div>
        <ErrorMessage error={errorMessage} />
        <AuthButton text="Update" />
      </form>
    </div>
  );
};

export default GoogleLoginDataPage;
