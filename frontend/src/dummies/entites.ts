import {
  Application,
  ApplicationCategory,
  Organization,
  Stand,
  StandCategory,
} from '@/types';

export const entityCommonProps = {
  id: '00000000-0000-0000-0000-000000000000',
  createdAt: '2000-01-01',
  updatedAt: '2000-01-01',
  properties: null,
};

export const generateApplicationCategory = (
  props?: Partial<ApplicationCategory>,
) => {
  return {
    ...entityCommonProps,
    title: 'ApplicationCategory title',
    description: 'ApplicationCategory description',
    applications: ['00000000-0000-0000-0000-000000000000'],
    ...props,
  };
};

export const generateApplication = (props?: Partial<Application>) => {
  return {
    ...entityCommonProps,
    title: 'Application title',
    description: 'Application description',
    applicationCategoryId: '00000000-0000-0000-0000-000000000000',
    stands: ['00000000-0000-0000-0000-000000000000'],
    ...props,
  };
};

export const generateStandCategory = (props?: Partial<StandCategory>) => {
  return {
    ...entityCommonProps,
    title: 'StandCategory title',
    description: 'StandCategory description',
    stands: ['00000000-0000-0000-0000-000000000000'],
    ...props,
  };
};

export const generateStand = (props?: Partial<Stand>) => {
  return {
    ...entityCommonProps,
    title: 'Stand title',
    description: 'Stand description',
    standCategoryId: '00000000-0000-0000-0000-000000000000',
    applicationId: '00000000-0000-0000-0000-000000000000',
    organizationId: '00000000-0000-0000-0000-000000000000',
    ...props,
  };
};

export const generateOrganization = (props?: Partial<Organization>) => {
  return {
    ...entityCommonProps,
    title: 'Organization title',
    description: 'Organization description',
    stands: ['00000000-0000-0000-0000-000000000000'],
    ...props,
  };
};
