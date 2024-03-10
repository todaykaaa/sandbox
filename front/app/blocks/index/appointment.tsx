import React from 'react'
import { CalendarIcon } from "@chakra-ui/icons";
import {
    Box, Heading, Button,
    Icon, Input, Flex, VStack, useToast
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
    Modal, ModalOverlay,
    ModalContent, ModalHeader,
    ModalBody, ModalCloseButton
} from "@chakra-ui/react";
import { useFormik } from 'formik';
import {
    FormControl, FormLabel,
    FormErrorMessage, FormHelperText
} from "@chakra-ui/react";


export default function AppointmentBlock() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()

    const [overlay, setOverlay] =
        React.useState(<ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
        />);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            middleName: "",
            phoneNumber: "",
            email: ""
        },
        onSubmit: (values) => {
            fetch(process.env.NEXT_PUBLIC_REST_URL + '/request', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            }).then((res) => {
                onClose();
                if (res.status == 201) {
                    toast({
                        title: 'Заявка создана',
                        description: "Спасибо за доверие, мы вам позвоним :)",
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

            }).catch((e) => {
                throw e
            })

        }
    });

    return (
        <Box
            display="flex"
            justifyContent='center'
            width='100%'
            py={1}
            mb={5}
        >
            <Heading as='h3' size='lg'>Ближайшая дата записи: 25.02.2024</Heading>
            <Button ml="10" rightIcon={<CalendarIcon />} colorScheme='teal' variant='outline'
                onClick={() => {
                    setOverlay(<ModalOverlay
                        bg='none'
                        backdropFilter='auto'
                        backdropInvert='80%'
                        backdropBlur='2px'
                    />);
                    onOpen();
                }
                }>
                Записаться
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>Оставить заявку</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Flex align="center" justify="center">
                            <Box bg="white" p={6} rounded="md" w="100%">
                                <form onSubmit={formik.handleSubmit}>
                                    <VStack spacing={4} align="flex-start">
                                        <FormControl isRequired>
                                            <FormLabel htmlFor="firstName">Имя</FormLabel>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                variant="filled"
                                                onChange={formik.handleChange}
                                                value={formik.values.firstName}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel htmlFor="lastName">Фамилия</FormLabel>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                variant="filled"
                                                onChange={formik.handleChange}
                                                value={formik.values.lastName}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel htmlFor="lastName">Отчество</FormLabel>
                                            <Input
                                                id="middleName"
                                                name="middleName"
                                                variant="filled"
                                                onChange={formik.handleChange}
                                                value={formik.values.middleName}
                                            />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel htmlFor="lastName">Телефон для связи</FormLabel>
                                            <Input
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                variant="filled"
                                                onChange={formik.handleChange}
                                                value={formik.values.phoneNumber}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel htmlFor="lastName">Email</FormLabel>
                                            <Input
                                                id="email"
                                                name="email"
                                                variant="filled"
                                                onChange={formik.handleChange}
                                                value={formik.values.email}
                                            />
                                        </FormControl>
                                        <Button mt="25px" type="submit" colorScheme="purple" width="full">
                                            Отправить
                                        </Button>
                                    </VStack>
                                </form>
                            </Box>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ Box >
    )

}