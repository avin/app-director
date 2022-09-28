import React from 'react';
import EntityEditForm from './EntityEditForm';

const getRelationField = (relationTo: string) => {
  return {
    id: `relationSelectField${relationTo}`,
    type: 'relationSelect',
    label: `RelationSelect field (${relationTo})`,
    relation: {
      relationTo,
      single: true,
    },
    required: false,
  } as const;
};

const fields = [
  {
    id: 'textField',
    type: 'text',
    label: 'Text field',
    required: false,
  } as const,
  {
    id: 'markdownField',
    type: 'markdown',
    label: 'Markdown field',
    required: false,
  } as const,
  getRelationField('application'),
  getRelationField('organization'),
  getRelationField('applicationCategory'),
  getRelationField('standCategory'),
];

export default () => {
  return (
    <div className="content">
      <EntityEditForm
        onSubmit={console.log}
        fields={fields}
        name="form"
        defaultValues={{}}
      />
    </div>
  );
};
