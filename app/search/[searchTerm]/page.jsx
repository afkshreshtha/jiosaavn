'use client'

import { useParams } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import SearchCard from './components/SearchCard'
import { useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import useSongSearch from '../../hooks/useSongSearch'

const Search = () => {
  const [page, setPage] = useState(1)
  const { searchTerm } = useParams()
  const { songs, hasMore, loading, error } = useSongSearch(searchTerm, page)
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const observer = useRef()
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore ) {
          setPage(prevPage=>prevPage+1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore],
  )
console.log(hasMore)
  let result = searchTerm.replace(/%20/g, ' ')

  return (
    <>
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Search results for <span className="font-black">{result}</span>
      </h2>
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
    </>
  )
}

export default Search
