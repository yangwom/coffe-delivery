import { useEffect, useState } from "react";
import axios from "axios";

export function useFetch<T = unknown>(url: string) {
const [data, setData] = useState<T | null>(null)

const fetchData = async () => setData(await axios.get(url))

useEffect(() => {
    fetchData()
}, [])

return { data, refetch: fetchData }

}