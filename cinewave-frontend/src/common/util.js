import { parse, format } from 'date-fns';
import md5 from 'md5';

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Function that returns "is-invalid" if the field has an error.
export const getErrorClassName = error => {
    return error && error?.message?.length ? 'is-invalid' : '';
};

// Format 24-hour time to 12-hour format
export const formatTime = time => {
    try {
        const toFormatTime = parse(time, 'k:m:s', new Date());
        const formattedTime = format(toFormatTime, 'h:mm a');
        return formattedTime;
    } catch (error) {
        console.log(error);
    }
};

// convert minutes to hours and minutes format
export const convertMinsToHours = mins => {
    let h = Math.floor(mins / 60);
    let m = Math.round(mins % 60);

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;

    return `${h} hr, ${m} mins`;
};

// created a new date in the format (dayofweek, day month year)
export const formatDate = oldDate => {
    const date = new Date(oldDate);

    let dayOfWeek = getDayOfWeek(date.getDay()).slice(0, 3);
    let monthOfYear = getMonthOfYear(date.getMonth()).slice(0, 3);

    let newDate = `${dayOfWeek}, ${date.getDate()} ${monthOfYear} ${date.getFullYear()}`;

    return newDate;
};

export const getDayOfWeek = day => {
    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return daysOfWeek[day];
};

export const getMonthOfYear = month => {
    let monthsOfYear = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    return monthsOfYear[month];
};

export const splitString = (target, separator) => {
    return target.split(separator).map(item => item.trim());
};

// Create email hash for gravatar
export const computeHash = (email = '') => {
    // Ensure email is a string
    email = typeof email === 'string' ? email : '';

    // Trim the leading and trailing whitespaces
    email = email.trim();

    // Transform to all lowercase characters
    email = email.toLowerCase();

    // Compute the MD5 hash
    const hash = md5(email);

    return hash;
};

export const getProfileImage = email => {
    const hash = computeHash(email);
    return `https://www.gravatar.com/avatar/${hash}`;
};

// Format a date string (Tue, 19 Mar 2024 16:27:17 GMT) to a human-readable format (12:32 PM, 19th March 2024)
export const formatDateTime = date => {
    return format(new Date(date), 'p, do MMMM yyyy');
};

// Format amount to currency in GBP
export const formatCurrency = amount => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
};
