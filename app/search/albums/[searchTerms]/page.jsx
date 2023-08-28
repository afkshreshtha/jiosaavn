'use client'

import { useParams, useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import SearchCard from './components/SearchCard'
import { useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import useSongSearch from '../../../hooks/useSongSearch'

const Search = () => {
  const [page, setPage] = useState(1)
  const { searchTerms } = useParams()
  const { songs, hasMore, loading, error, totalResults } = useSongSearch(
    searchTerms,
    page,
    'albums',
  )
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const observer = useRef()
  const router = useRouter()
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore],
  )

  let result = searchTerms.replace(/%20/g, ' ')
  const options = { style: 'decimal', minimumFractionDigits: 0 }
  const formattedNumber = totalResults.toLocaleString('en-IN', options)
  return (
    <>
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Search results for <span className="font-black">{result}</span>
        <p className="text-2xl">{formattedNumber} results</p>
      </h2>
      <div class="flex justify-between items-center bg-gray-800 p-6">
        <div class="text-white">
          <h2
            className="cursor-pointer hover:underline"
            onClick={() => router.push(`/search/${searchTerms}`)}
          >
            Songs
          </h2>
        </div>
        <div class="text-white hover:underline text-center">
          <h2
            className="cursor-pointer "
            onClick={() => router.push(`/search/playlists/${searchTerms}`)}
          >
            Playlists
          </h2>
        </div>
        <div class="text-white hover:underline ">
          <h2
            className="cursor-pointer text-red-200"
            onClick={() => router.push(`/search/albums/${searchTerms}`)}
          >
            Albums
          </h2>
        </div>
      </div>

      <div className="mt-6 flex flex-col">
        <div className=" flex flex-wrap sm:justify-start justify-center gap-10 xl:gap-4 md:gap-4  mb-20">
          {loading && <ClipLoader color="#fff" />}
          {songs.map((song, index) => {
            if (songs.length === index + 1) {
              return (
                <div key={song.id} ref={lastBookElementRef}>
                  <SearchCard
                    key={song.id}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={song}
                    i={index}
                  />
                </div>
              )
            } else
              return (
                <SearchCard
                  key={song.id}
                  song={song}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  data={song}
                  i={index}
                />
              )
          })}
        </div>
      </div>
    </>
  )
}

export default Search
