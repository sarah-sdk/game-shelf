import type { RequestHandler } from "express";
import type { UserGame } from "../../types/types";
import userGameRepository from "./userGameRepository";

// B of BREAD
const browse: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);

  try {
    const games = await userGameRepository.readAll(userId);

    if (!games) res.sendStatus(404);

    res.json(games);
  } catch (error) {}
};

// R of BREAD
const read: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const gameId = Number(req.params.gameId);

  try {
    const game = await userGameRepository.read(userId, gameId);

    if (!game) res.sendStatus(404);

    res.json(game);
  } catch (error) {
    next(error);
  }
};

// E of BREAD
const edit: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const gameId = Number(req.params.gameId);

  try {
    const updateData = {
      userId: userId,
      externalId: gameId,
      status: req.body.status,
      comment: req.body.comment,
    };

    const updatedGame = await userGameRepository.update(updateData);

    if (!updatedGame) res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// A of BREAD
const add: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);

  try {
    const newUserGame: UserGame = {
      userId: userId,
      externalId: req.body.externalId,
      status: req.body.status,
      comment: req.body.comment,
    };

    const ids = await userGameRepository.create(newUserGame);

    res.status(201).json({ ids });
  } catch (error) {
    next(error);
  }
};

// D of BREAD
const destroy: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const gameId = Number(req.params.gameId);

  try {
    const affectedRows = await userGameRepository.destroy(userId, gameId);

    if (affectedRows === 0) res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy };
