import { Application, Organization, Stand } from '@/types';

export const entityCommonProps = {
  id: '00000000-0000-0000-0000-000000000000',
  createdAt: '2000-01-01',
  updatedAt: '2000-01-01',
  properties: null,
};

export const generateApplication = (props?: Partial<Application>) => {
  return {
    ...entityCommonProps,
    title: 'Application title',
    description: 'Application description',
    stands: ['00000000-0000-0000-0000-000000000000'],
    ...props,
  };
};

export const generateStand = (props?: Partial<Stand>) => {
  return {
    ...entityCommonProps,
    title: 'Stand title',
    description: 'Stand description',
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
