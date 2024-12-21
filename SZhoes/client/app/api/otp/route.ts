import OTPEmailComp from "@/email/OTPEmail";
import { render } from '@react-email/components';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, emailId, code, task } = await request.json();
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.GMAIL_PASSWORD,
            },
        });

        const emailHtml = render(OTPEmailComp({ name, task, code, emailId }));

        const options = {
            from: 'no-reply@szhoes.com',
            to: emailId,
            subject: `SZhoes: ${task} Email ID Verification`,
            html: emailHtml,
        };

        const info = await transporter.sendMail(options);
        if (info.accepted.length > 0) {
            return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), { status: 200 });
        } else {
            console.error("Error while sending email");
            return new Response(JSON.stringify({ success: false, message: 'Failed to send email' }), { status: 500 });
        }
    } catch (error) {
        console.error("Error processing request", error);
        return new Response(JSON.stringify({ message: 'Internal server error', error }), { status: 500 });
    }
}


