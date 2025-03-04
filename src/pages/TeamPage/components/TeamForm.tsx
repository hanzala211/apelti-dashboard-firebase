import { Input, PhoneNumberInput, Select } from "@components"
import { iconsPath } from "@constants"
import { TeamFormSchemaType } from "@types"
import { Control, FieldArrayWithId, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove, UseFormRegister } from "react-hook-form"

interface TeamFormProps {
  fields: FieldArrayWithId<TeamFormSchemaType>[],
  remove: UseFieldArrayRemove,
  register: UseFormRegister<TeamFormSchemaType>,
  control: Control<TeamFormSchemaType>,
  errors: FieldErrors<TeamFormSchemaType>,
  onSubmit: () => void,
  append: UseFieldArrayAppend<TeamFormSchemaType>
}

export const TeamForm: React.FC<TeamFormProps> = ({ fields, remove, register, control, errors, onSubmit, append }) => {

  const roles = [
    { label: "Clerk", value: "clerk" },
    { label: "Payer", value: "payer" },
    { label: "Accountant", value: "accountant" },
    { label: "Approver", value: "approver" },
  ]

  return <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
    <h2 className="text-lg font-semibold mb-4">Invite Team Members</h2>
    <form onSubmit={onSubmit} className="space-y-6">
      {fields.map((item, index, arr) => (
        <div key={item.id} className="relative space-y-4 pb-6 border-b border-gray-300 last:border-0 last:pb-0">
          {arr.length > 1 && (
            <button type="button" onClick={() => remove(index)} className="absolute top-0 right-0 text-basicRed hover:text-red-700 focus:outline-none" title="Remove Member">Remove</button>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            <Input register={register(`invites.${index}.firstName`)} label="First Name" type="string" error={errors.invites?.[index]?.firstName?.message} />
            <Input register={register(`invites.${index}.lastName`)} label="Last Name" type="string" error={errors.invites?.[index]?.lastName?.message} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Input register={register(`invites.${index}.email`)} label="Email" type="string" error={errors.invites?.[index]?.email?.message} />
            <PhoneNumberInput label="Phone" name={`invites.${index}.phone`} control={control} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Input register={register(`invites.${index}.password`)} label="Password" type="password" error={errors.invites?.[index]?.password?.message} />
            <Select control={control} name={`invites.${index}.role`} label="Role" data={roles} />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <button type="button"
          onClick={() =>
            append({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              phone: "",
              role: "clerk",
            })
          }
          className="flex items-center gap-2 text-sm font-medium text-basicGreen hover:text-graphGreen focus:outline-none">
          <iconsPath.plusIcon /> Add Member
        </button>
      </div>
      <button type="submit" className="w-full py-3 px-4 bg-basicGreen hover:bg-graphGreen text-white font-medium rounded-md shadow hover:opacity-90 transition-all duration-200">
        Add Users
      </button>
    </form>
  </div>
}