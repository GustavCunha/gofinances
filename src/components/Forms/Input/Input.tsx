import React from 'react';
import { TextInputProps } from 'react-native';

import { InputStyled } from './Input.styles';

type Props = TextInputProps;

export function Input({...rest}: Props) {
    return (
        <InputStyled {...rest}/>
    )
}
