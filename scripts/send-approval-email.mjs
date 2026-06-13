import nodemailer from "nodemailer";
import { assert } from "./lib.mjs";

const required = ["SMTP_HOST", "SMTP_USERNAME", "SMTP_PASSWORD", "APPROVAL_EMAIL"];
for (const name of required) assert(process.env[name], `${name} is required for approval email.`);

const runUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: { user: process.env.SMTP_USERNAME, pass: process.env.SMTP_PASSWORD }
});

await transporter.sendMail({
  from: process.env.SMTP_FROM || process.env.SMTP_USERNAME,
  to: process.env.APPROVAL_EMAIL,
  subject: `AI Odd Couple video ready for approval: ${process.env.EPISODE_ID || "new episode"}`,
  text: `A new AI Odd Couple video has been produced and is ready for approval.

Episode: ${process.env.EPISODE_ID || "See workflow artifact"}
Review and download: ${runUrl}

To publish after review, run the "Publish approved episode" workflow with this production run ID:
${process.env.GITHUB_RUN_ID}

No social publishing has occurred.`
});
console.log("Approval email sent.");
