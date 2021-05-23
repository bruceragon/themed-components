import { Label } from "@themed-components/core";
import { Input } from "@themed-components/core";
import { Link } from "@themed-components/core";
import { ListItem } from "../components/primitives/List";
import * as defaults from "./defaults";
import { borders } from "./common";

const colors: any = {
    primaries: [
        "#F18021",
        "#FFBC84",
        "#F39A4F",
        "#D66100",
        "#B85300",
    ],
    secondaries: [
        "#187E95",
        "#5897A6",
        "#348496",
        "#046C84",
        "#025D72",
    ],
    tertiaries: [
        "#F18921",
        "#FFC184",
        "#F3A14F",
        "#D66A00",
        "#B85B00",
    ],
    complementaries: [
        "#149191",
        "#54A1A1",
        "#309292",
        "#008080",
        "#006E6E",
    ],
    greys: [
        "#F9F9F9",
        "#E5E5E5",
        "#F0F0F0",
        "#606060",
        "#FFFFFF",
    ]
}

colors["primary"] = colors.primaries[0]
colors["secondary"] = colors.secondaries[0]
colors["tertiary"] = colors.tertiaries[0]
colors["complementary"] = colors.complementaries[0]
colors["grey-100"] = colors.greys[0]
colors["grey-200"] = colors.greys[1]
colors["grey-300"] = colors.greys[2]
colors["grey-400"] = colors.greys[3]
colors["text-primary"] = "#121212";
colors["black-100"] = "#030303";

const fonts = {
    body: 'Lato, Montserrat, Roboto, "Segoe UI", "Helvetica Neue", sans-serif',
    heading: '"Open sans"',
    monospace: 'Menlo, monospace'
};

const buttonsGlobalStyle = {
    fontFamily: "body",
    padding: "2px 5px",
    ...borders.classic
}

const inputsGlobalStyle = {
    fontFamily: "body",
    ...borders.classic,
    borderColor: "grey-400"
}

const variants = {
    buttons: {
        primary: {
            color: 'white',
            bg: 'primary',
            borderColor: "primary",
            '&:hover': {
                color: "primary",
                bg: "white"
            },
            ...buttonsGlobalStyle
        },
        secondary: {
            color: 'white',
            bg: 'secondary',
            borderColor: "secondary",
            '&:hover': {
                color: "secondary",
                bg: "white"
            },
            ...buttonsGlobalStyle
        },
        icon: {
            py: [1],
            px: [3],
            color: "text-primary",
            bg: "transparent",
        }
        // _all: {
        //     fontFamily: "body"
        // }
    },
    inputs: {
        primary: {
            ...inputsGlobalStyle,
            color: 'text-primary',
            bg: 'white',
            borderColor: "primary",
            p: 2,
            // ...inputsGlobalStyle,
        },
        secondary: {
            color: 'text-primary',
            bg: 'white',
            borderColor: colors.secondaries[2],
            // ...inputsGlobalStyle,
        },
        searchableList: {
            height: [8],
            // borderBottom: "none",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
        _all: {
            // ...inputsGlobalStyle,
        },
        icons: {
            primary: {
                color: "secondary"
            }
        }
    },
    icons: {
        primary: {
            color: 'primary'
        },
        secondary: {
            color: 'secondary'
        }
    },
    containers: {
        primary: {
            py: [2, 3],
            px: [3, 4],
        },
        filledBg: {
            bg: colors.greys[2]
        },
        card: {
            "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)",
            transition: "0.3s",
            "&:hover": {
                "boxShadow": "0 8px 16px 0 rgba(0,0,0,0.2)"
            }
        },
        formGroupInline: {
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            py: 2,
            [Label]: {
                flexGrow: 1,
                mr: 2,
                alignSelf: "center",
                flexBasis: "100px",
            },
            [Input]: {
                flexGrow: 2,
                alignSelf: "center"
            }
        },
        formGroup: {
            display: "flex",
            flexDirection: "column",
            py: 2,
            [Label + ":not(:first-child)"]: {
                mt: 2,
            },
            [Input]: {
                mt: 1,
            }
        }
    },
    forms: {
        bordered: {
            ...borders.classic,
            borderColor: "grey-100",
            py: 1,
            px: 3,
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
            // px: [3,4]
        },
    },
    lists: {
        primary: {
            [Link + ":hover"]: {
                color: "secondary"
            }
            // px: [3,4],
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
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            [ListItem]: {
                boxSizing: "border-box",
                px: [2],
                color: "grey-400",
                "&.highlighted": {
                    bg: "grey-100"
                },
                bg: "white"
            }
        },
    },
    listItems: {
        primary: {
            "& a:hover": {
                bg: "grey-200"
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
        }
    },
    links: {
        default: {
            textDecoration: "none",
            color: "text-primary"
        },
        primary: {
            textDecoration: "none",
            color: "primary"
        }
    },
    texts: {
        emphased: {
            color: "black-100",
            fontWeight: "semi-bold"
        }
    }
};

const global = {
    fontFamily: "body",
    color: "text-primary"
}

let theme = {
    ...defaults,
    colors,
    fonts,
    global,
    ...variants
};
export default theme;
