import React from "react";
import type { Permission } from "../../../types/permission";
import { formatDateToIndonesian } from "../../../utils/formatDateToIndonesian";
import DeletePermission from "./_delete";
import UpdatePermission from "./_update";

interface ListPermissionProps {
  permission: Permission[];
}

const ListPermission: React.FC<ListPermissionProps> = ({ permission }) => {
  return <ListPermissionComponent list={permission} />;
};

const ListPermissionComponent = ({ list }: { list: Permission[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th>No</th>
            <th>Nama Permission</th>
            <th>Code Permission</th>
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
              <td>{data.code}</td>
              <td>{formatDateToIndonesian(data.created_at)}</td>
              <td>{formatDateToIndonesian(data.updated_at)}</td>
              <td className="flex">
                <UpdatePermission data={data} />
                <DeletePermission id={data.id.toString()} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPermission;
