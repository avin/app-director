import React, { useCallback, useMemo, useState } from 'react';
import styles from './LogInPage.module.scss';
import { useForm } from 'react-hook-form';
import { ApiError, LogInFormInputs } from '@/types';
import InputContainer from '@/components/common/InputContainer/InputContainer';
import { useNavigate } from 'react-router-dom';
import type { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { setFormState } from '@/store/reducers/ui';
import TextInput from '@/components/common/TextInput/TextInput';
import { Button, Icon, Intent } from '@blueprintjs/core';
import Checkbox from '@/components/common/Checkbox/Checkbox';
import FormErrorMessage from '@/components/common/FormErrorMessage/FormErrorMessage';
import { logIn } from '@/store/reducers/data';
import { Form } from '@/constants/form';
import config from '@/config';
import axios from 'axios';

interface Props {}

const LogInPage = ({}: Props) => {
  const dispatch: AppThunkDispatch = useDispatch();
  const navigate = useNavigate();
  const [isInProgress, setIsInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    formState: { isSubmitted, errors },
  } = useForm<LogInFormInputs>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',

      ...(process.env.NODE_ENV === 'development' && {
        email: 'admin@server.com',
        password: 'password',
        save: false,
      }),
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      setErrorMessage(null);
      setIsInProgress(true);

      dispatch(setFormState({ formName: Form.LogIn, formState: data }));

      try {
        await dispatch(logIn());
        navigate(config.routes.monitoring);
      } catch (error) {
        let errorMessage = 'Запрос выполнен неуспешно, попробуйте еще раз';
        if (axios.isAxiosError(error)) {
          if ((error.response?.data as ApiError)?.statusCode === 401) {
            errorMessage = 'Неверные учетные данные';
          }
        }

        setErrorMessage(errorMessage);
        setIsInProgress(false);
      }
    },
    [dispatch, navigate],
  );

  const onSubmitError = useCallback((submitErrors) => {
    console.warn(submitErrors);
  }, []);

  const handleFormSubmit = useMemo(
    () => handleSubmit(onSubmit, onSubmitError),
    [handleSubmit, onSubmit, onSubmitError],
  );

  const requiredRules = useMemo(
    () => ({
      validate: (val) => {
        if (!val) {
          return 'Требуется заполнить поле';
        }

        return undefined;
      },
    }),
    [],
  );

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <FormErrorMessage message={errorMessage} />

      <InputContainer label="Email" error={isSubmitted && errors.email?.message}>
        <TextInput
          control={control}
          rules={requiredRules}
          name="email"
          autoFocus
          leftElement={<Icon icon="envelope" />}
          placeholder="user@host.org"
        />
      </InputContainer>

      <InputContainer label="Пароль" error={isSubmitted && errors.password?.message}>
        <TextInput
          control={control}
          rules={requiredRules}
          name="password"
          type="password"
          leftElement={<Icon icon="key" />}
          placeholder="********"
        />
      </InputContainer>

      <div className={styles.controls}>
        <div>
          <Checkbox control={control} name="save" label="Запомнить меня" />
        </div>
        <div>
          <Button type="submit" intent={Intent.PRIMARY} loading={isInProgress} icon="unlock">
            <span>Войти</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LogInPage;
