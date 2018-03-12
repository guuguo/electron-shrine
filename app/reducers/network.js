// @flow
import { ADD_DATA, ADD_DETAIL } from '../actions/network';

export type itemType = {
  +id: string,
  +title: string,
  +date: string,
  +author: string,
  +content: string,
  +image: string,
  +tags: [],
  +detail?: detailType
};
export type detailType = {
  content: string,
  magnent?: string
};
export type categoryType = {
  +byId: {},
  +allIds: [],
  +page: number,
  +offset?: number
};
// const state = {
//   'anime': {
//     byId: {
//       '1': {
//         id: '',
//         title: '',
//         date: '',
//         author: '',
//         content: '',
//         image: '',
//         tags: [],
//       },
//     },
//     allIds: ['1', '2'],
//     page: 1
//   }
// }
export type contentData = {
  +data: {}
};

const addPage =
  (state: categoryType, itemData: itemType[], page) => {
    const tempState = state;
    itemData.forEach(it => {
      tempState.byId[it.id] = it;
    });
    tempState.allIds = tempState.allIds.concat(itemData.map(it => it.id));
    tempState.page = page;
    return tempState;
  };

export default function shrineData(state = {}, action) {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        [action.category]: addPage(state[action.category] || {
          byId: {},
          allIds: [],
          page: action.page
        }, action.items, action.page)
      };
    case ADD_DETAIL: {
      const tState = Object.assign({}, state);
      tState[action.category].byId[action.id].detail = action.detail;
      return tState;
    }
    default:
      return state;
  }
}
