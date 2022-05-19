import { format_date } from './formt-date';

export const getValues = (item) => {
  if (item?.concern_type == 'App\\Admin') {
    return { title: 'Admin', image: require('../assets/images/avatar1.png') };
  }
  if (item?.concern_type == 'App\\User') {
    return {
      title: item?.title.substring(0, (item?.title?.length - 9)),
      image: require('../assets/images/noimg.png'),
    };
  }
};
