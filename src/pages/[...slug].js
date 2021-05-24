import Head from 'next/head';
// eslint-disable-next-line no-unused-vars
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '../components/Layout';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Page = (props) => {
    /* const router = useRouter();
    const slug = router.query.slug || []; */
    const { slug } = props;

    const { data, error } = useSWR(`/api/page/${slug.join('/')}`, fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    return (
        <Layout>
            <Head>
                <title>Next App Index</title>
            </Head>
            <section>
                <h2>{data.page.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: data.page.content }}></div>
            </section>
        </Layout>
    );
};
export default Page;

export const getStaticProps = async ({ params }) => {
    return {
        props: { slug: params.slug },
    };
};

export const getStaticPaths = async () => {
    const API_URL = process.env.WORDPRESS_LOCAL_API_URL;
    const headers = { 'Content-Type': 'application/json' };
    const QUERY = `query MyQuery {
  pages {
    edges {
      node {
        id
        uri
      }
    }
  }
}
`;

    // res.statusCode = 200;
    const allPages = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: QUERY }),
    });

    const {
        data: {
            pages: { edges },
        },
    } = await allPages.json();

    const paths = edges.map(({ node }) => {
        const { uri } = node;
        return {
            params: {
                slug: uri.split('/').filter((i) => i),
            },
        };
    });

    return {
        paths,
        fallback: false,
    };

    // const json = await data.json();
    //
    // return {
    //     paths: json.data.pages.edges.map(({ node }) => `${node.uri}`) || [],
    //     fallback: true,
    // };
};
