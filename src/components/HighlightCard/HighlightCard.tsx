import React from 'react';
import { 
    Amount, 
    Container, 
    Content, 
    Header, 
    Icon, 
    LastTransaction, 
    Title 
} from './HighlightCard.styles';

interface Props {
    title: string;
    amount?: string;
    lastTransaction?: string;
    type: 'up' | 'down' | 'total'
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

export function HighlightCard({title, amount, lastTransaction, type}: Props) {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon name={icon[type]} type={type}/>
            </Header>

            <Content>
                <Amount type={type}>{amount}</Amount>
                <LastTransaction type={type}>Última entrada dia 13 de abril</LastTransaction>
            </Content>
        </Container>
    )
}
