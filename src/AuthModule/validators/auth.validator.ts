import { body, ValidationChain } from "express-validator";
import { UserRoles } from "../../shared/enums/user.enum";

export const postSignup: ValidationChain[] = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address.')
        .notEmpty()
        .withMessage('Email is required.'),
    body('firstName')
        .notEmpty()
        .withMessage('First name is required.')
        .isString()
        .withMessage('First name must be a string.')
        .isLength({ min: 2 })
        .withMessage('First name must be at least 2 characters long.'),
    body('lastName')
        .notEmpty()
        .withMessage('Last name is required.')
        .isString()
        .withMessage('Last name must be a string.')
        .isLength({ min: 2 })
        .withMessage('Last name must be at least 2 characters long.'),
    body('password')
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.')
        .matches(/\d/)
        .withMessage('Password must contain at least one number.')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter.')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter.')
        .matches(/[@$!%*?&]/)
        .withMessage('Password must contain at least one special character.'),
    body('role')
        .notEmpty()
        .withMessage('Role is required.')
        .isString()
        .withMessage('Role must be a string.')
        .isIn(Object.values(UserRoles)) // Replace with UserRoles values
        .withMessage(`Role must be one of the predefined values : [${Object.values(UserRoles).join(', ')}]`),

]

export const postLogin = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address.')
        .notEmpty()
        .withMessage('Email is required.'),
    body('password')
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.')
]