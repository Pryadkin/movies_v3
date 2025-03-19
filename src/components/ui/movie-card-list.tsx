import Image from 'next/image'
import React from 'react'

import {IResponseSearchResult} from '@/features/search-movies/types'

import getFullPathForPosters from '@/shared/utils/getFullPathForPosters'

const MovieCard = (movie: IResponseSearchResult) => {
    const movieWithCorrectPoster = getFullPathForPosters(movie)

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <Image
                width={200}
                height={300}
                src={movieWithCorrectPoster.poster_path || ''}
                alt={movie.title}
                className="h-48 w-full object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                {/* <p className="text-sm text-gray-600">{movie.}</p> */}
            </div>
        </div>
    )
}

const MovieCardList = ({movies}: {movies: IResponseSearchResult[]}) => (
    <div className="container mx-auto px-4">
        <h1 className="my-4 text-2xl font-bold">All Movies</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.map(movie => {
                return movie.poster_path ? (
                    <MovieCard
                        key={movie.id}
                        {...movie}
                    />
                ) : null
            })}
        </div>
    </div>
)

export default MovieCardList
