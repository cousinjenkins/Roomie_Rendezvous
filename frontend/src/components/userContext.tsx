import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Profile } from '../types';

type UserState = {
  user: User | null;
  profile: Profile | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
};

export const UserContext = createContext<UserState | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user , setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

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

// Helper function to determine if a profile is complete
export const isProfileComplete = (profile: Profile | null): boolean => {
  if (!profile) return false;

  const requiredFields = ["first_name", "last_name", "gender", "bio", "date_of_birth", "hobbies", "language_spoken", "looking_to_move_date", "pet", "smoker", "university"];
  return requiredFields.every(field => Boolean(profile[field as keyof Profile]));
};

