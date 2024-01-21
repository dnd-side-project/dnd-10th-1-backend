export function createOrConditionParam<T>(conditions: T | undefined): T[] | [] {
        // conditions 값 예시
        // {
        //         providerId: "11111",
        //         email : "test@example.com"
        // }

        // How To Use
        // await this.prismaService.user.findFirst({
        //         where : {
        //              OR: this.createOrConditionParam<Prisma.UserWhereInput>(query)
        // }
        // })

        // ALERT: OR: undeinfed 를 반환하는 경우 해당 테이블의 모든 record 가 조회되므로 주의해야한다.

        const isObjectEmpty = Object.keys(conditions).length === 0;

        if (isObjectEmpty) {
                return [];
        }

        return Object.keys(conditions).map((key) => ({ [key]: conditions[key] })) as T[];
}
