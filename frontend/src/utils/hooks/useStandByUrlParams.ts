import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { standByIdSelector } from '@/store/selectors';

export const useStandByUrlParams = () => {
  const id = useParams().id as string;
  const stand = useSelector((state: RootState) => standByIdSelector(state, id));

  return stand;
};
