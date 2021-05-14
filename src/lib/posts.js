const outcomes = [
    {
        id: 1,
        title: 'Two Forms of Pre-rendering 1',
        date: '2020-01-01',
        content: 'content is here1',
    },
    {
        id: 2,
        title: 'Two Forms of Pre-rendering 2',
        date: '2020-01-02',
        content: 'content is here2',
    },
];

export function getSortedPostsData() {
    return outcomes;
}

export function getAllPostIds() {
    return outcomes.map((outcome) => {
        return {
            params: {
                id: outcome.id,
            },
        };
    });
}

export function getPostData(id) {
    // Combine the data with the id
    return {
        id,
        ...outcomes.data,
    };
}
