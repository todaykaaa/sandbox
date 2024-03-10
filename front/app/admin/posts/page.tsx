import AdminPostsPage from 'app/pages/admin/posts';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Admin Page',
    description: 'This is adminka posts page'
}

async function getPosts() {
    const res = await fetch(
        process.env.NEXT_PUBLIC_REST_URL + '/posts?sort=desc&pageSize=6&pageNumber=1',
        { cache: 'no-store' }
    )
    return res.json();
}

export default async function Page() {

    let postsData = await getPosts();
    const posts = {
        unfilteredPosts: postsData
    }

    return (
        <AdminPostsPage {...posts} />
    )
}