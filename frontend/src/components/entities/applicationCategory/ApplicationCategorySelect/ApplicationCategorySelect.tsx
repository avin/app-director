import React, { useCallback, useState } from 'react';
import { Button, Intent, TagInput } from '@blueprintjs/core';
import ApplicationCategoriesCatalogue from '@/components/entities/applicationCategory/ApplicationCategoriesCatalogue/ApplicationCategoriesCatalogue';
import { FieldValues, Path } from 'react-hook-form/dist/types';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import styles from './ApplicationCategoryCategorySelect.module.scss';
import config from '@/config';
import ChooseEntityDialog from '@/components/common/ChooseEntityDialog/ChooseEntityDialog';
import ApplicationCategoryLabel from '../ApplicationCategoryLabel/ApplicationCategoryLabel';

interface Props<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions;
}

const ApplicationCategoryCategorySelect = <TFieldValues,>({ name, control, rules }: Props<TFieldValues>) => {
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
        inputProps={{ readOnly: true }}
        leftIcon={config.defaultIcons.applicationCategory}
        onChange={handleChange}
        placeholder="Выбрать приложение..."
        rightElement={<Button icon="more" minimal={false} onClick={openChooseDialog} intent={Intent.PRIMARY} />}
        values={value ? [<ApplicationCategoryLabel applicationCategoryId={value as string} />] : []}
      />
      <ChooseEntityDialog isOpen={isOpenChooseDialog} onClose={closeChooseDialog}>
        <ApplicationCategoriesCatalogue
          viewHeaderProps={{
            title: 'Выбрать приложение',
            onClose: closeChooseDialog,
          }}
          columns={['title', 'description', 'applicationsCount']}
          onClickRow={handleClickCatalogueRow}
        />
      </ChooseEntityDialog>
    </>
  );
};

export default ApplicationCategoryCategorySelect;
