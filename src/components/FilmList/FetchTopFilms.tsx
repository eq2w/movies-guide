import { useQuery } from "@tanstack/react-query"
import { fetchTop10Films } from "../../api/Films"
import { queryClient } from "../../api/QueryClient"
import { Loader } from "../Loader/Loader"
import FilmList from "./FilmList"
import Button from "../../ui/Button/Button"

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
            return (
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '20px' }}>
                    <span style={{ fontSize: '24px', color: '#ffffff' }}>Ошибка загрузки</span>
                    <Button className="btn btn--error" onClick={topFilmsQuery.refetch}>Повторить попытку</Button>
                </div>
            )
    }

}

