import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize("mysql://root@(/tmp/mysql.sock)/med", {
  dialect: "mysql",
  dialectModule: require("mysql2"),
});

export const Accounts = sequelize.define(
  "Accounts",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    compound_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    provider_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    provider_account_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    access_token: {
      type: DataTypes.TEXT,
    },
    access_token_expires: {
      type: DataTypes.TIME,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["compound_id"],
      },
      {
        fields: ["provider_account_id"],
      },
      {
        fields: ["provider_id"],
      },
      {
        fields: ["user_id"],
      },
    ],
  },
);

export const Sessions = sequelize.define(
  "Sessions",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    session_token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        fields: ["session_token"],
      },
      {
        fields: ["access_token"],
      },
    ],
  },
);

export const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    email_verified: {
      type: DataTypes.DATE,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    indexes: [{ fields: ["email"] }],
  },
);

export const Patients = sequelize.define(
  "Patients",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    provider: {
      type: DataTypes.STRING,
    },
    visit_status: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    indexes: [{ fields: ["provider"] }],
  },
);

export const Verification_Requests = sequelize.define(
  "Verification_Requests",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    indexes: [{ fields: ["token"] }],
  },
);
