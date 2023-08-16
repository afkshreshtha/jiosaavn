'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import SearchCard from './components/SearchCard'
import { useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFromApi } from '../../utils/api'
const Search = () => {
  const [song, setSong] = useState([])
  const [page, setPage] = useState(1)
  const { searchTerm } = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  let [loading, setLoading] = useState(true)

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(
      `/search/songs?query=${searchTerm}&page=${page}&limit=10`,
    ).then((res) => {
      setSong(res.data)
      setPage((prev) => prev + 1)
      setLoading(false)
    })
  }
  const fetchNextPageData = () => {
    fetchDataFromApi(
      `/search/songs?query=${searchTerm}&page=${page}&limit=10`,
    ).then((res) => {
      if (song?.results) {
        setSong({
          ...song,
          results: [...song?.results, ...res?.data?.results],
        })
      } else if (res?.data?.data === null) {
        setSong(res)
      } else {
        setSong(res)
      }
      setPage((prev) => prev + 1)
    })
  }
  useEffect(() => {
    fetchInitialData()
  }, [searchTerm])
  let result = searchTerm.replace(/%20/g,' ')

 
  return (
    <>
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Search results for <span className="font-black">{result}</span>
      </h2>
      {loading && <ClipLoader color="#fff" />}
      <div className="text-white">
        <InfiniteScroll
          className="content"
          dataLength={song?.results?.length || []}
          next={fetchNextPageData}
          hasMore={page <= song?.total}
          loader={<ClipLoader color="#fff" />}
        >
          {song?.results?.map((song, i) => (
            <SearchCard
              key={song.id}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={song}
              i={i}
            />
          ))}
        </InfiniteScroll>
      </div>
    </>
  )
}

export default Search
