import Directual from 'directual-api';
import apiDictionary from './apiDictonary';

const api = new Directual({ apiHost: '/' });


function getApiInfo(routeName, method = 'getList') {
  const apiInfo = apiDictionary.[method][routeName];
  if (!apiInfo) throw new Error('Нет api для такого запроса');
  return apiInfo;
}

function getFormatIds(ids, apiInfo) {
  return apiInfo.idsFormat ? apiInfo.idsFormat(ids) : ids;
}


export default {
  getList(resource, params) {
    const apiInfo = getApiInfo(resource);
    const page = params.pagination.page - 1;
    const pageSize = params.pagination.perPage;
    const sort = `${params.sort.field},${params.sort.order.toLowerCase()}`;
    const filter = apiInfo.formFilter ? apiInfo.formFilter(params.filter) : params.filter;

    return api
      .structure(apiInfo.structure)
      .getData(apiInfo.endPoint, { page, pageSize, sort, sessionID: '', ...filter })
      .then((response) => ({
        data: apiInfo.formatList? apiInfo.formatList(response.payload): response.payload,
        total: response.pageInfo.tableSize
      }))
      .catch((err) => console.log(err));
  },

  getOne(resource, params) {
    const { id } = params;
    const apiInfo = getApiInfo(resource, 'getOne');

    return api
      .structure(apiInfo.structure)
      .getData(apiInfo.endPoint, { sessionID: '', ids: [id] })
      .then((response) => ({
        data: apiInfo.formatList? apiInfo.formatList(response.payload[0]) : response.payload[0]
      }))
      .catch((err) => console.log(err));
  },

  getMany(resource, params) {
    let { ids } = params;
    const apiInfo = getApiInfo(resource, 'getMany');
    ids = getFormatIds(ids, apiInfo);

    return api
      .structure(apiInfo.structure)
      .getData(apiInfo.endPoint, { sessionID: '', ids: ids })
      .then((response) => ({
        data: response.payload
      }))
      .catch((err) => console.log(err));
  },

  getManyReference(resource, params) {
    console.log('getManyReference', resource, params);
  },

  update(resource, params) {
    const apiInfo = getApiInfo(resource, 'update');
    const data = apiInfo.formatData ? apiInfo.formatData(params.data) : params.data;

    // если есть иная реализация
    if (apiInfo.ownLogick) return apiInfo.ownLogick(resource, params);

    return api
      .structure(apiInfo.structure)
      .setData(apiInfo.endPoint, data, { sessionID: '' })
      .then((r) => {
        return {
          data: r.result[0]
        };
      });
  },

  updateMany(resource, params) {
    console.log('updateMany', resource, params);
  },

  create(resource, params) {
    const apiInfo = getApiInfo(resource, 'create');
    const data = apiInfo.formatData ? apiInfo.formatData(params.data) : params.data;

    if (apiInfo.ownLogick) return apiInfo.ownLogick(resource, params);

    return api
      .structure(apiInfo.structure)
      .setData(apiInfo.endPoint, data, { sessionID: '' })
      .then((r) => {
        return {
          data: r.result[0]
        };
      });
  },

  delete(resource, params) {
    const apiInfo = getApiInfo(resource, 'delete');
    const filedToDelete = apiInfo.fieldToDelete || 'isDelete';
    
    return api
      .structure(apiInfo.structure)
      .setData(apiInfo.endPoint, { id: params.id, [filedToDelete]: true }, { sessionID: '' })
      .then((r) => {
        return {
          data: r.result[0]
        };
      });
  },

  deleteMany(resource, params) {
    console.log('deleteMany', resource, params);
  }
}