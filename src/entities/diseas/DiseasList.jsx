import React from 'react';
import { Datagrid, Filter, List, TextField, TextInput } from 'react-admin';
import {ListActions} from '../../Layout';

const DiseasFilter = (props) => (
  <Filter {...props}>
    <TextInput label="поиск" source="q" always-on />
  </Filter>
);

export const DiseasList = props => (
  <List {...props} title="Список болезней" filters={<DiseasFilter/>} actions={<ListActions/>}>
      <Datagrid rowClick="edit">
          {/* <TextField source="id" label="id" /> */}
          <TextField source="name" label="имя" />
          <TextField source="description" label="описание" />
      </Datagrid>
  </List>
);