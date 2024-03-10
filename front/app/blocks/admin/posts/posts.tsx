'use client'

import {
    AbsoluteCenter, Box, Center, Text,
    Divider, Heading, LinkBox, LinkOverlay,
    Grid, Menu, MenuList, MenuItem,
    MenuButton, IconButton, Link, CardHeader, CardBody, Card, Flex
} from "@chakra-ui/react";

import LoadingComponent from "app/components/loading";
import PaginationComponent from "app/components/pagination";

import { useState, useEffect, memo, startTransition } from 'react'
import { useRouter } from 'next/navigation';
import { AddIcon, ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";


export default function PostsBlock(params) {

    const router = useRouter();

    const [postsData, setPostsData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const [pageNumber, setPageNumber] = useState(params.unfilteredPosts.pageNumber)
    const [sort, setSort] = useState(params.unfilteredPosts.sortType)
    const [pageCount, setPageCount] = useState(params.unfilteredPosts.pageCount)
    const [pageSize, setPageSize] = useState(params.unfilteredPosts.pageSize)

    const generatePostCards = function (posts: Array<any>) {

        let postsArray = [];

        if (posts[0]) {
            posts.map((data) => {
                postsArray.push(
                    <Card variant='elevated' maxW='sm' p='1' rounded='md' mx="2" my="2">
                        <CardHeader>
                            <Flex>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Box>
                                        <Heading size='md'>{data.title}</Heading>
                                        <Text>{new Date(data.createdAt).toLocaleString()}</Text>
                                    </Box>
                                </Flex>
                                <Menu>
                                    <MenuButton
                                        as={IconButton}
                                        aria-label='Options'
                                        icon={<HamburgerIcon />}
                                        variant='outline'
                                    />
                                    <MenuList>
                                        <MenuItem onClick={() => { handleEditOnClick(data.id) }}>
                                            Редактировать
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <Text>
                                {data.text}
                            </Text>
                        </CardBody>
                    </Card>
                )
            });
        } else {
            postsArray.push(<Text>Новостей нет</Text>)
        }

        return postsArray
    }

    function handlePaginationOnClick(buttonId: string, sort: string, pageSize: number, pageNumber: number) {

        const res = fetch(
            process.env.NEXT_PUBLIC_REST_URL + `/posts?sort=${sort}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
            { cache: 'no-store' }
        ).then((res) => {
            res.json()
                .then((data) => {
                    setPostsData(generatePostCards(data.posts))
                    setPageNumber(pageNumber);
                })
        }).catch(e => { throw e })
    }

    function handleEditOnClick(postId: number) {
        router.push('/admin/post/' + postId)
    }

    useEffect(() => {
        setPostsData(generatePostCards(params.unfilteredPosts.posts))
        setLoading(false);
    }, [])

    if (isLoading) return <LoadingComponent />
    if (!postsData) return <p>Новостей нет</p>

    return (
        <Center>
            <Box
                maxWidth='1200px'
                p='30px'
                alignContent='center'
                boxShadow='2xl'
            >
                <Box position='relative' padding='3'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4'>
                        <Heading as='h4' size='md'>
                            Последние новостные посты
                        </Heading>
                    </AbsoluteCenter>
                </Box>
                <Box
                    width='100%'
                    py='10px'
                >
                    <Grid
                        gridTemplateColumns='1fr 1fr 1fr'
                    >
                        {postsData}
                    </Grid>
                </Box>
                <Box width='100%' justifyContent='center' alignItems='center'>
                    <PaginationComponent
                        key={pageNumber}
                        sort={sort}
                        pageNumber={pageNumber}
                        pageCount={pageCount}
                        pageSize={pageSize}
                        handleOnClick={handlePaginationOnClick}
                    />
                </Box>
            </Box>
        </Center>
    )
}