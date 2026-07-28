import { useQuery } from "@tanstack/react-query"
import { fetchRandomFilm } from "../../api/Films"
import { queryClient } from "../../api/QueryClient"
import Hero from "./Hero"
import { Loader } from "../Loader/Loader"
import { QueryError } from "../QueryError/QueryError"


export const FetchHero = () => {

    const randomFilmQuery = useQuery({
        queryFn: () => fetchRandomFilm(),
        queryKey: ["randomFilm"],
        retry: 0,
    }, queryClient)


    switch (randomFilmQuery.status) {
        case "pending":
            return <Loader />
        case "success":
            return <Hero className='hero' film={randomFilmQuery.data} />
        case "error":
            return <QueryError onRetry={randomFilmQuery.refetch} />
    }

}

