import OTPEmailComp from "@/emails/OTPEmail";
import { OTPEmailProps } from "@/interfaces/email";
import { transporter } from "@/utility/other/mail";
import { render } from '@react-email/components';

export async function POST(request: Request) {
    try {
        const { code, emailId, name, task }: OTPEmailProps = await request.json();
        const emailHtml = await render(OTPEmailComp({ name, task, code, emailId }));

        const options = {
            from: 'no-reply@szhoes.com',
            to: emailId,
            subject: `SZhoes: ${task} Email ID Verification`,
            html: emailHtml,
        };

        const info = await transporter.sendMail(options);
        if (info.accepted.length > 0) {
            return new Response(JSON.stringify({ status: 'success', message: 'Email sent successfully' }), { status: 200 });
        } else {
            console.error("Error while sending email");
            return new Response(JSON.stringify({ status: "error", message: 'Failed to send email' }), { status: 500 });
        }
    } catch (error) {
        console.error("Error processing request", error);
        return new Response(JSON.stringify({ status: "error", message: 'Internal server error', error }), { status: 500 });
    }
}
