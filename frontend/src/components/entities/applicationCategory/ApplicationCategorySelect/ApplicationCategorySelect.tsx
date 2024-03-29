import React, { useCallback, useState } from 'react';
import { Button, Intent, TagInput, TagInputProps } from '@blueprintjs/core';
import ApplicationCategoriesCatalogue from '@/components/entities/applicationCategory/ApplicationCategoriesCatalogue/ApplicationCategoriesCatalogue';
import { FieldValues, Path } from 'react-hook-form/dist/types';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import styles from './ApplicationCategoryCategorySelect.module.scss';
import config from '@/config';
import ChooseEntityDialog from '@/components/common/ChooseEntityDialog/ChooseEntityDialog';
import ApplicationCategoryLabel from '../ApplicationCategoryLabel/ApplicationCategoryLabel';

interface Props<TFieldValues extends FieldValues>
  extends Omit<TagInputProps, 'values'> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions;
}

const ApplicationCategoryCategorySelect = <TFieldValues extends FieldValues>({
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
    (applicationCategoryId: string) => {
      onChange(applicationCategoryId);
      closeChooseDialog();
    },
    [closeChooseDialog, onChange],
  );

  return (
    <>
      <TagInput
        {...props}
        inputProps={{ readOnly: true, onDoubleClick: openChooseDialog }}
        leftIcon={config.defaultIcons.applicationCategory}
        onChange={handleChange}
        placeholder="Выбрать категорию приложения..."
        rightElement={
          <Button
            icon="more"
            minimal={false}
            onClick={openChooseDialog}
            intent={Intent.PRIMARY}
          />
        }
        values={
          value
            ? [
                <ApplicationCategoryLabel
                  applicationCategoryId={value as string}
                />,
              ]
            : []
        }
      />
      <ChooseEntityDialog
        isOpen={isOpenChooseDialog}
        onClose={closeChooseDialog}
      >
        <ApplicationCategoriesCatalogue
          viewHeaderProps={{
            title: 'Выбрать категорию приложения',
            onClose: closeChooseDialog,
          }}
          onClickRow={handleClickCatalogueRow}
        />
      </ChooseEntityDialog>
    </>
  );
};

export default ApplicationCategoryCategorySelect;
