//StreamerGrid.js
import React from 'react'
import styles from '../../styles/StreamerGrid.module.css'
import Image from 'next/image'

const StreamerGrid = ({channels}) => {
  return (
    <div>
      <p></p>
      {channels.map(renderGridItem)}
    </div>
  )
}

//Actions
const removeChannelAction = () => {

}

//Render Method
const renderGridItem = channel => (
  <div key={channel.id} className={styles.gridItem}>
    <Image width='100px' height='100px' src={channel.thumbnail_url} />
    <div className={styles.gridItemContent}>
      <button onClick={removeChannelAction(channel.id)}>X</button>
      <span>{'Channel Name: ' + channel.display_name}</span>
      {channel.is_live && <a href={'http://twitch.tv/' + channel.broadcaster_login}> Channel Status: 🟢 Live Now! Click to watch </a>}
      {!channel.is_live && <span>Channel Status: 🔴 Offline :(</span>}
    </div>
  </div>
)




export default StreamerGrid