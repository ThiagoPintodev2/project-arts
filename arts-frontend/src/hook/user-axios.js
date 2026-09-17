import { useEffect, useState } from "react"

function useAxios(configRequest) {
  const { instance, method, url, configs = {} } = configRequest
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    const fecthData = async () => {
      try {
        const res = await instance[method.toLowerCase()](url, {
          ...configs,
        })
        setData(res.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fecthData()
  }, [])

  return [data, loading, error]
}
export default useAxios;