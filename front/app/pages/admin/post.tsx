'use client'

import { Box } from '@chakra-ui/react';
import PostBlock from 'app/blocks/admin/post/post';
import MenuBlock from 'app/blocks/admin/menu'

export default function AdminPostsPage(post) {

    return (
        <Box>
            <MenuBlock />
            <PostBlock {...post} />
        </Box>
    )
}