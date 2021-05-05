import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"
import "../../styles/peoples/createBot.css"
const CreateBot = ({ showModal, setShowMdal }) => {
  const showHandle = () => {
    setShowMdal(!showModal)
  }
  return (
    <div>
      <Dialog
        open={true}
        onClose={showHandle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"Create An Autoresponder"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <form noValidate autoComplete='off' className='formBot'>
              <TextField
                id='outlined-name'
                label='If Wrote To Me'
                margin='normal'
                variant='outlined'
              />
              <TextField
                id='outlined-name'
                label='Response From The Bot'
                margin='normal'
                variant='outlined'
              />
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' nClick={showHandle}>
            Saved
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateBot
