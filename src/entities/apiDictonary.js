import _ from 'lodash';
import Directual from 'directual-api';

const api = new Directual({ apiHost: '/' });


export default {
  getList: {
    'vaccine': {
      structure: 'Vaccine',
      endPoint: 'addVaccine',
      formFilter(filters) {
        if (!filters.q) return {};
        return filters;
      }
    },
    'diseas': {
      structure: 'Diseas',
      endPoint: 'addDiseas'
    },
    'questions': {
      structure: 'PollItem',
      endPoint: 'pollItem'
    },
    'answers': {
      structure: 'Answer',
      endPoint: 'answer'
    },
    'chat': {
      structure: 'TUser',
      endPoint: 'chatUser',
      formatList(data) {
        return data.map((chatUser) => {
          chatUser.id = chatUser.Id;
          return chatUser;
        });
      }
    }
  },

  getOne: {
    'vaccine': {
      structure: 'Vaccine',
      endPoint: 'getVaccinesByIds'
    },
    'diseas': {
      structure: 'Diseas',
      endPoint: 'getDiseasesById'
    },
    'questions': {
      structure: 'PollItem',
      endPoint: 'getPollItemsByids'
    },
    'answers': {
      structure: 'Answer',
      endPoint: 'getAnswersByIds'
    },
    'chat': {
      structure: 'TUser',
      endPoint: 'chatUsersByIds',
      formatList(data) {
        data.id = data.Id;
        return data;
      }
    }
  },

  getMany: {
    'vaccine': {
      structure: 'Vaccine',
      endPoint: 'getVaccinesByIds'
    },
    'diseas': {
      structure: 'Diseas',
      endPoint: 'getDiseasesById',
      idsFormat(ids) {
        return ids.map(i => i.id || i).join(',');
      }
    },
    'questions': {
      structure: 'PollItem',
      endPoint: 'getPollItemsByids',
      idsFormat(ids) {
        return ids.map(i => i.id || i).join(',');
      }
    },
    'answers': {
      structure: 'Answer',
      endPoint: 'getAnswersByIds',
      idsFormat(ids) {
        return ids.map(i => i.id || i).join(',');
      }
    }
  },

  getManyReference: {

  },

  update: {
    'vaccine': {
      structure: 'Vaccine',
      endPoint: 'addVaccine',
      formatData(data) {
        if (data.diseases) {
          data.diseases = data.diseases.map(i => i.id || i);
        }
        return data;
      }
    },
    'diseas': {
      structure: 'Diseas',
      endPoint: 'addDiseas'
    },
    'questions': {
      structure: 'PollItem',
      endPoint: 'getPollItemsByids',
      ownLogick(resource, params) {
        const prevAnswersIds = params.previousData.answers.map(a => a.id);
        const currentAnswersIds = params.data.answers.map(a => a.id);
        const intersection = _.intersection(prevAnswersIds, currentAnswersIds) || [];


        // удалим старые ненужные ответы
        for (let id of prevAnswersIds || []) {
          if (!intersection.includes(id)) {
            api
              .structure('Answer')
              .setData('answer', { id: id, isDelete: true }, { sessionID: '' })
              .then((r) => {
                return {
                  data: r.result[0]
                };
              });
          }
        }

        // обновляем ответы и добавляем новые
        for (let answer of params.data.answers || []) {
          if (intersection.includes(answer.id) || !answer.id) {
            const diseasIds = answer.diseasIds ? answer.diseasIds.map(d => d.id) : ''

            api
              .structure('Answer')
              .setData('answer',
                {
                  ...answer,
                  diseasIds: diseasIds,
                  PollItemId: params.data.id,
                  pollId: "ea2c5b4e-c670-494c-9d1a-36c15615bbe5"
                }, { sessionID: '' })
              .then((r) => {
                return {
                  data: r.result[0]
                };
              });
          }
        }

        // обновление самого вопроса
        delete params.data.pollId;
        delete params.data.answers;
        return api
          .structure('PollItem')
          .setData('pollItem', { ...params.data, answers: intersection.join(',') }, { sessionID: '' })
          .then((r) => {
            return {
              data: r.result[0]
            };
          });
      }
    },
    'answers': {
      structure: 'Answer',
      endPoint: 'answer',
      formatData(data) {
        if (data.diseasIds) {
          data.diseasIds = data.diseasIds.map(i => i.id || i);
        }
        data.PollItemId = data.PollItemId.id;
        return data;
      }
    }
  },

  updateMany: {

  },

  create: {
    'vaccine': {
      structure: 'Vaccine',
      endPoint: 'addVaccine',
      formatData(data) {
        data.diseases = data.diseases.map(d => d.id);
        return data;
      }
    },
    'diseas': {
      structure: 'Diseas',
      endPoint: 'addDiseas',
      fieldToDelete: 'toDelete'
    },
    'questions': {
      structure: 'PollItem',
      endPoint: 'getPollItemsByids',
      ownLogick(resource, params) {
        return api
          .structure('PollItem')
          .setData('pollItem', {
            ...params.data,
            answers: params.data.answers.join(',')
          }, { sessionID: '' })
          .then((r) => {
            // так как нам нужен id вопроса для ответов мы ждём его с бэка
            for (let answer of params.data.answers || []) {
              const diseasIds = answer.diseasIds ? answer.diseasIds.map(d => d.id) : ''

              api
                .structure('Answer')
                .setData('answer',
                  {
                    ...answer,
                    diseasIds: diseasIds,
                    PollItemId: r.result[0].id,
                    pollId: "ea2c5b4e-c670-494c-9d1a-36c15615bbe5"
                  }, { sessionID: '' })
                .then((r) => {
                  return {
                    data: r.result[0]
                  };
                });
            }

            return {
              data: r.result[0]
            };
          });
      }
    },
    'answers': {
      structure: 'Answer',
      endPoint: 'answer',
      formatData(data) {
        if (data.diseasIds) {
          data.diseasIds = data.diseasIds.map(i => i.id || i);
        }
        data.PollItemId = data.PollItemId.id;
        return data;
      }
    }
  },

  delete: {
    'vaccine': {
      structure: 'Vaccine',
      endPoint: 'addVaccine'
    },
    'diseas': {
      structure: 'Diseas',
      endPoint: 'addDiseas'
    },
    'questions': {
      structure: 'PollItem',
      endPoint: 'pollItem'
    },
    'answers': {
      structure: 'Answer',
      endPoint: 'answer'
    }
  },

  deleteMany: {

  }
}