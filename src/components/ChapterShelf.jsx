import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SortIcon from '@mui/icons-material/Sort';

export default function ChapterShelf({ setView, comic, onSelectChapter }) {
  const [chapters, setChapters] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [readChapters, setReadChapters] = useState(() => {
    const stored = localStorage.getItem(`readChapters:${comic}`);
    return stored ? JSON.parse(stored) : [];
  });

  const [comicMeta, setComicMeta] = useState({
    title: comic,
    author: '作者名稱',
    category: '奇幻 / 動作',
    bg: '', // 漫畫背景圖（從漫畫清單取出）
    cover: '', // 漫畫封面圖（從漫畫清單取出）
  });

  const openSortMenu = (e) => setAnchorEl(e.currentTarget);
  const closeSortMenu = () => setAnchorEl(null);
  const toggleSort = (order) => {
    setSortOrder(order);
    closeSortMenu();
  };

  useEffect(() => {
    (async () => {
      const comicsInfo = await window.electron.invoke('get-comics-covers');
      const comicData = comicsInfo.find((c) => c.comic === comic);
      if (comicData) {
        setComicMeta({
          title: comicData.comic,
          author: comicData.author || '未知作者',
          category: comicData.category || '未分類',
          bg: `http://localhost:3030/${comicData.bg}`,
          cover: `http://localhost:3030/${comicData.cover}`,
        });

        const sorted = [...comicData.chapters].sort((a, b) =>
          sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
        setChapters(sorted);
      }
    })();
  }, [comic, sortOrder]);

  const handleSelectChapter = (name) => {
    const updated = Array.from(new Set([name, ...readChapters]));
    setReadChapters(updated);
    localStorage.setItem(`readChapters:${comic}`, JSON.stringify(updated));
    onSelectChapter(name);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ maxWidth: '490px', mx: 'auto', py: 4 }}
    >
      {/* 📘 封面區 Header */}
      <Box
        sx={{
          mb: 3,
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 2,
          position: 'relative',
        }}
      >
        {/* 封面大圖 */}
        <CardMedia
          component="img"
          image={comicMeta.bg}
          alt={comicMeta.title}
          sx={{
            width: '100%',
            height: 400,
            // paddingTop: '56.25%',
            objectFit: 'cover',
            // filter: 'brightness(0.7)',
          }}
        />

        {/* 標題與資訊浮層 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            px: 2,
            py: 1.5,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Typography variant="h6" color="white" fontWeight="bold">
            {comicMeta.title}
          </Typography>
          <Typography variant="body2" color="white">
            {comicMeta.author} ・ {comicMeta.category}
          </Typography>
        </Box>
      </Box>

      {/* 🔙 返回 + 排序 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={() => setView('home')}>
          <ArrowBackIcon />
        </IconButton>

        <Box>
          <Button
            size="small"
            startIcon={<SortIcon />}
            onClick={openSortMenu}
            sx={{ textTransform: 'none' }}
          >
            排序
          </Button>
          <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeSortMenu}>
            <MenuItem onClick={() => toggleSort('desc')}>新到舊</MenuItem>
            <MenuItem onClick={() => toggleSort('asc')}>舊到新</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* 📚 章節卡片列表 */}
      <Grid container spacing={0.5} columns={5}>
        {chapters.map(({ name, cover }) => {
          const isRead = readChapters.includes(name);

          return (
            <Grid
              item
              xs={1}
              key={name}
              sx={{
                width: '100%',
                aspectRatio: '1 / 1',
                position: 'relative',
              }}
            >
              <Card
                sx={{
                  borderRadius: 0,
                  boxShadow: 0,
                  overflow: 'hidden',
                  width: '100%',
                  height: '100%',
                }}
              >
                <CardActionArea
                  onClick={() => handleSelectChapter(name)}
                  sx={{ width: '100%', height: '100%', position: 'relative' }}
                >
                  <CardMedia
                    component="img"
                    image={`http://localhost:3030/${cover}`}
                    alt={name}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: 'rgba(0, 0, 0, 0.3)',
                    }}
                  />

                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      px: 1,
                      py: 0.5,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{
                        color: isRead ? 'lightgray' : 'white',
                        fontWeight: 'medium',
                        fontSize: '0.8rem',
                      }}
                    >
                      {name}
                    </Typography>
                    {isRead && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: 'lightgray',
                          borderRadius: '50%',
                        }}
                      />
                    )}
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}