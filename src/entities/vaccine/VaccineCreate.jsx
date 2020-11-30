import React from 'react';
import {
  ArrayInput,
  ChipField,
  Create,
  ReferenceArrayInput,
  ReferenceInput,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput
} from 'react-admin';
import Typography from '@material-ui/core/Typography';
import BugReport from '@material-ui/icons/BugReport';
import Button from '@material-ui/core/Button';


const VaccineTitle = ({ record }) => (<span>{record.name || "Вакцина"}</span>);

export const VaccineCreate = props => (
  <Create {...props} title={<VaccineTitle />}>
    <SimpleForm>
      <TextInput source="name" fullWidth helperText="имя вакцины" label="имя" />
      <TextInput source="description" multiline fullWidth helperText="описание вакцины" label="описание" />

      <Typography variant="h5" fullWidth>
        <BugReport/> болезни для данной прививки
      </Typography>
      <ArrayInput source="diseases" label="">
        <SimpleFormIterator addButton={<Button variant="contained" color="secondary">Добавить болезнь</Button>}>
          <ReferenceInput source="id" reference="diseas" label="болезнь" fullWidth>
            <SelectInput source="name" helperText="болезнь" resettable />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);