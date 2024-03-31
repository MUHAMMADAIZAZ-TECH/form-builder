import React from 'react';
import { Container } from '@mui/material';

const PageContainer = ({ children, maxWidth = "xs" ,sx}) => {
    return (
        <Container component='main' maxWidth={maxWidth} sx={{ flexGrow: 1, paddingY: 3 ,...sx}}>
            {children}
        </Container>
    )
}

export default PageContainer