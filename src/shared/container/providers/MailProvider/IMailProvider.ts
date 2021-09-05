interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: any,
    pathToTemplate: string
  ): Promise<void>;
}
export { IMailProvider };
