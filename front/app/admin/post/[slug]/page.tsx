import AdminPostPage from 'app/pages/admin/post';
import { Metadata } from 'next';
import { Config } from 'config/main.config'

const restPostUrl = Config.apiHost
    + Config.apiPath
    + Config.servicePath.post;


export const metadata: Metadata = {
    title: 'Post Page',
    description: 'This is Edit Post Page'
}

async function getPost(postId: string) {
    const res = await fetch(
        restPostUrl + '/get/' + postId,
        { cache: 'no-store' }
    ).catch(e => { throw e })
    return res.json();
}

export default async function Page({ params }: { params: { slug: string } }) {

    let postData = await getPost(params.slug);

    return (
        <AdminPostPage post={postData} />
    )
}