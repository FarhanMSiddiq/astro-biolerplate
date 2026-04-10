"use client";

import React, { useState } from "react";
import { Button } from "react-daisyui";
import { FaSave } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { z } from "zod";
import { create } from "../actions/create";

const permissionSchema = z.object({
  nama: z
    .string()
    .min(1, { message: "Nama Permission tidak boleh kosong" })
    .max(30, { message: "Maksimal 30 karakter" }),
  code: z
    .string()
    .min(1, { message: "Code Permission tidak boleh kosong" })
    .max(50, { message: "Maksimal 50 karakter" }),
});

const CreatePermission: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errZod, setErrZod] = useState<z.ZodError>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const formValues = {
      nama: formData.get("nama"),
      code: formData.get("code"),
    };

    try {
      permissionSchema.parse(formValues);
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
        <h1 className="text-2xl font-bold mb-4">List Permission</h1>
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
              Permission
            </h2>
            <hr className="mt-3 mb-5 -mx-6" />
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col relative mb-3">
                <label className="text-sm font-medium mb-1">
                  Nama Permission <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  placeholder="access menu"
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

export default CreatePermission;
