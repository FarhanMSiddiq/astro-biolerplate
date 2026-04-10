"use client";

import React, { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { FaEdit, FaSave } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Select from "react-select";
import { z } from "zod";
import type { Users } from "../../../types/users";
import { getRole } from "../../role/actions/list";
import { update } from "../actions/update";

interface UpdateUserProps {
  data: Users;
}

const userSchema = z
  .object({
    nama: z
      .string()
      .min(1, { message: "Nama tidak boleh kosong" })
      .max(30, { message: "Maksimal 30 karakter" }),
    email: z
      .string()
      .min(1, { message: "Email tidak boleh kosong" })
      .max(100, { message: "Maksimal 100 karakter" }),
    password: z
      .string()
      .min(8, { message: "Password harus memiliki minimal 8 karakter" })
      .optional()
      .or(z.literal("")),
    confirm_password: z
      .string()
      .min(8, { message: "Password harus memiliki minimal 8 karakter" })
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Konfirmasi password tidak sesuai dengan password anda.",
    path: ["confirm_password"],
  });

const UpdateUser: React.FC<UpdateUserProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errZod, setErrZod] = useState<z.ZodError>();
  const [newNama, setNewNama] = useState(data.nama);
  const [newEmail, setNewEmail] = useState(data.email);
  const [newRole, setNewRole] = useState(data.role_id.toString());
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<{ value: string; label: string }[]>([]);

  const fetchAllRole = async () => {
    const response = await getRole();
    if (response.status === 200) {
      const data = response.data;
      setRole(
        data.map((item) => ({
          value: item.id.toString(),
          label: item.name,
        })),
      );
    }
  };

  useEffect(() => {
    if (role.length === 0 && isOpen) {
      fetchAllRole();
    }
  }, [isOpen, role]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const formValues = {
      nama: formData.get("nama"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
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
        onClick={() => setIsOpen(true)}
        className="bg-blue-900 text-white hover:bg-blue-800 btn-sm rounded-md font-medium py-2"
      >
        <FaEdit />
        Edit
      </Button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="font-semibold text-lg flex items-center">
              <FaEdit size={20} className="mr-2" /> Edit User
            </h2>
            <hr className="mt-3 mb-5 -mx-6" />
            <form onSubmit={handleSubmit}>
              <input type="hidden" value={data.id} name="id" />
              <div className="flex flex-col relative mb-3">
                <label className="text-sm font-medium mb-1">
                  Nama <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  placeholder="jhon doe"
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

              {/* Email */}
              <div className="flex flex-col relative mb-3">
                <label className="text-sm font-medium mb-1">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email@address.com"
                  value={newEmail}
                  onChange={(event) => setNewEmail(event.target.value)}
                  className={`input input-bordered w-full font-medium  ${
                    errZod?.errors.some((item) => item.path.includes("email"))
                      ? "input-error"
                      : ""
                  }`}
                />
                {errZod?.errors.some((item) => item.path.includes("email")) && (
                  <p className="text-xs text-red-500 mt-2">
                    {
                      errZod.errors[
                        errZod?.errors.findIndex((item) =>
                          item.path.includes("email"),
                        )
                      ].message
                    }
                  </p>
                )}
              </div>

              <div className="flex flex-col relative mb-3">
                <label className="text-sm font-medium mb-1">
                  Role <span className="text-red-600">*</span>
                </label>
                <Select
                  isClearable
                  className={`w-full ${
                    errZod?.errors.some((item) =>
                      item.path.includes("password"),
                    )
                      ? "border-2 rounded-lg border-red-600"
                      : ""
                  }`}
                  value={
                    role.find((options) => options.value === newRole) ?? null
                  }
                  onChange={(event) => {
                    setNewRole(event?.value as string);
                  }}
                  name="role_id"
                  placeholder="Pilih Role"
                  options={role}
                />
                {errZod?.errors.some((item) => item.path.includes("role")) && (
                  <p className="text-xs text-red-500 mt-2">
                    {
                      errZod.errors[
                        errZod?.errors.findIndex((item) =>
                          item.path.includes("role"),
                        )
                      ].message
                    }
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col relative mb-3">
                <label className="text-sm font-medium mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="*********************"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className={`input input-bordered w-full font-medium ${
                    errZod?.errors.some((item) =>
                      item.path.includes("password"),
                    )
                      ? "input-error"
                      : ""
                  }`}
                  name="password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500"
                >
                  <FaRegEye />
                </button>
                {errZod?.errors.some((item) =>
                  item.path.includes("password"),
                ) && (
                  <p className="text-xs text-red-500 mt-2">
                    {
                      errZod.errors[
                        errZod?.errors.findIndex((item) =>
                          item.path.includes("password"),
                        )
                      ].message
                    }
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col relative">
                <label className="text-sm font-medium mb-1">
                  Konfirmasi Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="*********************"
                  value={newConfirmPassword}
                  onChange={(event) =>
                    setNewConfirmPassword(event.target.value)
                  }
                  className={`input input-bordered w-full font-medium ${
                    errZod?.errors.some((item) =>
                      item.path.includes("confirm_password"),
                    )
                      ? "input-error"
                      : ""
                  }`}
                  name="confirm_password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-gray-500"
                >
                  <FaRegEye />
                </button>
                {errZod?.errors.some((item) =>
                  item.path.includes("confirm_password"),
                ) && (
                  <p className="text-xs text-red-500 mt-2">
                    {
                      errZod.errors[
                        errZod?.errors.findIndex((item) =>
                          item.path.includes("confirm_password"),
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

export default UpdateUser;
