import { pick, omit } from "@styled-system/props";
import { Meta, ArgTypes } from '@storybook/react';

export const getArgTypes = <Props = any>(props: Props) => {
  const styledSystemProps = pick(props);
  delete styledSystemProps["variant"];
  const otherProps = omit(props);
  otherProps["variant"] = { name: "variant" };
  const addCategory = (props: any, category: string) => {
    const argTypes: ArgTypes = {};
    for (const key in props) {
      argTypes[key] = {
        table: {
          category,
        }
      }
    }
    return argTypes;
  }
  const argTypes: ArgTypes = {
    ...addCategory(otherProps, 'Props'),
    ...addCategory(styledSystemProps, 'Styled System'),
  };
  return argTypes;
}

export const getMeta = <Props = any>(Component: any) => {
  return ({
    component: Component,
    argTypes: {
      ...getArgTypes<Props>(
        Component.__docgenInfo
          ? (Component.__docgenInfo as any).props ?? {}
          : {}
      )
    }
  } as Partial<Meta>)
}