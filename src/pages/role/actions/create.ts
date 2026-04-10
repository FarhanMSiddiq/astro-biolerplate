import { apiClient } from "../../../lib/apiClient";

export async function create(formData: FormData) {
  const data = {
    name: formData.get("nama"),
  };

  try {
    const response = await apiClient.post("role/create", data);

    if (response.status != 200) {
      return {
        status: response.status,
        message: response.data.err.detail,
      };
    }

    return {
      status: 200,
      message: "Role created successfully",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      status: error.response?.status ?? 400,
      message: error.response?.data?.error?.detail ?? "Failed to create role",
    };
  }
}
