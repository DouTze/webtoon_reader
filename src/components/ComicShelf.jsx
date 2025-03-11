import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardActionArea, Typography, Box, Button, IconButton, SvgIcon } from '@mui/material';

export default function ComicShelf({ setView, selectComic }) {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    (async () => {
      const comicsData = await window.electron.invoke('get-comics-covers');
      setComics(comicsData);
    })();
  }, []);

  return (
    <Container
      maxWidth="sm" // 讓書櫃寬度變窄
      sx={{
        maxWidth: '490px', // 強制最大寬度，與 Kakao Webtoon 一致
        mx: 'auto', // 置中
        py: 4,
        textAlign: 'center', // 讓按鈕、標題置中
      }}
    >
      {/* 標題區塊 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 3 }}>
        <Button
          size="large"
          sx={{
            color: 'text.primary',
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
          onClick={() => setView('home')}
        >
          我的漫畫
        </Button>

        <IconButton onClick={() => setView('home')}>
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 41 17"
              width="41"
              height="17"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.37223 16.1447H14.7443L20.2579 1L25.7715 16.1447L33.1435 16.1447H40.5157V1.00002H33.1435V16.144L27.6299 1H20.2579H12.8859L7.37223 16.1443V1.00002H0V16.1447H7.37223V16.1447Z"
                fill="#444444"
              />
            </svg>
          </SvgIcon>
        </IconButton>

        <Button
          size="large"
          sx={{
            color: 'text.primary',
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
          onClick={() => setView('home')}
        >
          星期列表
        </Button>
      </Box>

      {/* 書籍列表 */}
      <Grid container spacing={2} justifyContent="center">
        {comics.map(({ comic, cover, bg }) => (
          <Grid item xs={6} sm={4} key={comic}>
            <Card
              sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 3,
                bgcolor: 'background.paper',
              }}
            >
              <CardActionArea onClick={() => selectComic(comic)}>
                <Box sx={{ position: 'relative', paddingTop: '150%' }}>
                  {/* 背景圖片 */}
                  <CardMedia
                    component="img"
                    image={`http://localhost:3030/${bg}`}
                    alt={comic}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'blur(6px)', // 背景模糊，類似 Kakao Webtoon
                    }}
                  />
                  {/* 前景封面 */}
                  <CardMedia
                    component="img"
                    image={`http://localhost:3030/${cover}`}
                    alt={comic}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* 書名遮罩 */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      bgcolor: 'rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(4px)',
                      py: 1,
                      px: 1,
                    }}
                  >
                    <Typography sx={{ color: 'white', fontWeight: 'bold' }} >
                      {comic}
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}