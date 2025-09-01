// User types
export interface User {
  id: string;
  username: string;
  email: string;
}

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Poll types
export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  createdBy: string;
  createdAt: string;
}

export interface CreatePollData {
  title: string;
  description: string;
  options: { text: string }[];
}

export interface VoteData {
  optionId: string;
}