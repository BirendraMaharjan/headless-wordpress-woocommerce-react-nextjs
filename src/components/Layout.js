import Head from 'next/head';
import styles from './layout.module.css';
import Header from './Header';

export const siteTitle = 'Next.js React woocommerce Sample Website';

const Layout = (props, template) => {
    return (
        <div id="page" className={`${template}site`}>
            <Head>
                <title>{siteTitle}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/images/favicon.ico" />
                <link rel="stylesheet" href="https://bootswatch.com/5/flatly/bootstrap.min.css" />
                <link rel="stylesheet" href="http://localhost/headless-wordpress/backend/wordpress/wp-includes/css/dist/block-library/style.min.css" />
            </Head>
            <Header />
            <div id="primary" className={`${styles.background} site-main container`}>
                {props.template}
                {props.children}
            </div>
        </div>
    );
};

export default Layout;
