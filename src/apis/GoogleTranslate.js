import axios from 'axios';

export default axios.create({
  baseURL: 'https://translation.googleapis.com/language/translate/v2',
  params: {
    //API key usage limited to localhost:3000
    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM',
  },
});
