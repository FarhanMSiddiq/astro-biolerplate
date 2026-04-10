"use server";
import { apiClient } from "../../../lib/apiClient";

export async function login(formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await apiClient.post("login", data);

    if (response.status != 200) {
      return {
        status: response.status,
        message: response.data.err.detail,
      };
    }

    return {
      status: 200,
      message: response.data.message,
      data: response.data.data,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      status: error.response?.status ?? 400,
      message:
        error.response?.data?.message ??
        error.response?.data?.error?.detail ??
        "Failed to login",
    };
  }
}
