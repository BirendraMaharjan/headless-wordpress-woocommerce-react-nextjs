// req = HTTP incoming message, res = HTTP server response
// http://localhost:3000/api/page/sample-page
const API_URL = process.env.WORDPRESS_LOCAL_API_URL;
export default async (req, res) => {
    const { slug } = req.query;

    const uri = slug.join('/');

    const headers = { 'Content-Type': 'application/json' };
    const QUERY = `query SinglePost($id: ID!) {
   page(id: $id, idType: URI) {
     title
    id
    guid
    content
  }
}`;
    //     QUERY = `query MyQuery {
    //   pages {
    //     edges {
    //       node {
    //         id
    //         uri
    //       }
    //     }
    //   }
    // }
    // `;

    // res.statusCode = 200;
    const data = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: QUERY, variables: { id: uri } }),
    });

    const json = await data.json();
    if (json.errors) {
        /* eslint-disable */
        console.log(json.errors);
        throw new Error('Failed to fetch API');
    }
    res.json(json.data);
};
