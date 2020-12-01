import Head from 'next/head'
import Link from 'next/link'
import React, { Fragment } from 'react'
import styles from '../styles/Home.module.css'
const fetch = require('isomorphic-unfetch')
import Error from 'next/error'
//import handler from './api/hello.js'
//import Error from './_error.js'


function Home({ errorCode, data }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome! World News</title>
        <link rel="icon" href="/favicon_new.ico" />
      </Head>
      <main className={styles.main}>

        <div className={styles.headingGrid}>
          <div className={styles.headingCard}>
            {/* <div className={styles.logoImg} > */}
            {/* </div> */}
            <h1 className={styles.title}>
              Welcome To World News
        </h1>

            <p className={styles.description}>
              Country: <Link href="/">
                <a><span style ={{color: 'green'}} >UK</span></a>
              </Link>
              {'  '}
        |
        {'  '}
              <Link href="us">
                <a><span style ={{color: 'blue'}}>US</span></a>
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.grid}>

          {(data || []).map(({ publishedAt, title, urlToImage, url, description }) => (
            <React.Fragment key={publishedAt} >
              <a href={url} target="_blank" className={styles.card}>

                <img src={urlToImage} height="300" className={styles.cardImg} />
                <br />
                <h4>  {title} </h4>
                <p>{description}</p> </a>
              <br />
            </React.Fragment>
          ))
          }

        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Source fetch from <a href="https://newsapi.org" target="_blank">News API's</a>
      </p>
        <p><a href="https://minhdnguyen.com" target="_blank" > Minh Nguyen</a> &copy; {'  '} {(new Date().getFullYear())}</p>
        <br />
      </footer>
    </div>
  )
}

export async function getServerSideProps() {

  const aKey = process.env.API_KEY;
  var url = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' + 'apiKey=' + aKey;

  var req = new Request(url);
  const res = await fetch(req)
  const errorCode = res.ok ? false : res.statusCode
  let data = await res.json();
  return {
    props: {
      errorCode,
      data: data.articles,
    },
  }

}
export default Home