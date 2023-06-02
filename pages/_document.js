import Document, { Html, Head, Main, NextScript,meta,link } from 'next/document';
 
class MyDocument extends Document {
    static async getInitialProps(ctx) {
      const originalRenderPage = ctx.renderPage;
   
      // Run the React rendering logic synchronously
      ctx.renderPage = () =>
        originalRenderPage({
          // Useful for wrapping the whole react tree
          enhanceApp: (App) => App,
          // Useful for wrapping in a per-page basis
          enhanceComponent: (Component) => Component,
        });
   
      // Run the parent `getInitialProps`, it now includes the custom `renderPage`
      const initialProps = await Document.getInitialProps(ctx);
   
      return initialProps;
    }
   
    render() {
      return (
        <Html dir="rtl">
          <Head />

          <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=1"/>

  <link rel="icon" type="image/png" href=" https://cdn.salla.network/images/logo/logo-square.png"/>
  <link rel="apple-touch-icon-precomposed" href="https://cdn.salla.network/images/logo/logo-square.png"/>
  <meta name="msapplication-TileColor" content="#BAF3E6"/>
  <meta name="msapplication-TileImage" content="https://cdn.salla.network/images/logo/logo-square.png"/>

  <meta name="theme-color" content="#BAF3E6"/>
  <meta name="msapplication-navbutton-color" content="#BAF3E6"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="#BAF3E6"/>

  <link rel="stylesheet" href="https://cdn.salla.network/fonts/pingarlt.css?v=1.0"/>
  <link rel="stylesheet" href="https://cdn.salla.network/fonts/sallaicons.css"/>
  <link rel="stylesheet" href="./app.css"/>
  <title>متجر تجريبي</title>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
  }
   
  export default MyDocument;
  

  