import React from 'react';
import { Admin, EditGuesser, ListGuesser, Resource } from 'react-admin';
import { ProvideAuth } from './auth'
import PostIcon from '@material-ui/icons/Book';
import BugReport from '@material-ui/icons/BugReport';

import './App.css';

import dataProvider from './entities/provider';
import { VaccineList } from './entities/vaccine/VaccineList';
import { DiseasList } from './entities/diseas/DiseasList';
import { VaccineEdit } from './entities/vaccine/VaccineEdit';
import { VaccineCreate } from './entities/vaccine/VaccineCreate';
import { DiseasEdit } from './entities/diseas/DiseasEdit';
import { DiseasCreate } from './entities/diseas/DiseasCreate';
import NotFound from './components/NotFound/NotFound';
import { theme } from './static/theme';
import { Menu } from './Layout';
import { QuestionList } from './entities/questions/QuestionsList';
import { QuestionEdit } from './entities/questions/QuestoinEdit';
import { QuestionCreate } from './entities/questions/CreateQuestion';
import { AnswerList } from './entities/answers/AnswersList';
import { AnswerEdit } from './entities/answers/AnswerEdit';
import { AnswerCreate } from './entities/answers/AnswerCreate';
import { ChatList } from './entities/chat/chatList';
import { ChatShow } from './entities/chat/ChatShow';


export default function App() {
  return (
    <ProvideAuth>
      <Admin
        theme={theme}
        dataProvider={dataProvider}
        catchAll={NotFound}
        menu={Menu}>

        <Resource name="vaccine" list={VaccineList} edit={VaccineEdit} icon={PostIcon} options={{
          label: 'Вакцины'
        }} create={VaccineCreate} />

        <Resource name="diseas" list={DiseasList} edit={DiseasEdit} icon={BugReport} options={{
          label: 'Болезни'
        }} create={DiseasCreate} />

        <Resource name="questions" list={QuestionList} edit={QuestionEdit} create={QuestionCreate} options={{
          label: 'Вопросы'
        }} />

        <Resource name="answers" list={AnswerList} edit={AnswerEdit} create={AnswerCreate} />

        <Resource name="chat" list={ChatList} show={ChatShow} options={{
          label: 'Чат'
        }} />

      </Admin>
    </ProvideAuth>
  );
}
