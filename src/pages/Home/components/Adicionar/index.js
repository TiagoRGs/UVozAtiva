import React, {useState, useEffect} from 'react';

import {View, TouchableOpacity, Dimensions, Alert, Text} from 'react-native';
import ImgToBase64 from 'react-native-image-base64';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {TextInput, Button, Modal, Portal, Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {
  saveCategoryRealm,
  saveImageRealm,
} from '../../../../services/database/realm';

import {selectMediaCamera} from '../../../../utils/functions';

import styles from './styles';

let deviceWidth = Dimensions.get('window').width;

var optionsImagePicker = {
  title: 'Selecionar Imagem',
  takePhotoButtonTitle: 'Tirar uma foto',
  chooseFromLibraryButtonTitle: 'Escolher da galeria',
  quality: 1,
  mediaType: 'photo',
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  permissionDenied: {
    title: 'Permissão de Câmera',
    text: 'VozAtiva precisa de acesso à câmera para adicionar as imagens.',
    reTryTitle:
      'VozAtiva precisa de acesso à câmera para adicionar as imagens.',
    okTitle: 'Permitir',
  },
};

export default function Adicionar({
  open,
  close,
  atualizar,
  tipo,
  profile,
  navigation,
  openAlert,
  alertMessage,
}) {
  const [nome, setNome] = useState('');
  const [uri_image, setUriImage] = useState('');
  const [openPrimeiroModal, setOpenPrimeiroModal] = useState(false);
  const [openSegundoModal, setOpenSegundoModal] = useState(false);
  const [metodo, setMetodo] = useState('');
  const [tipoAdd, setTipoAdd] = useState({});

  useEffect(() => {
    setTipoAdd(tipo);
  }, [tipo]);

  useEffect(() => {
    if (open) {
      setOpenPrimeiroModal(true);
    }
  }, [open]);

  async function handleSaveRealm() {
    if (nome == '') {
      return Alert.alert('Nome necessário!', 'Necessário adicionar um nome!');
    }

    if (tipoAdd.tipo == 'categoria') {
      let category = {
        name: nome,
        uri: uri_image,
      };

      saveCategoryRealm(profile, category)
        .then(async res => {
          await atualizar();
          setMetodo('');
          alertMessage({
            text: 'Categoria adicionada com sucesso',
            type: 'sucesso',
          });
          openAlert(true);
          close(false);
          setUriImage('');
          setNome('');
          setOpenSegundoModal(false);
          setOpenPrimeiroModal(false);
        })
        .catch(err => console.log(err));
    } else {
      const imagem = {
        name: nome,
        uri: uri_image,
        id_categoria: tipoAdd.idCategoria,
      };

      await saveImageRealm(imagem)
        .then(async () => {
          await atualizar();
          alertMessage({
            text: 'Imagem adicionada com sucesso',
            type: 'sucesso',
          });
          openAlert(true);
          close(false);
          setMetodo('');
          setUriImage('');
          setNome('');
          setOpenSegundoModal(false);
          setOpenPrimeiroModal(false);
        })
        .catch(err => setButtonLoading(false));
    }
  }

  function selectCamera() {
    launchCamera(optionsImagePicker, async response => {
      if (response?.error) {
        return alert('ImagePicker Error: ', response.error);
      }
      if (response?.didCancel) {
        return;
      }

      if (response && response.assets[0].uri) {
        ImageResizer.createResizedImage(
          response.assets[0].uri,
          800,
          600,
          'JPEG',
          100,
        )
          .then(({uri}) => {
            ImgToBase64.getBase64String(uri)
              .then(base64String => {
                let uri = 'data:image/jpeg;base64,' + base64String;
                setUriImage(uri);
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => console.log(err));
      }
    });
  }

  function selectMediaGallery() {
    launchImageLibrary(optionsImagePicker, response => {
      if (response?.error) {
        return alert('ImagePicker Error: ', response.error);
      }
      if (response?.didCancel) {
        return;
      }

      if (response && response.assets[0].uri) {
        ImageResizer.createResizedImage(
          response.assets[0].uri,
          800,
          600,
          'JPEG',
          100,
        )
          .then(({uri}) => {
            ImgToBase64.getBase64String(uri)
              .then(base64String => {
                let uri = 'data:image/jpeg;base64,' + base64String;
                setUriImage(uri);
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => console.log(err));
      }
    });
  }

  return (
    <>
      <Portal>
        <Modal
          visible={openPrimeiroModal}
          onDismiss={() => close(false)}
          contentContainerStyle={styles.Modal}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              // marginBottom: -50,
            }}>
            <View style={styles.PrimeiroModalContent}>
              <View style={{marginLeft: 40}}>
                <Icon.Button
                  name="photo-camera"
                  backgroundColor="#e1e1e1"
                  color="black"
                  style={styles.iconImage}
                  size={deviceWidth * 0.15}
                  onPress={() => {
                    setMetodo('Camera');
                    selectCamera();
                    setOpenSegundoModal(true);
                  }}>
                  <Text style={styles.text}>Camera</Text>
                </Icon.Button>
              </View>
              <View style={{margin: 40}}>
                <Icon.Button
                  name="collections"
                  backgroundColor="#e1e1e1"
                  color="black"
                  style={styles.iconImage}
                  size={deviceWidth * 0.15}
                  onPress={() => {
                    setMetodo('Galeria');
                    selectMediaGallery();
                    setOpenSegundoModal(true);
                  }}>
                  <Text style={styles.text}>Galeria</Text>
                </Icon.Button>
              </View>
              <View style={{marginRight: 40}}>
                <Icon.Button
                  name="language"
                  backgroundColor="#e1e1e1"
                  color="black"
                  style={styles.iconImage}
                  size={deviceWidth * 0.15}
                  onPress={() => {
                    navigation.push('Download', {
                      is_category: tipoAdd.tipo == 'categoria',
                      idCategory: tipoAdd.idCategoria,
                      profile,
                    });
                    setOpenPrimeiroModal(false);
                    close(false);
                  }}>
                  <Text style={styles.text}>Internet</Text>
                </Icon.Button>
              </View>
            </View>
          </View>
          <View style={styles.ViewButton}>
            <Button
              mode="outlined"
              contentStyle={{height: deviceWidth * 0.081}}
              style={{width: '100%', fontSize: 200, marginTop: 13}}
              color="red"
              onPress={() => {
                setOpenPrimeiroModal(false);
                close(false);
              }}>
              Cancelar
            </Button>
          </View>
          <View style={styles.ViewButton}></View>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={openSegundoModal}
          onDismiss={() => setOpenSegundoModal(false)}
          contentContainerStyle={styles.Modal2}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: deviceWidth * 0.02,
                fontFamily: 'OpenSans-Regular',
                marginTop: 40,
              }}>
              Adicionar da {metodo}
            </Text>
            <View style={styles.ModalContent}>
              <View style={styles.ModalContentInput}>
                <TouchableOpacity
                  onPress={() =>
                    metodo === 'Camera' ? selectCamera() : selectMediaGallery()
                  }>
                  {uri_image ? (
                    <Avatar.Image
                      size={deviceWidth * 0.2}
                      source={{uri: uri_image}}
                    />
                  ) : (
                    <Avatar.Icon
                      size={deviceWidth * 0.2}
                      style={styles.iconImage}
                      color="black"
                      icon="image-plus"
                    />
                  )}
                </TouchableOpacity>
                <TextInput
                  style={styles.textInput}
                  mode="outlined"
                  label="Nome"
                  value={nome}
                  onChangeText={text => {
                    setNome(text);
                  }}
                />
              </View>
            </View>
            <View style={styles.ViewButton}>
              <Button
                mode="outlined"
                contentStyle={{height: deviceWidth * 0.103}}
                style={{width: '50%', fontSize: 200}}
                color="red"
                onPress={() => {
                  setMetodo('');
                  setNome('');
                  setUriImage('');
                  setOpenSegundoModal(false);
                }}>
                Cancelar
              </Button>

              <Button
                mode="outlined"
                contentStyle={{height: deviceWidth * 0.103}}
                style={{width: '50%', fontSize: 200}}
                color="green"
                onPress={handleSaveRealm}>
                Salvar
              </Button>
            </View>
            {/* <View style={styles.ViewButton}>
                        </View> */}
          </View>
        </Modal>
      </Portal>
    </>
  );
}
