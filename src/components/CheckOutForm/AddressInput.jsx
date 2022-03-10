import {Grid, TextField} from '@material-ui/core' 
import {useFormContext,Controller} from 'react-hook-form'

const AddressInput = ({name, label, required}) => {

    const {control} = useFormContext()

    return (
        <Grid item xs={12} sm={6}>
            <Controller
              control= {control}
              defaultValue=""
              name={name} 
              rules= {{required:true}}
              render = {({field})=>
              <TextField
              fullwidth='true'
              label={label}
              required={required}
              />}/>
        </Grid>
  )
}

export default AddressInput