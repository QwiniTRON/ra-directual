import React from 'react';
import { Datagrid, EditButton, List, TextField } from 'react-admin';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import { ListActions } from '../../Layout';


const QuestionPanel = ({ id, record, resource }) => {
  return (
    <div>
      {record.answers && record.answers.map(d => (
        <Chip color="primary" key={d.id} clickable label={d.text} component={Link} to={`/answers/${d.id}`} />
      ))}
    </div>
  );
};

export const QuestionList = props => (
  <List {...props} title="Вопросы" actions={<ListActions />}>
    <Datagrid expand={<QuestionPanel />} isRowSelectable={r => false}>
      {/* <TextField source="id" /> */}
      <TextField source="question" />
      {/* <ArrayField source="answers"><SingleFieldList><ChipField source="text" /></SingleFieldList></ArrayField> */}
      <EditButton label="редактировать" color="default" />
    </Datagrid>
  </List>
);