
import { AxiosInstance, AxiosError, AxiosResponse } from "axios"
import api from "../utils/axios"
import { useState } from "react"

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
    mutate: () => Promise<void>
}

const useMutate = <T>(): TQueryResult<T> => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<T | null>(null)
    const [res, setRes] = useState<AxiosResponse<T, null> | null>(null)
    const [isError, setIsError] = useState<boolean>(true)
    const [error, setError] = useState<AxiosError | null>(null)

    const fetchData = async (...params: Parameters<AxiosInstance>) => {
        setIsLoading(true)
        setIsSuccess(false)
        setIsError(false)
        setError(null)
        setData(null)
        
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

    return {
        isSuccess,
        isLoading,
        isError,
        data,
        res,
        error,
        mutate: fetchData
    } as TQueryResult<T>
}

export default useMutate