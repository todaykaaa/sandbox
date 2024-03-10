'use client'

import React from "react";
import { Box, Heading, Spinner } from "@chakra-ui/react";

export default function LoadingComponent() {

    return (
        <Box w='100%' h='100%'>
            <Box
                position='fixed'
                top='40%'
                left='50%'
            >
                <Heading>Загрузка...</Heading>
                <Spinner
                    position='relative'
                    left='30%'
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                    m='10px'
                />
            </Box>
        </Box>
    )

}