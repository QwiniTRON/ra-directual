import React from 'react';
import {
  Create,
  ReferenceInput,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  SelectInput
} from 'react-admin';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const AnswerTitle = ({record}) => (<span>создание ответа</span>);

export const AnswerCreate = props => (
  <Create {...props} title={<AnswerTitle/>}>
    <SimpleForm>
      <ReferenceInput source="PollItemId.id" reference="questions" label="вопрос" helperText="вопрос для опросника" fullWidth>
        <SelectInput optionText="question" />
      </ReferenceInput>
      <TextInput source="text" label="ответ" fullWidth />
      
      <Typography>
        Болезни для этого вопроса
      </Typography>
      <ArrayInput source="diseasIds" label="">
        <SimpleFormIterator addButton={<Button variant="contained" color="secondary">Добавить болезнь</Button>}>
          <ReferenceInput source="id" reference="diseas" label="болезнь" helperText="болезнь" resettable fullWidth>
            <SelectInput source="name" />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>

    </SimpleForm>
  </Create>
);