exports.up = function (knex) {
    return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(() => {
        return knex.schema
            .createTable('users', function (table) {
                table.uuid('id').primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
                table.string('fullName', 255).notNullable()
                table.string('email', 255).notNullable()
                table.string('password', 255).notNullable()
                table.string('phone', 255).notNullable()
                table
                    .boolean('account_verified')
                    .notNullable()
                    .defaultTo(false)
                table.timestamp('created_at').defaultTo(knex.fn.now())
                table.timestamp('updated_at').defaultTo(knex.fn.now())
            })
    })
}

exports.down = function (knex) {
    return knex.schema
        .dropTable('users')
}
