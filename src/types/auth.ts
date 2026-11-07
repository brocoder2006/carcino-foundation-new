export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  readArticles: string[];
  signUp: (email: string, pass: string, fullName: string) => Promise<{ success: boolean; error?: string; requiresEmailConfirmation?: boolean }>;
  signIn: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signInWithOAuth: (provider?: "google") => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  isPasswordRecovery: boolean;
  setIsPasswordRecovery: (isRecovery: boolean) => void;
  signOut: () => Promise<void>;
  markArticleAsRead: (articleId: string, title?: string) => Promise<boolean>;
  isArticleRead: (articleId: string) => boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isSupabaseConnected: boolean;
}
