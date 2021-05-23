declare module "@styled-system/props" {
    //TODO check the implementation in styled system and write the type definitions
    export function pick (props: any): any;
    export function omit (props: any): any;
}

declare module "*.css" {
    interface IClassNames {
      [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}