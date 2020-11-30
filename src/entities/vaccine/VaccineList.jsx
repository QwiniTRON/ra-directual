import React from 'react';
import {
  Datagrid,
  List,
  TextField,
  Filter,
  TextInput,
  EditButton,
} from 'react-admin';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import {ListActions} from '../../Layout';

const VaccineFilter = (props) => (
  <Filter {...props}>
    <TextInput source="q" label="поиск" always-on title="поиск" />
  </Filter>
);

const VaccinePanel = ({ id, record, resource }) => {
  return (
    <div>
      {record.diseases && record.diseases.map(d => (
        <Chip color="primary" key={d.id} clickable label={d.name} component={Link} to={`/diseas/${d.id}`} />
      ))}
      <Typography paragraph>
        {record.description}
      </Typography>
    </div>
  );
};


export const VaccineList = props => {
  return (
    <List {...props} filters={<VaccineFilter />} title="Список вакцин" actions={<ListActions />}>
      {/* <Datagrid rowClick="edit" > */}
      <Datagrid expand={<VaccinePanel />} isRowSelectable={r => false}>
        {/* <TextField source="id" label="id" /> */}
        <TextField source="name" label="имя" />
        {/* <TextField source="description" label="описание" /> */}
        {/* <ArrayField source="diseases" label="болезни">
        <SingleFieldList >
          <ReferenceField source="id" reference="diseas" >
            <ChipField source="name" />
          </ReferenceField>
        </SingleFieldList>
      </ArrayField> */}
        <EditButton label="редактировать" color="default" />
      </Datagrid>
    </List>
  );
};