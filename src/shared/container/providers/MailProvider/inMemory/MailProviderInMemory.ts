import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
  private messages: any[];

  constructor() {
    this.messages = [];
  }
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    pathToTemplate: string
  ): Promise<void> {
    this.messages.push({ to, subject, variables, pathToTemplate });
    console.log("Mail Sent");
  }
}

export { MailProviderInMemory };
