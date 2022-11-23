import { body } from "express-validator";

const strongPassword = {
	minLength: 6,
	minLowercase: 1,
	minUppercase: 1,
	minNumbers: 1,
	minSymbols: 0,
	returnScore: false,
	pointsPerUnique: 0,
	pointsPerRepeat: 0,
	pointsForContainingLower: 0,
	pointsForContainingUpper: 0,
	pointsForContainingNumber: 0,
	pointsForContainingSymbol: 0
}

class UserValidator {
	checkCreateUser() {
		return [
			body('name')
				.notEmpty()
				.withMessage("The name value should be not empty"),
			body('email')
				.notEmpty()
				.withMessage("The email value should be not empty")
				.isEmail()
				.withMessage(`The email value is not correct'`),
			body('password')
				.notEmpty()
				.withMessage("The password value should be not empty")
				.isStrongPassword(strongPassword)
				.withMessage("The password value should be have min 6 characters with one upper case and one number ")
		]
	}
	checkLoginUser() {
		return [
			body('name')
				.notEmpty()
				.withMessage("The name value should be not empty"),
			body('password')
				.notEmpty()
				.withMessage("The password value should be not empty")
				.isStrongPassword(strongPassword)
				.withMessage("The password value should be have min 6 characters with one upper case and one number ")
		]
	}
}

export const userValidator = new UserValidator();