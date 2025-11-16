import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Movies1762891818285 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
        await queryRunner.createTable(
            new Table({
                name: 'movies',
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "title",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "original_title",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "duration",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "genre",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "director",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "poster_url",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "youtube_url",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "release_date",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                      columnNames: ["user_id"],
                      referencedTableName: "users",
                      referencedColumnNames: ["id"],
                      onDelete: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
