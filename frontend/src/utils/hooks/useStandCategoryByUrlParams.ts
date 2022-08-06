import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { standCategoryByIdSelector } from '@/store/selectors';

export const useStandCategoryByUrlParams = () => {
  const id = useParams().id as string;
  const application = useSelector((state: RootState) => standCategoryByIdSelector(state, id));

  return application;
};
