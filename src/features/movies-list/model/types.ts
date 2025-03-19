export type User = {
    id: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    movies: Movie[]
    tags: Tag[]
}

export type Movie = {
    id: string
    title: string
    description: string
    releaseDate: Date
    createdAt: Date
    updatedAt: Date
    users: User[]
    tags: Tag[]
}

export type Tag = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    user: User[]
    movies: Movie[]
}

export type DeleteMovieCommand = {
    movieId: string
}
