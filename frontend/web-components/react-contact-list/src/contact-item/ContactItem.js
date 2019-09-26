import React from 'react';
import { Avatar } from '../avatar/Avatar';
import styles from './ContactItem.module.css';

export class ContactItem extends React.Component {
  handleClick() {
      this.props.onClick && this.props.onClick(this.props.item.username);
  }

  render() {
    return (
      <div className={styles['contact-item']} onClick={() => this.handleClick()}>
        <Avatar name={this.props.item.username} isOnline={this.props.item.isOnline} />
        <span className={styles['contact-name']}>{this.props.item.username}</span>
      </div>
    );
  }
}
