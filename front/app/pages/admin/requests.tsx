'use client'

import { Box } from '@chakra-ui/react';
import RequestBlock from 'app/blocks/admin/requests/request';
import MenuBlock from 'app/blocks/admin/menu'

export default function AdminRequestsPage(requests) {

    return (
        <Box>
            <MenuBlock />
            <RequestBlock {...requests} />
        </Box>
    )
}