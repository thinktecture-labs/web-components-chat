import React from 'react';
import './Avatar.css';

export class Avatar extends React.Component {
  render() {
    return (
      <img src={`https://robohash.org/${this.props.name}.png?size=200x200&set=set4`} alt={`Avatar of ${this.props.name}`}/>
    );
  }
}

