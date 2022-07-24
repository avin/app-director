import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useApplicationByUrlParams } from '@/utils/hooks/useApplicationByUrlParams';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { EditApplicationFormInputs } from '@/types';
import { setFormState } from '@/store/reducers/ui';
import { Form } from '@/constants/form';
import ControlledTextInput from '@/components/common/ControlledTextInput/ControlledTextInput';
import ControlledTextArea from '@/components/common/ControlledTextArea/ControlledTextArea';
import InputContainer from '@/components/common/InputContainer/InputContainer';
import { Button, Intent } from '@blueprintjs/core';
import FormErrorMessage from '@/components/common/FormErrorMessage/FormErrorMessage';

interface Props {
  id?: string;
  onSubmit: (data: unknown) => Promise<void> | void;
}

const ApplicationEditForm = ({ id = 'application-edit-form', onSubmit }: Props) => {
  const [isInProgress, setIsInProgress] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const application = useApplicationByUrlParams();
  const dispatch: AppThunkDispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { isSubmitted, errors },
  } = useForm<EditApplicationFormInputs>({
    mode: 'onChange',
    defaultValues: {
      title: application?.title || '',
      description: application?.description || '',
    },
  });

  const processSubmit = useCallback(
    async (data) => {
      if (isInProgress) {
        return;
      }

      dispatch(setFormState({ formName: Form.EditApplication, formState: data }));

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
    [dispatch, isInProgress, onSubmit],
  );

  const processSubmitError = useCallback((submitErrors) => {
    console.warn(submitErrors);
  }, []);

  const handleFormSubmit = useMemo(
    () => handleSubmit(processSubmit, processSubmitError),
    [handleSubmit, processSubmit, processSubmitError],
  );

  return (
    <form id={id} onSubmit={handleFormSubmit}>
      <FormErrorMessage message={errorMessage} />

      <InputContainer label="Название" error={isSubmitted && errors.title?.message}>
        <ControlledTextInput name="title" control={control} />
      </InputContainer>

      <InputContainer label="Описание" error={isSubmitted && errors.description?.message}>
        <ControlledTextArea growVertically name="description" control={control} />
      </InputContainer>

      <Button type="submit" loading={isInProgress} intent={Intent.SUCCESS} icon="floppy-disk">
        Сохранить
      </Button>
    </form>
  );
};

export default ApplicationEditForm;
