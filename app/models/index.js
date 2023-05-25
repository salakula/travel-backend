const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.place = require("./place.model.js")(sequelize, Sequelize);
db.trip = require("./trip.model.js")(sequelize, Sequelize);
db.day = require("./day.model.js")(sequelize, Sequelize);
db.tripPlace = require("./tripPlace.model.js")(
  sequelize,
  Sequelize
);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for trip
db.user.hasMany(
  db.trip,
  { as: "trip" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.trip.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);

// foreign key for day
db.trip.hasMany(
  db.day,
  { as: "day" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.day.belongsTo(
  db.trip,
  { as: "trip" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign keys for tripPlace
db.day.hasMany(
  db.tripPlace,
  { as: "tripPlace" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.trip.hasMany(
  db.tripPlace,
  { as: "tripPlace" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.place.hasMany(
  db.tripPlace,
  { as: "tripPlace" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.tripPlace.belongsTo(
  db.day,
  { as: "day" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.tripPlace.belongsTo(
  db.trip,
  { as: "trip" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.tripPlace.belongsTo(
  db.place,
  { as: "place" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

module.exports = db;
