import React, { useCallback, useMemo, useState } from 'react';
import styles from './LogInPage.module.scss';
import { useForm } from 'react-hook-form';
import { Form, LogInFormInputs } from '@/types';
import InputContainer from '@/components/common/InputContainer/InputContainer';
import { useNavigate } from 'react-router-dom';
import type { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { setFormState } from '@/store/reducers/forms';
import TextInput from '@/components/common/TextInput/TextInput';
import { Button, Callout, Icon, Intent } from '@blueprintjs/core';
import Checkbox from '@/components/common/Checkbox/Checkbox';
import FormErrorMessage from '@/components/common/FormErrorMessage/FormErrorMessage';

interface Props {}

const LogInPage = ({}: Props): JSX.Element => {
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
        // email: 'admin@server.com',
        // password: 'password',
        save: false,
      }),
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      console.log(data);
      dispatch(setFormState({ formName: Form.LogIn, formState: data }));

      setIsInProgress(true);

      setErrorMessage('Запрос выполнен неуспешно, попробуйте еще раз');

      try {
        // TODO
        // await dispatch(adminLogIn());
        // navigate(config.routes.client.orders);
      } catch (e) {
        setErrorMessage('Запрос выполнен неуспешно, попробуйте еще раз');
        // const errData = (e as ApiError)?.data;
        // if (errData?.error?.code && errData?.error?.message) {
        //   setErrorMessage(errData.error.message);
        //   return;
        // }
        // setErrorMessage('Запрос выполнен неуспешно, попробуйте еще раз');
      } finally {
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
    <div>
      <form onSubmit={handleFormSubmit}>
        <FormErrorMessage message={errorMessage} />

        <InputContainer label="Email" error={isSubmitted && errors.email?.message}>
          <TextInput
            control={control}
            rules={requiredRules}
            name="email"
            autoFocus
            leftElement={<Icon icon="envelope" />}
            placeholder="user@example.com"
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
    </div>
  );
};

export default LogInPage;
