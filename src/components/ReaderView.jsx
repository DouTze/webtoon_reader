import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function ReaderView({ containerRef, images, isLoading, hasMore, onScrollEnd }) {
  return (
    <Container
      maxWidth="sm"
      sx={{ py: 3, overflow: 'auto', maxHeight: 'calc(100vh - 64px)', backgroundColor: '#f5f7fa' }}
      ref={containerRef}
    >
      {images.length > 0 ? (
        images.map((src, idx) => (
          <Box key={idx} sx={{ mb: 0, boxShadow: 0, bgcolor: 'white', borderRadius: 0 }}>
            <img
              src={`http://localhost:3030/${src}`}
              alt={`漫畫頁 ${idx + 1}`}
              style={{ width: '100%', borderRadius: '0px', display: 'block' }}
            />
          </Box>
        ))
      ) : (
        <Typography align="center" variant="h5" sx={{ mt: 4, color: '#888' }}>
          請點擊右上方選單開始匯入漫畫
        </Typography>
      )}

      {isLoading && hasMore && (
        <Typography align="center" variant="h6" sx={{ my: 2, color: '#888' }}>
          載入中...
        </Typography>
      )}

      {!hasMore && !isLoading && (
        <Typography align="center" variant="h6" sx={{ my: 2, color: '#888' }}>
          已無更多內容
        </Typography>
      )}
    </Container>
  );
}
