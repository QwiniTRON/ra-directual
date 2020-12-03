import React, { useEffect, useState } from 'react';
import { Show, useListContext } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({

});

// {
//     Id: "1388500028"
//     chatDoctor: "[{"time":1606995883727,"text":"Здравствуйте у меня дальний родственник болел ангиной.Это заразно ? ","isAnswer":false}]"
//     firstName: "Иван"
//     id: "1388500028"
//     isQuestioned: true
//     lastName: "Барабанщиков"
//     userName: "QwiniTRON"
// }
const ChatShowLayout = ({ record }) => {
    const chat = JSON.parse(record.chatDoctor);
    const filteredChat = chat.sort((l, r) => l.time - r.time);
    console.log(filteredChat);

    return (
        <div>
            <Box p={5}>
                <Typography variant="h5">{record.firstName} {record.lastName} {record.userName}</Typography>
                <Typography>чат</Typography>

            </Box>
        </div>
    );
}

const ChatShowTitle = ({record}) => (<span>{record.firstName} {record.lastName} {record.userName}</span>)
export const ChatShow = (props) => {
    return (
        <Show {...props} title={<ChatShowTitle />}>
            <ChatShowLayout />
        </Show>
    );
};