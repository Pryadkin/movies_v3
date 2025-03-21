'use client'

import {useState, useTransition} from 'react'

import {addMovieAction} from './api/actions'
import {getMovies} from './api/getMovies'
import {IResponseSearchResult} from './types'
import {Button} from '@/components/ui/button'
import MovieCardList from '@/components/ui/movie-card-list'

export const SearchMovies = () => {
    const [movies, setMovies] = useState<IResponseSearchResult[]>()
    const [isAddMovieTransition, startAddMovieTransition] = useTransition()

    const fetchData = async () => {
        const params = {
            language: 'ru',
            query: 'one',
            page: '1',
            include_adult: 'false',
        }
        const data = await getMovies(params)
        setMovies(data.results)
    }

    const handleAddMovie = (movie: IResponseSearchResult) => {
        const mov = {
            id: String(movie.id),
            title: movie.title || (movie as any).name,
            description: movie.description || '',
            posterPath: movie.poster_path || '',
        }
        startAddMovieTransition(async () => {
            await addMovieAction(mov, '/search-movies')
        })
    }

    return (
        <div className="flex flex-wrap overflow-scroll">
            search-movies
            <Button onClick={() => fetchData()}>Add movies</Button>
            {movies && (
                <MovieCardList
                    movies={movies}
                    onAddMovie={handleAddMovie}
                />
            )}
        </div>
    )
}
