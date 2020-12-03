import React from 'react';
import { BooleanField, Datagrid, List, TextField } from 'react-admin';

const ChatListRowStyle = (record, index) => ({
    backgroundColor: record.isQuestioned? '#ebab34' : 'white',
});
export const ChatList = props => (
    <List {...props} title="чат">
        <Datagrid rowClick="show" rowStyle={ChatListRowStyle}>
            <TextField label="фамилия" source="lastName" />
            <TextField label="имя" source="firstName" />
            <TextField label="ник" source="userName" />
            <BooleanField label="новый вопрос" source="isQuestioned" />
        </Datagrid>
    </List>
);