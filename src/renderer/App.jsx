import React, { useState, useRef, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import ComicShelf from '../components/ComicShelf';
import ChapterShelf from '../components/ChapterShelf';
import ReaderView from '../components/ReaderView';
import DrawerPanel from '../components/DrawerPanel';
import useComicManager from '../hooks/useComicManager';
import { AppBar, Toolbar, Typography, Box, Slide } from '@mui/material';
import { Menu, Home } from '@mui/icons-material';

export default function App() {
  const containerRef = useRef(null);
  const [mode, setMode] = useState('dark');

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'light' ? '#f5f7fa' : '#121212',
      },
    },
  }), [mode]);

  const {
    comics,
    chapters,
    images,
    selectedComic,
    selectedChapter,
    view,
    isLoading,
    hasMore,
    currentChapterIndex,
    handleImport,
    handleComicSelect,
    handleChapterSelect,
    handleGoHome,
    handleLoadNextChapter,
    drawerOpen,
    openDrawer,
    closeDrawer,
    setView,
  } = useComicManager(containerRef);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: (view === 'reader') ? '#f5f7fa' : '#121212' }} align="center">
        <Slide appear={false} direction="down" in={!useScrollTrigger()}>
          <AppBar position="sticky" color="default" elevation={0} sx={{ backdropFilter: 'blur(6px)' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <IconButton color="inherit" onClick={handleGoHome}>
                <Home />
              </IconButton>

              {view === 'reader' && (
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  {selectedChapter}
                </Typography>
              )}

              <Box>
                <IconButton onClick={toggleMode} color="inherit">
                  {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
                </IconButton>
                <IconButton color="inherit" onClick={openDrawer}>
                  <Menu />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </Slide>

        <DrawerPanel
          open={drawerOpen}
          comics={comics}
          chapters={chapters}
          selectedComic={selectedComic}
          selectedChapter={selectedChapter}
          onClose={closeDrawer}
          onImport={handleImport}
          onComicSelect={handleComicSelect}
          onChapterSelect={handleChapterSelect}
        />

        {view === 'home' && <ComicShelf setView={() => { }} selectComic={handleComicSelect} />}
        {view === 'chapters' && <ChapterShelf setView={setView} comic={selectedComic} onSelectChapter={handleChapterSelect} />}
        {view === 'reader' && (
          <ReaderView
            containerRef={containerRef}
            images={images}
            isLoading={isLoading}
            hasMore={hasMore}
            onScrollEnd={handleLoadNextChapter}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}
