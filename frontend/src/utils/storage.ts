// get previous theme from localStorage. In 
// case no previous theme, get theme from user preference.
export const getTheme = (): "light" | "dark" => {
    var theme: string | null;

    if (localStorage.hasOwnProperty("_theme")) {
        theme = localStorage.getItem("_theme");
        if (!theme) {
            console.error("Couldn't retrieve a valid theme from localStorage");
        } else {
            return theme as "light" | "dark";
        }
    }
    // get OS user theme preference
    const userPrefersDarkTheme: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    if (userPrefersDarkTheme.matches) {
        localStorage.setItem('_theme', "dark");
        theme = "dark";
    } else {
        localStorage.setItem('_theme', "light");
        theme = "light";
    }
    return theme as "light" | "dark";
}

export const storeTheme = (theme: string): void => {
    localStorage.setItem('_theme', theme);
}

// make a small utility to work with cookies as if it were localStorage
export const cookieStorage: IcookiesStorage = {
    getItem: (item: string): string | undefined => {
        // converts cookies string into an object-like
        const cookies: Iobject = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            // key.trim() takes care of removing posible whitespaces
            // {} as last parameter makes the return of reduce an object
            .reduce((accum, [key, value]) => ({ ...accum, [key.trim()]: value }), {});

        // at this point this should be an string or undefined in case the item is not there
        return cookies[item];
    },
    setItem: (item: string, value: string, days?: number | undefined) => {
        if (days) {
            var date = new Date();
            date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000
            document.cookie = `${item}=${value}; expires=${date.toUTCString()};`;
            return;
        }
        document.cookie = `${item}=${value};`;
    },
    deleteItem: (item: string) => {
        document.cookie = `${item}=;expires= Thu, 21 Aug 2014 20:00:00 UTC`;
    }
}