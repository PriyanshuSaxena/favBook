import axios from 'axios';

class bookServices {

  public static getVolumes = (query: string,skip:number,sort:string) => {
    let finalQuery = query.replace(' ', '+');
    console.log(`https://www.googleapis.com/books/v1/volumes?q=${finalQuery}&maxResults=${20}&startIndex=${skip}&orderBy=${sort}`,'URL')

    return axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${finalQuery}&maxResults=${20}&startIndex=${skip}&orderBy=${sort}`,
    );
  };
}

export default bookServices
