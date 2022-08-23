import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
type ThreadType = { title: string, link: string }
export const ThreadHeader = (props: {threads: ThreadType[]}) => {
  console.log(props);
  
  return (
    <Box mb={4}>
      {props.threads.map((item: ThreadType, key: number) =>
        (
          <Typography component={'span'} key={key}>
          <Link to={item.link} style={{ textDecoration: "none", color: 'black' }}><Typography component={'span'}> {item.title}</Typography></Link>
          {key === (props.threads.length-1) ? '': <Typography component={'span'}> {'>'}</Typography>}
          </Typography>
        )
      )}
    </Box>
  )
}
