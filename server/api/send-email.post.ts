import type { EmailRequest, EmailResponse } from "~/types/hotel";

export default defineEventHandler(async (event) => {
  const body = await readBody<EmailRequest>(event);

  // Validate required fields
  if (!body.from_email || !body.subject || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields: from_email, subject, message",
    });
  }

  // Here you would typically integrate with your email service
  // For now, we'll simulate a successful response
  const response: EmailResponse = {
    success: true,
    message: "Email sent successfully",
  };

  return response;
});
