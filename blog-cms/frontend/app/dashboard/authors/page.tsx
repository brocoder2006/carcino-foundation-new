"use client";

import React, { useEffect, useState } from "react";
import { getUsersApi, createUserApi, updateUserApi } from "@/lib/api";
import { User, UserRole } from "@/lib/types";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuth } from "@/lib/auth";
import { Users, Shield, UserCheck, UserX, X, Plus } from "lucide-react";

export default function AuthorsPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("AUTHOR");
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res: any = await getUsersApi();
      setUsers(res.results || res);
    } catch (err: any) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openCreateModal = () => {
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("author123");
    setRole("AUTHOR");
    setError(null);
    setModalOpen(true);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await createUserApi({
        username: username.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password: password,
        role: role,
      });
      setModalOpen(false);
      fetchUsers();
    } catch (err: any) {
      setError(err.message || "Failed to create author.");
    }
  };

  const handleRoleChange = async (u: User, newRole: UserRole) => {
    if (u.id === currentUser?.id) {
      alert("You cannot modify your own primary role.");
      return;
    }
    try {
      await updateUserApi(u.id, { role: newRole });
      fetchUsers();
    } catch (err: any) {
      alert(err.message || "Failed to update role");
    }
  };

  const toggleActive = async (u: User) => {
    if (u.id === currentUser?.id) {
      alert("You cannot deactivate yourself.");
      return;
    }
    try {
      await updateUserApi(u.id, { is_active: !u.is_active });
      fetchUsers();
    } catch (err: any) {
      alert(err.message || "Failed to update user status");
    }
  };

  if (currentUser?.role !== "ADMIN" && currentUser?.role !== "EDITOR") {
    return (
      <div className="p-8 text-center space-y-2">
        <h2 className="text-xl font-bold text-red-600">Access Denied</h2>
        <p className="text-sm text-slate-500">Only Administrator or Editor role users can manage team authors and accounts.</p>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader
        title="Authors & Roles Management"
        subtitle="Manage editorial permissions and create author accounts across the system"
        action={{
          label: "Create New Author",
          onClick: openCreateModal,
        }}
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <p className="text-sm text-slate-400 py-16 text-center">Loading team members...</p>
          ) : users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-3.5 px-4">Author Name</th>
                    <th className="py-3.5 px-4">Email</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                          {u.first_name?.[0] || u.username[0].toUpperCase()}
                        </div>
                        <div>
                          <p>{u.first_name ? `${u.first_name} ${u.last_name || ""}`.trim() : u.username}</p>
                          <p className="text-xs text-slate-400 font-normal">@{u.username}</p>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-slate-600">{u.email}</td>

                      <td className="py-3.5 px-4">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u, e.target.value as UserRole)}
                          disabled={u.id === currentUser?.id || currentUser?.role !== "ADMIN"}
                          className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-2.5 py-1 text-slate-800 disabled:opacity-50"
                        >
                          <option value="ADMIN">ADMIN</option>
                          <option value="EDITOR">EDITOR</option>
                          <option value="AUTHOR">AUTHOR</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                            u.is_active
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {u.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => toggleActive(u)}
                          disabled={u.id === currentUser?.id || currentUser?.role !== "ADMIN"}
                          className={`inline-flex items-center gap-1 font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40 ${
                            u.is_active
                              ? "bg-red-50 text-red-600 hover:bg-red-100"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          }`}
                        >
                          {u.is_active ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                          {u.is_active ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm text-slate-400 font-medium">No author accounts found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Author Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateUser} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Create New Author Account</h3>
              <button type="button" onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl">{error}</div>}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Dr. Jane"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Smith"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="janesmith"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@carcinofoundation.org"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Role Permission
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 font-medium"
              >
                <option value="AUTHOR">AUTHOR (Can create & manage own posts)</option>
                <option value="EDITOR">EDITOR (Can manage & publish all posts)</option>
                <option value="ADMIN">ADMIN (Full system access & team management)</option>
              </select>
            </div>


            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
