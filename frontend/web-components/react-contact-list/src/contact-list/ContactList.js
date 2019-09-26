import React from 'react';
import { ContactItem } from '../contact-item/ContactItem';
import styles from './ContactList.module.css';

export class ContactList extends React.Component {
  selectedContactClicked(name) {
    this.props.onContactSelected && this.props.onContactSelected(name);
  }

  constructor(props) {
    super(props);
    this.hostRef = React.createRef();
  }

  componentDidMount() {
    let border, margin, padding;
    // Debug
    window.addEventListener('message', event => {
      if (event.data) {
        if (event.data.expose) {
          border = this.hostRef.current.style.border;
          margin = this.hostRef.current.style.margin;
          padding = this.hostRef.current.style.padding;
          this.hostRef.current.style.border = '5px dashed blue';
          this.hostRef.current.style.margin = this.hostRef.current.style.padding = '0.5rem';
        } else {
          this.hostRef.current.style.border = border;
          this.hostRef.current.style.margin = margin;
          this.hostRef.current.style.padding = padding;
        }
      }
    });
  }

  render() {
    return (
      <div ref={this.hostRef}>
        <header className={styles.header}>{this.props.headerText || 'Contact List'}</header>

        <div className={styles.list}>
          {(this.props.contacts || []).map((item, index) => <ContactItem item={item} key={item.username}
                                                                         onClick={name => this.selectedContactClicked(name)}/>)}
        </div>
      </div>
    );
  }
}
