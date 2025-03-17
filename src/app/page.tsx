import {PrismaClient} from '@prisma/client'

import {Button} from '@/components/ui/button'

const client = new PrismaClient()

export default async function Home() {

    const movies = await client.movie.findMany()

    console.log('movies', movies)

    return (
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
            <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
                <Button>Hello</Button>
            </main>
        </div>,
    )
}
