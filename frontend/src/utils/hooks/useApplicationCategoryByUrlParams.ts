import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { applicationCategoryByIdSelector } from '@/store/selectors';

export const useApplicationCategoryByUrlParams = () => {
  const id = useParams().id as string;
  const application = useSelector((state: RootState) =>
    applicationCategoryByIdSelector(state, id),
  );

  return application;
};
