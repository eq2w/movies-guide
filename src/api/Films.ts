import { z } from 'zod'
import { validateResponse } from './User'

export const FilmSchema = z.object({
    id: z.number(),
    title: z.string(),
    originalTitle: z.string(),
    language: z.string(),
    releaseYear: z.number().nullable().optional(),
    releaseDate: z.string().nullable().optional(),
    genres: z.array(z.string()),
    plot: z.string(),
    runtime: z.number(),
    budget: z.string().nullable(),
    revenue: z.string().nullable(),
    homepage: z.string(),
    status: z.string(),
    posterUrl: z.string().nullable(),
    backdropUrl: z.string().nullable(),
    trailerUrl: z.string(),
    trailerYoutubeId: z.string().optional(),
    tmdbRating: z.number().optional(),
    searchL: z.string(),
    keywords: z.array(z.string()),
    countriesOfOrigin: z.array(z.string()),
    languages: z.array(z.string()),
    cast: z.array(z.string()),
    director: z.string().nullable().optional(),
    production: z.string().nullable(),
    awardsSummary: z.string().nullable(),
})

export type Film = z.infer<typeof FilmSchema>

export const FilmsListSchema = z.array(FilmSchema)

export type FilmsList = z.infer<typeof FilmsListSchema>

export const GenresSchema = z.array(z.string())

export type Genres = z.infer<typeof GenresSchema>

export function fetchRandomFilm(): Promise<Film> {
    return fetch('https://cinemaguide.skillbox.cc/movie/random')
        .then((response) => response.json())
        .then((data) => FilmSchema.parse(data))
}

export function fetchTop10Films(): Promise<FilmsList> {
    return fetch('https://cinemaguide.skillbox.cc/movie/top10')
        .then((response) => response.json())
        .then((data) => FilmsListSchema.parse(data))
}

export function fetchFilmId(movieId: number): Promise<Film> {
    return fetch(`https://cinemaguide.skillbox.cc/movie/${movieId}`)
        .then((response) => response.json())
        .then((data) => FilmSchema.parse(data))
}

export function fetchGenresFilms(): Promise<Genres> {
    return fetch(`https://cinemaguide.skillbox.cc/movie/genres`)
        .then((response) => response.json())
        .then((data) => GenresSchema.parse(data))
}

export function fetchFilmsbyFilter(genre: string, count: number, title: string, page: number): Promise<FilmsList> {
    return fetch(`https://cinemaguide.skillbox.cc/movie?count=${count}&page=${page}&title=${title}&genre=${genre}`)
        .then((response) => response.json())
        .then((data) => FilmsListSchema.parse(data))
}


export function fetchFavoritesFilms(): Promise<FilmsList> {
    return fetch(`https://cinemaguide.skillbox.cc/favorites`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => FilmsListSchema.parse(data))
}


export function fetchDeleteFavoritesFilms(id: number): Promise<void> {
    return fetch(`https://cinemaguide.skillbox.cc/favorites/${id}`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id })
    }).then(validateResponse).then(() => undefined)
} 
