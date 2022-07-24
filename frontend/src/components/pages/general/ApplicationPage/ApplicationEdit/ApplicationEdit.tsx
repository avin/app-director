import React from 'react';
import styles from './ApplicationEdit.module.scss';
import { FormGroup, TextArea } from '@blueprintjs/core';
import { EditApplicationFormInputs } from '@/types';
import { useForm } from 'react-hook-form';
import { useApplicationByUrlParams } from '@/utils/hooks/useApplicationByUrlParams';
import TextInput from '@/components/common/TextInput/TextInput';

interface Props {}

const ApplicationEdit = ({}: Props) => {
  const application = useApplicationByUrlParams();

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

  return (
    <div>
      <FormGroup
        // helperText="Helper text with details..."
        label="Title"
        labelFor="title"
        // labelInfo="*"
      >
        <TextInput id="title" name="title" control={control} />
      </FormGroup>

      <FormGroup
        // helperText="Helper text with details..."
        label="Description"
        labelFor="description"
        labelInfo="(optional)"
      >
        <TextArea
          id="description"
          growVertically
          // large={true}
          className={styles.textArea}
          // fill
          // intent={Intent.PRIMARY}
          // onChange={this.handleChange}
          // value={this.state.value}
        />
      </FormGroup>
    </div>
  );
};

export default ApplicationEdit;
