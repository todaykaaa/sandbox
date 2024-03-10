import React from 'react'
import {
    Box, Heading, Button,
    Center, Input, Flex, VStack
} from "@chakra-ui/react";
import { useFormik } from 'formik';
import {
    FormControl, FormLabel,
    FormErrorMessage, FormHelperText
} from "@chakra-ui/react";
import AuthService from 'app/services/auth.service';
import { useRouter } from 'next/navigation';


export default function LoginFormBlock() {

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: (values) => {
            AuthService.login(values)
                .then(() => {
                    router.push('admin/requests');
                })
        }
    });

    return (
        <Box
            width='100%'
            height='100%'
            py={1}
            mb={5}
            display='flex'
            alignItems='center'
            justifyContent='center'
        >
            <Box
                width='300px'
                height='500px'
                position='absolute'
                mt='50%'
            >
                <Center>
                    <Heading as='h3' size='lg'>Вход</Heading>
                </Center>
                <Flex align="center" justify="center">
                    <Box bg="white" p={6} rounded="md" w="100%">
                        <form onSubmit={formik.handleSubmit}>
                            <VStack spacing={4} align="flex-start">
                                <FormControl isRequired>
                                    <FormLabel htmlFor="username">Логин</FormLabel>
                                    <Input
                                        id="username"
                                        name="username"
                                        variant="filled"
                                        onChange={formik.handleChange}
                                        value={formik.values.username}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor="password">Пароль</FormLabel>
                                    <Input
                                        id="password"
                                        name="password"
                                        variant="filled"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                </FormControl>
                                <Button mt="25px" type="submit" colorScheme="purple" width="full">
                                    Отправить
                                </Button>
                            </VStack>
                        </form>
                    </Box>
                </Flex>
            </Box>
        </ Box >
    )
}