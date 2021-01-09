import React from 'react';
import './Window.scss';

const Window = (props) => {
     return (
          <div className={`window-model${props.className? ' ' + props.className : ''}`}>
               {props.children}
          </div>
     )
}

export default React.memo(Window)
