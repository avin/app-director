export type LogInFormInputs = {
  email: string;
  password: string;
  remember: boolean;
};

export type ApplicationEditFormInputs = {
  title: string;
  description: string;
  applicationCategoryId: string;
};

export type ApplicationCategoryEditFormInputs = {
  title: string;
  description: string;
};

export type StandEditFormInputs = {
  title: string;
  description: string;
  applicationId: string;
  organizationId: string;
};

export type StandCategoryEditFormInputs = {
  title: string;
  description: string;
};

export type OrganizationEditFormInputs = {
  title: string;
  description: string;
};
