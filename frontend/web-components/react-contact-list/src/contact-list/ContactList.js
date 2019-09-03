import React from 'react';
import { ContactItem } from '../contact-item/ContactItem';
import styles from './ContactList.module.css';

export class ContactList extends React.Component {
  selectedContactClicked(name) {
    this.props.onContactSelected && this.props.onContactSelected(name);
  }

  render() {
    return (
      <div>
        <header className={styles.header}>{this.props.headerText || 'Contact List'}</header>

        <div className={styles.list}>
          {(this.props.contacts || []).map((item, index) => <ContactItem name={item} key={index} onClick={name => this.selectedContactClicked(name)}/>)}
        </div>
      </div>
    );
  }
}
