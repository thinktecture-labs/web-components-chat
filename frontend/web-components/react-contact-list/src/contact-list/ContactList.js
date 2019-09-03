import React from 'react';
import { ContactItem } from '../contact-item/ContactItem';
import './ContactList.css';

export class ContactList extends React.Component {
  selectedContactClicked(name) {
    this.props.onContactSelected && this.props.onContactSelected(name);
  }

  render() {
    return (
      <div className="contact-list">
        <header>{this.props.headerText || 'Contact List'}</header>

        <div className="contact-list-list">
          {(this.props.contacts || []).map((item, index) => <ContactItem name={item} key={index} onClick={name => this.selectedContactClicked(name)}/>)}
        </div>
      </div>
    );
  }
}
