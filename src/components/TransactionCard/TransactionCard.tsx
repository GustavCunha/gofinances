import React from 'react';
import { Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { categories } from '../../utils/categories';

import { 
    Amount, 
    ButtonRemove, 
    Category, 
    CategoryName, 
    Container, 
    Date, 
    Footer, 
    Icon, 
    IconButton, 
    Title 
} from './TransactionCard.styles';

export interface TransactionCardProps {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface Props {
    data: TransactionCardProps;
    handleRemove: () => void;
}

export function TransactionCard({data, handleRemove}: Props) {
    const category = categories.filter(
        item => item.key === data.category
    )[0];

    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <>
                        <ButtonRemove onPress={handleRemove}>
                            <IconButton name='trash' />
                        </ButtonRemove>
                    </>
                </Animated.View>
            )}
        >

            <Container>
                <Title>{data.name}</Title>

                <Amount type={data.type}>
                    {data.type === 'negative'&& '- ' } 
                    {data.amount}
                </Amount>

                <Footer>
                    <Category>
                        <Icon name={category.icon}/>
                        <CategoryName>{category.name}</CategoryName>
                    </Category>

                    <Date>{data.date}</Date>
                </Footer>
            </Container>
        </Swipeable>
    )
}
