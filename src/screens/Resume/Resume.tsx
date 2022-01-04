import React, { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { VictoryPie } from 'victory-native';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import { HistoryCard } from '../../components/HistoryCard/HistoryCard';
import { Load } from '../../components/Load/Load';

import { categories } from '../../utils/categories';
import { 
    ChartContainer, 
    Container,  
    Header, 
    Month, 
    MonthSelect, 
    MonthSelectButton, 
    MonthSelectIcon, 
    Title 
} from './Resume.styles';

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string
}

export function Resume() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const theme = useTheme();
    const {user} = useAuth();

    function handleDateChange(action: 'next' | 'prev'){
        if(action === 'next'){
            setSelectedDate(addMonths(selectedDate, 1));
        }else{
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    async function loadData() {
        setIsLoading(true);
        const dataKey = `@gofinances:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const exits = responseFormatted.filter((exit: TransactionData) => 
            exit.type === 'negative' &&
            new Date(exit.date).getMonth() === selectedDate.getMonth() &&
            new Date(exit.date).getFullYear() === selectedDate.getFullYear());

        const exitsTotal = exits.reduce((acumullator: number, exit: TransactionData) => {
            return acumullator + Number(exit.amount);
        }, 0);

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            exits.forEach((exit: TransactionData) => {
                if(exit.category === category.key){
                    categorySum += Number(exit.amount);
                }
            });

            if(categorySum > 0) {
                const totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                const percent = `${(categorySum / exitsTotal * 100).toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent
                });
            }

        });

        setTotalByCategories(totalByCategory);
        setIsLoading(false);
    }

    useFocusEffect(
        useCallback(() => {
            loadData();
        },[selectedDate])
    );

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            {isLoading ? 
                <Load />
            :
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 24, 
                        paddingBottom: useBottomTabBarHeight()
                    }}
                >
                    <MonthSelect>
                        <MonthSelectButton onPress={() => handleDateChange('prev')}>
                            <MonthSelectIcon name='chevron-left'/>
                        </MonthSelectButton>

                        <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>

                        <MonthSelectButton onPress={() => handleDateChange('next')}>
                            <MonthSelectIcon name='chevron-right'/>
                        </MonthSelectButton>
                    </MonthSelect>

                    <ChartContainer>
                        <VictoryPie 
                            data={totalByCategories}
                            colorScale={totalByCategories.map(category => category.color)}
                            style={{
                                labels: {
                                    fontSize: RFValue(18),
                                    fontWeight: 'bold',
                                    fill: theme.colors.shape
                                }
                            }}
                            labelRadius={50}
                            x='percent'
                            y='total'

                        />
                    </ChartContainer>

                    {totalByCategories.map(item => (
                        <HistoryCard
                            key={item.key}
                            title={item.name}
                            amount={item.totalFormatted}
                            color={item.color}
                        />
                    ))}
                </ScrollView>
            }
            
        </Container>
    )
}
