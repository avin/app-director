import React, { useCallback, useState } from 'react';
import { Button, Dialog, Intent, TagInput } from '@blueprintjs/core';
import ApplicationLabel from '../ApplicationLabel/ApplicationLabel';
import { FieldValues, Path } from 'react-hook-form/dist/types';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import OrganizationsCatalogue from '@/components/common/OrganizationsCatalogue/OrganizationsCatalogue';

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
    (applicationId: string) => {
      onChange(applicationId);
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
        values={value ? [<ApplicationLabel applicationId={value as string} />] : []}
      />
      <Dialog isOpen={isOpenChooseDialog} onClose={closeChooseDialog} title="Выбрать организацию">
        <div>
          <OrganizationsCatalogue
            columns={['title', 'description', 'standsCount']}
            onClickRow={handleClickCatalogueRow}
          />
        </div>
      </Dialog>
    </>
  );
};

export default OrganizationSelect;
