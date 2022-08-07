import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Dimensions, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { Modal, Portal } from 'react-native-paper';
import { AlertMessageType } from '../../../../components/Alert';
import ImgToBase64 from 'react-native-image-base64'

import {
  Body,
  Container,
  Header,
  Icon,
  Title,
  IconImage,
  Input,
  Footer,
  ButtonTextCancelar,
  ButtonTextSalvar,
  ButtonCancelar,
  ButtonSalvar
} from './styles';
import { saveRealmProfile } from '../../../../services/database/realm';


interface Props {
  open: boolean;
  setOpenSecondModalAddProfile: (a: boolean) => void;
  atualizar: () => Promise<void>;
  openAlert: (a: boolean) => void;
  setAlertMessage: (alertMessageType: AlertMessageType) => void;
  type: string;
  setOpenFirstModalAddProfile: (a: boolean) => void;
}

const AddSecondModal: React.FC<Props> = ({ open, setOpenSecondModalAddProfile, type, atualizar, setAlertMessage, openAlert, setOpenFirstModalAddProfile }) => {
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const [headerTitle, setHeaderTitle] = useState('');
  const [uri, setUri] = useState('')
  const [name, setName] = useState('')


  const handleClose = async () => {
    setUri('')
    setName('')
    setOpenSecondModalAddProfile(false)
    await atualizar().then(() => setOpenFirstModalAddProfile(false))
  }

  const handleAddProfile = async () => {
    let res
    if (name === '') {
      return Alert.alert('Nome necessário!', 'Necessário adicionar um nome!');
    }

    if (!uri) {
      return Alert.alert(
        'Adicionar sem foto?',
        'Deseja adicionar o usuário sem foto de perfil?',
        [
          { text: 'Não' },
          {
            text: 'Sim',
            onPress: async () => {
              res = await saveRealmProfile(name, uri)
                .then(() => {
                  setAlertMessage({
                    type: "success",
                    body: "Perfil adicionado com sucesso"
                  })
                  openAlert(true)
                  handleClose()
                })
                .catch(err => console.error(err));
            },
          },
        ],
      )
    } else {
      await saveRealmProfile(name, uri)
        .then(() => {
          setAlertMessage({
            type: "success",
            body: "Perfil adicionado com sucesso"
          })
          openAlert(true)

          handleClose()
        })
        .catch(err => console.error(err))
    }

  }

  async function selectFromCamera() {

    launchCamera({ mediaType: 'photo' }, async res => {
      if (res.didCancel || res.errorCode) return

      if (res.assets) {

        await ImageResizer.createResizedImage(
          res.assets[0].uri!,
          800,
          600,
          'JPEG',
          100,
        )
          .then(({ uri }) => {
            (ImgToBase64 as any).getBase64String(uri)
              .then((base64String: String) => {
                let uri = 'data:image/jpeg;base64,' + base64String;
                setUri(uri);
              })
              .catch((err: any) => {
                console.error(err);
              });
          })
          .catch(err => console.error(err));
      }
    }
    )

  }
  async function selectFromGallery() {

    launchImageLibrary({ mediaType: 'photo' }, async res => {
      if (res.didCancel || res.errorCode) return

      if (res.assets) {

        await ImageResizer.createResizedImage(
          res.assets[0].uri!,
          800,
          600,
          'JPEG',
          100,
        )
          .then(({ uri }) => {
            (ImgToBase64 as any).getBase64String(uri)
              .then((base64String: String) => {
                let uri = 'data:image/jpeg;base64,' + base64String;
                setUri(uri);
              })
              .catch((err: any) => {
                console.error(err);
              });
          })
          .catch(err => console.error(err));
      }
    }
    )

  }

  useEffect(() => {
    if (open) {
      if (type === 'Camera') {
        selectFromCamera()
        setHeaderTitle('Adicionar da Câmera')
      };

      if (type === 'Galeria') {
        selectFromGallery()

        setHeaderTitle('Adicionar da Galeria')
      };
    }
  }, [open, type]);

  return (
    <Portal >
      <Modal visible={open} onDismiss={() => setOpenSecondModalAddProfile(false)}>
        <KeyboardAvoidingView enabled behavior="height">
          <Container windowHeight={windowHeight} windowWidth={windowWidth}>
            <Header>
              <Title>{headerTitle}</Title>
            </Header>

            <Body>
              <Icon onPress={() =>
                type === 'Camera' ? selectFromCamera() : selectFromGallery()
              }>
                <IconImage
                  windowHeight={windowHeight}
                  style={{ resizeMode: "cover" }}
                  source={uri ? { uri } : require('../../../../assets/images/user.png')}
                />
              </Icon>

              <Input
                windowHeight={windowHeight}
                placeholder="Digite o nome"
                placeholderTextColor="gray"
                value={name}
                onChangeText={name => setName(name)}
              />
            </Body>

            <Footer>
              <ButtonCancelar onPress={() => setOpenSecondModalAddProfile(false)}>
                <ButtonTextCancelar>Cancelar</ButtonTextCancelar>
              </ButtonCancelar>
              <ButtonSalvar onPress={handleAddProfile}>
                <ButtonTextSalvar>Salvar</ButtonTextSalvar>
              </ButtonSalvar>
            </Footer>
          </Container>
        </KeyboardAvoidingView>
      </Modal>
    </Portal >
  );
};

export { AddSecondModal };
