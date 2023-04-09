import { render } from "mjml-react";
import nodemailer from "nodemailer";
import { ReactElement } from "react";

export const EMAIL_SUBJECTS = {
  LOGIN: "Your Photoshot Login Link",
};


let config = {
  service : 'gmail',
  host: "smtp.gmail.com",
  auth:{
    user:process.env.EMAIL,
    pass:process.env.EMAIL_PASSWORD
  }
}
const transporter = nodemailer.createTransport(config);

export const sendEmail = async ({
  to,
  subject,
  component,
}: {
  to: string;
  subject: string;
  component: ReactElement;
}) => {
  if (!transporter) {
    console.error("Transporter not initialized");
    throw new Error("Transporter not initialized");
  }
  const { html } = render(component);

  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html,
  });
};
