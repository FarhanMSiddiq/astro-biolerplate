"use client";

import React from "react";
import { Button } from "react-daisyui";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { checkPermission } from "../actions/checkData";
import { deletePermission } from "../actions/delete";

interface DeletePermissionProps {
  id: string;
}

const DeletePermission: React.FC<DeletePermissionProps> = ({ id }) => {
  const handleDelete = async () => {
    const check = await checkPermission(id);

    if (check.status != 200) {
      return Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat check data permission",
        icon: "error",
        confirmButtonText: "Oke",
      });
    }

    if (check.data.length > 0) {
      return Swal.fire({
        title: "Peringatan",
        text: "Permission tidak dapat di hapus karna sudah digunakan user",
        icon: "warning",
        confirmButtonText: "Oke",
      });
    }

    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteData = await deletePermission(id);
        if (deleteData.status == 200) {
          const event = new CustomEvent("triggerActions", {
            detail: { message: deleteData?.message, status: "success" },
          });
          window.dispatchEvent(event);
        } else {
          const event = new CustomEvent("triggerActions", {
            detail: { message: deleteData?.message, status: "error" },
          });
          window.dispatchEvent(event);
        }
      }
    });
  };

  return (
    <div>
      <Button
        className="btn-sm bg-red-800 hover:bg-red-900 text-white rounded-md font-medium py-2"
        onClick={handleDelete}
      >
        <RiDeleteBin5Line />
        Hapus
      </Button>
    </div>
  );
};

export default DeletePermission;
