import {IResponseMovies} from '../types'

const baseUrl = 'https://api.themoviedb.org/3/search/multi'

const getBaseUrl = () => {
    const url = new URL(baseUrl)
    const params: {[key: string]: string} = {
        api_key: process.env.NEXT_PUBLIC_THEMOVIEDB_KEY || '',
    }

    Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key]),
    )

    return url.toString()
}

export const getMovies = async (params: {
    [key: string]: string
}): Promise<IResponseMovies> => {
    const url = new URL(getBaseUrl())

    Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key]),
    )

    try {
        const response = await fetch(url.toString(), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
}
