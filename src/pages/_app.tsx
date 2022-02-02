import '../styles/global.styles.scss';
import NextNProgress from 'nextjs-progressbar';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <NextNProgress
        color='#ffffff'
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </>
  );
};

export default App;
