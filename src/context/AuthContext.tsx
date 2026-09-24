"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  readArticles: string[];
  signUp: (email: string, pass: string, fullName: string) => Promise<{ success: boolean; error?: string; requiresEmailConfirmation?: boolean }>;
  signIn: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signInWithOAuth: (provider?: "google") => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  markArticleAsRead: (articleId: string, title?: string) => Promise<boolean>;
  isArticleRead: (articleId: string) => boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isSupabaseConnected: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [readArticles, setReadArticles] = useState<string[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Initialize session and local storage fallback
  useEffect(() => {
    // 1. Load local read articles storage
    try {
      const storedRead = localStorage.getItem("carcino_read_articles");
      if (storedRead) {
        setReadArticles(JSON.parse(storedRead));
      }
      const storedUser = localStorage.getItem("carcino_demo_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Local storage error:", e);
    }

    // 2. Load Supabase session if configured
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const u: UserProfile = {
            id: session.user.id,
            email: session.user.email || "",
            fullName: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
          };
          setUser(u);
          fetchReadArticlesFromSupabase(session.user.id);
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const u: UserProfile = {
            id: session.user.id,
            email: session.user.email || "",
            fullName: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
          };
          setUser(u);
          fetchReadArticlesFromSupabase(session.user.id);
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch user read articles from Supabase PostgreSQL
  const fetchReadArticlesFromSupabase = async (userId: string) => {
    if (!isSupabaseConfigured) return;
    try {
      const { data, error } = await supabase
        .from("user_read_articles")
        .select("article_id")
        .eq("user_id", userId);

      if (!error && data) {
        const ids = data.map((item: { article_id: string }) => item.article_id);
        setReadArticles(ids);
        localStorage.setItem("carcino_read_articles", JSON.stringify(ids));
      }
    } catch (err) {
      console.error("Failed to fetch read articles:", err);
    }
  };

  const signUp = async (email: string, pass: string, fullName: string) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: { full_name: fullName },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        const u: UserProfile = {
          id: data.user.id,
          email: data.user.email || email,
          fullName: fullName,
        };
        if (data.session) {
          setUser(u);
        }
        const requiresConfirmation = !data.session && Boolean(data.user);
        return { success: true, requiresEmailConfirmation: requiresConfirmation };
      }
      return { success: true };
    } else {
      // Demo authentication mode
      const demoUser: UserProfile = {
        id: "demo-" + Date.now(),
        email,
        fullName,
      };
      setUser(demoUser);
      localStorage.setItem("carcino_demo_user", JSON.stringify(demoUser));
      return { success: true };
    }
  };

  const signIn = async (email: string, pass: string) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        const u: UserProfile = {
          id: data.user.id,
          email: data.user.email || email,
          fullName: data.user.user_metadata?.full_name || email.split("@")[0],
        };
        setUser(u);
        fetchReadArticlesFromSupabase(data.user.id);
      }
      return { success: true };
    } else {
      // Demo authentication mode
      const demoUser: UserProfile = {
        id: "demo-user-1",
        email,
        fullName: email.split("@")[0],
      };
      setUser(demoUser);
      localStorage.setItem("carcino_demo_user", JSON.stringify(demoUser));
      return { success: true };
    }
  };

  const signInWithOAuth = async (provider: "google" = "google") => {
    if (isSupabaseConfigured) {
      const redirectUrl = typeof window !== "undefined" ? window.location.origin : undefined;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        if (error.message.includes("not enabled") || error.message.includes("validation_failed")) {
          return {
            success: false,
            error: "Google authentication is not enabled in your Supabase Dashboard yet. Please enable Google in Supabase -> Authentication -> Providers, or sign in with Email & Password below.",
          };
        }
        return { success: false, error: error.message };
      }
      return { success: true };
    } else {
      // Demo social authentication
      const demoUser: UserProfile = {
        id: `demo-google-${Date.now()}`,
        email: `demo_google@carcino.org`,
        fullName: "Google User",
      };
      setUser(demoUser);
      localStorage.setItem("carcino_demo_user", JSON.stringify(demoUser));
      return { success: true };
    }
  };

  const resetPassword = async (email: string) => {
    if (isSupabaseConfigured) {
      const redirectUrl = typeof window !== "undefined" ? `${window.location.origin}/login` : undefined;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } else {
      return { success: true };
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem("carcino_demo_user");
  };

  const markArticleAsRead = async (articleId: string, title?: string): Promise<boolean> => {
    const alreadyRead = readArticles.includes(articleId);
    let updated: string[];

    if (alreadyRead) {
      updated = readArticles.filter((id) => id !== articleId);
    } else {
      updated = [...readArticles, articleId];
    }

    setReadArticles(updated);
    localStorage.setItem("carcino_read_articles", JSON.stringify(updated));

    // Sync with Supabase PostgreSQL if user is logged in
    if (user && isSupabaseConfigured) {
      try {
        if (alreadyRead) {
          await supabase
            .from("user_read_articles")
            .delete()
            .eq("user_id", user.id)
            .eq("article_id", articleId);
        } else {
          await supabase.from("user_read_articles").upsert({
            user_id: user.id,
            article_id: articleId,
            article_title: title || articleId,
            read_at: new Date().toISOString(),
          });
        }
      } catch (err) {
        console.error("Error saving read status to Supabase:", err);
      }
    }

    return !alreadyRead;
  };

  const isArticleRead = (articleId: string): boolean => {
    return readArticles.includes(articleId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        readArticles,
        signUp,
        signIn,
        signInWithOAuth,
        resetPassword,
        signOut,
        markArticleAsRead,
        isArticleRead,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isSupabaseConnected: isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
