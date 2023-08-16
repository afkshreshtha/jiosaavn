'use client'
import { useDispatch } from 'react-redux'
import { playPause, setActiveSong } from '../../../redux/Features/playerSlice'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '../../../utils/supabase'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
const TrendingSongsDetails = ({ id, song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch()
  const [LikedSongsid, setLikedSongsid] = useState([])
  const [IslikedSong, setIsLikedSong] = useState(false)
  const [click, setClick] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  const handleButtonClick = () => {
    setClick((prevState) => !prevState) // Toggle the value of 'click'
    if (click === false) {
      dispatch(playPause(false))
    } else {
      dispatch(setActiveSong({ song, data, i }))
      dispatch(playPause(true))
    }
  }
  const decodeHTMLString = (str) => {
    const decodedString = str?.replace(/&quot;/g, '"')
    return decodedString
  }

  let str = song?.name
  str = decodeHTMLString(str)
  const uploadSong = async (song) => {
    const user = await supabase.auth.getUser()
    const formattedSongs = {
      songid: song.id,
      user_id: user.data.user.id,
    }
    const { data, error } = await supabase
      .from('likedsongs')
      .upsert(formattedSongs)
  }

  const handleClick = () => {
    uploadSong(song)
  }

  useEffect(() => {
    async function fetchLikedSongs() {
      try {
        const user = await supabase.auth.getUser()
        const { data, error } = await supabase
          .from('likedsongs')
          .select('songid')
          .eq('user_id', user.data.user.id)

        if (error) {
          console.error('Error fetching liked songs:', error.message)
        } else {
          setLikedSongsid(data)
        }

        setIsFetching(false)
      } catch (error) {
        console.error('Error:', error.message)
        setIsFetching(false)
      }
    }

    fetchLikedSongs()
  }, [isFetching])
  const handleLikeClick = async (songid) => {
    const user = await supabase.auth.getUser()
    try {
      const { data, error } = await supabase
        .from('likedsongs')
        .delete()
        .eq('user_id', user.data.user.id)
        .eq('songid', songid)

      if (error) {
        console.error('Error deleting liked song:', error.message)
      } else {
        setLikedSongsid(data)
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  }
  const handleLikeSong = () => {
    handleLikeClick(song.id)
  }

  const l = LikedSongsid?.map((song) => song?.songid)
  const a = l?.includes(song?.id)
  useEffect(() => {
    if (a == true) {
      setIsLikedSong(true)
    }
  }, [a])

  useEffect(() => {
    const fetchSession = async () => {
      const session = await supabase.auth.getSession()
      if (session?.data.session === null) {
        setIsUserLoggedIn(true)
      }
    }
    fetchSession()
  }, [])

  return (
    <div className="mt-10 mb-10 flex items-center justify-between mr-4">
      <div className="flex items-center">
        <div
          onClick={handleButtonClick}
          className={`cursor-pointer mr-4 ${
            activeSong.id === song.id && isPlaying
              ? 'text-green-400'
              : 'text-white'
          }`}
        >
          {str}
        </div>
        <div className="flex flex-wrap">{song.primaryArtists}</div>
      </div>
      <div className="flex items-center">
        {!isUserLoggedIn && (
          <div className="text-white mr-4">
            {a ? (
              <AiFillHeart onClick={handleLikeSong} />
            ) : (
              <AiOutlineHeart onClick={handleClick} />
            )}
          </div>
        )}

        <div onClick={handleButtonClick} className="cursor-pointer">
          <Image
            src={
              activeSong.id === song.id && isPlaying === true
                ? 'https://th.bing.com/th/id/R.39be84790f16c293e001b26c367e9c87?rik=hkhhkjmeuq4DWg&riu=http%3a%2f%2fcdn.wallpapersafari.com%2f60%2f77%2fnpx4Pk.gif&ehk=LTFLE4ndfMIkZkcS7sW1IJzeJghsooKbl%2fHNBVKsZWM%3d&risl=&pid=ImgRaw&r=0'
                : song.image[2].link
            }
            alt="img"
            width={50}
            height={50}
          />
        </div>
      </div>
    </div>
  )
}
export default TrendingSongsDetails
