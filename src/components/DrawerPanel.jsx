import React, { useEffect, useState } from 'react';
import {
  Drawer, Box, Button, Typography, Divider, List, ListItemButton
} from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';

export default function DrawerPanel({
  open,
  chapters,
  selectedComic,
  selectedChapter,
  onClose,
  onImport,
  onComicSelect,
  onChapterSelect,
}) {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    (async () => {
      const comicsData = await window.electron.invoke('get-comics-list');
      setComics(comicsData);
    })();
  }, []);
  
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      anchor="right"
      PaperProps={{ sx: { width: 280, boxShadow: 4 } }}
    >
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="#212121"
          fullWidth
          startIcon={<AddPhotoAlternate />}
          onClick={onImport}
          sx={{ mb: 2 }}
        >
          匯入新漫畫
        </Button>

        <Typography variant="h6" gutterBottom>
          漫畫列表
        </Typography>
        <Divider />
        <List sx={{ maxHeight: '30vh', overflow: 'auto' }}>
          {comics.map((comic) => (
            <ListItemButton
              key={comic}
              selected={comic === selectedComic}
              onClick={() => onComicSelect(comic)}
            >
              {comic}
            </ListItemButton>
          ))}
        </List>

        {selectedComic && chapters.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              回數列表
            </Typography>
            <Divider />
            <List sx={{ maxHeight: '30vh', overflow: 'auto' }}>
              {chapters.map((chapter) => (
                <ListItemButton
                  key={chapter}
                  selected={chapter === selectedChapter}
                  onClick={() => onChapterSelect(chapter)}
                >
                  {chapter}
                </ListItemButton>
              ))}
            </List>
          </>
        )}
      </Box>
    </Drawer>
  );
}
