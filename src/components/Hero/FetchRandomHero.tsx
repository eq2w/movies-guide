import { useQuery } from "@tanstack/react-query"
import { fetchRandomFilm } from "../../api/Films"
import { queryClient } from "../../api/QueryClient"
import Hero from "./Hero"
import { Loader } from "../Loader/Loader"
import Button from "../../ui/Button/Button"


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
            return (
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '20px' }}>
                    <span style={{ fontSize: '24px', color: '#ffffff' }}>Ошибка загрузки</span>
                    <Button className="btn btn--error" onClick={randomFilmQuery.refetch}>Повторить попытку</Button>
                </div>
            )
    }

}

