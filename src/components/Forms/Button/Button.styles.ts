import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const ButtonStyled = styled(RectButton)`
    background-color: ${({theme}) => theme.colors.secondary};
    width: 100%;
    border-radius: 5px;
    align-items: center;
    padding: 18px;
`;

export const Text = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.medium}
    font-size: ${RFValue(14)}px;
`;