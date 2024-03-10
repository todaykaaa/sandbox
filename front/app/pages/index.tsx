'use client'

import { Box } from '@chakra-ui/react';
import HeaderBlock from 'app/blocks/index/header';
import MenuBlock from 'app/blocks/index/menu';
import BlogBlock from 'app/blocks/index/blog';
import AppointmentBlock from 'app/blocks/index/appointment';

export default function IndexPage(posts) {

    return (
        <Box>
            <HeaderBlock />
            <MenuBlock />
            <BlogBlock {...posts} />
            <AppointmentBlock />
        </Box>
    )
}