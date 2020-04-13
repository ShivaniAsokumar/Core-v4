import React from 'react';
import {
  Jumbotron
} from 'reactstrap';

export const PrintIcon = `Drag & Drop or Touch Here <br />
<svg aria-hidden='true' viewBox='0 0 512 512' width='40%'>
<path
  d='M399.95 160h-287.9C76.824 160 48 188.803 48
  224v138.667h79.899V448H384.1v-85.333H464V224c0-35.197-28.825-64-64.05-64zM352
  416H160V288h192v128zm32.101-352H127.899v80H384.1V64z'
  />
</svg>`

export const header = (title) => (
  <Jumbotron>
    <div className='text-center'>
      <h1 className='display-4'>{title}</h1>
    </div>
  </Jumbotron>
)



