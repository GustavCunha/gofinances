import React from 'react';
import { View, Text } from 'react-native';
import { Amount, Container, Content, Header, LastTransaction, Title } from './HighlightCard.styles';

export function HighlightCard() {
    return (
        <Container>
            <Header>
                <Title></Title>
            </Header>

            <Content>
                <Amount>R$ 500,00</Amount>
                <LastTransaction>Última entrada dia 13 de abril</LastTransaction>
            </Content>
        </Container>
    )
}
