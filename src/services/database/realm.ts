import {Alert} from 'react-native';
import Realm from 'realm';
import {
  CategorySchema,
  ICategory,
  IImage,
  ImagesSchema,
  IProfile,
  ProfileSchema,
} from './schema/RealmSchema';

import uuid from 'react-native-uuid';

import {initialSetupProfile, setItemAxios} from '../axios';
import RNFetchBlob from 'rn-fetch-blob';

export default function getRealm() {
  return Realm.open({
    schema: [ProfileSchema, CategorySchema, ImagesSchema],
  });
}

export async function deleteProfile(profile: IProfile) {
  const realm = await getRealm();

  try {
    realm.write(() => {
      realm.delete(profile);
    });
    return true;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteItem(item: ICategory) {
  const realm = await getRealm();
  try {
    realm.write(() => {
      realm.delete(item);
    });
    return true;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteItemCategory(category: ICategory) {
  const realm = await getRealm();
  try {
    realm.write(() => {
      const images = realm
        .objects('Images')
        .filtered(`id_category = '${category.id}'`);
      realm.delete(images);
      realm.delete(category);
    });
  } catch (err) {
    console.log(err);
  }
}

export async function saveCategoryRealm(
  profile: IProfile,
  category: ICategory,
) {
  let data = {};
  const realm = await getRealm();

  // let categoryID = realm.objects('Category').max('id');
  // categoryID == null ? (categoryID = 1) : (categoryID += 1);

  // let imagesID = realm.objects('Images').max('id');
  // imagesID == null ? (imagesID = 1) : (imagesID += 1);

  data = {
    id: '0000000',
    id_profile: profile.id,
    name: category.name,
    uri: category.uri,
  };

  try {
    realm.write(() => {
      realm.create('Category', data);
    });

    return data;
  } catch {
    return false;
  }
}

export async function saveImageRealm(imagem: IImage) {
  let data = {};
  const realm = await getRealm();

  // let idImage = realm.objects('Images').max('id');
  // idImage == null ? (idImage = 1) : (idImage += 1);

  data = {
    id: '000000',
    name: imagem.name,
    uri: imagem.uri,
    id_category: imagem.id_category,
  };

  try {
    realm.write(() => {
      realm.create('Images', data);
    });

    return {
      id: '000000',
      name: imagem.name,
      id_category: imagem.id_category,
    };
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function loadRealm(profile: IProfile) {
  const realm = await getRealm();

  const add = {
    id: Math.random(),
    name: 'Adicionar',
    isAdd: true,
  };

  let item = [];
  let data = realm.objects('Category').filtered(`id_profile = '${profile.id}'`);

  item.push(add);
  item.push(...data);

  return item;
}

export async function loadImagesRealm(id_category: string) {
  const realm = await getRealm();

  let data = realm.objects('Images').filtered(`id_category = '${id_category}'`);

  return data;
}

export async function LoadProfileBD(): Promise<any> {
  let data: IProfile[] = [];
  let item = [];

  const realm = await getRealm();

  const add = {
    id: uuid.v4(),
    name: 'Adicionar',
    isAdd: true,
  };

  // data = realm.objects('Profile') as any;

  // item.push(add);
  // item.push(...realm.objects('Profile'));

  return [add, ...realm.objects('Profile')];
}

// async function initialSetup(profile: IProfile) {
//   try {
//     const response = await initialSetupProfile();
//     response.map(async (cat: any) => {
//       RNFetchBlob.fetch('GET', cat['uri']).then(async response => {
//         const category = {
//           name: cat['name'],
//           uri: 'data:image/jpeg;base64,' + response.base64(),
//         };
//         // const res = await saveCategoryRealm(profile, category);
//         // const data = await setItemAxios(cat['id']);

//         data?.map(async image => {
//           let uri = await RNFetchBlob.fetch('GET', image.uri);
//           let item = {
//             name: image.name,
//             uri: 'data:image/jpeg;base64,' + uri.base64(),
//             id_categoria: res.id,
//           };

//           await saveImageRealm(item);
//         });
//       });
//     });
//     return true;
//   } catch (err) {
//     console.log(err);
//   }
// }

export async function saveRealmProfile(
  name: string,
  uri_image: string | undefined,
) {
  const realm = await getRealm();

  const data = {
    id: uuid.v4(),
    name,
    image_uri: uri_image ? uri_image : null,
  };

  try {
    realm.write(() => {
      realm.create('Profile', data);
    });

    // initialSetup(data);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
