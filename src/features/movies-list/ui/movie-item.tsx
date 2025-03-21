import {Movie} from '@prisma/client'

export function movieItem({
    movie,
    onDelete,
}: {
    movie: Movie
    onDelete: (movieId: string) => Promise<void>
}) {
    return (
        <div>
            hello wor<div>world</div>
        </div>
    )
}
