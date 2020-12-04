import React, { useEffect, useState } from 'react';
import { Show, useDataProvider, useListContext } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { sif } from '../../utils/Styels';


const useStyles = makeStyles({
    message: {
        display: 'flex',

        "& > div": {
            maxWidth: '80%',
            padding: 10,
            boxShadow: '0 0 5px 0 #333',
            borderRadius: 6
        }
    },
    messageRight: {
        justifyContent: 'flex-end',

        "& > div": {
            backgroundColor: '#b0ffb1'
        }
    }
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
    const classes = useStyles();
    const dataProvider = useDataProvider();
    const [answerText, setAnswerText] = useState('');
    const [errors, setErrors] = useState({});

    // форматирование чата
    const chat = JSON.parse(record.chatDoctor);
    const filteredChat = chat.sort((l, r) => l.time - r.time);

    const submitHandle = (e) => {
        e.preventDefault();
        if (answerText.length < 3) {
            return setErrors(state => ({ answerText: 'ответ не короче 3 символов' }));
        }

        const answer = {
            "time": Date.now(),
            "text": answerText,
            "isAnswer": true
        };
        chat[chat.length] = answer;
        dataProvider.update('chat', { data: { Id: record.Id, chatDoctor: chat } })
            .then((r) => {})
            .catch((e) => {
                console.log('• chatWhowError', e);
            });
        setAnswerText('');
    }

    return (
        <div>
            <Box p={5}>
                <Typography variant="h5">{record.firstName} {record.lastName} {record.userName}</Typography>
                <Typography>чат</Typography>
                <Box p={5}>
                    {chat.length == 0 && <Typography>пока нет вопросов</Typography>}
                    {chat.map((m) => (
                        <Box key={m.time} marginBottom={1} className={sif({ [classes.message]: true, [classes.messageRight]: m.isAnswer })}>
                            <div>
                                <Box p={1} fontSize={12}>{new Date(m.time).toLocaleString('ru')}</Box>
                                {m.text}
                            </div>
                        </Box>
                    ))}
                </Box>

                <Box marginBottom={1}><Typography>форма ответа</Typography></Box>
                <form onSubmit={submitHandle}>
                    <Box marginBottom={1}>
                        <Typography color="error">{errors.answerText}</Typography>
                        <TextField fullWidth id="outlined-basic" label="ответ" variant="outlined" value={answerText} onChange={(e) => setAnswerText(e.target.value)} />
                    </Box>
                    <Button type="submit" color="primary" variant="contained">
                        отправить
                    </Button>
                </form>
            </Box>
        </div>
    );
}

const ChatShowTitle = ({ record }) => (<span>{record.firstName} {record.lastName} {record.userName}</span>)
export const ChatShow = (props) => {
    return (
        <Show {...props} title={<ChatShowTitle />}>
            <ChatShowLayout />
        </Show>
    );
};