export const useMovies = () => {
    const baseUrl = 'https://api.themoviedb.org/3/movie';

    const runtime = useRuntimeConfig();
    const tmdbApiKey = runtime.public.tmdbApiKey;
    const fetchMovies = async () => {
        const response = await $fetch(`${baseUrl}/now_playing?language=fr-FR&page=1` , {
            headers: {
                Authorization: `Bearer ${tmdbApiKey}`,
                Accept: 'application/json'
            }
        });
        return response.results;
    }

    return {
        fetchMovies
    }
}
