import { Divider } from '@material-ui/core'
import { Button, Link } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import React from 'react'

const Confirmation = ({message}) => {
  return (
    <>
        <Typography variant= 'h6'>
            {message}
        </Typography>
        <Divider/>
        <Typography variant='subtitle2' gutterBottom>
            {message === "succesfull payment"
            ? "Code confirmation payment dfhkfbzfh23b433hb"
            :"Check another payment card or try again"
            }
        </Typography>

        <Button component={Link} to="/" variant='outlined' color="primary" type='button'>
          Back to homepage
        </Button>
    </>
  )
}

export default Confirmation