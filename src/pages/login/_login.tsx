import Cookies from "js-cookie";
import React, { useState } from "react";
import { Button } from "react-daisyui";
import { FaRocket } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { z } from "zod";
import type { Permission } from "../../types/permission";
import type { Role } from "../../types/role";
import type { Users } from "../../types/users";
import { login } from "./actions/login";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email tidak boleh kosong" })
    .max(100, { message: "Maksimal 100 karakter" }),
  password: z
    .string()
    .min(8, { message: "Password harus memiliki minimal 8 karakter" }),
});

const Login = () => {
  const [errZod, setErrZod] = useState<z.ZodError>();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const formValues = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      loginSchema.parse(formValues);
      setErrZod(undefined);

      const createData = await login(formData);

      if (createData.status == 200) {
        const allCookies = Cookies.get();
        Object.keys(allCookies).forEach((cookieName) => {
          Cookies.remove(cookieName);
        });

        const user = createData.data.user as Users;
        const permission = createData.data.permission as Permission[];
        const role = createData.data.role as Role;

        Cookies.set("id", user.id.toString(), {
          path: "/",
          httpOnly: false,
          secure: true,
          sameSite: "strict",
          expires: 1,
        });

        Cookies.set("nama", user.nama, {
          path: "/",
          httpOnly: false,
          secure: true,
          sameSite: "strict",
          expires: 1,
        });

        Cookies.set("email", user.email, {
          path: "/",
          httpOnly: false,
          secure: false,
          sameSite: "strict",
          expires: 1,
        });

        Cookies.set("permission", JSON.stringify(permission), {
          path: "/",
          httpOnly: false,
          secure: false,
          sameSite: "strict",
          expires: 1,
        });

        Cookies.set("role", JSON.stringify(role), {
          path: "/",
          httpOnly: false,
          secure: false,
          sameSite: "strict",
          expires: 1,
        });

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 p-4">
      <div className="card w-full max-w-md shadow-xl bg-white">
        <div className="card-body">
          <div className="flex justify-center mb-4">
            <FaRocket className="text-6xl text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Selamat Datang
          </h2>
          <p className="text-center text-gray-600 mb-4">
            Silakan masuk untuk melanjutkan
          </p>
          <form onSubmit={handleSubmit}>
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

            {/* Password */}
            <div className="flex flex-col relative mb-3">
              <label className="text-sm font-medium mb-1">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="*********************"
                className={`input input-bordered w-full font-medium ${
                  errZod?.errors.some((item) => item.path.includes("password"))
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
            <div className="form-control mt-4">
              <Button
                type="submit"
                className="btn bg-blue-700 text-white hover:bg-blue-900"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
