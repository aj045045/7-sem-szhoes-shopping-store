import React, { useState, useRef } from 'react';
import { OtpInputInterface } from './interface';


/**
 * The component is used to enter the otp in a set of boxes
 * @param length - The no of character for input
 * @param onChange - The onChange event listener
 * @returns A component having boxing for otp enter
 */
export default function OtpInput({ length, onChange }: OtpInputInterface) {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        if (!/^[a-zA-Z0-9]*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        onChange(newOtp.join(''));

        // Focus on next input field if available
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex space-x-2">
            {otp.map((_, index) => (
                <input
                    key={index}
                    ref={(el) => {
                        inputRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-10 h-10 text-center text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                />
            ))}
        </div>
    );
};