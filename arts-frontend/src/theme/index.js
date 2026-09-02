const theme = {
  token: {
    colorEverGreen: "#2a5039",
    colorPrimaryHover: "#3c617e",
    colorPrimaryActive: "#101a24",
    fontFamily: "Open Sans, sans-serif",
  },

  components: {
    Button: {
      defaultBg: "#264559",
      defaultColor: "#fff",
      defaultHoverBg: "#3c617e",
      defaultHoverColor: "#fff",
      defaultHoverBorderColor: "#3c617e",
      defaultActiveBg: "#101a24",
      defaultActiveColor: "#fff",
      defaultActiveBorderColor: "#101a24",
      fontSize: 15,
      borderRadius: 10,
      controlHeight: 42,
      fontWeight: 400,
      colorPrimaryActive: "#6F472D"
    },

    Card: {
      borderRadiusLG: 12,
    },

    Carousel: {
      arrowSize: 32,
      arrowOffset: 40,
    },

    Modal: {
      borderRadiusLG: 16,
    },

    Tabs: {
      itemColor: "#bbd7db",        // texto normal
      itemHoverColor: "#fff",      // hover
      itemSelectedColor: "#fff",   // tab ativa
      itemActiveColor: "#fff",     // clique
      inkBarColor: "#fff",         // linha de baixo
      colorBorderSecondary: "transparent",
      fontSize: 20,
      margin: 0,
      horizontalMargin: 0,
      horizontalItemGutter: 0,
      horizontalItemPadding: "0 0"
    }
  },
};

export default theme;