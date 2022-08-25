import ReactQuill, { Quill } from 'react-quill'
import React, { useState } from 'react'
import { FormGroup } from '@mui/material';
 import 'react-quill/dist/quill.snow.css';
export const Editor = () => {
  const [value, setValue] = useState('');
  // const handleChange = (value: any) => {
  //   setValue(value.target.value);
  // }
  return (
    
      <ReactQuill theme="snow" value={value} onChange={setValue} />
  )
}
