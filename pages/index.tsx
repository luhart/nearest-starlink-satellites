import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useForm } from "react-hook-form";

interface IFormInput {
  latitude: number;
  longitude: number;
  n: number;
}

export default function Home() {
  const { register, errors, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => console.log(data); 

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>
          Find nearby <a href="https://nextjs.org">Starlink</a> satellites
        </h2>

        <p className={styles.description}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input name="latitude" placeholder="latitude" ref={register({ min: -90, max: 90 })} />
            <input name="longitude" placeholder="longitude" ref={register({ min: -180, max: 180 })} />
            <input name="n" type="number" placeholder="num nearest" ref={register({ min: 1, max: 891 })} />
            <button>Submit Query</button>
          </form>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
