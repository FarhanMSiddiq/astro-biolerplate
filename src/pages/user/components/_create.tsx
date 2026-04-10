"use client";

import React, { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { FaSave } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import Select from "react-select";
import { z } from "zod";
import { getRole } from "../../role/actions/list";
import { create } from "../actions/create";

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
      .min(8, { message: "Password harus memiliki minimal 8 karakter" }),
    confirm_password: z
      .string()
      .min(8, { message: "Password harus memiliki minimal 8 karakter" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Konfirmasi password tidak sesuai dengan password anda.",
    path: ["confirm_password"],
  });

const CreateUser: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errZod, setErrZod] = useState<z.ZodError>();
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

      const createData = await create(formData);

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
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">List Users</h1>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-blue-900 text-white hover:bg-blue-800 btn-sm rounded-md font-medium py-2"
        >
          <IoMdAddCircle />
          Tambah Data
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="font-semibold text-lg flex items-center">
              <MdOutlineCreateNewFolder size={20} className="mr-2" /> Tambah
              User
            </h2>
            <hr className="mt-3 mb-5 -mx-6" />
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col relative mb-3">
                <label className="text-sm font-medium mb-1">
                  Nama <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  placeholder="jhon doe"
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
                <label className="text-sm font-medium mb-1">
                  Password<span className="text-red-500">*</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="*********************"
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
                  Konfirmasi Password<span className="text-red-500">*</span>
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="*********************"
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

export default CreateUser;
