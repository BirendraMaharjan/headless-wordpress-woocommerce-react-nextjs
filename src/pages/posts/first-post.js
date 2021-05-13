import Layout from '../../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';

import Image from 'next/image';

const YourComponent = () => (
	<Image
		src="/images/a-digital-marketing-agency-that-helps-you-go-beyond-your-ambitions.jpg" // Route of the image file
		height={144} // Desired size with correct aspect ratio
		width={144} // Desired size with correct aspect ratio
		className={utilStyles.borderCircle}
		alt="Your Name"
	/>
);

const FirstPost = () => {
	return (
		<>
			<Layout template="single-post">
				<Head>
					<title>First Post</title>
				</Head>
				<h1>First Post</h1>
				<YourComponent />
				<h2>
					<Link href="/">
						<a>Back to home</a>
					</Link>
				</h2>
			</Layout>
		</>
	);
};

export default FirstPost;
