import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function Detail() {
	const [loading, setLoading] = useState(true);
	const [movie, setMovie] = useState({});
	const { id } = useParams();

	const getMovie = async () => {
		const json = await (
			await fetch(
				`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
			)
		).json();
		console.log(json.data.movie);
		// {id: 53277, url: 'https://yts.mx/movies/yuzuru-hanyu-ice-story-gift-at-tokyo-dome-2023', imdb_code: 'tt26919016', title: 'Yuzuru Hanyu Ice Story GIFT at Tokyo Dome', title_english: 'Yuzuru Hanyu Ice Story GIFT at Tokyo Dome', …}
		// found: object with keys {url, hash, quality, type, is_repack, video_codec, bit_depth, audio_channels, seeds, peers, size, size_bytes, date_uploaded, date_uploaded_unix}
		setMovie(json.data.movie);
		setLoading(false);
	};
	useEffect(() => getMovie(), []);

	return (
		<div>
			<h1>Movie Detail</h1>
			{loading ? (
				<strong>Loading...</strong>
			) : (
				<div>
					<h2>{movie.title}</h2>
					<img src={movie.large_cover_image}></img>
					<ul>
						{Object.keys(movie).map((k) => {
							let v = Array.isArray(movie[k])
								? movie[k].join(", ")
								: movie[k];
							return (
								<li key={k}>
									{k} : {v}
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
}

export default Detail;
