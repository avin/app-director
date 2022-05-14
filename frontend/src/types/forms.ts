export enum Form {
  LogIn = 'logIn',
}

export type LogInFormInputs = {
  email: string;
  password: string;
  save: boolean;
};
