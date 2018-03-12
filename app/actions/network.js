// @flow
import axios from 'axios';
import type { itemType } from '../reducers/network';
import { categories } from '../containers/ShrineTabsPage';
//
// export type actionType = {
//   +type: string,
// };

export const ADD_DATA = 'ADD_DATA';
export const ADD_DETAIL = 'ADD_DETAIL';
export type actionType = {
  +type: string
  // +items: itemType[],
  // +category: string,
  // +page: number,
  // +detail: {},
  // +id: string
};

export function addData(items: [], category: string, page: number) {
  return {
    type: ADD_DATA,
    items,
    category,
    page
  };
}

export function addDetail(detail: {}, category: string, id) {
  return {
    type: ADD_DETAIL,
    detail,
    category,
    id
  };
}

export function fetchHome(page: number, category: string) {
  return (dispatch) => {
    axios.get(`http://www.llss.pw/wp/${category}.html/page/${page}`)
      .then((response) => {
        dispatch(addData(resolveShrineData(response.data), category, page));
        return 0;
      })
      .catch(() => {
      });
  };
}

export function fetchDetail(category: string, id: string) {
  return (dispatch) => {
    axios.get(`http://www.llss.pw/wp/${id}.html`)
      .then((response) => {
        dispatch(addDetail(resolveDetailData(response.data), category, id));
        return 0;
      })
      .catch(() => {
      });
  };
}

const regex = /\b[0-9a-zA-Z]{40}\b/;

function resolveDetailData(res) {
  const el = document.createElement('html');
  el.innerHTML = res;
  const articalE = el.getElementsByClassName('entry-content')[0];
  return {
    content: articalE.innerHTML,
    magnent: articalE.innerHTML.match(regex)
  };
}

function resolveShrineData(res, category) {
  switch (category) {
    case categories.文章: {
      break;
    }
    default: {
      const el = document.createElement('html');
      el.innerHTML = res;
      return Array.from(el.getElementsByTagName('article')).map(articalE =>
        ({
          id: articalE.id.replace('post-', ''),
          title: articalE.getElementsByClassName('entry-title')[0].getElementsByTagName('a')[0].innerText,
          date: articalE.getElementsByClassName('entry-date')[0].getAttribute('datetime'),
          author: articalE.getElementsByClassName('by-author')[0].getElementsByTagName('a')[0].innerText,
          tags: Array.from(articalE.getElementsByClassName('tag-links')[0].getElementsByTagName('a')).map(it => it.innerHTML),
          image: articalE.getElementsByClassName('entry-content')[0].getElementsByTagName('img')[0].src,
          content: getContent(articalE.getElementsByClassName('entry-content')[0].getElementsByTagName('p')[0]).innerHTML
        }));
    }
  }
}

const getContent = (node) => {
  try {
    node.removeChild(node.getElementsByTagName('img')[0]);
    node.removeChild(node.getElementsByTagName('a')[0]);
  } catch (err) {
  }
  return node;
};
