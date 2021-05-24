// req = HTTP incoming message, res = HTTP server response
// http://localhost:3000/api/page/sample-page
const API_URL = process.env.WORDPRESS_LOCAL_API_URL;
export default async (req, res) => {
    const headers = { 'Content-Type': 'application/json' };
    const QUERY = `query RecentPosts {
  posts(first: 3, where: {orderby: {field: DATE, order: DESC}, status: PUBLISH}){
    edges {
      node {
        postId
        slug
        title
        excerpt
      }
    }
  }
}`;

    // res.statusCode = 200;
    const data = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: QUERY }),
    });

    const json = await data.json();
    if (json.errors) {
        /* eslint-disable */
        console.log(json.errors);
        throw new Error('Failed to fetch API');
    }
    res.json(json.data);
};
