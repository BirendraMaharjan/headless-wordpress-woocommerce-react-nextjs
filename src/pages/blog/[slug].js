import Head from 'next/head';
import useSWR from 'swr';
import Layout from '../../components/Layout';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Blog = (props) => {
    const { slug } = props;

    const { data, error } = useSWR(`/api/post/${slug}`, fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    return (
        <Layout>
            <Head>
                <title>Next App Index</title>
            </Head>
            <section>
                <h2>{data.post.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: data.post.content }}></div>
            </section>
        </Layout>
    );
};
export default Blog;

export const getStaticProps = async ({ params }) => {
    return {
        props: { slug: params.slug },
    };
};

export const getStaticPaths = async () => {
    const API_URL = process.env.WORDPRESS_LOCAL_API_URL;
    const headers = { 'Content-Type': 'application/json' };
    const QUERY = `query MyQuery {
  posts {
    edges {
      node {
        slug
      }
    }
  }
}
`;

    // res.statusCode = 200;
    const allPosts = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: QUERY }),
    });

    const {
        data: {
            posts: { edges },
        },
    } = await allPosts.json();

    const paths = edges.map(({ node }) => {
        const { slug } = node;
        return {
            params: {
                slug: `${slug}`,
            },
        };
    });

    return {
        paths,
        fallback: false,
    };
};
