'use client'
import {useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from './nav'
import { useAction, useAppSelector } from '@/lib/hooks';

export default function Home() {

  const { fetchUser, fetchFavArtists } = useAction();
  const auth = useAppSelector(state => state.auth)
  const artists = useAppSelector(state => state.artists);

  console.log(auth, artists)

  useEffect(() => {
      fetchUser();
      fetchFavArtists();
  }, [])

  const displayFavArtists = () => {
      return artists.items && artists.items.map((artist, index) => {
        return(
           <li key={index} class="flex justify-between gap-x-6 py-5">
           <div class="flex min-w-0 gap-x-4">
             <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src={artist.images[0].url} alt=""/>           
             <p class="text-sm leading-6">{artist.name}</p>
           </div>
           <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <Link href={`/artist-events/${artist.id}`}>Upcoming Shows</Link>
           </div>
         </li>
        )
      })
  }

  return (
      <main className="flex min-h-screen flex-col justify-between">
        <Nav auth={auth}/>
        <ul className="p-24">
          {displayFavArtists()}
        </ul>
      </main>
  )
}
