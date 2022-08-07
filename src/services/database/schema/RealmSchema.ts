export interface IProfile {
  id: string;
  name: string;
  image_uri?: string;
}

export interface ICategory {
  id: string;
  id_profile: string;
  name: string;
  uri: string;
  isCategory: boolean;
}

export type IImage = {
  id: string;
  id_category: string;
  name: string;
  uri: string;
  isCategory: boolean;
};

export const ProfileSchema = {
  name: 'Profile',
  primaryKey: 'id',
  properties: {
    id: {type: 'string', indexed: true},
    name: 'string',
    image_uri: {type: 'string?'},
  },
};

export const CategorySchema = {
  name: 'Category',
  primaryKey: 'id',
  properties: {
    id: {type: 'string', indexed: true},
    id_profile: 'string',
    name: 'string',
    uri: 'string',
    isCategory: {type: 'bool', default: true},
  },
};

export const ImagesSchema = {
  name: 'Images',
  primaryKey: 'id',
  properties: {
    id: {type: 'string', indexed: true},
    id_category: 'string',
    name: 'string',
    uri: 'string',
    isCategory: {type: 'bool', default: false},
  },
};
