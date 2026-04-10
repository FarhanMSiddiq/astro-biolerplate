"use client";

import React from "react";
import { Button } from "react-daisyui";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { deleteUser } from "../actions/delete";

interface DeleteUserProps {
  id: string;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ id }) => {
  const handleDelete = async () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteData = await deleteUser(id);
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

export default DeleteUser;
