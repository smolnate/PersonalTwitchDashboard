//StreamerGrid.js
import React from 'react'
import styles from '../../styles/StreamerGrid.module.css'
import Image from 'next/image'

const StreamerGrid = ({ channels, setChannels }) => {
  return (
    <div>
      <p style={{padding: "20px"}}>
      {channels.map(renderGridItem)}
      </p>
    </div>
  )
}

//Actions
const removeChannelAction = channelId => ({channels, setChannels}) => {
  console.log("removing channel...")
  console.log("channels: ", channels)
  setChannels(channels.filter(channel => channel.id != channelId))

}

//Render Method
const renderGridItem = channel => (
  <div key={channel.id} className={styles.gridItem}>
    <Image width='100px' height='100px' src={channel.thumbnail_url} />
    <div className={styles.gridItemContent}>
      <button onClick={removeChannelAction(channel.id)}>X</button>
      <p style={{fontWeight: "bold", fontSize: "16px"}}>{channel.display_name}</p>
      <p style={{color: "grey"}}>{channel.game_name}</p>
      <p style={{color: "grey", fontSize: "12px"}}>{channel.title}</p>
      {channel.is_live && <a style={{fontSize: "12px"}} href={'http://twitch.tv/' + channel.broadcaster_login}> 🟢 Live Now! 🔗 </a>}
      {!channel.is_live && <p style={{fontSize: "12px"}}>🔴 Offline</p>}
    </div>
  </div>
)




export default StreamerGrid