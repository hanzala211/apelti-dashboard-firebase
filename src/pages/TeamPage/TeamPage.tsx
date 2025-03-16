import { PageHeading } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMemberForm, AddMemberFormSchema, IUser } from "@types";
import { SubmitHandler, useForm } from "react-hook-form";
import { TeamForm } from "./components/TeamForm";
import { useAuth, useTeam } from "@context";
import { Skeleton } from "antd";
import { APP_ACTIONS, ICONS, PERMISSIONS, ROUTES } from "@constants";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const TeamPage: React.FC = () => {
  const { userData } = useAuth()
  const { addMember, deleteMember, setEditingUser, editingUser, updateUser, getMembers } = useTeam()
  const queryClient = useQueryClient()
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<AddMemberFormSchema>({
    resolver: zodResolver(addMemberForm),
    defaultValues: {
      role: "clerk",
    },
  })
  const { data: teamMembers, isLoading: isTeamLoading } = useQuery<IUser[] | null>({
    queryKey: ["teamMembers"],
    queryFn: () => getMembers()
  })
  const addUserMutation = useMutation({
    mutationFn: (sendData: unknown) => addMember(sendData),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["teamMembers"]
      });
    },
  })
  const updateUserMutation = useMutation({
    mutationFn: (params: { userId: string; data: unknown }) => updateUser(params.userId, params.data),
    onSuccess: (updatedUser, params) => {
      queryClient.setQueryData<IUser[]>(["teamMembers"], (oldData) =>
        oldData
          ? [
            ...oldData.filter((item) => item._id !== params.userId),
            updatedUser as IUser,
          ]
          : [updatedUser as IUser]
      );
    },
  })
  const deleteUserMutation = useMutation({
    mutationFn: (params: { userId: string }) => deleteMember(params.userId),
    onSuccess: (_, params) => {
      queryClient.setQueryData<IUser[]>(["teamMembers"], (oldData) =>
        oldData ? oldData.filter((item) => item._id !== params.userId) : []
      );
    },
  })

  const userPermissions = PERMISSIONS[userData?.role as keyof typeof PERMISSIONS]

  useEffect(() => {
    if (editingUser !== null) {
      reset({
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        role: editingUser.role,
        phone: editingUser.phone,
        email: editingUser.email,
      })
    } else {
      reset({
        firstName: "",
        lastName: "",
        role: "clerk",
        phone: "",
        email: "",
        password: ""
      })
    }
  }, [editingUser, reset])

  const onSubmit: SubmitHandler<AddMemberFormSchema> = (data) => {
    console.log("Form Data:", data);
    if (editingUser === null) {
      addUserMutation.mutate(data)
    } else {
      updateUserMutation.mutate({ userId: editingUser._id, data })
    }
  }

  if (!userPermissions.includes(APP_ACTIONS.teamPage)) return <Navigate to={ROUTES.not_available} />
  return (
    <section className="md:py-9 md:px-14 px-4 pt-20 w-screen md:max-w-[calc(100vw-256px)] h-[100dvh] md:max-h-[calc(100dvh-50px)] max-h-[calc(100dvh-20px)] overflow-y-auto">
      <div className="pb-8 mb-8 border-b-[1px] border-neutralGray">
        <PageHeading label="Team" />
        <p className="text-neutralGray text-sm mt-1">Manage your team members and their account permissions here.</p>
      </div>
      {userPermissions.includes(APP_ACTIONS.addTeam) &&
        <TeamForm register={register} errors={errors} control={control} onSubmit={handleSubmit(onSubmit)} isAddingMember={editingUser ? updateUserMutation.isPending : addUserMutation.isPending} />
      }
      <div className="overflow-x-auto overflow-y-hidden mt-8">
        <table className="w-full md:max-w-[calc(100dvw-256px)] text-left border-collapse">
          <thead className="border border-silverGray">
            <tr className="bg-mistGray">
              <th className="px-4 py-2 text-sm font-semibold text-neutralGray">Full Name</th>
              <th className="px-4 py-2 text-sm font-semibold text-neutralGray">Email</th>
              <th className="px-4 py-2 text-sm font-semibold text-neutralGray">Phone</th>
              <th className="px-4 py-2 text-sm font-semibold text-neutralGray">Role</th>
              {userData?.role === "admin" && <>
                <th className="px-4 py-2 text-sm font-semibold text-neutralGray">Edit</th>
                <th className="px-4 py-2 text-sm font-semibold text-neutralGray">Delete</th>
              </>}
            </tr>
          </thead>

          <tbody className="border border-silverGray">
            {isTeamLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-y border-silverGray even:bg-basicWhite odd:bg-paleGray">
                  <td className="px-4 py-2"><Skeleton.Input active size="small" block /></td>
                  <td className="px-4 py-2"><Skeleton.Input active size="small" block /></td>
                  <td className="px-4 py-2"><Skeleton.Input active size="small" block /></td>
                  <td className="px-4 py-2"><Skeleton.Input active size="small" block /></td>
                  <td className="px-4 py-2"><Skeleton.Button active size="small" /></td>
                  <td className="px-4 py-2"><Skeleton.Button active size="small" /></td>
                </tr>
              ))
              : teamMembers && teamMembers.map((item, index) => (
                <tr key={index} className="border-y border-silverGray even:bg-basicWhite odd:bg-paleGray">
                  <td className="px-4 py-2 text-sm text-neutralGray">{item.firstName} {item.lastName}</td>
                  <td className="px-4 py-2 text-sm text-neutralGray">{item.email}</td>
                  <td className="px-4 py-2 text-sm text-neutralGray">{item.phone}</td>
                  <td className="px-4 py-2 text-sm text-neutralGray">{item.role[0].toUpperCase()}{item.role.slice(1)}</td>
                  {userPermissions.includes(APP_ACTIONS.addTeam) && <>
                    <td className="px-4 py-2 text-sm text-basicGreen cursor-pointer" onClick={() => setEditingUser(item)}><ICONS.userEdit size={24} /></td>
                    <button className={`${deleteUserMutation.isPending ? "cursor-not-allowed opacity-50" : ""}`} disabled={deleteUserMutation.isPending} onClick={() => deleteUserMutation.mutate({ userId: item._id })}>
                      <td className="px-4 py-2 text-sm text-basicRed" ><ICONS.delete size={24} /></td>
                    </button>
                  </>
                  }
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TeamPage;
