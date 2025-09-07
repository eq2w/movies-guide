import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../../api/QueryClient"
import { Loader } from "../Loader/Loader"
import FilmList from "./FilmList"
import { fetchFavoritesFilms } from "../../api/Films"
import Button from "../../ui/Button/Button"

export const FetchFavoritesFilms = () => {

    const favotitesFilmsQuery = useQuery({
        queryFn: () => fetchFavoritesFilms(),
        queryKey: ['favorites'],
        retry: 0,
    }, queryClient)


    switch (favotitesFilmsQuery.status) {
        case "pending":
            return <Loader />
        case "success":
            return <FilmList isSlide={true} isEdit={true} isNumbered={false} films={favotitesFilmsQuery.data} />
        case "error":
            return (
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '20px' }}>
                    <span style={{ fontSize: '24px', color: '#ffffff' }}>Ошибка загрузки</span>
                    <Button className="btn btn--error" onClick={favotitesFilmsQuery.refetch}>Повторить попытку</Button>
                </div>
            )
    }
}


