import React from 'react';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px',
    height: '400px',
    width: '90vw'
  },
  imgBlur: {
    background: props => `url(${props.src}) no-repeat center`,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    filter: 'blur(20px)'
  },
  img: {
    background: props => `url(${props.src}) no-repeat center`,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }
}));

const ImageRandom = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
        <div className={classes.imgBlur}/>
        <div className={classes.img}/>
    </div>
  )
};

export default ImageRandom;
