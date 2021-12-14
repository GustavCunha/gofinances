import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { ButtonStyled, Text } from './Button.styles';

interface Props extends TouchableOpacityProps {
    title: string;
}

export function Button({title, ...rest}: Props) {
    return (
        <ButtonStyled {...rest}>
            <Text>{title}</Text>
        </ButtonStyled>
    )
}
