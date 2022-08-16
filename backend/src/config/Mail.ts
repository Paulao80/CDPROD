class Config {
    public host = 'smtp.mail.yahoo.com';
    public port = 587;
    public user = `${process.env.EMAIL_SEND}`;
    public password = `${process.env.PASSWORD_EMAIL}`;
}

export default new Config;