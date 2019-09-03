import React from 'react';
import { Avatar } from '../avatar/Avatar';
import './ContactItem.css';

export class ContactItem extends React.Component {

  handleClick() {
      this.props.onClick && this.props.onClick(this.props.name);
  }

  render() {
    return (
      <div className="contact-item" onClick={() => this.handleClick()}>
        <Avatar name={this.props.name}/>
        <span className="name">{this.props.name}</span>
      </div>
    );
  }
}
