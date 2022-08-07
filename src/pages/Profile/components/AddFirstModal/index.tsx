import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import {
  Body,
  Container,
  Header,
  Icon,
  Title,
  Button,
  ButtonText,
  Description,
  IconImage,
} from './styles';

interface Props {
  open: boolean;
  close: (a: boolean) => void;
  setTitleSecondModal: (title: string) => void;
  setOpenSecondModalAddProfile: (a: boolean) => void;
}

const AddFirstModal: React.FC<Props> = ({
  open,
  close,
  setTitleSecondModal,
  setOpenSecondModalAddProfile,
}) => {
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;



  return (
    <Portal>
      <Modal visible={open} onDismiss={() => close(false)} >
        <Container windowHeight={windowHeight} windowWidth={windowWidth}>
          <Header>
            <Title>Adicionar perfil</Title>
          </Header>
          <Body>
            <Icon
              onPress={() => {
                setTitleSecondModal('Camera');
                setOpenSecondModalAddProfile(true);
              }}>
              <IconImage
                windowHeight={windowHeight}
                source={require('../../../../assets/images/camera.png')}
              />
              <Description>Câmera</Description>
            </Icon>
            <Icon
              onPress={() => {
                setTitleSecondModal('Galeria');
                setOpenSecondModalAddProfile(true);
              }}>
              <IconImage
                windowHeight={windowHeight}
                source={require('../../../../assets/images/gallery.png')}
              />
              <Description>Galeria</Description>
            </Icon>

          </Body>
          <Button onPress={() => close(false)}>
            <ButtonText>Cancelar</ButtonText>
          </Button>
        </Container>
      </Modal>
    </Portal>
  );
};

export { AddFirstModal };
