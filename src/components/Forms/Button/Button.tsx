import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { ButtonStyled, Text } from './Button.styles';

interface Props extends RectButtonProps {
    title: string;
    onPress: () => void;
}

export function Button({title, onPress, ...rest}: Props) {
    return (
        <ButtonStyled {...rest} onPress={onPress}>
            <Text>{title}</Text>
        </ButtonStyled>
    )
}
