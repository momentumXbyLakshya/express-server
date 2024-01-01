export type UserRegistrationInput = {
  name?: string;
  email: string;
  avatar?: string;
  hankoId: string;
};

export type UpdateUserInput = {
  name: string;
  avatar: string;
};

export type CreateHabitInput = {
  title: string;
  user: string;
  type: number;
  difficulty: number;
  positiveCounter?: number;
  negativeCounter?: number;
  resetCounterType: number;
};

export type UpdateHabitInput = {
  title: string;
  resetCounterType: number;
  type: number;
  difficulty: number;
};
