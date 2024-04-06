import { LocationScreen } from 'app/features/location/locations'
import Head from 'next/head'
import Navbar from 'pages/nav/navbar'
import { H1 } from 'tamagui'

export default function Location() {
  return (
    <>
      <Head>
        <title>Location</title>
      </Head>
      <Navbar />
      <LocationScreen />
    </>
  )
}