import AdminPostPage from 'app/pages/admin/post';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Post Page',
    description: 'This is Edit Post Page'
}

async function getPost(postId: string) {
    const res = await fetch(
        process.env.NEXT_PUBLIC_REST_URL + '/post/' + postId,
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