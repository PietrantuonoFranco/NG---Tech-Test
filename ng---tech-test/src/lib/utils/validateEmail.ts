/**
 * Validates if a given string has a valid email format.
 * 
 * Uses a regular expression to check if the email contains:
 * - At least one character before the @ symbol
 * - An @ symbol
 * - At least one character after @ and before the dot
 * - A dot (.) followed by at least one character for the domain extension
 * 
 * @param emailValue - The email string to validate
 * @returns {boolean} True if the email has a valid format, false otherwise
 * 
 * @example
 * validateEmail('user@example.com') // returns true
 * @example
 * validateEmail('invalid.email') // returns false
 * @example
 * validateEmail('user@domain') // returns false
 */
export const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    return emailRegex.test(emailValue)
}