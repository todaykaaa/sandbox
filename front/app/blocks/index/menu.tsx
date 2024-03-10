'use client'

import { Box, ButtonGroup, Button } from "@chakra-ui/react";
import { useRouter } from 'next/navigation';

export default function MenuBlock() {

    const router = useRouter();

    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            width='100%'
            py={7}
            bgImage="url('http://localhost:3000/img/office.jpg')"
            bgPosition='center'
            bgRepeat='no-reapeat'
            mb={2}
        >
            <ButtonGroup gap='6'>
                <Button colorScheme='whatsapp' onClick={() => router.push('/')}>Сертификаты</Button>
                <Button colorScheme='yellow' onClick={() => router.push('/')}>Расписание</Button>
                <Button colorScheme='blue' onClick={() => router.push('/admin/requests')}>Админка</Button>
            </ButtonGroup>
        </Box>
    )

}