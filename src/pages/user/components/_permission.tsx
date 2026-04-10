"use client";

import React, { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { FaSave, FaUnlockAlt } from "react-icons/fa";
import type { Permission } from "../../../types/permission";
import type { Users } from "../../../types/users";
import { capitalizeWords } from "../../../utils/capitalizeWords";
import { getPermission } from "../../permission/actions/list";
import { changePermissions } from "../actions/permission";

interface PermisionUserProps {
  data: Users;
}

const PermisionUser: React.FC<PermisionUserProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [permission, setPermission] = useState<Permission[]>([]);

  const fetchAllPermission = async () => {
    const response = await getPermission();
    if (response.status === 200) {
      const data = response.data;
      setPermission(data);
    }
  };

  useEffect(() => {
    if (permission.length === 0 && isOpen) {
      fetchAllPermission();
    }
  }, [isOpen, permission]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const selectedPermissions = permission
      .filter((perm) => formData.get(perm.code) === "on")
      .map((perm) => perm.id);

    const changePermission = await changePermissions(
      data.id,
      selectedPermissions,
    );

    if (changePermission.status == 200) {
      const event = new CustomEvent("triggerActions", {
        detail: { message: changePermission?.message, status: "success" },
      });
      window.dispatchEvent(event);
    } else {
      const event = new CustomEvent("triggerActions", {
        detail: { message: changePermission?.message, status: "error" },
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-orange-600 text-white hover:bg-orange-700 btn-sm rounded-md font-medium py-2"
      >
        <FaUnlockAlt />
        Permission
      </Button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="font-semibold text-lg flex items-center">
              <FaUnlockAlt size={20} className="mr-2" /> Permission User
            </h2>
            <hr className="mt-3 mb-5 -mx-6" />
            <form onSubmit={handleSubmit}>
              {permission.map((value) => {
                return (
                  <div className="form-control" key={value.id}>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        {capitalizeWords(value.name)}
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={data.permissions.some(
                          (p) => p.id === value.id,
                        )}
                        className="checkbox checkbox-primary"
                        name={value.code}
                      />
                    </label>
                  </div>
                );
              })}
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

export default PermisionUser;
