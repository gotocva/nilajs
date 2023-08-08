


import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';


export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: 'black',
      padding: '0.6rem',
    }}>
    {children}
  </span>
);


export const Dependencies = ({}) => {
  return (
  <div className={clsx('col col--6')}>
    <h3>Dependencies</h3>
    <ul>
      <li>express</li>
      <li>express-rate-limit</li>
      <li>helmet</li>
      <li>joi</li>
      <li>moment</li>
      <li>mongoose</li>
      <li>nila-logger</li>
      <li>nodemailer</li>
      <li>socket.io</li>
      <li>xss</li>
    </ul>
  </div>
  )
}


export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">

        <div className="row">
        <div className={clsx('col col--6')}>
          <h3>Features of NilaJS</h3>

          <ul>
            <li>Runs on NodeJS</li>
            <li>Built on top of Express.js</li>
            <li>Implemented with MVC pattern</li>
            <li>Easy to Code with very few bugs</li>
            <li>Short Development time</li>
          </ul>
        </div>

        <div className={clsx('col col--6')}>
          <h3>Getting started</h3>
          <Highlight color="#efefef">npm install nilajs -g</Highlight>
          <div></div><br/>
          <Highlight color="#efefef">nila create:app appName</Highlight>
        </div>
        
        <Dependencies></Dependencies>
      </div>
        
      </div>
    </section>
  );
}
