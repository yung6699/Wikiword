module.exports = function (app) {
  const WIKIWORD = require('../../common/wikiword')
  const API_KEY = WIKIWORD.API_KEY
  const HOST = WIKIWORD.HOST
  const RENDERING = WIKIWORD.RENDERING

    /* 서버 배포시 자동적으로 ip 적용하기 위해서 */
  let type = require('os').type()
  let hostIP = (type === 'Linux') ? HOST.Linux : HOST.Windows

  app.get('/', (req, res, next) => { res.render('index.html', { host: hostIP }) })

  app.get('/result', (req, res) => { res.render('result.html', { data: req.query.query, host: hostIP }) })

  app.post('/rendering', (req, res) => { res.end(JSON.stringify(RENDERING)) })

  app.post('/more', (req, res) => {
    for (let item of RENDERING) {
      if (item.title == req.body.title) {
        res.end(JSON.stringify(item))
      }
    }
  })

    /* 키값을 브라우저에 표시하지 않기 위해 서버에서 json 파일을 읽어 제공한다. */
  app.post('/setting', (req, res, next) => {
    res.send(JSON.stringify({
      'google_client_id': API_KEY.google_client_id,
      'facebook_app_id': API_KEY.facebook_app_id
    }))
  })
}
