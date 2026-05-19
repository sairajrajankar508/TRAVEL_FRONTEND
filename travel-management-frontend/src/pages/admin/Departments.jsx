import { useState } from "react";
import toast from "react-hot-toast";
import { useGetDepartmentsQuery, useCreateDepartmentMutation, useDeleteDepartmentMutation } from "../../services/adminApi";

export default function Departments() {

  const { data = [] } = useGetDepartmentsQuery();
  const [createDept] = useCreateDepartmentMutation();
  const [deleteDept] = useDeleteDepartmentMutation();

  const [name, setName] = useState("");

  const handleCreate = async () => {
    await createDept({ name });
    toast.success("Department created");
    setName("");
  };

  return (
    <div>

      <h2 className="text-xl font-bold mb-4">Departments</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Department name"
        className="border p-2"
      />

      <button onClick={handleCreate} className="bg-blue-500 px-3 ml-2">
        Add
      </button>

      <ul className="mt-4">
        {data.map(d => (
          <li key={d.id} className="flex justify-between">

            {d.name}

            <button
              onClick={() => deleteDept(d.id)}
              className="text-red-500"
            >
              Delete
            </button>

          </li>
        ))}
      </ul>

    </div>
  );
}