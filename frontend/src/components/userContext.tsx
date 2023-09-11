// userContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Profile } from '../types';  // Assuming types.ts is in the same directory

type UserState = {
  user: User | null;
  profile: Profile | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  // Add more properties as required for Message, Match, Dispute, etc.
};

export const UserContext = createContext<UserState | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  
  // Add more state as required for Message, Match, Dispute, etc.

  return (
    <UserContext.Provider value={{ user, setUser, profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

