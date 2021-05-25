import { useState } from 'react'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import '../../styles/message/chat.css'
import { useDispatch } from 'react-redux'
import { sendSoketMessage } from '../../redux/message/messageAcsions'

function InputChat({ interlocutor, socket, storage }) {
  const [form, setForm] = useState({ name: '', message: '', chatId: '' })
  const dispatch = useDispatch()

  const changeHandler = (e) => {
    e.preventDefault()
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      name: storage.user.name,
      interlocutor,
      userId: storage.userId,
    })
  }

  const sendMessage = (e) => {
    e.preventDefault()
    dispatch(sendSoketMessage(form, socket))
    setForm({ name: '', message: '', chatId: '' })
  }

  return (
    <form onSubmit={sendMessage}>
      <input
        type="message"
        name="message"
        onChange={changeHandler}
        value={form.message}
        placeholder="Enter Message"
        required
        autoComplete="off"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        endIcon={<Icon>send</Icon>}
      >
        Send
      </Button>
    </form>
  )
}
export default InputChat
