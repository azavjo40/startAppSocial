export const unreadMsg = async ({ userId, chatId, token }) => {
  const form = {
    userId: userId,
    interlocutor: chatId,
  }
  try {
    const option = {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }
    const data = await fetch('/api/chat/unread/msg', option)
    const json = await data.json()
    if (json.unreadMsg) return json.unreadMsg
  } catch (e) {
    console.log(e)
  }
}
