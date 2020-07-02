import React from 'react';
import styles from './Avatar.module.css';
import * as Identicon from 'identicon.js';

export class Avatar extends React.Component {
  render() {
    let cssClasses = styles['avatar-container'];

    if (this.props.isOnline) {
      cssClasses += ` ${styles['is-online']}`;
    }

    // Just add a random GUID, because we need at least 15 characters for the hash.
    const identicon = new Identicon(this.props.name + '12ff224f-4427-4621-9b2b-b61659d849d3', {
      background: [0, 0, 0, 0],
      size: 200
    }).toString();

    return (
      <div className={cssClasses}>
        <img className={styles.avatar} src={`data:image/png;base64,${identicon}`}
             alt={`Avatar of ${this.props.name}`}/>
      </div>
    );
  }
}

