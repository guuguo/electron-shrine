// @flow
import axios from 'axios';
import type { itemType } from '../reducers/network';
//
// export type actionType = {
//   +type: string,
// };

export const ADD_DATA = 'ADD_DATA';
export const ADD_DETAIL = 'ADD_DETAIL';
export const SAVE_CATEGORY_STATE = 'SAVE_CATEGORY_STATE';
export const SAVE_CATEGORY_OFFSET = 'SAVE_CATEGORY_OFFSET';

export type actionType = {
  +type: string
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

export function saveCategoryState(categoryIndex: number) {
  return {
    type: SAVE_CATEGORY_STATE,
    categoryIndex
  };
}

export function saveCategoryOffset(category: string, offset: number) {
  return {
    type: SAVE_CATEGORY_OFFSET,
    category,
    offset
  };
}

const IP_ADDRESS = 'http://hacg.me';

export function fetchHome(page: number, category: string) {
  return (dispatch) => {
    axios.get(`${IP_ADDRESS}/wp/${category}.html/page/${page}`)
      .then((response) => {
        dispatch(addData(resolveShrineData(response.data, category), category, page));
        return 0;
      })
      .catch(() => {
      });
  };
}

export function fetchDetail(category: string, id: string) {
  return (dispatch) => {
    axios.get(`${IP_ADDRESS}/wp/${id}.html`)
      .then((response) => {
        dispatch(addDetail(resolveDetailData(response.data), category, id));
        return 0;
      })
      .catch(() => {
      });
  };
}

const regexMagnent = /\b[0-9a-zA-Z]{40}\b/;
const regexPan = /\bs\/[0-9a-zA-Z]{8}\b/

function resolveDetailData(res) {
  const el = document.createElement('html');
  el.innerHTML = res;
  const articalE = el.getElementsByClassName('entry-content')[0];
  const magMatch = articalE.innerHTML.replace('保护作者版权 本站不提供下载', '').match(regexMagnent);
  const panMatch = articalE.innerHTML.match(regexPan);
  let magnent
  if (magMatch === undefined || magMatch === null) magnent = ''
  else magnent = `magnet:?xt=urn:btih:${magMatch[0]}`;

  let baidupan
  if (panMatch === undefined || panMatch === null) baidupan = ''
  else baidupan = `https://pan.baidu.com/${panMatch[0]}`;

  return {
    content: articalE.innerHTML,
    magnent,
    baidupan
  };
}

function resolveShrineData(res, category) {
  switch (category) {
    default: {
      const el = document.createElement('html');
      el.innerHTML = res;

      return Array.from(el.getElementsByTagName('article')).map(articalE => {
        const id = articalE.id.replace('post-', '');
        const title = articalE.getElementsByClassName('entry-title')[0].getElementsByTagName('a')[0].innerText;
        const date = articalE.getElementsByClassName('entry-date')[0].getAttribute('datetime');
        const author = articalE.getElementsByClassName('by-author')[0].getElementsByTagName('a')[0].innerText;
        let tags;
        try {
          tags = Array.from(articalE.getElementsByClassName('tag-links')[0].getElementsByTagName('a')).map(it => it.innerHTML);
        } catch (e) {
          tags = [];
        }
        let image;
        try {
          image = articalE.getElementsByClassName('entry-content')[0].getElementsByTagName('p')[0].getElementsByTagName('img')[0].src;
        } catch (e) {
          image = '';
        }
        const content = getContent(articalE.getElementsByClassName('entry-content')[0].getElementsByTagName('p')[0]).innerHTML;
        return {
          id, title, date, author, tags, image, content
        };
      });
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
