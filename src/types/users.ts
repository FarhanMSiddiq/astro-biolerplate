import type { Permission } from "./permission";

export interface Users {
  id: number;
  nama: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  role_id: number;
  role_name: string;
  permissions: Permission[];
}
