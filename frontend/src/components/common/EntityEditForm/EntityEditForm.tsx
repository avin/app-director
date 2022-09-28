import React, { useCallback, useMemo, useState } from 'react';
import styles from './EntityEditForm.module.scss';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { FieldValues, useForm } from 'react-hook-form';
import { setFormState } from '@/store/reducers/ui';
import FormErrorMessage from '@/components/common/FormErrorMessage/FormErrorMessage';
import InputContainer from '@/components/common/InputContainer/InputContainer';
import ApplicationCategorySelect from '@/components/entities/applicationCategory/ApplicationCategorySelect/ApplicationCategorySelect';
import ControlledTextInput from '@/components/common/ControlledTextInput/ControlledTextInput';
import { Button, Intent } from '@blueprintjs/core';
import { FieldConfig } from '@/types';

interface Props {
  name: string;
  onSubmit: (data: FieldValues) => Promise<void> | void;
  fields: FieldConfig[];
  defaultValues: FieldValues;
}

const EntityEditForm = ({ name, onSubmit, fields, defaultValues }: Props) => {
  const [isInProgress, setIsInProgress] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch: AppThunkDispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { isSubmitted, errors },
  } = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues,
  });

  const processSubmit = useCallback(
    async (data: FieldValues) => {
      if (isInProgress) {
        return;
      }

      dispatch(setFormState({ formName: name, formState: data }));

      try {
        setErrorMessage(null);
        setIsInProgress(true);
        await onSubmit(data);
      } catch (error) {
        console.warn(error);

        const errorMessage = 'Запрос выполнен неуспешно, попробуйте еще раз';
        setErrorMessage(errorMessage);
      } finally {
        setIsInProgress(false);
      }
    },
    [dispatch, isInProgress, name, onSubmit],
  );

  const processSubmitError = useCallback((submitErrors) => {
    console.warn(submitErrors);
  }, []);

  const handleFormSubmit = useMemo(
    () => handleSubmit(processSubmit, processSubmitError),
    [handleSubmit, processSubmit, processSubmitError],
  );

  return (
    <form id={name} onSubmit={handleFormSubmit}>
      <FormErrorMessage message={errorMessage} />

      {fields.map((field) => {
        switch (field.type) {
          case 'text': {
            return (
              <InputContainer
                key={field.name}
                label={field.label}
                error={isSubmitted && errors[field.name]?.message}
              >
                <ControlledTextInput name={field.name} control={control} />
              </InputContainer>
            );
          }
          case 'relation-select': {
            return (
              <InputContainer
                key={field.name}
                label="Категория приложения"
                error={isSubmitted && errors[field.name]?.message}
              >
                <ApplicationCategorySelect
                  name={field.name}
                  control={control}
                />
              </InputContainer>
            );
          }
          default:
            return null;
        }
      })}

      <div className={styles.controls}>
        <Button
          type="submit"
          loading={isInProgress}
          intent={Intent.SUCCESS}
          icon="floppy-disk"
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default EntityEditForm;
