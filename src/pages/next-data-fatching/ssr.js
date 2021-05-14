// server side rendering

export default function ServerSideRendered({ state }) {
    return (
        <>
            {state.map((e) => (
                <h2 key={e.id}>{e.name}</h2>
            ))}
        </>
    );
}

export async function getServerSideProps() {
    const res = await fetch('https://609d00ea04bffa001792dcfd.mockapi.io/name'); // like https://github.com/api
    const state = await res.json();

    return {
        props: {
            state, // will be passed to the page component as props
        },
    };
}
