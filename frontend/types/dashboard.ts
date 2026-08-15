export type UserRole = "admin" | "editor";

export interface DashboardUser {
 id: string;
 email: string;
 role: UserRole;
}
