import { useState, useEffect, useCallback } from 'react';

export default function useComicManager(containerRef) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [comics, setComics] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedComic, setSelectedComic] = useState('');
    const [selectedChapter, setSelectedChapter] = useState('');
    const [view, setView] = useState('home');
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        window.electron.invoke('get-comics-list').then(setComics);
    }, []);

    const handleImport = async () => {
        await window.electron.invoke('import-comic');
        const updated = await window.electron.invoke('get-comics-list');
        setComics(updated);
    };

    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    const handleComicSelect = async (comic) => {

        setSelectedComic(comic);
        setView('chapters');
        const chaptersList = await window.electron.invoke('get-chapters-list', comic);
        setChapters(chaptersList);
        setSelectedChapter('');
        setImages([]);
        setCurrentChapterIndex(0);
        setHasMore(true);
    };

    const handleChapterSelect = async (chapter) => {
        setSelectedChapter(chapter);
        const index = chapters.indexOf(chapter);
        setCurrentChapterIndex(index);
        setIsLoading(true);
        try {
            const imgs = await window.electron.invoke('get-images-list', selectedComic, chapter);
            setImages(imgs);
            setHasMore(true);
        } finally {
            setIsLoading(false);
        }
        setView('reader');
    };

    const handleGoHome = () => {
        setView('home');
        setSelectedComic('');
        setSelectedChapter('');
        setChapters([]);
        setImages([]);
        setCurrentChapterIndex(0);
        setHasMore(true);
    };

    const handleLoadNextChapter = useCallback(async () => {
        if (isLoading || !hasMore) return;
        if (currentChapterIndex >= chapters.length - 1) {
            setHasMore(false);
            return;
        }

        setIsLoading(true);
        const nextIndex = currentChapterIndex + 1;
        const nextChapter = chapters[nextIndex];

        try {
            const newImages = await window.electron.invoke('get-images-list', selectedComic, nextChapter);
            if (newImages.length === 0) {
                setHasMore(false);
                return;
            }
            setImages((prev) => [...prev, ...newImages]);
            setCurrentChapterIndex(nextIndex);
            setSelectedChapter(nextChapter);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, hasMore, currentChapterIndex, chapters, selectedComic]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || view !== 'reader') return;
        let timeout = null;

        const handleScroll = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const threshold = container.scrollHeight * 0.9;
                if (container.scrollTop + container.clientHeight >= threshold) {
                    handleLoadNextChapter();
                }
            }, 100);
        };

        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
            clearTimeout(timeout);
        };
    }, [handleLoadNextChapter, view]);

    return {
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
    };
}
