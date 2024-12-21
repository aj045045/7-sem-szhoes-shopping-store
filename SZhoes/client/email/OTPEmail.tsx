import { OTPHook } from "@/hooks/OtpGenerator";
import { Html, Head, Body, Tailwind, Text, Section, Img, Preview, Container, Heading, Hr } from "@react-email/components"

interface OTPEmailProps {
    name: string;
    task: string;
    code: string;
    emailId: string;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export default function OTPEmailComp({ name, task, code, emailId }: OTPEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>SZhoes Email Verification</Preview>
            <Tailwind>
                <Body className="bg-neutral-200 py-5 select-none">
                    <Container className="items-center bg-white rounded-md flex text-center flex-col font-sans ">
                        <Section>
                            <Img src={`${baseUrl}/static/logo.png`} className="w-28 p-2 my-2 mx-auto" />
                        </Section>
                        <Section>
                            <Heading className="text-3xl">Verify your email</Heading>
                            <Text className="text-2xl" >Hi {name}</Text>
                        </Section>
                        <Section>
                            <Text>Use this code below to {task} in  SZhoes</Text>
                        </Section>
                        <Section className="px-5">
                            <Text className="bg-green-400 p-3 text-center text-4xl select-text">{code}</Text>
                            <Text>The code will expire in 5 minutes</Text>
                        </Section>
                        <Section>
                            <Text>This code will securely {task} using</Text>
                            <Text className="text-blue-500">{emailId}</Text>
                        </Section>
                        <Section>
                            <Hr />
                            <Text className="text-neutral-500">If you didn&apos;t request this email, there&apos;s nothing to worry about, you can safely ignore it.</Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}


OTPEmailComp.PreviewProps = {
    name: "Ansh Yadav",
    task: "Register",
    code: OTPHook(),
    emailId: "aj045045@gmail.com"
}