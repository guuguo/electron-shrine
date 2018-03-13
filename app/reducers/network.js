// @flow
import { ADD_DATA, ADD_DETAIL, SAVE_CATEGORY_STATE, SAVE_CATEGORY_OFFSET } from '../actions/network';

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
  magnent?: [],
  baidupan?: []
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
//     page: 1,
//     currentCategory: "动画"
//   }
// }
export type contentData = {
  +data: {}
};

const addPage =
  (state: categoryType, itemData: itemType[], page) => {
    if (state.page >= page) {
      return state;
    }
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
          page: 0
        }, action.items, action.page)
      };
    case ADD_DETAIL: {
      const tState = Object.assign({}, state);
      tState[action.category].byId[action.id].detail = action.detail;
      return tState;
    }
    case SAVE_CATEGORY_STATE: {
      return {
        ...state,
        currentCategory: action.categoryIndex
      };
    }
    case SAVE_CATEGORY_OFFSET: {
      const res = { ...state }
      res[action.category].offset = action.offset
      return res;
    }
    default:
      return state;
  }
}
