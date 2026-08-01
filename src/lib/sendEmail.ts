import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface AppointmentEmailData {
  to: string;
  name: string;
  service: string;
  branch: string;
  date: string;
  time: string;
  reason?: string;
}

const SITE_URL = process.env.SITE_URL || "http://localhost:3000";

export async function sendConfirmationEmail(data: AppointmentEmailData) {
  const info = await transporter.sendMail({
    from: `"Beauty Salon" <${process.env.EMAIL_USER}>`,
    to: data.to,
    subject: "Your Appointment is Confirmed - Beauty Salon",
    html: `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0e6df; padding: 40px 0; font-family: Georgia, 'Times New Roman', serif;">
        <tr>
          <td align="center">
            <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden;">
              <tr>
                <td align="center" style="background-color: #2c1810; padding: 32px 24px;">
                  <img src="${SITE_URL}/logo-beauty-salon-1.png" alt="Beauty Salon" width="140" style="display: block; margin: 0 auto;" />
                </td>
              </tr>
              <tr>
                <td align="center" style="background-color: #c47c5a; padding: 20px 24px;">
                  <p style="margin: 0; color: #ffffff; font-size: 22px; letter-spacing: 0.5px;">
                    Appointment Confirmed
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 36px 40px 12px 40px;">
                  <p style="font-size: 17px; color: #2c1810; margin: 0 0 8px 0;">
                    Dear ${data.name},
                  </p>
                  <p style="font-size: 15px; color: #5a4a42; line-height: 1.6; margin: 0 0 28px 0;">
                    We're delighted to confirm your upcoming visit with us. Our team is looking forward to giving you an experience worth glowing about.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 40px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f3f0; border-radius: 10px; border: 1px solid #eadfd8;">
                    <tr>
                      <td style="padding: 24px 28px;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="6">
                          <tr><td style="font-size: 13px; color: #c47c5a; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">Service</td></tr>
                          <tr><td style="font-size: 17px; color: #2c1810; font-weight: bold; padding-bottom: 14px;">${data.service}</td></tr>
                          <tr><td style="font-size: 13px; color: #c47c5a; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">Branch</td></tr>
                          <tr><td style="font-size: 17px; color: #2c1810; font-weight: bold; padding-bottom: 14px;">${data.branch}</td></tr>
                          <tr>
                            <td>
                              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td width="50%" style="font-size: 13px; color: #c47c5a; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">Date</td>
                                  <td width="50%" style="font-size: 13px; color: #c47c5a; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">Time</td>
                                </tr>
                                <tr>
                                  <td style="font-size: 17px; color: #2c1810; font-weight: bold;">${data.date}</td>
                                  <td style="font-size: 17px; color: #2c1810; font-weight: bold;">${data.time}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 28px 40px 8px 40px;">
                  <p style="font-size: 14px; color: #5a4a42; line-height: 1.6; margin: 0;">
                    If you need to reschedule or have any questions, feel free to reach out - we're always happy to help.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 40px 36px 40px;">
                  <p style="font-size: 15px; color: #c47c5a; font-weight: bold; margin: 0; font-style: italic;">
                    With warmth,<br/>The Beauty Salon Team
                  </p>
                </td>
              </tr>
              <tr>
                <td align="center" style="background-color: #f9f3f0; padding: 18px; border-top: 1px solid #eadfd8;">
                  <p style="font-size: 12px; color: #a08b7f; margin: 0;">
                    Beauty Salon &middot; New Baneshwor &middot; Labim Mall &middot; Boudhha &middot; Pokhara
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `,
  });

  console.log("Email sent successfully:", info.messageId);
  return info;
}

export async function sendCancellationEmail(data: AppointmentEmailData) {
  const info = await transporter.sendMail({
    from: `"Beauty Salon" <${process.env.EMAIL_USER}>`,
    to: data.to,
    subject: "Your Appointment Has Been Cancelled - Beauty Salon",
    html: `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0e6df; padding: 40px 0; font-family: Georgia, 'Times New Roman', serif;">
        <tr>
          <td align="center">
            <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden;">
              <tr>
                <td align="center" style="background-color: #2c1810; padding: 32px 24px;">
                  <img src="${SITE_URL}/logo-beauty-salon-1.png" alt="Beauty Salon" width="140" style="display: block; margin: 0 auto;" />
                </td>
              </tr>
              <tr>
                <td align="center" style="background-color: #8a5a45; padding: 20px 24px;">
                  <p style="margin: 0; color: #ffffff; font-size: 22px; letter-spacing: 0.5px;">
                    Appointment Cancelled
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 36px 40px 12px 40px;">
                  <p style="font-size: 17px; color: #2c1810; margin: 0 0 8px 0;">
                    Dear ${data.name},
                  </p>
                  <p style="font-size: 15px; color: #5a4a42; line-height: 1.6; margin: 0 0 28px 0;">
                    We're writing to let you know that your appointment below has been cancelled.
                    ${
                      data.reason
                        ? `<br/><br/><strong style="color: #2c1810;">Reason:</strong> ${data.reason}`
                        : ""
                    }
                    <br/><br/>If you'd like to book a new time, we're just a click away.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 40px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f3f0; border-radius: 10px; border: 1px solid #eadfd8;">
                    <tr>
                      <td style="padding: 24px 28px;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="6">
                          <tr><td style="font-size: 13px; color: #8a5a45; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">Service</td></tr>
                          <tr><td style="font-size: 17px; color: #2c1810; font-weight: bold; padding-bottom: 14px;">${data.service}</td></tr>
                          <tr><td style="font-size: 13px; color: #8a5a45; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">Branch</td></tr>
                          <tr><td style="font-size: 17px; color: #2c1810; font-weight: bold; padding-bottom: 14px;">${data.branch}</td></tr>
                          <tr>
                            <td>
                              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td width="50%" style="font-size: 13px; color: #8a5a45; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">Date</td>
                                  <td width="50%" style="font-size: 13px; color: #8a5a45; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">Time</td>
                                </tr>
                                <tr>
                                  <td style="font-size: 17px; color: #2c1810; font-weight: bold;">${data.date}</td>
                                  <td style="font-size: 17px; color: #2c1810; font-weight: bold;">${data.time}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 32px 40px 8px 40px;">
                  <a href="${SITE_URL}/appointment" style="display: inline-block; background-color: #c47c5a; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-size: 15px; font-weight: bold;">
                    Book a New Appointment
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 28px 40px 36px 40px;">
                  <p style="font-size: 15px; color: #c47c5a; font-weight: bold; margin: 0; font-style: italic;">
                    With warmth,<br/>The Beauty Salon Team
                  </p>
                </td>
              </tr>
              <tr>
                <td align="center" style="background-color: #f9f3f0; padding: 18px; border-top: 1px solid #eadfd8;">
                  <p style="font-size: 12px; color: #a08b7f; margin: 0;">
                    Beauty Salon &middot; New Baneshwor &middot; Labim Mall &middot; Boudhha &middot; Pokhara
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `,
  });

  console.log("Cancellation email sent:", info.messageId);
  return info;
}
