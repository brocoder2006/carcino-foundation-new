"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuth } from "@/lib/auth";
import { changePasswordApi } from "@/lib/api";
import { Settings, User as UserIcon, Shield, Database, Cloud, KeyRound, CheckCircle2, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword.length < 10) {
      setPasswordStatus({ type: "error", message: "New password must be at least 10 characters long." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: "error", message: "New passwords do not match." });
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await changePasswordApi({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      });
      setPasswordStatus({ type: "success", message: res.message || "Password updated successfully!" });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPasswordStatus({
        type: "error",
        message: err.message || "Failed to update password. Please check your current password.",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div>
      <DashboardHeader
        title="Settings & System Configuration"
        subtitle="Manage platform parameters, API service credentials, and profile preferences"
      />

      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        {/* User Account Info Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-blue-600" />
            Your Editorial Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase">Username</span>
              <p className="font-bold text-slate-900">{user?.username}</p>
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase">Email</span>
              <p className="font-bold text-slate-900">{user?.email}</p>
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase">System Role</span>
              <span className="inline-block text-xs font-extrabold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full mt-0.5">
                {user?.role}
              </span>
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase">Member Since</span>
              <p className="font-semibold text-slate-700">{user?.date_joined ? new Date(user.date_joined).toLocaleDateString() : "Active"}</p>
            </div>
          </div>
        </div>

        {/* Security & Password Change Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-indigo-600" />
              Security & Credential Management
            </h2>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-600" />
              Lockout Protection Active
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Keep your account safe from unauthorized access. Enter your current password and set a strong new password (minimum 10 characters).
          </p>

          {passwordStatus && (
            <div
              className={`p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 ${
                passwordStatus.type === "success"
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              {passwordStatus.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              )}
              <span>{passwordStatus.message}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter current password"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Min. 10 characters"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Re-enter new password"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isChangingPassword}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all text-sm flex items-center gap-2 disabled:opacity-50"
              >
                <Shield className="w-4 h-4" />
                <span>{isChangingPassword ? "Updating..." : "Update Password"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* External Services Configuration status */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-purple-600" />
            Connected Infrastructure Services
          </h2>

          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">Django REST API Backend</p>
                <p className="text-xs text-slate-500 font-mono">http://127.0.0.1:8000/api/v1/</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                Connected
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">PostgreSQL (Neon Production Ready)</p>
                <p className="text-xs text-slate-500 font-mono">DATABASE_URL enabled via dj_database_url</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                Configured
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">Cloudinary Media Storage</p>
                <p className="text-xs text-slate-500">Secure uploads & image validation via Pillow</p>
              </div>
              <span className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
