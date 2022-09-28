import React, { useCallback, useMemo, useState } from 'react';
import { useApplicationByUrlParams } from '@/utils/hooks/useApplicationByUrlParams';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ApplicationEditFormInputs } from '@/types';
import { setFormState } from '@/store/reducers/ui';
import { Form } from '@/constants/form';
import ControlledTextInput from '@/components/common/ControlledTextInput/ControlledTextInput';
import ControlledTextArea from '@/components/common/ControlledTextArea/ControlledTextArea';
import InputContainer from '@/components/common/InputContainer/InputContainer';
import { Button, Intent } from '@blueprintjs/core';
import FormErrorMessage from '@/components/common/FormErrorMessage/FormErrorMessage';
import styles from './ApplicationEditForm.module.scss';
import { useDefaultRequiredRules } from '@/utils/hooks/useDefaultRequiredRules';
import ApplicationCategorySelect from '@/components/entities/applicationCategory/ApplicationCategorySelect/ApplicationCategorySelect';
import EntityEditForm from '@/components/common/EntityEditForm/EntityEditForm';
import config from '@/config';

interface Props {
  id?: string;
  onSubmit: (data: unknown) => Promise<void> | void;
}

const ApplicationEditForm = ({
  id = 'application-edit-form',
  onSubmit,
}: Props) => {
  const application = useApplicationByUrlParams();

  return (
    <EntityEditForm
      name={Form.EditApplication}
      // onSubmit={onSubmit}
      onSubmit={console.log}
      fields={config.entities.application.fields}
      defaultValues={{ ...application }}
    />
  );

  // const {
  //   handleSubmit,
  //   control,
  //   formState: { isSubmitted, errors },
  // } = useForm<ApplicationEditFormInputs>({
  //   mode: 'onChange',
  //   defaultValues: {
  //     title: application?.title || '',
  //     description: application?.description || '',
  //     applicationCategoryId: application?.applicationCategoryId || '',
  //   },
  // });
  //
  // const processSubmit = useCallback(
  //   async (data) => {
  //     if (isInProgress) {
  //       return;
  //     }
  //
  //     dispatch(setFormState({ formName: Form.EditApplication, formState: data }));
  //
  //     try {
  //       setErrorMessage(null);
  //       setIsInProgress(true);
  //       await onSubmit(data);
  //     } catch (error) {
  //       console.warn(error);
  //
  //       const errorMessage = 'Запрос выполнен неуспешно, попробуйте еще раз';
  //       setErrorMessage(errorMessage);
  //     } finally {
  //       setIsInProgress(false);
  //     }
  //   },
  //   [dispatch, isInProgress, onSubmit],
  // );
  //
  // const processSubmitError = useCallback((submitErrors) => {
  //   console.warn(submitErrors);
  // }, []);
  //
  // const handleFormSubmit = useMemo(
  //   () => handleSubmit(processSubmit, processSubmitError),
  //   [handleSubmit, processSubmit, processSubmitError],
  // );
  //
  // const requiredRules = useDefaultRequiredRules();
  //
  // return (
  //   <form id={id} onSubmit={handleFormSubmit}>
  //     <FormErrorMessage message={errorMessage} />
  //
  //     <InputContainer label="Категория приложения" error={isSubmitted && errors.applicationCategoryId?.message}>
  //       <ApplicationCategorySelect name="applicationCategoryId" control={control} rules={requiredRules} />
  //     </InputContainer>
  //
  //     <InputContainer label="Название" error={isSubmitted && errors.title?.message}>
  //       <ControlledTextInput name="title" control={control} rules={requiredRules} />
  //     </InputContainer>
  //
  //     <InputContainer label="Описание" error={isSubmitted && errors.description?.message}>
  //       <ControlledTextArea growVertically name="description" control={control} />
  //     </InputContainer>
  //
  //     <div className={styles.controls}>
  //       <Button type="submit" loading={isInProgress} intent={Intent.SUCCESS} icon="floppy-disk">
  //         Сохранить
  //       </Button>
  //     </div>
  //   </form>
  // );
};

export default ApplicationEditForm;
