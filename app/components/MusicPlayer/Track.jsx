'use client'
import Image from 'next/image'
import React from 'react'

const Track = ({ isPlaying, isActive, activeSong }) => {
  const decodeHTMLString = (str) => {
    const decodedString = str?.replace(/&quot;/g, '"')
    return decodedString
  }
  let str = activeSong?.name || activeSong?.title
  str = decodeHTMLString(str)

  return (
    <div className="flex-1 flex items-center justify-start">
      <div
        className={`${
          isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''
        } hidden sm:block h-16 w-16 mr-4`}
      >
        <Image
          width={1000}
          height={1000}
          src={
            activeSong?.image?.[2]?.link
              ? activeSong?.image?.[2]?.link 
              : 'https://th.bing.com/th/id/R.0b87e7a886b3c3e27c26d7a263d52578?rik=3izFWkN63pIXdw&riu=http%3a%2f%2fimages5.fanpop.com%2fimage%2fphotos%2f31000000%2fMusic-music-31055637-1920-1200.jpg&ehk=8%2bqf3CxkEt0t976kDpbYH6IqX5WilP6OZ5GJE711%2fkA%3d&risl=&pid=ImgRaw&r=0'
          }
          alt="cover art"
          className="rounded-full"
        />
      </div>
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg">
          {str ? str : 'No active Song'}
        </p>
        <p className="truncate text-gray-300">
          {activeSong?.subtitle || activeSong?.year
            ? activeSong?.subtitle || activeSong?.year
            : 'No active Song'}
        </p>
      </div>
    </div>
  )
}

export default Track
