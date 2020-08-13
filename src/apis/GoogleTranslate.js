import axios from 'axios';

export default axios.create({
  baseURL: 'https://translation.googleapis.com/language/translate/v2',
  params: {
    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM',
  },
});
