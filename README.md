# HYU-OMS Version 4

이 버전부터는 API Server 와 Web Application 이 같은 Repository 에 통합됩니다.


### What is changed?

큰 구조는 이전 버전([API](https://github.com/HYU-OMS/hyu-oms-api-v3), [WebApp](https://github.com/HYU-OMS/hyu-oms-webapp-v3)) 을 따라갑니다. 다만...

- 작성 언어를 Javascript 에서 Typescript 로 변경했습니다.
- Database 를 MySQL 에서 MongoDB 로 변경했습니다.
    
    - MongoDB 버전은 3.6 을 사용하며 이는 2019년 7월을 기준으로 [AWS DocumentDB](https://aws.amazon.com/ko/documentdb/) 와 호환됩니다.

- WebSocket 을 적극적으로 적용하여 실시간 업데이트 기능을 강화했습니다.

    - [socket.io](https://www.npmjs.com/package/socket.io) 대신에 [ws](https://www.npmjs.com/package/ws) 를 사용합니다.


### Tested environment

- macOS Mojave
- Ubuntu 18.04 LTS with AWS EC2


### Prerequisites

- Node.js v12 or higher
- MongoDB v3.6


### Before start

HYU-OMS 를 실행하기 전에 아래의 checklist 를 확인해 주세요.

###### npm install 진행

```sh
$ npm install
$ cd src/react-app && npm install
```

 
### TODO

보다시피 아직 열심히 코드를 짜고 있습니다.  
완성이 되는 대로 README 를 풍부하게 업데이트 할 예정입니다.