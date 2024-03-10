'use client'

import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import { Collapse, Button } from "@chakra-ui/react"
import { Heading, Highlight, Image } from "@chakra-ui/react";

export default function HeaderBlock() {

    const photoSrc = '/img/cat.jpg';

    const [show, setShow] = React.useState(false);

    const handleToggle = () => setShow(!show);

    return (
        <Grid
            templateAreas={`"photo title"
                            "photo description"`}
            h='420px'
            gridTemplateColumns={'1fr 2fr'}
            gridTemplateRows={'1fr 1fr'}
            gap='3'
        >
            <GridItem area={"photo"}>
                <Card>
                    <CardBody>
                        <Image src={photoSrc} boxSize="90%" borderRadius="full" alt="Main Photo" />
                    </CardBody>
                </Card>
            </GridItem>
            <Card>
                <GridItem area={"title"}>
                    <CardBody>
                        <Heading as='h2' size='2xl'>Моя профессия</Heading>
                    </CardBody>
                </GridItem>
                <GridItem area={"description"}>
                    <CardBody>
                        <Collapse startingHeight={220} in={show}>
                            <Heading as='h3' size='lg'>
                                <Highlight
                                    query='Cмотреть сюда'
                                    styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100' }}
                                >
                                    Описание моей профессии. Описание моей профессии.
                                    Описание моей профессии. Описание моей профессии.
                                    Описание моей профессии. Описание моей профессии смотреть сюда.
                                    Описание моей профессии. Описание моей профессии.
                                    Описание моей профессии. Описание моей профессии.
                                    Описание моей профессии. Описание моей профессии смотреть сюда.
                                    Описание моей профессии. Описание моей профессии.
                                    Описание моей профессии. Описание моей профессии смотреть сюда.
                                </Highlight>
                            </Heading>
                        </Collapse>
                        <Button size="sm" onClick={handleToggle} mt="1rem">
                            {show ? 'Закрыть' : 'Дочитать'}
                        </Button>
                    </CardBody>
                </GridItem>
            </Card>
        </Grid>
    )

}