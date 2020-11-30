import React from 'react';
import {
  ArrayInput,
  Edit,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput
} from 'react-admin';
import Typography from '@material-ui/core/Typography';
import ChatBubble from '@material-ui/icons/ChatBubble';
import Button from '@material-ui/core/Button';

const QuestionTitle = ({ record }) => (<span>{record.question || "вопрос"}</span>);

export const QuestionEdit = props => (
  <Edit {...props} title={<QuestionTitle />}>
    <SimpleForm>
      <TextInput source="question" helperText="вопрос для опросника" label="вопрос" fullWidth />

      <Typography variant="h6">
        Ответы на этот вопрос
      </Typography>
      <ArrayInput source="answers" label="">
        <SimpleFormIterator 
        addButton={<Button variant="contained" color="secondary">Добавить ответ</Button>}
        removeButton={<Button variant="contained">удалить</Button>}>
          <Typography style={{ padding: 5 }}>
            <ChatBubble fontSize="small" style={{ verticalAlign: 'bottom' }} /> ответ
          </Typography>
          <TextInput source="text" helperText="Ответ для этого вопроса" label="Ответ" />
          <Typography>
            болезни для этого вопроса
          </Typography>
          <ArrayInput source="diseasIds" label="">
            <SimpleFormIterator 
            addButton={<Button variant="outlined" color="secondary">Добавить болезнь</Button>}
            removeButton={<Button variant="outlined">удалить</Button>}>
              <ReferenceInput source="id" reference="diseas" label="болезнь" helperText="болезнь" resettable >
                <SelectInput source="name" />
              </ReferenceInput>
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);