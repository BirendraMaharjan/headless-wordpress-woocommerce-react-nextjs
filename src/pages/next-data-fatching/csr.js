// client side rendered
import { useEffect, useState } from 'react';

export default function ClientSideRendered() {
    const [state, setState] = useState([]);

    async function getData() {
        const res = await fetch('https://609d00ea04bffa001792dcfd.mockapi.io/name'); // like https://github.com/api
        const data = await res.json();
        setState(data);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            {state.map((e) => (
                <h2 key={e.id}>{e.name}</h2>
            ))}
        </>
    );
}
