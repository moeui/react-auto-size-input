import 'react-app-polyfill/ie11';
import * as React from 'react';
import { useEffect, useState } from 'react'
import * as ReactDOM from 'react-dom';
import Input from '../.';

const App = () => {
  const [value, setValue] = useState('0')
  return (
    <div>
      <Input value={value} onChange={val => setValue(val)} className="input" suffix={<div>RMB</div>} prefix={<div>Balance: </div>} style={{ '--background': '#ddd' }} />
      <div>
        cur: {value}
      </div>
      <button onClick={() => setValue('1000')}>
        set value 1000
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
