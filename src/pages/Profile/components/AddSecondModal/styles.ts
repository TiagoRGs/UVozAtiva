import styled from 'styled-components/native';

interface Props {
  windowHeight: number;
  windowWidth: number;
}

export const Container = styled.View<Props>`
  background-color: white;
  height: ${props => `${props.windowHeight * 0.8}px`};
  width: ${props => `${props.windowWidth * 0.8}px`};
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
`;

export const Header = styled.View`
  height: 20%;
  align-items: center;
  justify-content: center;

  border-bottom-width: 0.5px;
  border-bottom-color: lightgray;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-family: Roboto;
  font-weight: bold;
`;

export const Body = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Icon = styled.TouchableOpacity`
  padding: 20px;
  align-items: center;
`;

export const IconImage = styled.Image<Omit<Props, 'windowWidth'>>`
  width: ${props => `${props.windowHeight * 0.24}px`};
  height: ${props => `${props.windowHeight * 0.24}px`};
  border-radius: 105px;
`;

export const Input = styled.TextInput<Omit<Props, 'windowWidth'>>`
  background-color: #f1f1f1;
  border-radius: 4px;
  color: black;

  height: ${props => `${props.windowHeight * 0.1}px`};
  align-self: center;
  width: 40%;
`;

export const ButtonCancelar = styled.TouchableOpacity`
  border-color: red;
  border-width: 0.4px;
  width: 50%;
  height: 100%;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 5px;
`;

export const ButtonSalvar = styled.TouchableOpacity`
  border-color: green;
  border-width: 0.4px;
  width: 50%;
  height: 100%;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  border-bottom-right-radius: 5px;
`;

export const ButtonTextCancelar = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: red;
`;
export const ButtonTextSalvar = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: green;
`;

export const Footer = styled.View`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
`;
