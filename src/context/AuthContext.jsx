import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Registered Database (Only authorized accounts can log in)
 */
export const REGISTERED_ACCOUNTS = [
  {
    email: 'demo@hushlush.com',
    passwordHash: 'Password123',
    name: 'Sarah Jenkins',
    role: 'VIP Diner',
    table: 'Table 13',
    pax: 4,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  },
  {
    email: 'admin@hushlush.com',
    passwordHash: 'HushLush2026!',
    name: 'Marcus Vance',
    role: 'Restaurant Manager',
    table: 'Table 01',
    pax: 2,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
];

export const DEMO_CREDENTIALS = {
  email: 'demo@hushlush.com',
  password: 'Password123',
};

const STORAGE_KEY = 'hush_lush_auth_user';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate persisted user session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading stored user:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  /**
   * Strict Authentication Flow:
   * Only accepts registered email & password. Rejects any other email.
   */
  const login = async (email, password) => {
    setIsLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);

        const cleanEmail = (email || '').trim().toLowerCase();

        // 1. Check if email exists in authorized database
        const registered = REGISTERED_ACCOUNTS.find(
          (acc) => acc.email.toLowerCase() === cleanEmail
        );

        if (!registered) {
          resolve({
            success: false,
            error: `Access Denied: No account found with email "${cleanEmail}".`,
          });
          return;
        }

        // 2. Check if password matches
        if (registered.passwordHash !== password) {
          resolve({
            success: false,
            error: 'Incorrect password. Please verify your credentials and try again.',
          });
          return;
        }

        // 3. Authenticate successfully
        const authenticatedUser = {
          id: 'user_' + Math.random().toString(36).substring(2, 9),
          name: registered.name,
          email: registered.email,
          isGuest: false,
          avatar: registered.avatar,
          table: registered.table,
          pax: registered.pax,
        };

        saveUser(authenticatedUser);
        resolve({ success: true });
      }, 700);
    });
  };

  /**
   * Guest Access:
   * Grants immediate access to table ordering without requiring personal credentials.
   */
  const loginAsGuest = () => {
    const guestUser = {
      id: 'guest_' + Math.random().toString(36).substring(2, 9),
      name: 'Guest Diner',
      isGuest: true,
      table: 'Table 13',
      pax: 4,
    };
    saveUser(guestUser);
  };

  /**
   * Social Login Mocking:
   */
  const loginWithSocial = async (provider) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const providerNames = {
      facebook: 'Facebook Diner',
      telegram: 'Telegram Diner',
      google: 'Google Diner',
    };

    const socialUser = {
      id: `${provider}_` + Math.random().toString(36).substring(2, 9),
      name: providerNames[provider] || 'Social User',
      email: `${provider}.user@social.com`,
      isGuest: false,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      table: 'Table 13',
      pax: 4,
    };
    saveUser(socialUser);
    setIsLoading(false);
  };

  const logout = () => {
    saveUser(null);
  };

  const updateTable = (table, pax) => {
    if (user) {
      const updated = { ...user, table, pax };
      saveUser(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginAsGuest,
        loginWithSocial,
        logout,
        updateTable,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
