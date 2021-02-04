
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  await knex("roles").insert([
    { id: 1, name: "subscriber" },
    { id: 2, name: "creator" }
  ]);
};

