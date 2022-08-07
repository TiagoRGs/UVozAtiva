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
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

export const Icon = styled.TouchableOpacity`
  padding: 20px;
  align-items: center;
`;

export const IconImage = styled.Image<Omit<Props, 'windowWidth'>>`
  width: ${props => `${props.windowHeight * 0.22}px`};
  height: ${props => `${props.windowHeight * 0.22}px`};
`;

export const Description = styled.Text`
  font-size: 20px;
`;

export const Button = styled.TouchableOpacity`
  border-color: red;
  border-width: 0.4px;
  padding: 12px;
  width: 100%;
  height: 25%;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const ButtonText = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: red;
`;
