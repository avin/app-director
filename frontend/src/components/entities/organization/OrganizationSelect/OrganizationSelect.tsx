import React, { useCallback, useState } from 'react';
import {
  Button,
  Dialog,
  Intent,
  TagInput,
  TagInputProps,
} from '@blueprintjs/core';
import ApplicationLabel from '../../application/ApplicationLabel/ApplicationLabel';
import { FieldValues, Path } from 'react-hook-form/dist/types';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import OrganizationsCatalogue from '@/components/entities/organization/OrganizationsCatalogue/OrganizationsCatalogue';
import OrganizationLabel from '@/components/entities/organization/OrganizationLabel/OrganizationLabel';
import ChooseEntityDialog from '@/components/common/ChooseEntityDialog/ChooseEntityDialog';

interface Props<TFieldValues extends FieldValues>
  extends Omit<TagInputProps, 'values'> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions;
}

const OrganizationSelect = <TFieldValues,>({
  name,
  control,
  rules,
  ...props
}: Props<TFieldValues>) => {
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
        {...props}
        inputProps={{ readOnly: true, onDoubleClick: openChooseDialog }}
        leftIcon="office"
        onChange={handleChange}
        placeholder="Выбрать организацию..."
        rightElement={
          <Button
            icon="more"
            minimal={false}
            onClick={openChooseDialog}
            intent={Intent.PRIMARY}
          />
        }
        values={
          value ? [<OrganizationLabel organizationId={value as string} />] : []
        }
      />
      <ChooseEntityDialog
        isOpen={isOpenChooseDialog}
        onClose={closeChooseDialog}
        title="Выбрать организацию"
      >
        <OrganizationsCatalogue
          columns={['title', 'description', 'standsCount']}
          onClickRow={handleClickCatalogueRow}
        />
      </ChooseEntityDialog>
    </>
  );
};

export default OrganizationSelect;
