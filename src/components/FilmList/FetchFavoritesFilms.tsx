import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../../api/QueryClient"
import { Loader } from "../Loader/Loader"
import FilmList from "./FilmList"
import { fetchFavoritesFilms } from "../../api/Films"
import { QueryError } from "../QueryError/QueryError"

export const FetchFavoritesFilms = () => {

    const favoritesFilmsQuery = useQuery({
        queryFn: () => fetchFavoritesFilms(),
        queryKey: ['favorites'],
        retry: 0,
    }, queryClient)


    switch (favoritesFilmsQuery.status) {
        case "pending":
            return <Loader />
        case "success":
            return <FilmList isSlide={true} isEdit={true} isNumbered={false} films={favoritesFilmsQuery.data} />
        case "error":
            return <QueryError onRetry={favoritesFilmsQuery.refetch}/>
    }
}


