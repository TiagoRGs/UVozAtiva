import React, {useEffect, useLayoutEffect, useState} from 'react';

import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

import {Menu, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  deleteItem,
  loadRealm,
  loadImagesRealm,
  deleteItemCategory,
} from '../../services/database/realm';

import AlertComponent from '../../components/Alert';


import remoteConfig from '@react-native-firebase/remote-config';


import Adicionar from './components/Adicionar';
import TTS from './components/TTS';
import speak from '../../services/tts';

import styles from './styles';
let deviceWidth = Dimensions.get('window').width;

const HomePage = ({route, navigation}) => {
  function setHeaderTitle(title) {
    navigation.setOptions({
      title: title,
    });
  }

  const [openAdd, setOpenAdd] = useState(false);
  const [addTipo, setAddTipo] = useState({});
  const [data, setData] = useState([{}]);
  const [imagesTTs, setImagesTTs] = useState([]);

  const [isCategory, setIsCategory] = useState(true);
  const [idCategory, setIdCategory] = useState(undefined);

  const [moreOption, setMoreOption] = useState(true);

  const [speakActions, setSpeakActions] = useState(true);

  const [text, setText] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    text: 'text',
    type: 'sucesso',
  });

  const {
    profile
  } = route.params;


  useEffect(() => {

    
    



  }, []);

  useEffect(() => {
    (async () => {
      {
        let speakAction = await AsyncStorage.setItem(
          'speakAction',
          String(speakActions),
        );

        if (speakAction === null) {
          speakAction = true;
        } else {
          speakAction = Boolean(speakAction);
        }

        setSpeakActions(speakAction);
      }
    })();
  }, []);

  BackHandler.addEventListener(
    //Quando o botão de voltar é pressionado
    'hardwareBackPress',
    () => {
      if (isCategory) {
        //Se estiver nas categorias perguntar se o usuário quer fechar o aplicativo
        Alert.alert('Sair', 'Deseja sair do aplicativo?', [
          {
            text: 'Sim',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
          {
            text: 'Não',
            onPress: () => {},
          },
        ]);
      } else {
        //Se não apenas recarrega o banco de dados
        setIsCategory(true);
        setHeaderTitle('Início');
        // setHeaderColor('#fff');
        setIdCategory(undefined);
        loadItemBD();
      }
      return true;
    },
  );

  useEffect(() => {
    if (!isCategory && idCategory) {
      let p = data.find(cat => cat.id === idCategory);
      if (p) {
        setItem(p);
      }
    }
  }, [data, isCategory, idCategory]);

  useEffect(() => {
    loadItemBD();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Menu
          visible={moreOption}
          onDismiss={() => setMoreOption(false)}
          anchor={
            <Icon.Button
              name="more-vert"
              backgroundColor="#ffff"
              color="black"
              size={30}
              onPress={() => setMoreOption(true)}
            />
          }>
          <Menu.Item
            onPress={() => {
              setMoreOption(false);
              navigation.replace('Profile');
            }}
            title="Trocar Perfil"
          />
          <Menu.Item
            onPress={() => {
              setMoreOption(false);
              navigation.navigate('Settings');
            }}
            title="Configurações"
          />
        </Menu>
      ),
    });
  }, [moreOption]);

  async function loadItemBD() {
    console.log('[loadItemBD]');

    await loadRealm(profile)
      .then(item => {
        setData(item);
      })
      .catch(err => {
        alert(err);
      });
  }

  async function setItem(item) {
    const dataItem = await loadImagesRealm(item.id);

    setHeaderTitle(`Categoria: ${item.name}`);

    const iconAdd = {
      id: Math.random(),
      name: 'Adicionar',
      isAdd: true,
    };

    let newData = [];
    newData.push(iconAdd);
    newData.push(...dataItem);

    setIsCategory(false);
    setData(newData);
  }

  async function handleDeleteCategory(item) {
    await deleteItemCategory(item)
      .then(async () => {
        await loadItemBD();
        setAlertMessage({
          text: 'Categoria apagada com sucesso',
          type: 'sucesso',
        });
        setOpenAlert(true);
      })
      .catch(err => console.log(err));
  }

  async function handlerDeleteItem(item) {
    await deleteItem(item)
      .then(async () => {
        await loadItemBD();
        setAlertMessage({
          text: 'Imagem apagada com sucesso',
          type: 'sucesso',
        });
        setOpenAlert(true);
      })
      .catch(err => console.log(err));
  }

  function addTTs(obj) {
    console.log(`[addTTs] - Add "${obj.name}" in TTs`);
    const newItemTTs = {
      id: Math.random() * 10,
      name: obj.name,
      uri: obj.uri,
      idCategory: obj.idCategory,
      isCategory: false,
    };
    let newImagesTTS = imagesTTs;
    newImagesTTS.push(newItemTTs);

    let newTextTTs = `${text} ${newItemTTs.name}`;
    setImagesTTs(newImagesTTS);
    setText(newTextTTs);
  }

  function renderItem({item}) {
    if (item.isAdd) {
      return (
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => {
              if (isCategory) {
                setAddTipo({
                  tipo: 'categoria',
                  idCategoria: undefined,
                });
                if (speakActions) {
                  speak(`adicionar categoria`);
                }
              } else {
                setAddTipo({
                  tipo: 'imagem',
                  idCategoria: idCategory,
                });
                if (speakActions) {
                  speak(`adicionar imagem`);
                }
              }
              setOpenAdd(true);
            }}>
            <Icon
              name="add-circle-outline"
              size={deviceWidth * 0.1}
              style={styles.iconAdd}
              color="#000"
            />
            <Text style={styles.textItem}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (item.isCategory) {
      return (
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => {
              if (speakActions) {
                speak(`categoria ${item.name}`);
              }
              setIdCategory(item.id);
              setItem(item);
            }}
            onLongPress={() => {
              if (speakActions) {
                speak(`apagar categoria ${item.name}?`);
              }
              Alert.alert('Apagar', `Apagar categoria ${item.name}?`, [
                {text: 'Sim', onPress: () => handleDeleteCategory(item)},
                {text: 'Não'},
              ]);
            }}
            delayLongPress={300}>
            <Image style={styles.images} source={{uri: item.uri}} />
            <Text style={styles.textItem}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => addTTs(item)}
          onLongPress={() =>
            Alert.alert('Apagar', `Apagar imagem ${item.name}?`, [
              {text: 'Sim', onPress: () => handlerDeleteItem(item)},
              {text: 'Não'},
            ])
          }
          delayLongPress={300}>
          <Image style={styles.images} source={{uri: item.uri}} />
          <Text style={styles.textItem}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function deleteTTS(obj) {
    let newItensTTs = imagesTTs;
    if (obj) {
      newItensTTs = imagesTTs.filter(item => item.id !== obj.id);
    } else {
      newItensTTs.pop();
    }
    setImagesTTs([...newItensTTs]);
  }

  return (
    <View style={styles.container}>
      <TTS data={imagesTTs} remover={deleteTTS} removerTudo={setImagesTTs} />
      {/* <AlertComponent open={openAlert} close={setOpenAlert} t={alertMessage} /> */}

      <View style={styles.viewItens}>
        <FlatList
          contentContainerStyle={styles.flatlistItem}
          data={data}
          renderItem={renderItem}
          numColumns={4}
          keyExtractor={item => String(item?.id)}
        />
        <Adicionar
          navigation={navigation}
          open={openAdd}
          close={setOpenAdd}
          atualizar={loadItemBD}
          tipo={addTipo}
          profile={profile}
          openAlert={setOpenAlert}
          alertMessage={setAlertMessage}
        />
      </View>
    </View>
  );
};

export default HomePage;
