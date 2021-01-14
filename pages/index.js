import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../styles/Home.module.css';
import Globe from '../components/globe';


export default function Home() {
  const { register, handleSubmit } = useForm();
  const [globeInput, setGlobeInput] = useState(null);


  const onSubmit = (data) => {
    setGlobeInput([data.latitude, data.longitude, data.n]);
  }

  const form = () => {
    return (
      <div className={styles.description}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="latitude" placeholder="latitude" ref={register} />
          <input name="longitude" placeholder="longitude" ref={register} />
          <input name="n" type="number" placeholder="num nearest" ref={register} />
          <button>Submit Query</button>
        </form>
      </div>
    )
  }

  let mainContent = (
    <>
      <h2 className={styles.title}>
        Find nearby <a href="https://www.starlink.com/">Starlink</a> satellites✨
      </h2>
      {form()}
      <Globe globeInput={globeInput}/>
    </>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Starlink Satellite Locater</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {mainContent}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          thanks for hosting,{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

  