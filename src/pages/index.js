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

// import useSWR from 'swr';

// function Profile() {
// 	const { data, error } = useSWR(
// 		'http://localhost/headless-wordpress/backend/wordpress//wp-json/',
// 		fetch,
// 	);

// 	if (error) return <div>failed to load</div>;
// 	if (!data) return <div>loading...</div>;
// 	return <div>hello {data.name}!</div>;
// }

const Index = (props) => {
    return (
        <Layout home>
            <section className="bg-white p4 my-4">
                <Hero />
            </section>
            <section className={utilStyles.headingMd}>
                <p>[Your Self Introduction]</p>
                <p>
                    (This is a sample website - you’ll be building a site like this on <a href="https://nextjs.org/learn">our Next.js tutorial</a> .)
                </p>
            </section>

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
        </Layout>
    );
};
export default Index;
