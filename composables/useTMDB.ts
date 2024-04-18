export const useTMDB = () => {
    const baseUrl = 'https://api.themoviedb.org/3';

    const runtime = useRuntimeConfig();
    const tmdbApiKey = runtime.public.tmdbApiKey;

    const options = {
        headers: {
            Authorization: `Bearer ${tmdbApiKey}`,
            Accept: 'application/json'
        }
    }
    const fetchMovies = async (params: string, queryParams?: string | '') => {
        return await $fetch(`${baseUrl}/movie/${params}${queryParams}` , options);
    };

    const getMovieById = async (id: string, withVideos?: boolean, queryParams?: string | '') => {
        if (withVideos) {
            queryParams = `${queryParams}&append_to_response=videos`;
        }
        return await $fetch(`${baseUrl}/movie/${id}${queryParams}`, options);
    }

    return {
        fetchMovies,
        getMovieById
    }
}
