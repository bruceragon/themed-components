const borders = {
    classic: {
        borderRadius: [3],
        borderWidth: [1],
        borderStyle: "solid",
    }
}

const buttonVariant = (variant: string) => ({
    [variant]: {
        color: 'white',
        bg: variant,
        borderColor: variant,
        '&:hover': {
            color: variant,
            bg: "white"
        },
    } 
}) 

const variantNames = ["primary", "info", "success", "danger", "warning"];

const buttons: any = {}
for (let variant of variantNames) {
    Object.assign(buttons, buttonVariant(variant))
}

export {
    borders,
    buttons,
    buttonVariant
}