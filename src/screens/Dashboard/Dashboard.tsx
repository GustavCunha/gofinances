import React, {useCallback, useEffect, useState} from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HighlightCard } from '../../components/HighlightCard/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard/TransactionCard';

import theme from '../../global/styles/theme';

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
import { Load } from '../../components/Load/Load';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
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

    function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative'){
        const lastTransaction = new Date(
        Math.max.apply(Math, collection
        .filter((transaction) => transaction.type === type)
        .map((transaction) => new Date(transaction.date).getTime())));

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month: 'long'})} de ${lastTransaction.getFullYear()}`; 
    }

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

        const lastTransactionsEntries = getLastTransactionDate(transactions, 'positive');
        const lastTransactionsExits = getLastTransactionDate(transactions, 'negative');
        const totalInterval = `01 a ${lastTransactionsExits}`;

        const total = entriesTotal - exitsTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última entrada dia ${lastTransactionsEntries}`
            },
            exits: {
                amount: exitsTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última entrada dia ${lastTransactionsExits}`
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval
            }
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
                <Load />
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
                        lastTransaction={highlightData.entries.lastTransaction}
                    />
                    <HighlightCard 
                        title='Saídas' 
                        amount={highlightData.exits.amount}
                        type='down'
                        lastTransaction={highlightData.exits.lastTransaction}
                    />
                    <HighlightCard 
                        title='Total'
                        amount={highlightData.total.amount}
                        type='total'
                        lastTransaction={highlightData.total.lastTransaction}
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
