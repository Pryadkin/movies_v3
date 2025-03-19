'use server'

import {revalidatePath} from 'next/cache'

import {movieRepository} from '@/features/movies-list/movies.repository'

export const addMovieAction = async (
    movie: any,
    revalidatePagePath: string,
) => {
    await movieRepository.addMovie(movie)
    revalidatePath(revalidatePagePath)
}
