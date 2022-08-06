import React, { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import config from '@/config';
import StandsCatalogue from '@/components/entities/stand/StandsCatalogue/StandsCatalogue';

interface Props {}

const NavigateStands = ({}: Props) => {
  const navigate = useNavigate();

  const handleClickRow = useCallback(
    (organizationId: string) => {
      navigate(generatePath(config.routes.stands.view, { id: organizationId }));
    },
    [navigate],
  );

  return (
    <StandsCatalogue
      columns={['standCategory', 'title', 'description', 'application', 'organization']}
      onClickRow={handleClickRow}
    />
  );
};

export default NavigateStands;
