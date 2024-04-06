import { HomeScreen } from 'app/features/home/screen'
import Head from 'next/head'
import Navbar from './nav/navbar'

export default function Page() {
  return (
    <>
      <Head>
        <title>Home</title>
       
      </Head>
      <Navbar />
      <HomeScreen />
    </>
  )
}
