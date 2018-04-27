# WebSocket-Driver
## これは何？
WebSocketを使って、WebDriverのないブラウザーや実機に対してWebDriver的なことをしようと頑張ってみたものです。
結局、ブラウザーのバージョンによってはうまくいかないことが多いため、 `Socket.io` を使ってWebSocket的なことを実現しています。
きちんとWebSocketが使える場合にはWebSocketで、そうでない場合はポーリングなどで通信します。

## とりあえず試す

1. `yarn` する
```shell
$ yarn
$ yarn start
```
1. ブラウザから `https://localhost:8080/test.html` にアクセスする
1. 勝手にブラウザが操作される
(カウンタが3になります)
