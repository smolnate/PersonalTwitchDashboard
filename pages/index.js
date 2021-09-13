// Main entry point of your app
import React, { useState } from "react"
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import StreamerGrid from '../components/StreamerGrid'



const Home = () => {

  //State
  const [favoriteChannels, setFavoriteChannels] = useState([])

  //Actions
  const addChannel = async event => {
    event.preventDefault()
    const { value } = event.target.elements.name

    if (value) {
      console.log("value: ", value)

      //Call Twitch Search API
      const path = `https://${window.location.hostname}`

      const response = await fetch(`${path}/api/twitch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ data: value })
      })

      const json = await response.json()

      console.log("From the server: ", json.data)

      setFavoriteChannels(prevState => [...prevState, json.data])

      //reset form
      event.target.elements.name.value = ""
    }

    
  }

  //Render Method
  const renderForm = () => (
    <div className = {styles.formContainer}>
      <form onSubmit = {addChannel}>
        <input id="name" type="text" placeholder="Enter Streamer Name" required />
        <button type="submit">Add Streamer</button>
      </form>
    </div>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>🎥 Personal Twitch Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.inputContainer}>
        {renderForm()}
        <StreamerGrid channels={favoriteChannels}/>
      </div>
    </div>
  )
}

export default Home