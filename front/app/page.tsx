import { Metadata } from 'next';
import IndexPage from 'app/pages/index';
import { Config } from 'config/main.config'

const restPostUrl = Config.apiHost
    + Config.apiPath
    + Config.servicePath.post;

export const metadata: Metadata = {
    title: 'My Profession',
    description: 'Description of my profession'
}

async function getPosts() {
    const res = await fetch(
        restPostUrl + '/get?sort=desc&pageSize=4&pageNumber=1',
        { cache: 'no-store' }
    )
    return res.json();
}

export default async function Page() {

    let postsData = await getPosts();

    return (
        <IndexPage posts={postsData.posts} />
    )
}