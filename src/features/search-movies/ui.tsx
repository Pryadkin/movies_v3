'use client'

import {useState} from 'react'

import {getMovies} from './api/getMovies'
import {IResponseSearchResult} from './types'
import {Button} from '@/components/ui/button'
import MovieCardList from '@/components/ui/movie-card-list'

export const SearchMovies = () => {
    const [movies, setMovies] = useState<IResponseSearchResult[]>()
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

    return (
        <div className="flex flex-wrap overflow-scroll">
            search-movies
            <Button onClick={() => fetchData()}>Add movies</Button>
            {movies && <MovieCardList movies={movies} />}
        </div>
    )
}
