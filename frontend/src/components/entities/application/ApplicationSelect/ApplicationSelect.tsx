import React, { useCallback, useState } from 'react';
import { Button, Intent, TagInput, TagInputProps } from '@blueprintjs/core';
import ApplicationLabel from '../ApplicationLabel/ApplicationLabel';
import ApplicationsCatalogue from '@/components/entities/application/ApplicationsCatalogue/ApplicationsCatalogue';
import { FieldValues, Path } from 'react-hook-form/dist/types';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import config from '@/config';
import ChooseEntityDialog from '@/components/common/ChooseEntityDialog/ChooseEntityDialog';

interface Props<TFieldValues extends FieldValues>
  extends Omit<TagInputProps, 'values'> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions;
}

const ApplicationSelect = <TFieldValues extends FieldValues>({
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
    (applicationId: string) => {
      onChange(applicationId);
      closeChooseDialog();
    },
    [closeChooseDialog, onChange],
  );

  return (
    <>
      <TagInput
        {...props}
        inputProps={{ readOnly: true, onDoubleClick: openChooseDialog }}
        leftIcon={config.defaultIcons.application}
        onChange={handleChange}
        placeholder="Выбрать приложение..."
        rightElement={
          <Button
            icon="more"
            minimal={false}
            onClick={openChooseDialog}
            intent={Intent.PRIMARY}
          />
        }
        values={
          value ? [<ApplicationLabel applicationId={value as string} />] : []
        }
      />
      <ChooseEntityDialog
        isOpen={isOpenChooseDialog}
        onClose={closeChooseDialog}
      >
        <ApplicationsCatalogue
          viewHeaderProps={{
            title: 'Выбрать приложение',
            onClose: closeChooseDialog,
          }}
          onClickRow={handleClickCatalogueRow}
        />
      </ChooseEntityDialog>
    </>
  );
};

export default ApplicationSelect;
