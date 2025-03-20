import React, { useState, useRef, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, IconButton, Button } from '@mui/material';
import { Brightness4, Brightness7, Delete, Edit } from '@mui/icons-material';
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
  const [editMode, setEditMode] = useState(false);
  const [selectedComics, setSelectedComics] = useState([]);
  const [refreshComics, setRefreshComics] = useState(0);

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

  const toggleEditMode = () => {
    setEditMode(prev => !prev);
    setSelectedComics([]);
  };

  const handleRemoveSelected = async () => {
    if (selectedComics.length === 0) return;

    await Promise.all(selectedComics.map(comic => window.electron.invoke('remove-comic', comic)));
    setSelectedComics([]);
    setEditMode(false);

    // 刷新ComicShelf元件
    setRefreshComics(prev => prev + 1);
  };

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
                {view === 'home' && (
                  <>
                    <IconButton color={editMode ? "primary" : "inherit"} onClick={toggleEditMode}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      disabled={selectedComics.length === 0}
                      onClick={handleRemoveSelected}
                    >
                      <Delete />
                    </IconButton>
                  </>
                )}
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

        {view === 'home' && (
          <ComicShelf
            key={refreshComics} // 使用key來強制刷新
            setView={() => { }}
            selectComic={handleComicSelect}
            editMode={editMode}
            selectedComics={selectedComics}
            setSelectedComics={setSelectedComics}
          />
        )}
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