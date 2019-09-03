import React from 'react';
import { Avatar } from '../avatar/Avatar';
import styles from './ContactItem.module.css';

export class ContactItem extends React.Component {
  handleClick() {
      this.props.onClick && this.props.onClick(this.props.name);
  }

  render() {
    return (
      <div className={styles['contact-item']} onClick={() => this.handleClick()}>
        <Avatar name={this.props.name}/>
        <span className={styles['contact-name']}>{this.props.name}</span>
      </div>
    );
  }
}
