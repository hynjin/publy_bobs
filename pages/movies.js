import { connectToDatabase } from '../utils/mongodb';

export default function Movies({ movies }) {
    return (
        <div>
            <div className="text-3xl font-bold underline">Hello world!</div>
            <h1>Top 20 Movies of All Time</h1>
            <p>
                <small>(According to Metacritic)</small>
            </p>
            <ul>
                {movies.map((movie) => (
                    <li key={movie._id}>
                        <h2>{movie.title}</h2>
                        <h3>{movie.metacritic}</h3>
                        <p>{movie.plot}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const movies = await db
        .collection('movies')
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();

    return {
        props: {
            movies: JSON.parse(JSON.stringify(movies)),
        },
    };
}
