import React from 'react';

import { 
    Amount, 
    Category, 
    CategoryName, 
    Container, 
    Date, 
    Footer, 
    Icon, 
    Title 
} from './TransactionCard.styles';

interface CategoryProps {
    name: string;
    icon: string;
}

export interface TransactionCardProps {
    type: 'positive' | 'negative';
    title: string;
    amount: string;
    category: CategoryProps;
    date: string;
}

interface Props {
    data: TransactionCardProps
}

export function TransactionCard({data}: Props) {
    return (
        <Container>
            <Title>{data.title}</Title>

            <Amount type={data.type}>
                {data.type === 'negative'&& '- ' } 
                {data.amount}
            </Amount>

            <Footer>
                <Category>
                    <Icon name={data.category.icon}/>
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>

                <Date>{data.date}</Date>
            </Footer>
        </Container>
    )
}
