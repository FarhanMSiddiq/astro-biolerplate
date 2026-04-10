import React from "react";
import type { Role } from "../../../types/role";
import { formatDateToIndonesian } from "../../../utils/formatDateToIndonesian";
import DeleteRole from "./_delete";
import UpdateRole from "./_update";

interface ListRoleProps {
  role: Role[];
}

const ListRole: React.FC<ListRoleProps> = ({ role }) => {
  return <ListRoleComponent list={role} />;
};

const ListRoleComponent = ({ list }: { list: Role[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th>No</th>
            <th>Nama Role</th>
            <th>Waktu Pembuatan Data</th>
            <th>Waktu Pengubahan Data</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.length == 0 && (
            <tr className="bg-base-200">
              <td colSpan={7}>
                <div className="flex items-center justify-center py-2">
                  Data Tidak Ditemukan
                </div>
              </td>
            </tr>
          )}
          {list.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{formatDateToIndonesian(data.created_at)}</td>
              <td>{formatDateToIndonesian(data.updated_at)}</td>
              <td className="flex">
                <UpdateRole data={data} />
                <DeleteRole id={data.id.toString()} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListRole;
