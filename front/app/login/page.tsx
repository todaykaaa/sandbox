import { Metadata } from 'next';
import LoginPage from 'app/pages/login';


export const metadata: Metadata = {
    title: 'Login Page',
    description: 'Description Login Page'
}

export default function Page() {

    return (
        <LoginPage />
    )
}