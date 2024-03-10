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
                <Button colorScheme='whatsapp' onClick={() => router.push('/admin/requests')}>Заявки</Button>
                <Button colorScheme='yellow' onClick={() => router.push('/admin/posts')}>Новости</Button>
                <Button colorScheme='blue' onClick={() => router.push('/admin/schedule')}>Расписание</Button>
            </ButtonGroup>
        </Box>
    )

}