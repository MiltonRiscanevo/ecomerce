import { ListItem, List, Typography } from "@material-ui/core"
import {useStateValue} from "../StateProvider"
import {getBasketTotal} from "../../reducer"
import accounting from "accounting"
import { ListItemText } from "@material-ui/core"

const Review = () => {
  const [{basket} , dispatch] = useStateValue()
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Order Sumary
      </Typography>
      <List disablePadding>
          {
            basket ?.map(product =>(
              <ListItem key={product.title}>
                <ListItemText primary={product.title} secondary={`Qty:${1}`} />
                <Typography variant="body2" >
                  {accounting.formatMoney(product.price)}  
                </Typography>
              </ListItem>
            ))
          }
          <ListItem>
            <ListItemText primary="Total"/>
              <Typography variant="subtitle1">
                {accounting.formatMoney(getBasketTotal(basket))}
              </Typography>
          </ListItem>
      </List>
    </>
  )
}

export default Review