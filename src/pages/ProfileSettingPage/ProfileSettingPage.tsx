import { Input, Select, SettingPageHeading, UserProfile } from "@components";
import { ICONS } from "@constants";
import { useAuth } from "@context";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormValues, profileSchema } from "@types";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const ProfileSettingPage: React.FC = () => {
  const { userData } = useAuth();
  const [isEditingEmailName, setIsEditingEmailName] = useState<boolean>(false);
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
  const [isEditingRole, setIsEditingRole] = useState<boolean>(false);
  const { register, handleSubmit, setValue, formState: { errors }, clearErrors, control, } = useForm<ProfileFormValues>({
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
    const { firstName, lastName, email } = data;
    console.log("Name & Email Data:", { firstName, lastName, email });
    setIsEditingEmailName(false);
  };

  const onSubmitPassword: SubmitHandler<ProfileFormValues> = (data) => {
    const { oldPassword, newPassword } = data;
    console.log("Password Data:", { oldPassword, newPassword });
    setIsEditingPassword(false);
  };

  const onSubmitRole: SubmitHandler<ProfileFormValues> = (data) => {
    const { role } = data;
    console.log("Role Data:", { role });
    setIsEditingRole(false);
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
              <div className={isEditingEmailName ? "flex gap-2" : "hidden"}>
                <Input
                  type="text"
                  register={register("firstName")}
                  error={errors.firstName?.message}
                />
                <Input
                  type="text"
                  register={register("lastName")}
                  error={errors.lastName?.message}
                />
              </div>
              <div className="border-l-[1px] border-l-silverGray pl-2">
                {isEditingEmailName ? (
                  <Input
                    type="email"
                    register={register("email")}
                    error={errors.email?.message}
                  />
                ) : (
                  <span className="text-[14px] text-neutralGray">
                    {userData?.email}
                  </span>
                )}
              </div>
            </div>
            {!isEditingEmailName ? (
              <button
                type="button"
                onClick={() => setIsEditingEmailName(true)}
                className="flex gap-2 items-center text-accentBlue"
              >
                <ICONS.edit /> Edit
              </button>
            ) : (
              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={() => setIsEditingEmailName(false)}
                  className="border-silverGray border-2 px-2 py-1 text-silverGray hover:bg-silverGray transition-all duration-200 hover:text-basicWhite rounded-lg text-[13px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border-basicGreen hover:bg-basicGreen border-2 px-2 py-1 hover:text-basicWhite bg-transparent transition-all duration-200 text-basicGreen rounded-lg text-[13px]"
                >
                  Change
                </button>
              </div>
            )}
          </div>
        </form>

        <form onSubmit={handleSubmit(onSubmitPassword)} className="flex flex-col gap-4">
          <SettingPageHeading label="Password" />
          <div className="border-b-[1px] py-4 flex items-start justify-between gap-2 w-full border-basicBlack">
            <div className="flex gap-2 items-center">
              {!isEditingPassword ? (
                <p>***********</p>
              ) : (
                <div className="flex gap-2">
                  <Input
                    type="password"
                    register={register("oldPassword")}
                    error={errors.oldPassword?.message}
                    placeholder="Old Password"
                  />
                  <Input
                    type="password"
                    register={register("newPassword")}
                    error={errors.newPassword?.message}
                    placeholder="New Password"
                  />
                </div>
              )}
            </div>
            {!isEditingPassword ? (
              <button
                type="button"
                onClick={() => setIsEditingPassword(true)}
                className="flex gap-2 items-center text-accentBlue"
              >
                <ICONS.edit /> Edit
              </button>
            ) : (
              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={() => setIsEditingPassword(false)}
                  className="border-silverGray border-2 px-2 py-1 text-silverGray hover:bg-silverGray transition-all duration-200 hover:text-basicWhite rounded-lg text-[13px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border-basicGreen hover:bg-basicGreen border-2 px-2 py-1 hover:text-basicWhite bg-transparent transition-all duration-200 text-basicGreen rounded-lg text-[13px]"
                >
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
                <Select<ProfileFormValues>
                  control={control}
                  name="role"
                  data={roles}
                />
              )}
            </div>
            {!isEditingRole ? (
              <button
                type="button"
                onClick={() => setIsEditingRole(true)}
                className="flex gap-2 items-center text-accentBlue"
              >
                <ICONS.edit /> Edit
              </button>
            ) : (
              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={() => setIsEditingRole(false)}
                  className="border-silverGray border-2 px-2 py-1 text-silverGray hover:bg-silverGray transition-all duration-200 hover:text-basicWhite rounded-lg text-[13px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border-basicGreen hover:bg-basicGreen border-2 px-2 py-1 hover:text-basicWhite bg-transparent transition-all duration-200 text-basicGreen rounded-lg text-[13px]"
                >
                  Change
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfileSettingPage;
