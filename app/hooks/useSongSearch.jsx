'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

const useSongSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [songs, setSongs] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setSongs([])
  }, [query])

  useEffect(() => {
    setLoading(false)
    setError(false)
    axios
      .get(
        `https://saavn.me/search/songs?query=${query}&page=${pageNumber}&limit=10`,
      )
      .then((res) => {
        setSongs((prevSongs) => {
          return [...prevSongs, ...res.data.data.results]
        })
        setHasMore(res.data.data.results.length > 0)
        setLoading(false)
      })
      .catch((e) => {
        setError(true)
      })
  }, [query, pageNumber])
  return { loading, error, songs, hasMore }
}

export default useSongSearch
