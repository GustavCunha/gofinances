import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const OutputText = styled.Text`
    width: 100%;
    background-color: ${({theme}) => theme.colors.shape};
    color: ${({theme}) => theme.colors.title};

    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};

    padding: 16px 18px;
`;