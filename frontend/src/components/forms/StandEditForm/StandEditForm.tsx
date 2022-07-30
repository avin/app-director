import React, { useCallback, useMemo, useState } from 'react';
import { useStandByUrlParams } from '@/utils/hooks/useStandByUrlParams';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { EditStandFormInputs } from '@/types';
import { setFormState } from '@/store/reducers/ui';
import { Form } from '@/constants/form';
import ControlledTextInput from '@/components/common/ControlledTextInput/ControlledTextInput';
import ControlledTextArea from '@/components/common/ControlledTextArea/ControlledTextArea';
import InputContainer from '@/components/common/InputContainer/InputContainer';
import { Button, Intent } from '@blueprintjs/core';
import FormErrorMessage from '@/components/common/FormErrorMessage/FormErrorMessage';
import styles from './StandEditForm.module.scss';
import { useDefaultRequiredRules } from '@/utils/hooks/useDefaultRequiredRules';
import ApplicationSelect from '@/components/common/ApplicationSelect/ApplicationSelect';
import OrganizationSelect from '@/components/common/OrganizationSelect/OrganizationSelect';

interface Props {
  id?: string;
  onSubmit: (data: unknown) => Promise<void> | void;
}

const StandEditForm = ({ id = 'stand-edit-form', onSubmit }: Props) => {
  const [isInProgress, setIsInProgress] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const stand = useStandByUrlParams();
  const dispatch: AppThunkDispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { isSubmitted, errors },
  } = useForm<EditStandFormInputs>({
    mode: 'onChange',
    defaultValues: {
      title: stand?.title || '',
      description: stand?.description || '',
      applicationId: stand?.applicationId || '',
      organizationId: stand?.organizationId || '',
    },
  });

  const processSubmit = useCallback(
    async (data) => {
      if (isInProgress) {
        return;
      }

      dispatch(setFormState({ formName: Form.EditStand, formState: data }));

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

  const requiredRules = useDefaultRequiredRules();

  return (
    <form id={id} onSubmit={handleFormSubmit}>
      <FormErrorMessage message={errorMessage} />

      <InputContainer label="Название" error={isSubmitted && errors.title?.message}>
        <ControlledTextInput name="title" control={control} rules={requiredRules} />
      </InputContainer>

      <InputContainer label="Описание" error={isSubmitted && errors.description?.message}>
        <ControlledTextArea growVertically name="description" control={control} />
      </InputContainer>

      <InputContainer label="Приложение" error={isSubmitted && errors.applicationId?.message}>
        <ApplicationSelect name="applicationId" control={control} rules={requiredRules} />
      </InputContainer>

      <InputContainer label="Организация" error={isSubmitted && errors.organizationId?.message}>
        <OrganizationSelect name="organizationId" control={control} rules={requiredRules} />
      </InputContainer>

      <div className={styles.controls}>
        <Button type="submit" loading={isInProgress} intent={Intent.SUCCESS} icon="floppy-disk">
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default StandEditForm;
