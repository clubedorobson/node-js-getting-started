const env = {
    DATABASE_URL : 'postgres://sscnjaewpvbmny:920150653076e2d6eaa77be1292c6102c23f0c38c5d9642058e21b254bb3d3e1@ec2-3-231-48-230.compute-1.amazonaws.com:5432/da175l8b6ul1l5',
    database: 'd19it75c9j04j2',
    username: 'lxknzbbcpmmdyl',
    password: '3f1a281360fc9c4a5c42f35efeb94643064caa4293c74b136e885cc7c3d57beb',
    host: 'ec2-54-163-245-64.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
   
  module.exports = env;