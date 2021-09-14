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
        <p style={{color: "grey"}}>{channel.game_name}</p>
        <p style={{color: "grey", fontSize: "12px"}}>{channel.title}</p>
        {channel.is_live && <a style={{fontSize: "12px"}} href={'http://twitch.tv/' + channel.broadcaster_login}> 🟢 Live Now! 🔗 </a>}
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
  const removeChannelAction = channelId => () => {
    console.log("removing channel...")
    setChannels(channels.filter(channel => channel.id != channelId))
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