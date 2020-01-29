import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserAndListEntity1580286031963 implements MigrationInterface {
    name = 'AddUserAndListEntity1580286031963'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "token" character varying, "isVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "list" ("id" SERIAL NOT NULL, "userId" integer, CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "FK_46ded14b26382088c9f032f8953" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "FK_46ded14b26382088c9f032f8953"`, undefined);
        await queryRunner.query(`DROP TABLE "list"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
