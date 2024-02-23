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
         * @event room - 방 폭파 이벤트
         * @description 방장이 퇴장하면서 개설했던 방이 폭파됩니다. 방에 속했던 유저들은 모두 소켓이 끊어집니다.
         * */
        LEAVE_ALL_USER_FROM_ROOM = 'leave-all-user-from-room',

        /**
         * @event room - 대기실 이벤트
         * @description 대기실의 사용자 상태 정보를 갱신 합니다. ( 입장/준비 완료/퇴장 )
         * */
        UPDATE_STATUS = 'update-status',

        /**
         * @event room - 대기실 이벤트
         * @description * @description 사용자의 대기실 상태 정보를 입장으로 변경 합니다.
         * */
        ENTER = 'enter',

        /**
         * @event room - 대기실 이벤트
         * @description 사용자의 대기실 상태 정보를 준비완료로 변경 합니다.
         * */
        READY = 'READY',

        /**
         * @event room - 대기실 이벤트
         * @description 사용자의 대기실 상태 정보를 퇴장으로 변경 합니다.
         * */
        EXIT = 'EXIT',
}
