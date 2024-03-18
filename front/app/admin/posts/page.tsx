import AdminPostsPage from 'app/pages/admin/posts';
import { Metadata } from 'next';
import { Config } from 'config/main.config'

const restPostUrl = Config.apiHost
    + Config.apiPath
    + Config.servicePath.post;

export const metadata: Metadata = {
    title: 'Admin Page',
    description: 'This is adminka posts page'
}

async function getPosts() {
    const res = await fetch(
        restPostUrl + '/get?sort=desc&pageSize=6&pageNumber=1',
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