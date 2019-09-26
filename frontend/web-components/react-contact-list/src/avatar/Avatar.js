import React from 'react';
import styles from './Avatar.module.css';

export class Avatar extends React.Component {
  render() {
    let cssClasses = styles['avatar-container'];

    if (this.props.isOnline) {
      cssClasses += ` ${styles['is-online']}`;
    }

    return (
      <div className={cssClasses}>
        <img className={styles.avatar} src={`https://robohash.org/${this.props.name}.png?size=200x200&set=set4`}
             alt={`Avatar of ${this.props.name}`}/>
      </div>
    );
  }
}

