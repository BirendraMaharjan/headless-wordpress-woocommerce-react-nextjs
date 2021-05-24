import Head from 'next/head';
import useSWR from 'swr';
import Link from 'next/link';
import Layout from '../components/Layout';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Blog = () => {
    const { data, error } = useSWR('/api/post/recent', fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    return (
        <Layout home>
            <Head>
                <title>Next App Index</title>
            </Head>
            <section>
                <ul>
                    {data.posts.edges.map(({ node }) => (
                        <li className={`article-${node.postId}`} key={node.slug}>
                            <Link href={`blog/${node.slug}`}>
                                <a>{node.title}</a>
                            </Link>
                            <div dangerouslySetInnerHTML={{ __html: node.excerpt }}></div>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
};
export default Blog;
