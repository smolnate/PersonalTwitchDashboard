// Main entry point of your app
import React, { useState } from "react"
import Head from 'next/head'
import styles from '../styles/Home.module.css'

//const variables here
const HOST_NAME = "https://api.twitch.tv/helix"

const Home = () => {

  //State
  const [favoriteChannels, setFavoriteChannels] = useState([])

  //Actions
  const getTwitchChannel = async channelName => {
    console.log('searching for twitch channel...')
    if (channelName) {
      //Get Access accessToken
      const accessToken = await getTwitchAccessToken()

      if (accessToken) {
        //Make query request
        const response = await fetch(`${HOST_NAME}/search/channels?query=${channelName}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID //using a secret key here!
          }
        })
      
        const json = await response.json()
        if (json.data) {
          const { data } = json
          const lowercaseChannelName = channelName.toLowerCase()
          
          const foundChannel = data.find(channel => {
            const lowercaseDisplayName = channel.display_name.toLowerCase()
            
            return lowercaseChannelName === lowercaseDisplayName
          })

          return foundChannel
        }
      }

      throw new Error("Twitch accessToken was undefined.")
    }

    throw new Error("No channelName provided.")
  }

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

      setFavoriteChannels(prevState => [...prevState, value])

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
        <div>{favoriteChannels.join(",")}</div>
      </div>
    </div>
  )
}

export default Home