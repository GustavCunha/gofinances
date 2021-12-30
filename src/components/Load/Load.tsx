import React from 'react';
import { useTheme } from 'styled-components';
import { Container, Icon } from './Load.styles';

export function Load() {
    const theme = useTheme();

    return (
        <Container>
            <Icon 
                color={theme.colors.primary}
                size='large'
            />
        </Container>
    )
}
