export enum GameEvent {
        /**
         * @event 공통 이벤트
         * @description 게임 로딩 페이지로 이동 합니다.
         * */
        MOVE_TO_LOADING_ROOM = 'move-to-loading-room',

        /**
         * @event game - 게임 종류 조회 이벤트
         * @description 방장이 게임을 선택 합니다.
         * */
        SELECT_GAME = 'select-game',

        /**
         * @event game - 게임 종류 조회 이벤트
         * @description 게임 목록 정보를 조회 합니다.
         * */
        GET_GAME_CATEGORY = 'get-game-category',

        /**
         * @event game - 게임 시작 이벤트
         * @description 방장이 게임을 시작 합니다.
         * */
        START_GAME = 'start-game',

        /**
         * @event game - 게임 시작 이벤트
         * @description 게임 시작을 위한 페이지로 이동 합니다.
         * */
        MOVE_TO_GAME = 'move-to-game',

        /**
         * @event game - 게임 종류 선택 이벤트
         * @description 게임에 대한 정보를 조회 합니다.
         * */
        GET_GAME_ITEM = 'get-game-item',

        /**
         * @event game - 게임 종료 이벤트
         * @description 게임을 종료 합니다.
         * */
        END_GAME = 'end-game',

        /**
         *
         * @event game[mbti] - 사용자 mbti 선택 이벤트
         * @description 사용자의 mbti 를 입력 받습니다.
         * */
        SELECT_MBTI = 'select-mbti',

        /**
         * @event game[mbti] - 사용자 mbti 선택 이벤트
         * @description 사용자의 mbti 입력이 완료되면, 로딩 페이지로 이동 합니다.
         * */
        MOVE_TO_MBTI_LOADING = 'move-to-mbti-loading',

        /**
         * @event game[mbti] - 사용자 mbti 선택 이벤트
         * @description 모든 사용자의 mbti 입력이 완료되면, 완료 이벤트를 반환 합니다.
         * */
        MOVE_TO_MBTI_RESULT = 'move-to-mbti-result',

        /**
         * @event game[빈칸주제] - 게임시작 이벤트
         * @description 사용자별 빈칸주제 게임의 입력 완료 상태를 실시간으로 갱신 합니다.
         * */
        LISTEN_LIVE_USER_COUNT = 'listen-live-user-count',

        /**
         * @event game[빈칸주제] - 게임시작 이벤트
         * @description 모든 사용자의 빈칸주제 입력이 완료되면, 결과 화면으로 이동 합니다.
         * */
        MOVE_TO_BLANK_TOPIC_RESULT = 'move-to-blank-topic-result',

        /**
         * @event game[빈칸주제] - 게임시작 이벤트
         * @description 사용자가 작성한 빈칸주제 답변을 전송 합니다.
         * */
        SEND_USER_ANSWER = 'send-user-answer',

        /**
         * @event game[빈칸주제] - 결과조회
         * @description 빈칸주제 게임의 결과를 조회 합니다.
         * */
        GET_USERS_ANSWER = 'get-users-answer',

        GET_SMALL_TALK_RANDOM_ANSWER = 'get-small-talk-random-answer',
}
