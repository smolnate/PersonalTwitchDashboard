//StreamerGrid.js
import React from 'react'
import styles from '../../styles/StreamerGrid.module.css'
import Image from 'next/image'

const StreamerGrid = ({ channels, setChannels }) => {

  //Render Methods
  const renderGridItem = channel => (
    <div key={channel.id} className={styles.gridItem}>
      <Image width='100px' height='100px' src={channel.thumbnail_url} />
      <div className={styles.gridItemContent}>
        <button onClick={removeChannelAction(channel.id)}>X</button>
        <p style={{fontWeight: "bold", fontSize: "16px"}}>{channel.display_name}</p>
        <p style={{fontWeight: "bold", color: "grey"}}>{channel.game_name}</p>
        <p style={{fontStyle: "italic", color: "grey", fontSize: "12px"}}>{channel.title}</p>
        {channel.is_live && <a style={{fontSize: "12px"}} href={'http://twitch.tv/' + channel.broadcaster_login}> 🟢 Live Now! Click to watch 🔗 </a>}
        {!channel.is_live && <p style={{fontSize: "12px"}}>🔴 Offline</p>}
      </div>
    </div>
  )

  const renderNoItems = () => (
    <div className={styles.gridNoItems}>
      <p>Hmmm, you aren't following any streamers!</p>
    </div>
  )

  //Actions
  const removeChannelAction = channelId => async () => {
    console.log("removing channel with id: ", channelId)

    const filteredChannels = channels.filter(channel => channel.id != channelId)
    
    setChannels(filteredChannels)

    const joinedChannels = filteredChannels.map(channel => channel.display_name.toLowerCase()).join(",")

    await setDBChannels(joinedChannels)
  } 

  const setDBChannels = async channels => {
    try {
      const path = `https://${window.location.hostname}`

      const response = await fetch (`${path}/api/database`, {
        method: 'POST',
        body: JSON.stringify({
          key: 'CHANNELS',
          value: channels
        })
      })

      if (response.status === 200) {
        console.log(`Set ${channels} in DB.`)
      }
    } catch (error) {
      console.warn(error.message)
    }
  }


  return (
    <div>
      <p style={{padding: "10px"}}>
      {channels.length > 0 &&channels.map(renderGridItem)}
      {channels.length == 0 && renderNoItems()}
      </p>
    </div>
  )
}




export default StreamerGrid