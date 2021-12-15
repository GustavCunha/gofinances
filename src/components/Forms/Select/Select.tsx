import React from 'react';
import { Category, Container, Icon } from './Select.styles';

interface Props {
    title: string;
    onPress: () => void;
}

export function Select({title, onPress}: Props) {
    return (
        <Container onPress={onPress}>
            <Category>{title}</Category>
            <Icon name='chevron-down'/>
        </Container>
    )
}
