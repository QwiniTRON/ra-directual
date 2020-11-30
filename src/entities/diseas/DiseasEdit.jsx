import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

const DiseasTitle = ({record}) => (<span>{record.name || "Болезнь"}</span>);

export const DiseasEdit = props => (
  <Edit {...props} title={<DiseasTitle/>}>
      <SimpleForm>
          <TextInput source="id" disabled />
          <TextInput source="name" label="название" fullWidth helperText="название для болезни" />
          <TextInput source="description" label="описание" fullWidth helperText="описание для болезни" />
      </SimpleForm>
  </Edit>
);