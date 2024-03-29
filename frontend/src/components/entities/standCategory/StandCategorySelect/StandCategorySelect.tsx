import React, { useCallback, useState } from 'react';
import { Button, Intent, TagInput, TagInputProps } from '@blueprintjs/core';
import StandCategoriesCatalogue from '@/components/entities/standCategory/StandCategoriesCatalogue/StandCategoriesCatalogue';
import { FieldValues, Path } from 'react-hook-form/dist/types';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import styles from './StandCategoryCategorySelect.module.scss';
import config from '@/config';
import ChooseEntityDialog from '@/components/common/ChooseEntityDialog/ChooseEntityDialog';
import StandCategoryLabel from '../StandCategoryLabel/StandCategoryLabel';

interface Props<TFieldValues extends FieldValues>
  extends Omit<TagInputProps, 'values'> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions;
}

const StandCategoryCategorySelect = <TFieldValues,>({
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
    (standCategoryId: string) => {
      onChange(standCategoryId);
      closeChooseDialog();
    },
    [closeChooseDialog, onChange],
  );

  return (
    <>
      <TagInput
        {...props}
        inputProps={{ readOnly: true, onDoubleClick: openChooseDialog }}
        leftIcon={config.defaultIcons.standCategory}
        onChange={handleChange}
        placeholder="Выбрать категорию стенда..."
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
            ? [<StandCategoryLabel standCategoryId={value as string} />]
            : []
        }
      />
      <ChooseEntityDialog
        isOpen={isOpenChooseDialog}
        onClose={closeChooseDialog}
      >
        <StandCategoriesCatalogue
          viewHeaderProps={{
            title: 'Выбрать категорию стенда',
            onClose: closeChooseDialog,
          }}
          onClickRow={handleClickCatalogueRow}
        />
      </ChooseEntityDialog>
    </>
  );
};

export default StandCategoryCategorySelect;
