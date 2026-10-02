import { useEffect, useState } from "react"

function useAxios(configRequest) {
  const { instance, method, url, configs = {} } = configRequest
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await instance[method.toLowerCase()](url, { ...configs })
      setData(res.data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  
  return [data, loading, error, fetchData]
}
export default useAxios;