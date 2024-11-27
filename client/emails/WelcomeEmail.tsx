import { WelcomeEmailProps } from "@/interfaces/email";
import { formatDateUtil } from "@/utility/other/format-date";
import { Html, Head, Body, Tailwind, Text, Section, Img, Preview, Container, Button, Markdown } from "@react-email/components";

export default function WelcomeEmailComp({ createdAt, email, name }: WelcomeEmailProps) {
    const steps = ['Go to the website by clicking the login in now button', 'Log In the SZhoes using email Id and password', 'Add New Address', 'Order Product', 'Continue Shopping']
    return (
        <Html>
            <Head />
            <Preview>SZhoes Welcome Email</Preview>
            <Tailwind>
                <Body className="bg-neutral-200 py-5 select-none">
                    <Container className="items-center bg-white rounded-md flex flex-col font-sans text-justify [word-spacing:3px] tracking-wide">
                        <Section>
                            <Img src="https://res.cloudinary.com/dvvaf3oih/image/upload/v1732465488/icon_hgrz7f.png" className="w-28 p-2 my-2 mx-auto" />
                        </Section>
                        <Section className="p-5">
                            <Text className="text-3xl font-semibold">
                                Welcome to SZhoes,&nbsp; {name}!
                            </Text>
                            <Section>
                                <Text>
                                    You’re now part of a vibrant community of shoe and perfume enthusiasts who appreciate quality, style, and individuality. At SZShoes, we pride ourselves on offering an exceptional selection of footwear and fragrances to elevate your wardrobe and enhance your personal style.
                                </Text>
                                <Markdown>{`**Email:** ${email}`}</Markdown>
                                <Markdown>{`**Created At:** ${createdAt}`}</Markdown>
                            </Section>
                            <Section>
                                <Text className="text-2xl">
                                    Discover Our Collection
                                </Text>
                                <Section>
                                    <Text className="font-semibold">
                                        Stylish Footwear:
                                    </Text>
                                    <Text>
                                        Whether you’re looking for chic heels, comfortable sneakers, or versatile sandals, our curated collection has something for every occasion. We source our shoes from top brands known for their craftsmanship and design, ensuring you not only look great but feel great too. From everyday essentials to statement pieces, you’re sure to find the perfect pair to express your unique style.
                                    </Text>
                                </Section>
                                <Section>
                                    <Text className="font-semibold">
                                        Captivating Fragrances:
                                    </Text>
                                    <Text>
                                        Explore our range of luxurious perfumes that cater to all preferences—from fresh and floral to warm and woody. Each fragrance is selected for its quality and appeal, allowing you to find a signature scent that resonates with your personality. Perfect for everyday wear or special occasions, our perfumes are designed to leave a lasting impression.
                                    </Text>
                                </Section>
                            </Section>
                            <Section>
                                <Text className="text-2xl">
                                    Get Started
                                </Text>
                                <Text>
                                    To dive into our exciting collection, log in to your account and start browsing today! If you have any questions or need assistance, our support team is ready to help you at [support email or phone number].
                                </Text>
                                <Text>
                                    Ready to get started? Here&apos;s how you can get start:
                                </Text>
                                <Section>
                                    {steps.map((val, index) =>
                                        <Markdown key={index}
                                            markdownCustomStyles={{
                                            }}
                                        >{`**Step ${index + 1}**&nbsp;&nbsp;&nbsp;&nbsp;${val}`}</Markdown>
                                    )}
                                </Section>
                            </Section>
                            <Button className="my-7 bg-green-400 text-center py-2 font-semibold text-xl w-full text-gray-700">Log in now!</Button>
                            <Text>
                                Happy shopping, and welcome again to the SZShoes family!
                            </Text>
                            <Section>
                                <Text>
                                    Best regards,
                                </Text>
                                <Text className="font-semibold">
                                    SZhoes Company Pvt. Ltd.
                                </Text>
                            </Section>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

WelcomeEmailComp.PreviewProps = {
    name: "Ansh Yadav",
    email: "aj045045@gmail.com",
    createdAt: formatDateUtil("2024-09-27T05:48:15.015Z"),
}

