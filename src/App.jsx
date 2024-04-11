
import './App.css'
import MainContent from './components/MainContent'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from "@mui/material/styles"

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: ["IBM"]
    }
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <div style={{ height: '100vh' }} className='' >
          <Container maxWidth="lg">
            <MainContent />
          </Container>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
