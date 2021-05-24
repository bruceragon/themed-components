import { Label } from "@themed-components/core";
import { Input } from "@themed-components/core";
import { Link } from "@themed-components/core";
import { ListItem } from "@themed-components/core";
import * as defaults from "./defaults";
import { borders } from "./common";
import { Container } from "@themed-components/core";

type fontDefinition = {
    name: string,
    excludeWeights?: number[]
}
const fontWeights = [
    "Thin",
    "Extra Light",
    "Light",
    "Regular",
    "Medium",
    "Semi Bold",
    "Bold",
    "Extra Bold",
    "Black",
].map((weight, i) => ({
    weightFileNameFormat: weight.replace(" ", ""),
    weightStyleName: weight.toLowerCase().replace(" ", "-"),
    weightNumValue: (i + 1) * 100,
}));
const fontRepository = "/fonts";

const getFontFaceString = ({
    name,
    excludeWeights = []
}: fontDefinition) => {
    const fontFileNameFormat = name.replace(" ", "");
    return fontWeights.map(({
        weightFileNameFormat,
        weightStyleName,
        weightNumValue
    }) => {
        if (excludeWeights.includes(weightNumValue))
            return ""
        else
            return `@font-face {
                font-family: ${name};
                src: url('${fontRepository}/${fontFileNameFormat}/${fontFileNameFormat}-${weightFileNameFormat}.ttf') format('truetype');
                font-style: ${weightStyleName};
                font-weight: ${weightNumValue};
                font-display: fallback;
            }`
    })
}

const fontFaces = [
    { name: "Inter" },
    { name: "Poppins", excludeWeights: [100] },
    { name: "Work Sans", excludeWeights: [100] },
    { name: "Rubik", excludeWeights: [100] },
].map(font => getFontFaceString(font)).flat()

const colors: any = {
    neutral: "#bdd5ea",
    primary: "#0d6efd",
    secondary: "#6c757d",
    "primary-light": "#fbf4f4",
    "accent": "#eef5db",
    "light-accent": "#b8dbd9",
    "dark-accent": "#7a9e9f",
    "light": "#f8f9fa",
    "dark": "#212529",
    greys: [
        "#f8f9fa",
        "#e9ecef",
        "#dee2e6",
        "#ced4da",
        "#adb5bd",
    ],
    info: "#0dcaf0",
    success: "#198754",
    warning: "#ffc107",
    danger: "#dc3545",
}

colors["text-primary"] = colors.dark;
colors["grey-100"] = colors.greys[0]
colors["grey-200"] = colors.greys[1]
colors["grey-300"] = colors.greys[2]
colors["grey-400"] = colors.greys[3]
colors["grey-500"] = colors.greys[3]

const fonts = {
    body: 'Poppins, "Work Sans", "Segoe UI", "Helvetica Neue", sans-serif',
    heading: 'Rubik',
    monospace: 'Menlo, monospace'
};

const buttonVariant = (variant: string) => ({
    color: 'light',
    bg: variant,
    borderColor: variant,
    '&:hover': {
        color: variant,
        bg: "light"
    },
    py: 2,
    px: 3,
    fontFamily: "body",
    fontSize: 1,
    fontWeight: 400,
    textTransform: "uppercase",
    boxSizing: "border-box",
})

const baseVariants = [
    "primary",
    "info",
    "success",
    "danger",
    "warning",
    "neutral"
]

const _buttons = (props?: any) => {
    const variants: any = {};
    baseVariants.forEach(name => variants[name] = { ...buttonVariant(name), ...props });
    return variants;
}
const _links: any = _buttons({
    display: "inline-block",
    verticalAlign: "middle"
})

const inputVariants = {
    primary: {
        color: 'text-primary',
        bg: '#fff',
        border: "1px solid",
        borderColor: "grey-400",
        borderRadius: 3,
        py: 2,
        px: 1,
        "&:focus": {
            borderColor: "#86b7fe",
            outline: 0
        }
    },
    searchableList: {
        height: [8],
        ...borders.classic,
        borderColor: "primary",
        py: 1,
        borderRadius: 0,
    },
    _all: {
        // ...inputsGlobalStyle,
    },
    icons: {
        primary: {
            color: "dark",
            px: 2,
            borderRight: "1px solid",
            borderColor: "grey-400",
            width: "16px!important"
        }
    },
}

