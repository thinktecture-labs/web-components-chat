import React from 'react';
import styles from './Avatar.module.css';
import * as Identicon from 'identicon.js';

// https://stackoverflow.com/a/1349426/959687
function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// https://stackoverflow.com/a/7419630/959687
function rainbow(numOfSteps, step) {
  // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
  // Adam Cole, 2011-Sept-14
  // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
  let r, g, b;
  const h = step / numOfSteps;
  const i = ~~(h * 6);
  const f = h * 6 - i;
  const q = 1 - f;
  switch(i % 6){
    case 0: r = 1; g = f; b = 0; break;
    case 1: r = q; g = 1; b = 0; break;
    case 2: r = 0; g = 1; b = f; break;
    case 3: r = 0; g = q; b = 1; break;
    case 4: r = f; g = 0; b = 1; break;
    case 5: r = 1; g = 0; b = q; break;
  }
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255,
  }
}

export class Avatar extends React.Component {
  render() {
    let cssClasses = styles['avatar-container'];

    if (this.props.isOnline) {
      cssClasses += ` ${styles['is-online']}`;
    }

    let numOfSteps = Math.random() * 1000;
    let step = Math.random() * 1000;

    if (step > numOfSteps) {
      const tmp = numOfSteps;
      numOfSteps = step;
      step = tmp;
    }

    const color = rainbow(numOfSteps, step);

    // Just add a random string, because we need at least 15 characters for the hash.
    const identicon = new Identicon(`${this.props.name}${makeId(15)}`, {
      foreground: [color.r, color.g, color.b],
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

