import AdminRequestsPage from 'app/pages/admin/requests';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Admin Page',
    description: 'This is adminka'
}

async function getNeedCallRequests() {
    const res = await fetch(
        process.env.NEXT_PUBLIC_REST_URL + '/requests?recalled=false',
        { cache: 'no-store' }
    )
    return res.json();
}
async function getNeedRecallRequests() {
    const res = await fetch(
        process.env.NEXT_PUBLIC_REST_URL + '/requests?recalled=true&answered=false',
        { cache: 'no-store' }
    )
    return res.json();
}

async function getAppointedRequests() {
    const res = await fetch(
        process.env.NEXT_PUBLIC_REST_URL + '/requests?recalled=true&answered=true&appointment=true',
        { cache: 'no-store' }
    )
    return res.json();
}

async function changeTimeFormat(data) {
    return new Promise((resolve) => {
        if (data[0]) {
            data.map((request) => {
                let newDate = new Date(request.createdAt)
                    .toLocaleString()
                request.createdAt = newDate;
            })
        }

        resolve(data)
    })
}

export default async function Page() {

    let [
        needCallRequestsData,
        needRecallRequestsData,
        appointedRequestsData
    ] = await Promise.all([
        getNeedCallRequests(),
        getNeedRecallRequests(),
        getAppointedRequests()])

    needCallRequestsData = await changeTimeFormat(needCallRequestsData);
    needRecallRequestsData = await changeTimeFormat(needRecallRequestsData);
    appointedRequestsData = await changeTimeFormat(appointedRequestsData);

    const requests = {
        needCall: needCallRequestsData,
        needRecall: needRecallRequestsData,
        appointed: appointedRequestsData,
    }

    return (
        <AdminRequestsPage {...requests} />
    )
}