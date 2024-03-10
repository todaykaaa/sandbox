'use client'

import React from "react";
import { Box, Button, Stack } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useState, useEffect } from 'react';

export default function PaginationComponent(data: {
    sort: string, pageCount: number;
    pageNumber: number; pageSize: number;
    handleOnClick
}) {

    const [paginationButtons, setPaginationButtons] = useState(null);

    useEffect(() => {
        setPaginationButtons(() => {

            let buttonsList = [];
            let colorSchema = 'gray';

            if (data.pageNumber > 1) {
                buttonsList.push(
                    <Button
                        onClick={() => { data.handleOnClick('prev', data.sort, data.pageSize, data.pageNumber - 1) }}
                        rightIcon={<ArrowBackIcon />}
                        id='prev'
                        colorScheme={colorSchema}
                    >
                    </Button>
                );
            }

            for (let i = 0; i < data.pageCount; i++) {

                let buttonPageText: string = i + 1 + '';
                let pageNumber = i + 1;
                let buttonId = i + 1 + '';

                colorSchema = (pageNumber == data.pageNumber) ? 'blue' : 'gray';
                buttonsList.push(
                    <Button
                        onClick={() => { data.handleOnClick(buttonId, data.sort, data.pageSize, pageNumber) }}
                        colorScheme={colorSchema}
                        id={buttonId}
                    >
                        {buttonPageText}
                    </Button>
                )
            }

            if (data.pageNumber < data.pageCount) {
                buttonsList.push(
                    <Button
                        onClick={() => { data.handleOnClick('next', data.sort, data.pageSize, data.pageNumber + 1) }}
                        rightIcon={<ArrowForwardIcon />}
                        id='next'
                        colorScheme={colorSchema}
                    >
                    </Button>
                );
            }

            return buttonsList
        })

    }, [])

    return (
        <Box w='100%' alignItems='center' justifyItems='center'>
            <Stack direction='row' align='center' justifyContent='center'>
                {paginationButtons}
            </Stack>
        </Box >
    )

}
