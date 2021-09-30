export const ValidateEmail = (email: string) => {
    const validator = /\S+@\S+\.\S+/;

    return validator.test(email);
}