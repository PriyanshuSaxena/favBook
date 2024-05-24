import axios from 'axios';

class bookServices {

  public static getVolumes = (query: string) => {
    let finalQuery = query.replace(' ', '+');

    return axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${finalQuery}`,
    );
  };
}

export default bookServices
