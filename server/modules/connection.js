var connectionString = 'postgres://localhost:5432/groupDB';
//extra = sign added
if(process.env.DATABASE_URL !== undefined) {
     console.log('env connection string');
     connectionString = process.env.DATABASE_URL;
     pg.defaults.ssl = true;
 } else {
     connectionString = 'postgres://localhost:5432/groupDB';
 }

module.exports = connectionString;
