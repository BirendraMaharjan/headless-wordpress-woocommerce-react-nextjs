import Layout from '../../components/Layout';
import Link from 'next/link';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import Date from '../../components/date';

const Post = ({ postData }) => {
	return (
		<>
			<Layout template="single-post">
				<Head>
					<title> {postData.title}</title>
				</Head>
				<article>
					<h1 className={utilStyles.headingXl}>{postData.title}</h1>
					<div className={utilStyles.lightText}>
						<Date dateString={postData.date} />
					</div>
					<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
				</article>
			</Layout>
		</>
	);
};
export default Post;

export async function getStaticPaths() {
	// Return a list of possible value for id
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	// Fetch necessary data for the blog post using params.id
	const postData = getPostData(params.id);
	return {
		props: {
			postData,
		},
	};
}
