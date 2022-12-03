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
				.withMessage("Nazwa nie może być pusta"),
			body('email')
				.notEmpty()
				.withMessage("Email nie może być puste")
				.isEmail()
				.withMessage(`Email jest niepoprawny`),
			body('password')
				.notEmpty()
				.withMessage("Hasło nie może być puste")
				.isStrongPassword(strongPassword)
				.withMessage("Hasło musi składać się z minimum 6 znaków w tym jedna duża litera i jedna cyfra")
		]
	}
	checkLoginUser() {
		return [
			body('email')
				.notEmpty()
				.withMessage("Email nie może być puste")
				.isEmail()
				.withMessage(`Email jest niepoprawny`),
			body('password')
				.notEmpty()
				.withMessage("Hasło nie może być puste")
				.isStrongPassword(strongPassword)
				.withMessage("Hasło musi składać się z minimum 6 znaków w tym jedna duża litera i jedna cyfra"),
		]
	}
}

export const userValidator = new UserValidator();
