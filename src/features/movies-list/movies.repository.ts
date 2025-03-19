import {Movie} from '@prisma/client'
import {cache} from 'react'

import {DeleteMovieCommand} from './model/types'
import {dbClient} from '@/shared/lib/db'

class MoviesRepository {
    getMoviesList = cache(
        (): Promise<Movie[]> =>
            dbClient.movie.findMany({
                include: {
                    tags: true,
                },
            }),
    )
    addMovie = (movie: Movie): Promise<Movie> => {
        return dbClient.movie.create({
            data: movie,
        })
    }
    deleteMovie = (command: DeleteMovieCommand) => {
        return dbClient.movie.delete({
            where: {id: command.movieId},
        })
    }
}

// Создаём и экспортируем единственный экземпляр (singletone)
const movieRepository = new MoviesRepository()
export {movieRepository}
