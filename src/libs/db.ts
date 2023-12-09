import mysql from "mysql2/promise";

type QueryProps = {
  query: string;
  values: (string | number)[];
};

export async function query({ query, values = [] }: QueryProps) {
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "med",
  });

  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    console.log("Failed to connect to mysql ", error);
  }
}
