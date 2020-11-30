import React from 'react';
import {
  ArrayInput,
  Create,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput
} from 'react-admin';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const QuestionCreateTitle = ({ record }) => (<span>Создание вопроса</span>);

export const QuestionCreate = props => (
  <Create {...props} title={<QuestionCreateTitle />}>
    <SimpleForm>
      <TextInput source="question" helperText="вопрос для опросника" label="вопрос" fullWidth />

      <Typography variant="h6">
        Ответы на этот вопрос
      </Typography>
      <ArrayInput source="answers" label="">
        <SimpleFormIterator
          addButton={<Button variant="contained" color="secondary">Добавить ответ</Button>}
          removeButton={<Button variant="contained">удалить</Button>}>
          <TextInput source="text" helperText="Ответ для этого вопроса" label="Ответ" />
          <Typography>
            болезни для этого вопроса
          </Typography>
          <ArrayInput source="diseasIds" label="">
            <SimpleFormIterator
              addButton={<Button variant="outlined" color="secondary">Добавить болезнь</Button>}
              removeButton={<Button variant="outlined">удалить</Button>}
            >
              <ReferenceInput source="id" reference="diseas" label="болезнь" helperText="болезнь" resettable >
                <SelectInput source="name" />
              </ReferenceInput>
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);