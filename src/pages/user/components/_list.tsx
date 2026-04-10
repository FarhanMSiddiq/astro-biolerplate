import React from "react";
import type { Users } from "../../../types/users";
import { formatDateToIndonesian } from "../../../utils/formatDateToIndonesian";
import DeleteUser from "./_delete";
import PermissionUser from "./_permission";
import UpdateUser from "./_update";

interface ListUserProps {
  users: Users[];
}

const ListUser: React.FC<ListUserProps> = ({ users }) => {
  return <ListUserComponent list={users} />;
};

const ListUserComponent = ({ list }: { list: Users[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Role</th>
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
              <td>{data.nama}</td>
              <td>{data.email}</td>
              <td className="badge badge-info text-white">{data.role_name}</td>
              <td>{formatDateToIndonesian(data.created_at)}</td>
              <td>{formatDateToIndonesian(data.updated_at)}</td>
              <td className="flex">
                <UpdateUser data={data} />
                <DeleteUser id={data.id.toString()} />
                <PermissionUser data={data} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUser;
