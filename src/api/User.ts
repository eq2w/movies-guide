import { z } from 'zod'

export const UserSchema = z.object({
    name: z.string(),
    surname: z.string(),
    email: z.string(),
    favorites: z.array(z.string()),
})

export type User = z.infer<typeof UserSchema>

export function fetchMe(): Promise<User> {
    return fetch('https://cinemaguide.skillbox.cc/profile', {
        method: "GET",
        credentials: 'include',
    })
        .then(validateResponse)
        .then((response) => response.json())
        .then(data => UserSchema.parse(data))
}



export async function validateResponse(response: Response): Promise<Response> {
    if (!response.ok) {
        throw new Error(await response.text())
    }
    return response
}

export function registerUser(email: string, password: string, name: string, surname: string): Promise<void> {
    return fetch('https://cinemaguide.skillbox.cc/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name, surname })
    }).then(validateResponse).then(() => undefined)
}


export function loginUser(email: string, password: string): Promise<void> {
    return fetch("https://cinemaguide.skillbox.cc/auth/login", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    }).then(validateResponse).then(() => undefined)
}

export function logoutUser(): Promise<void> {
    return fetch("https://cinemaguide.skillbox.cc/auth/logout", {
        method: "GET",
        credentials: 'include',
    }).then(validateResponse).then(() => undefined)
}

export function addFilmToFavorites(id: string): Promise<void> {
    return fetch("https://cinemaguide.skillbox.cc/favorites", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id })
    }).then(validateResponse).then(() => undefined)
}
