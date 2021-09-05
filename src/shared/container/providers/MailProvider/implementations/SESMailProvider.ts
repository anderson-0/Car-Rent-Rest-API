import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import aws, { SES } from "aws-sdk";

import { IMailProvider } from "../IMailProvider";

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: process.env.AWS_REGION,
});

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    // create Nodemailer SES transporter
    this.client = nodemailer.createTransport({
      SES: { ses, aws },
    });
  }
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    pathToTemplate: string
  ): Promise<void> {
    const templateFileContent = fs
      .readFileSync(pathToTemplate)
      .toString("utf-8");
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: `Rentx <${process.env.EMAIL_SENDER}>`,
      subject,
      html: templateHTML,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { SESMailProvider };
