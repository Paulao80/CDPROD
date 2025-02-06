class Config {
  public host = process.env.EMAIL_HOST;
  public port = process.env.EMAIL_PORTS
    ? Number(process.env.EMAIL_PORT)
    : undefined;
  public user = process.env.EMAIL_USER || "";
  public password = process.env.EMAIL_PASSWORD || "";
  public secure = process.env.EMAIL_SECURE === "true";
}

export default new Config();
