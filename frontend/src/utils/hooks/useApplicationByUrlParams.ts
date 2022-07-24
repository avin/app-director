import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { applicationByIdSelector } from '@/store/selectors';
import { Application } from '@/types';

export const useApplicationByUrlParams = () => {
  const id = useParams().id as string;
  const application = useSelector((state: RootState) => applicationByIdSelector(state, id));

  return application;
};
