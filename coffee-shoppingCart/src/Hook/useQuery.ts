import { AxiosInstance, AxiosError, AxiosResponse } from "axios"
import api from "../utils/axios"
import { useEffect, useState } from "react"

type TQueryResult<T> = ({
    isSuccess: true,
    data: T,
    res: AxiosResponse<T, null>,
    isError: false,
    error: null,
    isLoading: false,
} | {
    isSuccess: false,
    data: T | null,
    res: AxiosResponse<T, null> | null,
    isError: boolean,
    error: AxiosError | null,
    isLoading: boolean,
}) & {
    refetch: () => Promise<void>
}

const useQuery = <T>(...params: Parameters<AxiosInstance>): TQueryResult<T> => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<T | null>(null)
    const [res, setRes] = useState<AxiosResponse<T, null> | null>(null)
    const [isError, setIsError] = useState<boolean>(true)
    const [error, setError] = useState<AxiosError | null>(null)

    const fetchData = async ({
        keepPrevious
    } = {
            keepPrevious: true
        }) => {
        setIsLoading(true)
        setIsSuccess(false)
        setIsError(false)
        setError(null)

        if (!keepPrevious) setData(null)
        try {
            const res = await api<T>(...params)
            setData(res.data)
            setRes(res)
            setIsSuccess(true)
        } catch (error) {
            setIsError(true)
            setError(error as AxiosError)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [...params])

    return {
        isSuccess,
        isLoading,
        isError,
        data,
        res,
        error,
        refetch: fetchData
    } as TQueryResult<T>
}

export default useQuery