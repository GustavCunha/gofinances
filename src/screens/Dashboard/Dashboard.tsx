import React from 'react';
import {Feather} from '@expo/vector-icons';

import { 
    Container, 
    Header,
    Icon,
    Photo,
    User,
    UserGreeting,
    UserInfo,
    UserName,
    UserWrapper,
} from './Dashboard.styles';
import { HighlightCard } from '../../components/HighlightCard/HighlightCard';

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
                    <Icon name='power'/>
                </UserWrapper>
            </Header>

            <HighlightCard />
        </Container>
    )
}