const variants = {
    buttons: {
        ..._buttons(),
        "primary-dark": {
            ...buttonVariant("primary"),
            "&:hover": {
                bg: "dark",
                color: "light"
            }
        },
        icon: {
            py: [1],
            px: [3],
            color: "text-primary",
            bg: "transparent",
        },
    },
    inputs: {
        ...inputVariants
    },
    selects: {
        primary: inputVariants.primary,
        containers: {
            primary: {
                mt: "1px",
                bg: "white",
                [ListItem + ":hover"]: {
                    bg: "primary",
                    color: "#fff"
                }
            }
        }
    },
    icons: {
        primary: {
            color: "primary"
        }
    },
    containers: {
        primary: {
            py: [2, 3],
            px: [3, 4],
        },
        light: {
            bg: "light"
        },
        dark: {
            bg: "dark"
        },
        formGroupInline: {
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            py: 2,
            [Label]: {
                flexGrow: 1,
                alignSelf: "center",
                flexBasis: "100px",
            },
            ["& > " + Input + ", " + "& > " + Container]: {
                maxWidth: "100%",
                flexGrow: 5,
                alignSelf: "center",
                flexBasis: "60%"
            },
        },
        formGroup: {
            display: "flex",
            flexDirection: "column",
            py: 2,
            [Label]: {
                fontSize: 1,
                mb: 1
            },
            [Label + ":not(:first-child)"]: {
                mt: 2,
            }
        }
    },
    forms: {
        bordered: {
            border: "1px solid",
            borderColor: "grey-400",
            borderRadius: 3,
            // bg: "light",
            bg: "#fff",
            py: 3,
            px: 4,
        },
    },
    headings: {
        large: {
            fontSize: [3, 4],
            py: [3, 4],
        },
        medium: {
            fontSize: [2, 3],
            py: [2, 3],
        },
        small: {
            fontSize: [1, 2],
            py: [2, 3],
        },
        _default: {
            my: 3,
            fontFamily: "Rubik",
            fontWeight: 600,
            fontSize: [2, 3]
        }
    },
    lists: {
        primary: {
            [Link + ":hover"]: {
                color: "secondary"
            }
        },
        bordered: {
            ...borders.classic,
            borderColor: "primary",
        },
        searchableList: {
            ...borders.classic,
            color: "white",
            borderTop: "none",
            borderColor: "primary",
            borderRadius: 0,
            [ListItem]: {
                boxSizing: "border-box",
                px: [2],
                color: "text-primary",
                "&.highlighted": {
                    bg: "grey-100"
                },
                bg: "white"
            }
        },
        popUp: {
            width: [200],
            border: "1px solid",
            borderColor: "light",
            bg: "white",
            [ListItem]: {
                "&:not(:last-child)": {
                    borderBottom: "1px solid",
                    borderColor: "light",
                },
                fontSize: 1,
                cursor: "pointer",
                py: 3,
                px: 2,
                "&:hover": {
                    bg: "grey-100",
                    // color: "dark",
                },
            }
        }
    },
    listItems: {
        primary: {
            "& a:hover": {
                bg: "light"
            },
            "a": {
                fontSize: 1
            },
            "span": {
                fontSize: 2
            },
            "a, span": {
                boxSizing: "border-box",
                py: [2, 3],
                px: [3, 4],
                display: "block",
                width: "100%",
                height: "100%",
            },
        },
    },
    links: {
        ..._links,
        "primary-dark": {
            ..._links["primary"],
            "&:hover": {
                bg: "dark",
                color: "light"
            }
        },
        _default: {
            color: "primary"
        },
        _all: {
            cursor: "pointer",
            textDecoration: "none",
        }
    },
    texts: {
        emphased: {
            color: "black-100",
            fontWeight: "semi-bold"
        }
    },
    paragraphs: {
        _all: {
            overflow: "hidden"
        }
    }
};

const global = {
    fontFamily: "body",
    color: "text-primary",
    fontSize: 1
}

let theme = {
    ...defaults,
    colors,
    fonts,
    global,
    fontFaces,
    ...variants
};
export default theme;
