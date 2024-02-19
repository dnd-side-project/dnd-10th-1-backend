# dnd-10th-1-backend
DND 10기 1조 백엔드

🌲 Project Structure
```bash
src/
├── app.module.ts
├── main.ts
├── setup.ts
│
├── common
│   ├── config
│   ├── decorators
│   ├── filters
│   ├── interceptors
│   ├── interfaces
│   └── utils
│
├── domain
│   ├── game
│   ├── game-mbti
│   ├── health-check
│   ├── room
│   └── user
│
└── shared-service
    ├── aws
    ├── env
    ├── http
    ├── mail
    ├── prisma
    ├── redis
    └── shared-service.module.ts
```

<br/>


## 🔖 Project Setup

### Requirement
1. v18 이상의 Node.js 를 다운로드 합니다. ( v18.17.x 를 권장 합니다.)
2. 의존성 설치를 위한 패키지 매니저 pnpm 를 다운로드 합니다.
3. MySQL Container 구성을 위해 docker 를 다운로드 합니다.
   
<br/>

### Start Server
#### 1. 로컬 환경에서 해당 프로젝트 REPO 를 git clone 합니다.
```bash
  git clone git@github.com:dnd-side-project/dnd-10th-1-backend.git
```

#### 2. git clone 이 완료된 후에는 해당 프로젝트 폴더로 이동하여, 의존성 설치를 진행 합니다.
```bash
  cd dnd-10th-1-backend/
  pnpm install
```

#### 3. pnpm db:setup 명령어를 실행하여 로컬 환경에서의 개발을 위한 MySQL Container 를 구성 합니다.

`db:setup` 명령어는 아래의 명령어로 구성되어 있습니다.

 - `pnpm generate` : `schema.prisma` 파일의 DB 스키마 작성 내용을 기반으로 타입을 생성 합니다.
 - `pnpm db:start` : `docker-compose.local.yaml` 파일에 정의된 MySQL Container 를 구동 시킵니다.
 - `pnpm db:clean` : 이전에 구동시킨 MySQL Container 가 존재하는 경우, MySQL 데이터 (스키마, 시드) 를 초기화 하고, 스키마를 재설정 합니다.
 - `pnpm db:seed` : `seed.ts` 에 정의된 초기 데이터셋을 입력 합니다.

```bash
  pnpm db:setup
```

#### 4. 서버를 실행 합니다.
정상적으로 실행하게 되면 아래와 같이 boot print 와 사전에 설정한 환경 변수값들을 확인 할 수 있습니다. 
( p.s LOCAL 개발용이며, DEV/PROD 배포시에는 비활성화 해야 합니다. )
```bash
  pnpm local:start
```

<img width="747" alt="image" src="https://github.com/dnd-side-project/dnd-10th-1-backend/assets/58043975/c7ab5f5b-cb94-4a0e-ad2b-09be7e96657b">