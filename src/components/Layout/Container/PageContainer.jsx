import React from 'react';
import { Container } from '@mui/material';

const PageContainer = ({ children, maxWidth = "xs" }) => {
    return (
        <Container component='main' maxWidth={maxWidth} sx={{ flexGrow: 1, paddingX: 3, paddingY: 3 }}>
            {children}
        </Container>
    )
}

export default PageContainer