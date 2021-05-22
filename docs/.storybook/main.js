module.exports = {
  "stories": [
    "../stories/*.stories.mdx",
    "../stories/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      propFilter: (prop, component) => {
        if (prop.declarations !== undefined && prop.declarations.length > 0) {
          const keepDeclarationsFrom = [
            "styled-components",
            "styled-system",
            "styled-icons",
            "react-transition-group",
            "downshift",
            "themed-components",
          ]
          const shouldKeepDeclaration = prop.declarations.find((declaration) => {
            return !declaration.fileName.includes("node_modules") || keepDeclarationsFrom.some(toKeep => declaration.fileName.includes(toKeep));
          });
          return Boolean(shouldKeepDeclaration);
        }
        return true;
      },
      componentNameResolver: (exp, source) => exp.getName() === "StyledComponentClass" && getDefaultExportForFile(source),
      // skipChildrenPropWithoutDoc: false,
      // shouldExtractLiteralValuesFromEnum: true,
      // shouldExtractValuesFromUnion: true
    }
  }
}