import {IResponseSearchResult} from '@/features/search-movies/types'

function getPoster(poster: string | null, quality: string) {
    if (poster) {
        return poster.includes('https')
            ? poster
            : `https://image.tmdb.org/t/p/${quality}${poster}`
    }
    return null
}

const getFullPathForPosters = (
    movie: IResponseSearchResult,
    quality = 'w300',
) => {
    const updatePosterPath = getPoster(movie.poster_path, quality)

    return {
        ...movie,
        poster_path: updatePosterPath,
    }
}

export default getFullPathForPosters
