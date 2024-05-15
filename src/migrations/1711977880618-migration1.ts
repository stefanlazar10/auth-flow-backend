import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migration11711977880618 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                { name: "id", type: "varchar", length: "255", isNullable: false, isPrimary: true },
                { name: "firstname", type: "varchar", length: "255", isNullable: false },
                { name: "lastname", type: "varchar", length: "255", isNullable: false },
                { name: "email", type: "varchar", length: "255", isNullable: false, isUnique: true },
                { name: "password", type: "varchar", length: "255", isNullable: false },
            ],
        }));


        await queryRunner.createTable(new Table({
            name: "OtpValidation",
            columns: [
                { name: "id", type: "varchar", length: "255", isNullable: false, isPrimary: true },
                { name: "otpCode", type: "varchar", length: "255", isNullable: false },
                { name: "OTPtimestamp", type: "timestamp", isNullable: false },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);

        await queryRunner.query(`DROP TABLE "OtpValidation"`);
    }

}
