export interface IResponseMovies {
    page: number
    results: IResponseSearchResult[]
    total_pages: number
    total_results: number
}

export interface IResponseSearchResult {
    adult: boolean
    backdrop_path: string | null
    genre_ids: Array<number>
    description: string
    id: number
    original_language: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
    title: string
    video?: false
}
