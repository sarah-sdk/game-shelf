import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { User } from "../../types/types";

class UserRepository {
  // C of CRUD
  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.execute<Result>(
      `
      INSERT INTO
        user(
          email,
          username,
          password,
          is_admin,
          is_public
        )
      VALUES
        (?, ?, ?, ?, ?)
      `,
      [user.email, user.username, user.password, user.isAdmin, user.isPublic],
    );

    return result.insertId;
  }

  // R of CRUD
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        id,
        email,
        username,
        is_admin,
        is_public,
        created_at
      FROM
        user
      `,
    );

    return rows.map((user) => ({
      id: user.id,
      email: user.email,
      username: user.username,
      isAdmin: Boolean(user.is_admin),
      isPublic: Boolean(user.is_public),
      createdAt: user.created_at,
    }));
  }

  async read(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        id,
        email,
        username,
        is_admin,
        is_public,
        created_at
      FROM
        user
      WHERE
        id = ?
      `,
      [userId],
    );

    const user = rows[0];
    if (!user) return undefined;

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      isAdmin: user.is_admin,
      isPublic: user.is_public,
      createdAt: user.created_at,
    };
  }

  // U of CRUD
  async update(user: Omit<User, "isAdmin">) {
    const [result] = await databaseClient.execute<Result>(
      `
      UPDATE
        user
      SET
        email = ?,
        username = ?,
        password = ?,
        is_public = ?
      WHERE
        id = ?
      `,
      [user.email, user.username, user.password, user.isPublic, user.id],
    );

    return result.affectedRows > 0;
  }

  // D of CRUD
  async destroy(userId: number) {
    const [result] = await databaseClient.execute<Result>(
      `
      DELETE FROM
        user
      WHERE
        id = ?
      `,
      [userId],
    );

    return result.affectedRows;
  }
}

export default new UserRepository();
