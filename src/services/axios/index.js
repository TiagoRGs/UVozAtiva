import axios from 'axios';
// import RNFetchBlob from 'rn-fetch-blob';
import remoteConfig from '@react-native-firebase/remote-config';

// gallery/ -> Lista as Categorias
// gallery/(?P<category>\d+)/images -> Lista Imagem de uma categoria (Id)
// gallery/images/all -> Lista todas as imagens de todas as categorias

const baseURL = remoteConfig().getValue('baseURL').asString();

const api = axios.create({
  baseURL,
});
console.log('baseURL2', baseURL);

export async function getAxios() {
  const response = await axios.get(`gallery/`, {
    'Content-type': 'application/json',
  });

  return response;
}

export async function setItemAxios(id) {
  const response = await api.get(`gallery/${id}/images/`);
  return response.data;
}

export async function getAllItemAxios() {
  const response = await api.get('gallery/images/all/');
  return response;
}

export async function initialSetupProfile() {
  const response = await api.get('http://bbg.unemat.br:10092/initialsetup/');
  return response.data;
}
