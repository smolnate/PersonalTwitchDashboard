// Main entry point of your app
import React, { useState, useEffect } from "react"
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import StreamerGrid from '../components/StreamerGrid'


/* Things to add */
/*
  more channel info
  discord notification when a streamer on dashboard is live
  refresh status every minute(?)
  maybe in future, sync dashboard with followed channels?
*/



const Home = () => {

  //State
  const [favoriteChannels, setFavoriteChannels] = useState([])

  //useEffect
  useEffect(() => {
    console.log("fetching channels...")
    fetchChannels()
  }, [])

  //Actions
  const fetchChannels = async () => {
    try {
      const path = `https://${window.location.hostname}`

      //get keys from replit DB 
      const response = await fetch(`${path}/api/database`, {
        method: 'POST',
        body: JSON.stringify({
          action: 'GET_CHANNELS',
          key: 'CHANNELS'
        })
      })

      if (response.status === 404) {
        console.log('channels key not found')
      }

      const json = await response.json()

      if (json.data) {
        const channelNames = json.data.split(',')
        console.log('CHANNEL NAMES: ', channelNames)

        //get twitch data, set in channels state
        const channelData = []
        for await (const channelName of channelNames) {
          console.log("getting twitch data for: " + channelName + "...")
          const channelResp = await fetch(`${path}/api/twitch`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: channelName })
          })

          const json = await channelResp.json()
          if (json.data) {
            channelData.push(json.data)
            console.log(channelData)
          }
        }

        setFavoriteChannels(channelData)
      }
    } catch (error) {
      console.warn(error.message)
    }
  }

  const setChannel = async channelName => {
    try {
      //get all current streamer names in list
      const currentStreamers = favoriteChannels.map(channel => channel.display_name.toLowerCase())
      
      const streamerList = [...currentStreamers, channelName].join(",")
      
      const path = `https://${window.location.hostname}`

      const response = await fetch(`${path}/api/database`, {
        method: 'POST',
        body: JSON.stringify({
          key: 'CHANNELS',
          value: streamerList
        })
      })

      if (response.status === 200) {
        console.log(`Set ${channelName} in DB.`)
      }
    } catch (error) {
      console.warn(error.message)
    }
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

      setFavoriteChannels(prevState => [...prevState, json.data])

      //set channelName string inside DB 
      await setChannel(value)

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
        <h1> Personal Twitch Dashboard </h1>
        {renderForm()}
        <StreamerGrid 
          channels={favoriteChannels} 
          setChannels={setFavoriteChannels}
        />
      </div>
    </div>
  )
}

export default Home