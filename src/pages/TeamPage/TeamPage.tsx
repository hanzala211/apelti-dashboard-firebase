import { PageHeading } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamFormSchema, TeamFormSchemaType } from "@types";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { TeamForm } from "./components/TeamForm";

export const TeamPage: React.FC = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<TeamFormSchemaType>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      invites: [
        {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
          role: "clerk",
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "invites",
  })

  const onSubmit: SubmitHandler<TeamFormSchemaType> = (data) => {
    console.log("Form Data:", data);
  }

  return (
    <section className="md:px-14 md:py-9 px-4 pt-20 w-screen md:max-w-[calc(100vw-256px)] h-[100dvh] md:max-h-[calc(100dvh-100px)] overflow-auto bg-gray-50">
      <div className="mb-8">
        <PageHeading label="Team" />
        <p className="text-neutralGray text-sm mt-1">Manage your team members and their account permissions here.</p>
      </div>
      <TeamForm append={append} fields={fields} register={register} remove={remove} errors={errors} control={control} onSubmit={handleSubmit(onSubmit)} />
    </section>
  );
};

export default TeamPage;
