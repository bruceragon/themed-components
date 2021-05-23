export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

import React from 'react';
import ThemeProvider from '@themed-components/core';
import theme1 from '../theming/example2.theme';
import theme2 from '../theming/bootstrap-ish.theme';

const themes = [
  {}, 
  theme1, 
  theme2
];

const ThemeDecorator = (Story, context) => {
  const theme = themes[context.globals.theme] ?? themes[1];
  return (
    <ThemeProvider theme={theme}>
      <Story {...context}/>
    </ThemeProvider>    
  )
}

export const decorators = [
  ThemeDecorator,
]

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 1,
    toolbar: {
      icon: 'paintbrush',
      items: [
        {title: 'no theme', value: 0},
        {title: 'theme 1', value: 1},
        {title: 'theme 2', value: 2},
      ],
    },
  },
};