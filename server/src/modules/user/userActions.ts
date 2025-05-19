import type { RequestHandler } from "express";
import type { User } from "../../types/types";
import userRepository from "./userRepository";

// B of BREAD
const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();

    if (!users) res.sendStatus(404);

    res.json(users);
  } catch (error) {
    next(error);
  }
};

// R of BREAD
const read: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.id);

  try {
    const user = await userRepository.read(userId);

    if (!user) res.sendStatus(404);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// E of BREAD
const edit: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.id);

  try {
    const updateData: Omit<User, "isAdmin"> = {
      id: userId,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      isPublic: req.body.isPublic,
    };

    const updatedUser = await userRepository.update(updateData);

    if (!updatedUser) res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// A of BREAD
const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser: Omit<User, "id"> = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
      isPublic: req.body.isPublic,
    };

    const insertId = await userRepository.create(newUser);

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

// D of BREAD
const destroy: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.id);

  try {
    const affectedRows = await userRepository.destroy(userId);

    if (affectedRows === 0) res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy };
