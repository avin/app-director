import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { organizationByIdSelector } from '@/store/selectors';

export const useOrganizationByUrlParams = () => {
  const id = useParams().id as string;
  const organization = useSelector((state: RootState) => organizationByIdSelector(state, id));

  return organization;
};
