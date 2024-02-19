export enum RoomEvent {
        /**
         * @event 공통 이벤트
         * @description 방의 참여자 정보를 실시간으로 갱신 합니다.
         *  */
        LISTEN_ROOM_USER_LIST = 'listen-room-user-list',

        /**
         * @event 공통 이벤트
         * @description 대기실 화면으로 이동 합니다.
         *  */
        MOVE_TO_WAITING_ROOM = 'move-to-waiting-room',

        /**
         * @event room - 방 생성 이벤트
         * @description 방을 생성 합니다. 해당 유저는 방장이 됩니다.
         * */
        CREATE_ROOM = 'create-room',

        /**
         * @event room - 방 참가 이벤트
         * @description 사용자가 기존에 생성된 방에 참여 합니다. 해당 유저는 참가자가 됩니다.
         * */
        JOIN_ROOM = 'join-room',

        /**
         * @event room - 대기실 이벤트
         * @description 대기실의 사용자 상태 정보를 갱신 합니다. ( 대기 / 준비 완료 )
         * */
        UPDATE_STATUS = 'update-status',
}
