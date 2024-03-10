'use client'

import { Box, LinkBox, Heading, LinkOverlay, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";


export default function BlogBlock(params) {

    const [postsData, setPostsData] = useState(null);

    const generatePostCards = function (posts: Array<any>) {

        let postsArray = [];

        if (posts[0]) {
            posts.map((data) => {
                postsArray.push(
                    <LinkBox as='article' maxW='sm' p='5' borderWidth='1px' rounded='md' mx="1">
                        <Box as='time' dateTime='2021-02-23 15:30:00 +0000 UTC'>
                            {new Date(data.createdAt).toLocaleString()}
                        </Box>
                        <Heading size='md' my='2'>
                            <LinkOverlay href='#'>
                                {data.title}
                            </LinkOverlay>
                        </Heading>
                        <Text>
                            {data.text}
                        </Text>
                    </LinkBox>
                )
            });
        } else {
            postsArray.push(<Text>Новостей нет</Text>)
        }

        return postsArray
    }

    useEffect(() => {
        setPostsData(generatePostCards(params.posts))
    }, [])

    return (
        <Box
            display='flex'
            justifyContent='center'
            width='100%'
            py={4}
            mb={4}
        >
            {postsData}
        </Box>
    )
}