import React from 'react';
import {
  Datagrid,
  List,
  ReferenceField,
  TextField,
  EditButton
} from 'react-admin';
import Chip from '@material-ui/core/Chip';
import orange from '@material-ui/core/colors/orange';
import { Link } from 'react-router-dom';
import {ListActions} from '../../Layout';

const AnswerPanel = ({ id, record, resource }) => {
  return (
    <div>
      {record.diseasIds && record.diseasIds.map(d => (
        <Chip 
        color="primary" 
        key={d.id} 
        clickable 
        label={d.name} 
        component={Link} 
        to={`/diseas/${d.id}`}
        style={{
          background: orange[500],
        }} />
      ))}
    </div>
  );
};

const AnswerTitle = (r) => (<span>Список ответов</span>);

export const AnswerList = props => (
  <List {...props} actions={<ListActions/>} title={<AnswerTitle/>}>
    <Datagrid expand={<AnswerPanel/>} title="Ответы" isRowSelectable={r => false}>
      <ReferenceField source="PollItemId.id" reference="questions">
        <TextField source="question" label="вопрос" />
      </ReferenceField>
      <TextField source="text" />
      <EditButton label="редактировать" />
    </Datagrid>
  </List>
);