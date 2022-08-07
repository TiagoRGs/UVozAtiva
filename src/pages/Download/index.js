import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {ProgressBar, Colors, Snackbar, Searchbar} from 'react-native-paper';

import {getAxios, setItemAxios, getAllItemAxios} from '../../services/axios';
import {saveCategoryRealm, saveImageRealm} from '../../services/database/realm';

import RNFetchBlob from 'rn-fetch-blob';

import styles from './styles';

import AlertComponent from '../../components/Alert';

const DownloadImages = ({navigation, route}) => {
  const [data, setData] = useState([{}]);
  const [allData, setAllData] = useState([{}]);

  const [isCategory, setIsCategory] = useState(undefined);
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [openAlert, setOpenAlert] = useState(false);

  const [alertMessage, setAlertMessage] = useState({
    text: 'text',
    type: 'sucesso',
  });

  const {is_category, idCategory, profile} = route.params;

  useEffect(() => {
    setLoading(true);
    navigation.setOptions({
      title: is_category ? 'Baixar categoria' : 'Baixar imagem',
    });
    setIsCategory(is_category);
    Axios();
  }, []);

  useEffect(() => {
    if (is_category && isCategory) {
      BackHandler.addEventListener(
        //Quando o botão de voltar do celular é pressionado
        'hardwareBackPress',
        () => {
          navigation.replace('Home', {
            profile: profile,
            success: true,
          });
          return true;
        },
      );
    }
    if (is_category && !isCategory) {
      BackHandler.addEventListener(
        //Quando o botão de voltar do celular é pressionado
        'hardwareBackPress',
        () => {
          setIsCategory(true);
          Axios();
          setIsCategory(true);
          return true;
        },
      );
    }

    if (!is_category && !isCategory) {
      BackHandler.addEventListener(
        //Quando o botão de voltar do celular é pressionado
        'hardwareBackPress',
        () => {
          navigation.replace('Home', {
            profile: profile,
            success: true,
          });
          return true;
        },
      );
    }
  }, [data]);

  async function Axios() {
    if (is_category) {
      await getAxios()
        .then(response => {
          console.log(response.data);
          setData(response.data);
          setAllData(response.data);

          setLoading(false);
        })
        .catch(err => {
          navigation.replace('Home', {
            profile: profile,
            success: true,
          });
          console.log(err);
          return true;
        });
    } else {
      await getAllItemAxios()
        .then(response => {
          setData(response.data);
          setAllData(response.data);
          setLoading(false);
        })
        .catch(err => console.log(err));
    }
  }

  async function handleSaveItem(item) {
    const data = item;

    if (is_category) {
      setDownloading(true);

      RNFetchBlob.fetch('GET', item.uri)
        .then(async response => {
          const category = {
            name: item.name,
            uri: 'data:image/jpeg;base64,' + response.base64(),
          };
          const res = await saveCategoryRealm(profile, category);

          const data = await setItemAxios(item.id);

          data?.map(async image => {
            let uri = await RNFetchBlob.fetch('GET', image.uri);
            let item = {
              name: image.name,
              uri: 'data:image/jpeg;base64,' + uri.base64(),
              id_categoria: res.id,
            };
            await saveImageRealm(item);
          });

          setDownloading(false);
          setAlertMessage({
            text: 'Categoria baixada com sucesso',
            type: 'sucesso',
          });
          setOpenAlert(true);
        })
        .catch(err => console.log(err));
    } else {
      setDownloading(true);
      let uri = await RNFetchBlob.fetch('GET', data.uri);

      const imagem = {
        name: data.name,
        uri: 'data:image/jpeg;base64,' + uri.base64(),
        id_categoria: idCategory,
      };
      await saveImageRealm(imagem)
        .then(res => {
          setDownloading(false);
          setAlertMessage({
            text: 'Imagem baixada com sucesso',
            type: 'sucesso',
          });
          setOpenAlert(true);
        })
        .catch(err => console.log(err));
    }
  }

  async function setAllDataFunction(item) {
    setLoading(true);
    setData(await setItemAxios(item.id));
    setAllData(await setItemAxios(item.id));
    setLoading(false);
  }

  function renderItem({item}) {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={async () => {
            {
              is_category && item.is_category
                ? Alert.alert(
                    'Salvar',
                    `Deseja salvar ${item.name} em seu dispositivo?`,
                    [
                      {
                        text: 'Visualizar categoria',
                        onPress: async () => {
                          setAllDataFunction(item);
                          setIsCategory(false);
                        },
                      },
                      {text: 'Baixar', onPress: () => handleSaveItem(item)},
                      {text: 'Cancelar'},
                    ],
                  )
                : !is_category && item.is_category
                ? setAllDataFunction(item)
                : is_category
                ? undefined
                : Alert.alert(
                    'Salvar',
                    `Deseja salvar ${item.name} em seu dispositivo?`,
                    [
                      {text: 'Baixar', onPress: () => handleSaveItem(item)},
                      {text: 'Voltar'},
                    ],
                  );
            }
          }}>
          <Image style={styles.images} source={{uri: item.uri}} />
          <Text style={styles.textItem}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const onChangeSearch = query => {
    setSearchQuery(query);

    const item = allData.filter(element => element.name.includes(query));
    setData(item);
  };

  return (
    <>
      {/* <AlertComponent open={openAlert} close={setOpenAlert} t={alertMessage} /> */}

      {loading && (
        <View style={styles.ViewProgressBar}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Estamos carregando as imagens, favor aguardar um instante
          </Text>
          <ProgressBar
            style={styles.ProgressBar}
            indeterminate
            color={Colors.blueA100}
          />
        </View>
      )}

      {downloading ? (
        <View style={styles.ViewProgressBar}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Estamos baixando as imagens, favor aguardar um instante
          </Text>
          <ProgressBar
            style={styles.ProgressBar}
            indeterminate
            color={Colors.blueA100}
          />
        </View>
      ) : undefined}
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Searchbar
            placeholder="Pesquisar"
            style={{width: '40%', height: 60, marginTop: 10}}
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>

        <View>
          <FlatList
            contentContainerStyle={styles.flatlistItem}
            data={data}
            renderItem={renderItem}
            numColumns={4}
            keyExtractor={item => String(item.id)}
          />
        </View>
      </View>
    </>
  );
};

export default DownloadImages;
