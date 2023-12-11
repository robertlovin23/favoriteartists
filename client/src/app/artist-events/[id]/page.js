'use client'
import {useEffect, useCallback, useState} from 'react'
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image'
import Nav from '../../nav'
import Link from 'next/link'
import { useAction, useAppSelector } from '@/lib/hooks';




export default function ArtistShows() {
  const [isLoading, setIsLoading] = useState(true);
  const { fetchUser, fetchArtist, fetchRelatedArtists, fetchArtistEvents } = useAction();


  const auth = useAppSelector(state => state.auth)
  const artists = useAppSelector(state => state.artists);
  const events = useAppSelector(state => state.events)
  const related = useAppSelector(state => state.related)

  const params = useParams();
  const id = params.id

  console.log(events, related, artists)

  useEffect(() => {
    if (id) {
      fetchUser();
      fetchArtist(id);
      fetchRelatedArtists(id);
    }
  }, [id])

  useEffect(() => {
    if (artists.name) {
      fetchArtistEvents(artists.name);
      setIsLoading(false)
    }
  }, [artists.name])

  const displayGenres = () => {
    return artists && artists.genres && artists.genres.map((genre) => (
      <li key={genre} className="text-gray-400" style={{display: 'inline-block', marginRight: '2px'}} >
        <span className="text-gray-600">{genre},</span>
      </li>
    ))
  }


  const displayRelatedArtists = () => {
    return related && related.artists && related.artists.map(artist => {
      return(
        <div key={artist.id} className="flex-col flex-shrink-0 items-center" style={{display: 'inline-block'}}>
        <Link href={`/artist-events/${artist.id}`}>
          <img
            src={artist.images && artist.images[0] && artist.images[0].url}
            alt={artist.name}
            className="h-full w-full object-cover object-center"
            style={{height: '200px', width: '200px'}}
          />
          <p className="text-sm mt-2 text-gray-700">{artist.name}</p>
        </Link>
      </div>
      )
    })
  }



  const displayEvents = () => {
    return events && events._embedded && artists && artists.name && events._embedded.events.map((event, index) => {
      if(event.url){
        return(
          <li key={index} class="flex justify-between gap-x-6 py-5">
          <div class="flex min-w-0 gap-x-4">
                <div class="min-w-0 flex-auto">
                    <p class="text-sm font-semibold leading-6 text-gray-900">{event.name}</p>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">{event._embedded && event._embedded.venues[0] && event._embedded.venues[0].name}</p>
                    <p class="text-sm leading-6">{event.dates.start.localDate}</p>
                  </div>
                  <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <a className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" href={event.url}>Link To Tickets</a>
                  </div>
                </div>
            </li>
        )
      }
    })
}

if(isLoading){
  return(
    <main className="flex min-h-screen flex-col justify-between">
      <Nav auth={auth}/>
      <div className="bg-white">
        <div> Loading...</div>
      </div>
    </main>
  )
} else {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <Nav auth={auth}/>
      <div className="bg-white">
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
                <li className="text-sm">
                  <a href={artists.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                    {artists.name}
                  </a>
                </li>
            </nav>
            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x`-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={artists && artists.images && artists.images[0].url}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              </div>
            </div>
    
            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-8 lg:pt-16">
              <div className="lg:col-span-2 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{artists.name}</h1>
                <ul role="list" className="list-disc space-y-2  text-sm" style={{listStyle: 'none'}}>
                  {displayGenres()}
                </ul>
              </div>
          </div>
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-8">
              <div className="lg:col-span-2 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Upcoming Shows</h1>
                <ul role="list" class="divide-y divide-gray-100" style={{color: 'black'}}>
                  {displayEvents()}
                </ul>
            </div>
          </div>
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 xlg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-8">
              <div className="lg:col-span-4 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mt-6">Related Artists</h1>
              <div className="flex space-x-2 overflow-x-auto mt-4">
                {displayRelatedArtists()}
              </div>
            </div>
          </div>
        </div>
    </main>
      )
}
}