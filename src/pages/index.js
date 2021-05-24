import Head from 'next/head';
import useSWR from 'swr';
import Link from 'next/link';
import Layout from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';
import Hero from '../components/Hero';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Index = (props) => {
    const { data, error } = useSWR('/api/page/sample-page', fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    return (
        <Layout home>
            <Head>
                <title>Next App Index</title>
            </Head>
            <section className="bg-white p4 my-4">
                <Hero />
            </section>
            <section className={utilStyles.headingMd}>
                <h2>{data.page.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: data.page.content }}></div>
            </section>
            {
                /* eslint-disable */
                <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                    <h2 className={utilStyles.headingLg}>Blog</h2>
                    <ul className={utilStyles.list}>
                        {props.allPostsData.map(({ id, date, title }) => (
                            <li className={utilStyles.listItem} key={id}>
                                <Link href={`/posts/${id}`}>
                                    <a>{title}</a>
                                </Link>
                                <br />
                                <small className={utilStyles.lightText}>
                                    <Date dateString={date} />
                                </small>
                            </li>
                        ))}
                    </ul>
                </section>
                /* eslint-enable */
            }
        </Layout>
    );
};
export default Index;
