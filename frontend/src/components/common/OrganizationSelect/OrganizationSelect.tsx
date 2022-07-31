import React, { useCallback, useState } from 'react';
import { Button, Dialog, Intent, TagInput } from '@blueprintjs/core';
import ApplicationLabel from '../ApplicationLabel/ApplicationLabel';
import { FieldValues, Path } from 'react-hook-form/dist/types';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import OrganizationsCatalogue from '@/components/common/OrganizationsCatalogue/OrganizationsCatalogue';
import OrganizationLabel from '@/components/common/OrganizationLabel/OrganizationLabel';
import ChooseEntityDialog from '@/components/common/ChooseEntityDialog/ChooseEntityDialog';

interface Props<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions;
}

const OrganizationSelect = <TFieldValues,>({ name, control, rules }: Props<TFieldValues>) => {
  const [isOpenChooseDialog, setIsOpenChooseDialog] = useState(false);

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules,
  });

  const handleChange = (values: React.ReactNode[]) => {
    if (!values.length) {
      onChange('');
    }
  };

  const openChooseDialog = useCallback(() => {
    setIsOpenChooseDialog(true);
  }, []);

  const closeChooseDialog = useCallback(() => {
    setIsOpenChooseDialog(false);
  }, []);

  const handleClickCatalogueRow = useCallback(
    (organizationId: string) => {
      onChange(organizationId);
      closeChooseDialog();
    },
    [closeChooseDialog, onChange],
  );

  return (
    <>
      <TagInput
        inputProps={{ readOnly: true }}
        leftIcon="office"
        onChange={handleChange}
        placeholder="Выбрать организацию..."
        rightElement={<Button icon="more" minimal={false} onClick={openChooseDialog} intent={Intent.PRIMARY} />}
        values={value ? [<OrganizationLabel organizationId={value as string} />] : []}
      />
      <ChooseEntityDialog isOpen={isOpenChooseDialog} onClose={closeChooseDialog} title="Выбрать организацию">
        <OrganizationsCatalogue
          columns={['title', 'description', 'standsCount']}
          onClickRow={handleClickCatalogueRow}
        />
      </ChooseEntityDialog>
    </>
  );
};

export default OrganizationSelect;
