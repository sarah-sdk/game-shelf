import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { UserGame } from "../../types/types";

class UserGameRepository {
  async create(userGame: UserGame) {
    await databaseClient.execute<Result>(
      `
      INSERT INTO
        user_game(
          user_id,
          external_id,
          status,
          comment
        )
      VALUES
        (?, ?, ?, ?)
      `,
      [userGame.userId, userGame.externalId, userGame.status, userGame.comment],
    );

    return {
      userId: userGame.userId,
      externalId: userGame.externalId,
    };
  }

  async readAll(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        external_id,
        status,
        comment,
        added_at
      FROM
        user_game
      WHERE
        user_id = ?
      `,
      [userId],
    );

    return rows.map((game) => ({
      externalId: game.external_id,
      status: game.status,
      comment: game.comment,
      addedAt: game.added_at,
    }));
  }

  async read(userId: number, gameId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        external_id,
        status,
        comment,
        added_at
      FROM
        user_game
      WHERE
        user_id = ?
      AND
        external_id = ?
      `,
      [userId, gameId],
    );

    const game = rows[0];
    if (!game) return null;

    return {
      externalId: game.external_id,
      status: game.status,
      comment: game.comment,
      addedAt: game.added_at,
    };
  }

  async update(userGame: UserGame) {
    const [result] = await databaseClient.execute<Result>(
      `
      UPDATE
        user_game
      SET
        status = ?,
        comment = ?
      WHERE
        user_id = ?
      AND
        external_id = ?
      `,
      [userGame.status, userGame.comment, userGame.userId, userGame.externalId],
    );

    return result.affectedRows > 0;
  }

  async destroy(userId: number, gameId: number) {
    const [result] = await databaseClient.execute<Result>(
      `
      DELETE FROM
        user_game
      WHERE
        user_id = ?
      AND
        external_id = ?
      `,
      [userId, gameId],
    );

    return result.affectedRows;
  }
}

export default new UserGameRepository();
