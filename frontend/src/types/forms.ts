export type LogInFormInputs = {
  email: string;
  password: string;
  remember: boolean;
};

export type EditApplicationFormInputs = {
  title: string;
  description: string;
};

export type EditStandFormInputs = {
  title: string;
  description: string;
  applicationId: string;
};

export type EditOrganizationFormInputs = {
  title: string;
  description: string;
};
