import { FormatNumberOptions } from "@/interfaces/utility";

/**
 * Formats a number with custom suffixes and precision.
 * 
 * @param {number} num - The number to format.
 * @param {number} [precision=0] - The number of decimal places to include.
 * @param {Object} [options] - Optional settings for formatting.
 * @param {string} [options.thousandSuffix='K'] - Custom suffix for thousands.
 * @param {string} [options.millionSuffix='M'] - Custom suffix for millions.
 * @param {string} [options.billionSuffix='B'] - Custom suffix for billions.
 * @returns {string} - The formatted number.
 */
export function formatNumberUtil(num: number, precision: number = 0, options: FormatNumberOptions = {}): string {
    const {
        thousandSuffix = 'K',
        millionSuffix = 'M',
        billionSuffix = 'B',
    } = options;

    if (typeof num !== 'number' || isNaN(num)) {
        throw new Error("Invalid number");

    }

    let formatted: string;

    // Determine the appropriate suffix and format the number
    if (num >= 1e9) {
        formatted = `${(num / 1e9).toFixed(precision)}${billionSuffix}`;
    } else if (num >= 1e6) {
        formatted = `${(num / 1e6).toFixed(precision)}${millionSuffix}`;
    } else if (num >= 1e3) {
        formatted = `${(num / 1e3).toFixed(precision)}${thousandSuffix}`;
    } else {
        formatted = num.toFixed(precision);
    }

    // Remove unnecessary decimal places before suffixes
    return cleanUpFormattedString(formatted, [thousandSuffix, millionSuffix, billionSuffix]);
}

/**
 * Cleans up the formatted string by removing trailing ".0" if applicable.
 * 
 * @param {string} formatted - The formatted number string.
 * @param {string[]} suffixes - The array of suffixes to check against.
 * @returns {string} - The cleaned formatted string.
 */
function cleanUpFormattedString(formatted: string, suffixes: string[]): string {
    for (const suffix of suffixes) {
        if (formatted.endsWith(suffix) && formatted.includes('.')) {
            const baseNumber = formatted.slice(0, formatted.indexOf(suffix));
            if (baseNumber.endsWith('.0')) {
                formatted = baseNumber.slice(0, -2) + suffix;
            }
            break; // Exit after checking for the first matched suffix
        }
    }
    return formatted.replace(/\.0+$/, '');
}
