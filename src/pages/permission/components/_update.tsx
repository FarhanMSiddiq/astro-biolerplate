"use client";

import React, { useState } from "react";
import { Button } from "react-daisyui";
import { FaEdit, FaSave } from "react-icons/fa";
import Swal from "sweetalert2";
import { z } from "zod";
import type { Permission } from "../../../types/permission";
import { checkPermission } from "../actions/checkData";
import { update } from "../actions/update";

interface UpdatePermissionProps {
  data: Permission;
}

const userSchema = z.object({
  nama: z
    .string()
    .min(1, { message: "Nama Permission tidak boleh kosong" })
    .max(30, { message: "Maksimal 30 karakter" }),
  code: z
    .string()
    .min(1, { message: "Code Permission tidak boleh kosong" })
    .max(50, { message: "Maksimal 50 karakter" }),
});

const UpdatePermission: React.FC<UpdatePermissionProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errZod, setErrZod] = useState<z.ZodError>();
  const [newNama, setNewNama] = useState(data.name);
  const [newCode, setNewCode] = useState(data.code);

  const handleCheckData = async () => {
    const check = await checkPermission(data.id.toString());

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
        text: "Permission tidak dapat di edit karna sudah digunakan user",
        icon: "warning",
        confirmButtonText: "Oke",
      });
    }

    setIsOpen(true);
    return;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const formValues = {
      nama: formData.get("nama"),
      code: formData.get("code"),
    };

    try {
      userSchema.parse(formValues);
      setErrZod(undefined);

      const createData = await update(formData);

      setIsOpen(false);

      if (createData.status == 200) {
        const event = new CustomEvent("triggerActions", {
          detail: { message: createData?.message, status: "success" },
        });
        window.dispatchEvent(event);
      } else {
        const event = new CustomEvent("triggerActions", {
          detail: { message: createData?.message, status: "error" },
        });
        window.dispatchEvent(event);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrZod(err);
      }
    }
  };

  return (
    <div>
      <Button
        onClick={() => handleCheckData()}
        className="bg-blue-900 text-white hover:bg-blue-800 btn-sm rounded-md font-medium py-2"
      >
        <FaEdit />
        Edit
      </Button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="font-semibold text-lg flex items-center">
              <FaEdit size={20} className="mr-2" /> Edit Permission
            </h2>
            <hr className="mt-3 mb-5 -mx-6" />
            <form onSubmit={handleSubmit}>
              <input type="hidden" value={data.id} name="id" />
              <div className="flex flex-col relative mb-3">
                <label className="text-sm font-medium mb-1">
                  Nama Permission <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  placeholder="access menu"
                  value={newNama}
                  onChange={(event) => setNewNama(event.target.value)}
                  className={`input input-bordered w-full font-medium ${
                    errZod?.errors.some((item) => item.path.includes("nama"))
                      ? "input-error"
                      : ""
                  }`}
                />
                {errZod?.errors.some((item) => item.path.includes("nama")) && (
                  <p className="text-xs text-red-500 mt-2">
                    {
                      errZod.errors[
                        errZod?.errors.findIndex((item) =>
                          item.path.includes("nama"),
                        )
                      ].message
                    }
                  </p>
                )}
              </div>

              <div className="flex flex-col relative mb-3">
                <label className="text-sm font-medium mb-1">
                  Code Permission <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="code"
                  placeholder="can_access_menu"
                  value={newCode}
                  onChange={(event) => setNewCode(event.target.value)}
                  className={`input input-bordered w-full font-medium ${
                    errZod?.errors.some((item) => item.path.includes("code"))
                      ? "input-error"
                      : ""
                  }`}
                />
                {errZod?.errors.some((item) => item.path.includes("code")) && (
                  <p className="text-xs text-red-500 mt-2">
                    {
                      errZod.errors[
                        errZod?.errors.findIndex((item) =>
                          item.path.includes("code"),
                        )
                      ].message
                    }
                  </p>
                )}
              </div>

              <div className="modal-action">
                <Button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-outline"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-900 text-white hover:bg-blue-800"
                >
                  Simpan <FaSave />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePermission;
