import React from 'react';
import Slide from 'material-ui/transitions/Slide';

export default function TransitionDown(props) {
  return (<Slide direction="down" {...props} />);
}
