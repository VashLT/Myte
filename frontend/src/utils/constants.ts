export const USERNAME_REGEX = /^([a-zA-Z0-9]+).{3,24}$/;
// export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const PASSWORD_REGEX = /^([a-zA-Z0-9]+).{3,24}$/;
export const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;  // eslint-disable-line no-useless-escape

export const MYTE_VERSION = "0.0.1";

export const MATHJAX_CONFIG = {
    loader: { load: ["[tex]/html"] },
    tex: {
        packages: { "[+]": ["html"] },
        inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"]
        ],
        displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"]
        ]
    }
}

export const FORMULA_TITLE_MAX_CHAR = 32

// colors
export const COLORS = {
    blue: "#383e56",
    blue_b: "#48506e",
    orange: "rgb(246, 158, 123)",
    orange_b: "#c57e63",
    skin: "#eedad1",
    lightSkin: "#eee4df"
}

export const DEFAULT_AVATAR_URL = 'https://i.imgur.com/nRIHLu0.png'