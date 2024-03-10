'use client'

import {
    AbsoluteCenter, Box, Center,
    Divider, Heading, Button
} from "@chakra-ui/react";

import LoadingComponent from "app/components/loading";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'

import { useState, useEffect, startTransition } from 'react'
import { useRouter } from 'next/navigation';


export default function RequestBlock(requests) {

    const router = useRouter();

    function updateRequest(id: string,
        recalled?: boolean,
        answered?: boolean,
        appointment?: boolean) {

        function Request(recalled?: boolean, answered?: boolean, appointment?: boolean) {
            this.recalled = recalled
            this.answered = answered
            this.appointment = appointment
        }
        fetch(process.env.NEXT_PUBLIC_REST_URL + '/request/' + id, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(new Request(recalled, answered, appointment))
        });

        startTransition(() => {
            window.location.reload()
        });
    }

    function deleteRequest(id: string) {
        fetch(process.env.NEXT_PUBLIC_REST_URL + '/request/' + id, {
            method: 'DELETE'
        });
        startTransition(() => {
            window.location.reload()
        });
    }

    const [tBodyNeedCallData, setTBodyNeedCallData] = useState(null);
    const [tBodyNeedRecallData, setTBodyNeedRecallData] = useState(null);
    const [tBodyAppointmentData, setTBodyAppointmentData] = useState(null);

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (requests.needCall[0]) {
            setTBodyNeedCallData(
                requests.needCall.map((data) => {
                    return (
                        <Tr>
                            <Td id={data.id}>{data.createdAt}</Td>
                            <Td id={data.id}>{data.lastName}</Td>
                            <Td id={data.id}>{data.firstName}</Td>
                            <Td id={data.id}>{data.middleName}</Td>
                            <Td id={data.id}>{data.phoneNumber}</Td>
                            <Td id={data.id}>{data.email}</Td>
                            <Td>
                                <Button
                                    id={data.id + '_yes'}
                                    value={data.id.toString()}
                                    colorScheme='whatsapp'
                                    size='sm'
                                    onClick={() => { updateRequest(data.id, true, true, true) }}
                                >
                                    Да
                                </Button>
                                <Button
                                    id={data.id + '_no'}
                                    value={data.id.toString()}
                                    colorScheme='pink'
                                    size='sm'
                                    ml='5px'
                                    onClick={() => { deleteRequest(data.id) }}
                                >
                                    Нет
                                </Button>
                                <Button
                                    id={data.id + '_no_answer'}
                                    value={data.id.toString()}
                                    colorScheme='teal'
                                    size='sm'
                                    ml='5px'
                                    onClick={() => { updateRequest(data.id, true, false) }}
                                >
                                    Не ответил
                                </Button>
                            </Td>
                        </Tr>
                    )
                }));
        } else {
            setTBodyNeedCallData(<Tr></Tr>)
        }

        if (requests.needCall[0]) {
            setTBodyNeedRecallData(
                requests.needRecall.map((data) => {
                    return (
                        <Tr>
                            <Td id={data.id}>{data.createdAt}</Td>
                            <Td id={data.id}>{data.lastName}</Td>
                            <Td id={data.id}>{data.firstName}</Td>
                            <Td id={data.id}>{data.middleName}</Td>
                            <Td id={data.id}>{data.phoneNumber}</Td>
                            <Td id={data.id}>{data.email}</Td>
                            <Button
                                id={data.id + '-yes'}
                                value={data.id.toString()}
                                colorScheme='whatsapp'
                                size='sm'
                                m='5px'
                                onClick={() => { updateRequest(data.id, true, true, true) }}
                            >
                                Да
                            </Button>
                            <Button
                                id={data.id + '-no'}
                                value={data.id.toString()}
                                colorScheme='pink'
                                size='sm'
                                onClick={() => { deleteRequest(data.id) }}
                            >
                                Нет
                            </Button>
                        </Tr>
                    )
                }));
        } else {
            setTBodyNeedRecallData(<Tr></Tr>)
        }

        if (requests.needCall[0]) {
            setTBodyAppointmentData(
                requests.appointed.map((data) => {
                    return (
                        <Tr>
                            <Td id={data.id}>{data.createdAt}</Td>
                            <Td id={data.id}>{data.lastName}</Td>
                            <Td id={data.id}>{data.firstName}</Td>
                            <Td id={data.id}>{data.middleName}</Td>
                            <Td id={data.id}>{data.phoneNumber}</Td>
                            <Td id={data.id}>{data.email}</Td>
                            <Button
                                id={data.id + '-delete'}
                                value={data.id.toString()}
                                colorScheme='red'
                                size='sm'
                                m='5px'
                                onClick={() => { deleteRequest(data.id) }}
                            >
                                Удалить
                            </Button>
                        </Tr>
                    )
                }));
        } else {
            setTBodyAppointmentData(<Tr></Tr>)
        }

        setLoading(false);
    }, [])

    if (isLoading) return <LoadingComponent />
    if (!tBodyNeedCallData &&
        !tBodyNeedRecallData &&
        !tBodyAppointmentData) return <p>No Requests</p>

    return (
        <Center>
            <Box
                maxWidth='1200px'
                p='30px'
                alignContent='center'
                boxShadow='2xl'
            >
                <Box position='relative' padding='10'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4'>
                        <Heading as='h4' size='md'>
                            Новые заявки
                        </Heading>
                    </AbsoluteCenter>
                </Box>
                <Box
                    width='100%'
                    py='10px'
                >
                    <TableContainer>
                        <Table variant='striped' size='sm'>
                            <Thead>
                                <Tr>
                                    <Th>Дата заявки</Th>
                                    <Th>Фамилия</Th>
                                    <Th>Имя</Th>
                                    <Th>Отчество</Th>
                                    <Th>Телефон</Th>
                                    <Th>Почта</Th>
                                    <Th>Встреча?</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {tBodyNeedCallData}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>

                <Box position='relative' padding='10'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4'>
                        <Heading as='h4' size='md'>
                            Человек не ответил
                        </Heading>
                    </AbsoluteCenter>
                </Box>
                <Box
                    width='100%'
                    py='10px'
                >
                    <TableContainer>
                        <Table variant='striped' size='sm'>
                            <Thead>
                                <Tr>
                                    <Th>Дата заявки</Th>
                                    <Th>Фамилия</Th>
                                    <Th>Имя</Th>
                                    <Th>Отчество</Th>
                                    <Th>Телефон</Th>
                                    <Th>Почта</Th>
                                    <Th>Встреча?</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {tBodyNeedRecallData}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>

                <Box position='relative' padding='10'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4'>
                        <Heading as='h4' size='md'>
                            Встреча назначена
                        </Heading>
                    </AbsoluteCenter>
                </Box>
                <Box
                    width='100%'
                    py='10px'
                >
                    <TableContainer>
                        <Table variant='striped' size='sm'>
                            <Thead>
                                <Tr>
                                    <Th>Дата заявки</Th>
                                    <Th>Фамилия</Th>
                                    <Th>Имя</Th>
                                    <Th>Отчество</Th>
                                    <Th>Телефон</Th>
                                    <Th>Почта</Th>
                                    <Th>Удалить</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {tBodyAppointmentData}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Center>
    )
}