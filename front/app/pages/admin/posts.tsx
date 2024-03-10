'use client'

import { Box } from '@chakra-ui/react';
import PostsBlock from 'app/blocks/admin/posts/posts';
import MenuBlock from 'app/blocks/admin/menu'

export default function AdminPostsPage(requests) {

    return (
        <Box>
            <MenuBlock />
            <PostsBlock {...requests} />
        </Box>
    )
}