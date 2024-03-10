'use client'

import {
    AbsoluteCenter, Box, Center,
    Divider, Heading, VStack, Button, FormControl, Input, FormLabel, Textarea, useToast
} from "@chakra-ui/react";

import LoadingComponent from "app/components/loading";
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


export default function PostBlock(data) {

    const toast = useToast()

    const formik = useFormik({
        initialValues: {
            title: '',
            text: '',
        },
        onSubmit: (values) => {
            fetch(process.env.NEXT_PUBLIC_REST_URL + '/post/' + postData.id, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            }).then((res) => {
                if (res.status == 200) {
                    toast({
                        title: 'Пост сохранен',
                        description: "Новая версия новостного поста сохранена в базе",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                } else {
                    res.json()
                        .then((json) => {
                            toast({
                                title: json.error ? json.error : 'Ошибка',
                                description: json.message ? json.message : 'Статус ошибки: ' + json.statusCode,
                                status: 'error',
                                duration: 3000,
                                isClosable: true,
                            })
                        })
                }
            }).catch((e) => { throw e });
        }
    });

    const router = useRouter();

    const [postData, setPostData] = useState(null)
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setPostData(data.post)
        setLoading(false);
    }, [])

    if (isLoading) return <LoadingComponent />
    if (!postData) return <p>Пост не загрузился</p>
    formik.initialValues.title = postData.title;
    formik.initialValues.text = postData.text;

    return (
        <Center>
            <Box
                maxWidth='1200px'
                width='100%'
                p='30px'
                alignContent='center'
                boxShadow='2xl'
            >
                <Box position='relative' padding='3'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4'>
                        <Heading as='h4' size='md'>
                            Редактирование новости
                        </Heading>
                    </AbsoluteCenter>
                </Box>
                <Box
                    width='100%'
                    py='10px'
                >
                    <form onSubmit={formik.handleSubmit}>
                        <VStack spacing={4} align="flex-start">
                            <FormControl isRequired>
                                <FormLabel htmlFor="title">Заголовок</FormLabel>
                                <Input
                                    id="title"
                                    name="title"
                                    variant="filled"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="text">Текст</FormLabel>
                                <Textarea
                                    id="text"
                                    name="text"
                                    height="500px"
                                    variant="filled"
                                    onChange={formik.handleChange}
                                    value={formik.values.text}
                                />
                            </FormControl>
                            <Button mt="25px" type="submit" colorScheme="purple" width="full">
                                Отправить
                            </Button>
                        </VStack>
                    </form>
                </Box>
            </Box>
        </Center>
    )
}