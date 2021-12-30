import React from 'react';
import { View, Text } from 'react-native';
import { Amount, Container, Title } from './HistoryCard.styles';

interface Props {
    title: string;
    amount: string;
    color: string;
}

export function HistoryCard({
    title, amount, color
}: Props) {
    return (
        <Container color={color}>
            <Title>{title}</Title>
            <Amount>{amount}</Amount>
        </Container>
    )
}
