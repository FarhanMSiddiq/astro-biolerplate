import { apiClient } from "../../../lib/apiClient";

export async function update(formData: FormData) {
  const data = {
    id: formData.get("id"),
    name: formData.get("nama"),
  };

  try {
    const response = await apiClient.patch("role/update", data);

    if (response.status != 200) {
      return {
        status: response.status,
        message: response.data.err.detail,
      };
    }

    return {
      status: 200,
      message: "Role updated successfully",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      status: error.response?.status ?? 400,
      message: error.response?.data?.error?.detail ?? "Failed to updated role",
    };
  }
}
