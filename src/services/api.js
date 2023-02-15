import axios from 'axios';
const key = '32660028-03ca1b6b6beafd561d722c8e2';
const URL = `https://pixabay.com/api/?key=${key}&q=`;

export const getPhotos = async (name, page) => {
  try {
    const response = await axios.get(
      `${URL}${name}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getPhotos;
