import {body, validationResult} from 'express-validator';

export const noteValidator = [
  body('title').notEmpty().isString().trim().withMessage('Title is required.'),
  body('content').notEmpty().isString().trim().withMessage('Content is required.')
  //body ('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long.'),
  //body ('content').isLength({ min: 5 }).withMessage('Content must be at least 5 characters long.')
  //body('title').optional().isLength({ min: 3 }).with
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
