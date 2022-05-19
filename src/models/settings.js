import moment from 'moment';
import Api from '../lib/api';
import initialState from '../store/settings';
import Config from '../constants/config';
import { getFeaturedImageUrl } from '../lib/images';
import { ucfirst, stripHtml } from '../lib/string';
import pagination from '../lib/pagination';
import { ToastAndroid } from 'react-native';
import { Toast } from 'native-base';
import commonColor from '../../native-base-theme/variables/commonColor';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Transform the endpoint data structure into our redux store format
 * @param {obj} item
 */
const transform = (item) => ({
  id: item.id || 0,
  name: item.title && item.title.rendered ? ucfirst(stripHtml(item.title.rendered)) : '',
  content: item.content && item.content.rendered ? stripHtml(item.content.rendered) : '',
  contentRaw: item.content && item.content.rendered,
  excerpt: item.excerpt && item.excerpt.rendered ? stripHtml(item.excerpt.rendered) : '',
  date: moment(item.date).format(Config.dateFormat) || '',
  slug: item.slug || null,
  link: item.link || null,
  image: getFeaturedImageUrl(item),
});

export default {
  namespace: 'settings',

  /**
   *  Initial state
   */
  state: initialState,
  /**
   * Effects/Actions
   */
  effects: (dispatch) => ({
    /**
     * Get a list from the API
     * @param {obj} rootState
     * @returns {Promise}
     */
    async doLogin(payload = {}, rootState) {
      try {
        const result = await Api.post('auth/signin', rootState.auth.loginInput);
        AsyncStorage.setItem('@Auth:token', result.data.data.token);
        console.log('token', result.data.data.token);
        const res = await Api.get('auth/me');
        const { data } = res;
        console.log(res);
        dispatch.auth.replaceCurrentUser(data.data.user);
        dispatch.auth.replaceIsLogged(true);
        ToastAndroid.show('login succed', ToastAndroid.LONG);
      } catch (error) {
        console.log('error =>', error);
        console.log('error.response =>', error.response);
        console.log('error.message =>', error.message);
        // alert(error)
        Toast.show({
          text: error.response?.data?.errors?.message[0],
          position: 'bottom',
          type: 'danger',
          style: {
            borderRadius: 20,
            marginHorizontal: 10,
            marginBottom: 10,
            backfaceVisibility: 'hidden',
          },
        });
      }
    },
  }),

  /**
   * Reducers
   */
  reducers: {
    /**
     * Replace list in store
     * @param {obj} state
     * @param {obj} payload
     */
    replace(state, payload) {
      let newList = null;
      const { data, headers, page } = payload;

      // Loop data array, saving items in a usable format
      if (data && typeof data === 'object') {
        newList = data.map((item) => transform(item));
      }

      // Create our paginated and flat lists
      const listPaginated =
        page === 1 ? { [page]: newList } : { ...state.listPaginated, [page]: newList };
      const listFlat =
        Object.keys(listPaginated)
          .map((k) => listPaginated[k])
          .flat() || [];

      return newList
        ? {
            ...state,
            listPaginated,
            listFlat,
            lastSync:
              page === 1
                ? { [page]: moment().format() }
                : { ...state.lastSync, [page]: moment().format() },
            meta: {
              page,
              lastPage: parseInt(headers['x-wp-totalpages'], 10) || null,
              total: parseInt(headers['x-wp-total'], 10) || null,
            },
            pagination: pagination(headers['x-wp-totalpages'], '/articles/'),
          }
        : initialState;
    },
},

    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceLanguage(state, payload) {
      return {
        ...state,
        lang: payload,
      };
    },
    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceTheme(state, payload) {
      return {
        ...state,
        theme: payload,
      };
    },
};
