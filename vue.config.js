const bodyParser = require('body-parser')

module.exports = {
  devServer: {
    before: app => {
      app.use(bodyParser.json())

      const users = {
        'foo@example.com': {
          password: '12345678',
          userId: 1,
          token: '1234567890abcdef'
        }
      }

      app.post('/auth/login', (req, res) => {
        const { email, password } = req.body
        const user = users[email]
        if (user && password === user.password) {
          res.json({ userId: user.userId, token: user.token })
        } else {
          res.status(401).json({ message: 'ログインに失敗しました。' })
        }
      })
    }
  }
}
