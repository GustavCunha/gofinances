import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from '../../components/HighlightCard/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard/TransactionCard';

import { 
    Container, 
    Header,
    HighlightCards,
    Icon,
    LoadContainer,
    LogoutButton,
    Photo,
    Title,
    TransactionList,
    Transactions,
    User,
    UserGreeting,
    UserInfo,
    UserName,
    UserWrapper,
} from './Dashboard.styles';
import { ActivityIndicator } from 'react-native';
import theme from '../../global/styles/theme';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
}

interface HighlightData {
    entries: HighlightProps,
    exits: HighlightProps,
    total: HighlightProps
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    async function loadTransaction() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let exitsTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {

            if(item.type === 'positive') {
                entriesTotal += Number(item.amount);
            }else{
                exitsTotal += Number(item.amount);
            }

            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style: 'currency', 
                currency: 'BRL'
            });

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit', 
                month: '2-digit', 
                year: '2-digit'
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date
            }
        });

        setTransactions(transactionsFormatted);
        const total = entriesTotal - exitsTotal;

        setHighlightData({
            entries: {amount: entriesTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })},
            exits: {amount: exitsTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })},
            total: {amount: total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}
        })
        // console.log(transactionsFormatted);
        setIsLoading(false);
    }

    useEffect(() => {
        let isActive = true;

        if(isActive) {
            loadTransaction();
        }

        return () => {
            isActive = false
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadTransaction();
        }, [])
    );

    return (
        <Container>
            {isLoading ? 
                <LoadContainer>
                    <ActivityIndicator 
                        color={theme.colors.primary} 
                        size='large'
                    /> 
                </LoadContainer>
            :
                <>
                <Header>
                    <UserWrapper>
                        <UserInfo>
                            <Photo source={{uri: 'https://avatars.githubusercontent.com/u/55558998?s=96&v=4'}}/>
                            <User>
                                <UserGreeting>Olá,</UserGreeting>
                                <UserName>Gustavo</UserName>                 
                            </User>    
                        </UserInfo> 

                        <LogoutButton onPress={()=>{}}>
                            <Icon name='power'/>
                        </LogoutButton>
                    </UserWrapper>
                </Header>

                <HighlightCards>
                    <HighlightCard 
                        title='Entradas'
                        amount={highlightData.entries.amount} 
                        type='up'
                    />
                    <HighlightCard 
                        title='Saídas' 
                        amount={highlightData.exits.amount}
                        type='down'
                    />
                    <HighlightCard 
                        title='Total'
                        amount={highlightData.total.amount}
                        type='total'
                    />
                </HighlightCards>

                <Transactions>
                    <Title>Listagem</Title>

                    <TransactionList 
                        data={transactions}
                        renderItem={({item}) => <TransactionCard data={item}/>}
                        keyExtractor={item => item.id}
                    />

                    
                </Transactions>
                </>
            }
        </Container>
    )
}
