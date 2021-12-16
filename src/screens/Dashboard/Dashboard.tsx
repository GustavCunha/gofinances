import React from 'react';

import { HighlightCard } from '../../components/HighlightCard/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard/TransactionCard';

import { 
    Container, 
    Header,
    HighlightCards,
    Icon,
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

const data: DataListProps[] = [
    {
        id: '1',
        type: 'positive',
        title:'Desenvolvimento de Site',
        amount:'R$ 10.000,00',
        category:{
            name: 'Vendas',
            icon: 'dollar-sign',
        },
        date:'14/12/2021',
    },
    {
        id: '2',
        type: 'negative',
        title:'Fatura de Cartão',
        amount:'R$ 1.000,00',
        category:{
            name: 'Cartões',
            icon: 'credit-card',
        },
        date:'13/12/2021',
    },
    {
        id: '3',
        type: 'negative',
        title:'Aluguel do Apartamento',
        amount:'R$ 600,00',
        category:{
            name: 'Casa',
            icon: 'home',
        },
        date:'13/12/2021',
    },
]

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    return (
        <Container>
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
                    amount='R$ 500,00' 
                    type='up'
                />
                <HighlightCard 
                    title='Saídas' 
                    amount='R$ 200,00'
                    type='down'
                />
                <HighlightCard 
                    title='Total'
                    amount='R$ 300,00'
                    type='total'
                />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList 
                    data={data}
                    renderItem={({item}) => <TransactionCard data={item}/>}
                    keyExtractor={item => item.id}
                />

                
            </Transactions>
        </Container>
    )
}
