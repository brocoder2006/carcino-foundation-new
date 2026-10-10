"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuth } from "@/lib/auth";
import { Settings, User as UserIcon, Shield, Database, Cloud } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div>
      <DashboardHeader
        title="Settings & System Configuration"
        subtitle="Manage platform parameters, API service credentials, and profile preferences"
      />

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {savedSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold">
            Settings updated successfully!
          </div>
        )}

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
