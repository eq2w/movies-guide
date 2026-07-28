import { useQuery } from "@tanstack/react-query"
import { fetchTop10Films } from "../../api/Films"
import { queryClient } from "../../api/QueryClient"
import { Loader } from "../Loader/Loader"
import FilmList from "./FilmList"
import { QueryError } from "../QueryError/QueryError"

export const FetchTop = () => {

    const topFilmsQuery = useQuery({
        queryFn: () => fetchTop10Films(),
        queryKey: ["top10"],
        retry: 0,
    }, queryClient)


    switch (topFilmsQuery.status) {
        case "pending":
            return <Loader />
        case "success":
            return <FilmList isSlide={true} isNumbered={true} films={topFilmsQuery.data} />
        case "error":
            return <QueryError onRetry={topFilmsQuery.refetch} />
    }

}

