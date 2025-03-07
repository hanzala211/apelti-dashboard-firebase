import { Input, Select, SettingPageHeading, UserProfile } from "@components";
import { ICONS } from "@constants";
import { useAuth, useSetting } from "@context";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormValues, profileSchema } from "@types";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const ProfileSettingPage: React.FC = () => {
  const { userData } = useAuth();
  const { changeEmailAndName, errorMessage, changeUserData } = useSetting()
  const [isEditingEmailName, setIsEditingEmailName] = useState<boolean>(false);
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
  const [isEditingRole, setIsEditingRole] = useState<boolean>(false);
  const { register, handleSubmit, setValue, formState: { errors }, clearErrors, control, reset } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    shouldUnregister: false,
    defaultValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      role: userData?.role || "",
    },
  });

  useEffect(() => {
    clearErrors();
    if (isEditingEmailName) {
      setValue("firstName", userData?.firstName || "");
      setValue("lastName", userData?.lastName || "");
      setValue("email", userData?.email || "");
    }
  }, [isEditingEmailName, clearErrors, setValue, userData]);

  const onSubmitName: SubmitHandler<ProfileFormValues> = (data) => {
    setIsEditingEmailName(false);
    changeUserData({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    })
    reset()
  };

  const onSubmitPassword: SubmitHandler<ProfileFormValues> = (data) => {
    const { oldPassword, newPassword } = data;
    setIsEditingPassword(false);
    changeEmailAndName({ currentPassword: oldPassword, newPassword })
    reset()
  };

  const onSubmitRole: SubmitHandler<ProfileFormValues> = (data) => {
    const { role } = data;
    console.log("Role Data:", { role });
    setIsEditingRole(false);
    reset()
  };

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "Clerk", value: "clerk" },
    { label: "Approver", value: "Approver" },
    { label: "Accountant", value: "Accountant" },
    { label: "Payer", value: "payer" },
  ];

  return (
    <section className="w-screen md:max-w-[calc(100vw-256px)] h-[100dvh] max-h-[calc(100dvh-300px)]">
      <div className="p-4 border-b-[1px]">
        <SettingPageHeading label="Profile" />
      </div>
      <div className="w-full lg:max-w-[55%] max-w-[90%] mx-auto h-screen flex mt-14 text-left flex-col gap-8">
        <form onSubmit={handleSubmit(onSubmitName)} className="flex flex-col gap-4">
          <SettingPageHeading label="Name and Email" />
          <div className="border-b-[1px] py-4 flex items-center justify-between gap-2 w-full border-basicBlack">
            <div className="flex gap-2 items-center">
              <div className={!isEditingEmailName ? "block" : "hidden"}>
                <UserProfile className="text-[14px]" />
              </div>
              <div className="grid md:grid-cols-2 gap-2 grid-cols-1">
                <div className={isEditingEmailName ? "grid md:grid-cols-2 gap-2 grid-cols-1" : "hidden"}>
                  <Input type="text" register={register("firstName")} error={errors.firstName?.message} />
                  <Input type="text" register={register("lastName")} error={errors.lastName?.message} />
                </div>
                <div className={` ${isEditingEmailName ? "md:pl-2 md:border-l-[1px]" : "pl-2 border-l-[1px]"} border-l-silverGray  w-fit`}>
                  {isEditingEmailName ? (
                    <Input type="email" register={register("email")} error={errors.email?.message} />
                  ) : (
                    <span className="text-[14px] text-neutralGray">{userData?.email}</span>
                  )}
                </div>
              </div>
            </div>
            {!isEditingEmailName ? (
              <button type="button" onClick={() => setIsEditingEmailName(true)} className="flex gap-2 items-center text-accentBlue">
                <ICONS.edit /> Edit
              </button>
            ) : (
              <div className="flex gap-2 items-center">
                <button type="button" onClick={() => setIsEditingEmailName(false)} className="border-silverGray border-2 px-2 py-1 text-silverGray hover:bg-silverGray transition-all duration-200 hover:text-basicWhite rounded-lg text-[13px]">
                  Cancel
                </button>
                <button type="submit" className="border-basicGreen hover:bg-basicGreen border-2 px-2 py-1 hover:text-basicWhite bg-transparent transition-all duration-200 text-basicGreen rounded-lg text-[13px]">
                  Change
                </button>
              </div>
            )}
          </div>
        </form>

        <form onSubmit={handleSubmit(onSubmitPassword)} className="flex flex-col gap-4">
          <SettingPageHeading label="Password" />
          <div className="border-b-[1px] py-4 flex md:items-start items-center justify-between gap-2 w-full border-basicBlack">
            <div className="flex gap-2 items-center">
              {!isEditingPassword ? (
                <p>***********</p>
              ) : (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                  <Input type="password" register={register("oldPassword")} error={errors.oldPassword?.message} placeholder="Old Password" />
                  <Input type="password" register={register("newPassword")} error={errors.newPassword?.message} placeholder="New Password" />
                </div>
              )}
            </div>
            {!isEditingPassword ? (
              <button type="button" onClick={() => setIsEditingPassword(true)} className="flex gap-2 items-center text-accentBlue">
                <ICONS.edit /> Edit
              </button>
            ) : (
              <div className="flex gap-2 items-center">
                <button type="button" onClick={() => setIsEditingPassword(false)} className="border-silverGray border-2 px-2 py-1 text-silverGray hover:bg-silverGray transition-all duration-200 hover:text-basicWhite rounded-lg text-[13px]">
                  Cancel
                </button>
                <button type="submit" className="border-basicGreen hover:bg-basicGreen border-2 px-2 py-1 hover:text-basicWhite bg-transparent transition-all duration-200 text-basicGreen rounded-lg text-[13px]">
                  Change
                </button>
              </div>
            )}
          </div>
        </form>

        <form onSubmit={handleSubmit(onSubmitRole)} className="flex flex-col gap-4">
          <SettingPageHeading label="Approval" />
          <div className="border-b-[1px] py-4 flex items-start justify-between gap-2 w-full border-basicBlack">
            <div className="flex gap-2 items-center">
              {!isEditingRole ? (
                <p className="text-neutralGray text-[14px]">
                  Role: {userData?.role[0].toUpperCase()}
                  {userData?.role.slice(1)}
                </p>
              ) : (
                <Select<ProfileFormValues> control={control} name="role" data={roles} />
              )}
            </div>
            {!isEditingRole ? (
              <button type="button" onClick={() => setIsEditingRole(true)} className="flex gap-2 items-center text-accentBlue">
                <ICONS.edit /> Edit
              </button>
            ) : (
              <div className="flex gap-2 items-center">
                <button type="button" onClick={() => setIsEditingRole(false)} className="border-silverGray border-2 px-2 py-1 text-silverGray hover:bg-silverGray transition-all duration-200 hover:text-basicWhite rounded-lg text-[13px]">
                  Cancel
                </button>
                <button type="submit" className="border-basicGreen hover:bg-basicGreen border-2 px-2 py-1 hover:text-basicWhite bg-transparent transition-all duration-200 text-basicGreen rounded-lg text-[13px]">
                  Change
                </button>
              </div>
            )}
          </div>
        </form>
        {errorMessage.length > 0 && <p className="text-basicRed text-sm">{errorMessage}</p>}
      </div>
    </section >
  );
};

export default ProfileSettingPage;
