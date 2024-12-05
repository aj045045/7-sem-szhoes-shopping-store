import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { comforterBrush, montserratSubrayada } from "@/langs";
import { Input } from "@nextui-org/react";
import { IoChatboxEllipses, IoSend } from "react-icons/io5";
import { useState } from "react";

export function ChatBotPage() {
    const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = () => {
        if (inputValue.trim()) {
            // Add user message
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: inputValue.trim(), sender: "user" },
            ]);

            setInputValue("");

            // Simulate bot response
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: `${inputValue}`, sender: "bot" },
                ]);
            }, 1000);
        }
    };

    return (
        <>
            <Sheet defaultOpen={true}>
                <SheetTrigger>
                    <div className="fixed bottom-4 right-4 z-50">
                        <div className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition-all duration-200">
                            <IoChatboxEllipses className="text-3xl" />
                        </div>
                    </div>
                </SheetTrigger>
                <SheetContent className="max-w-lg bg-white rounded-lg shadow-lg">
                    <SheetTitle className="flex w-full justify-between items-center px-4 py-2">
                        <div className="flex items-center space-x-2">
                            <div className="flex flex-row items-center justify-center">
                                <div className={`${montserratSubrayada.className} text-3xl`}>
                                    S
                                </div>
                                <div className={`${comforterBrush.className} text-green-600 text-3xl`}>
                                    Z
                                </div>
                            </div>
                            <div className="text-lg font-semibold">FAQ&apos;s AI Assistant</div>
                        </div>
                    </SheetTitle>
                    <div className="overflow-y-auto h-5/6 px-4 py-3">
                        <div className="flex flex-col space-y-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-xs text-white ${message.sender === "user"
                                        ? "bg-green-600 rounded-3xl p-4 shadow-lg shadow-green-400"
                                        : "text-neutral-800 flex  items-start mb-5"
                                        }`}>
                                        {message.sender == "bot" &&
                                            <div className="flex flex-row items-center mr-3 justify-center border-2 rounded-full p-1.5 border-neutral-300">
                                                <div className={`${montserratSubrayada.className} text-xl`}>
                                                    S
                                                </div>
                                                <div className={`${comforterBrush.className} text-green-600 text-xl`}>
                                                    Z
                                                </div>
                                            </div>
                                        }

                                        {message.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Input
                        variant="faded"
                        endContent={<IoSend className="text-3xl p-1 bg-green-500 text-white rounded-md cursor-pointer" onClick={handleSubmit} />}
                        size="lg"
                        classNames={{ base: "fixed bottom-4 right-6 max-w-80" }}
                        className="w-full"
                        placeholder="Ask me a question..."
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSubmit();
                        }}
                    />
                </SheetContent>
            </Sheet >
        </>
    );
}
