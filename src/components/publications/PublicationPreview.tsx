'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface PublicationPreviewProps {
    preview: string;
    title: string;
    sizes: string;
    compact?: boolean;
}

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i;

export default function PublicationPreview({ preview, title, sizes, compact = false }: PublicationPreviewProps) {
    const mediaPath = `/papers/${preview}`;
    const isVideo = VIDEO_EXTENSIONS.test(preview.split(/[?#]/)[0]);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [aspectRatio, setAspectRatio] = useState(16 / 9);
    const [playback, setPlayback] = useState<'auto' | 'play' | 'pause'>('auto');

    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;
        if (!isVideo || !video || !container) return;
        let visible = false;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updatePlayback = () => {
            if (visible && !document.hidden && playback !== 'pause'
                && (playback === 'play' || !reducedMotion.matches)) {
                void video.play().catch(() => {});
            } else video.pause();
        };
        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            updatePlayback();
        }, { threshold: 0.15 });
        observer.observe(container);
        document.addEventListener('visibilitychange', updatePlayback);
        reducedMotion.addEventListener('change', updatePlayback);
        return () => {
            observer.disconnect();
            document.removeEventListener('visibilitychange', updatePlayback);
            reducedMotion.removeEventListener('change', updatePlayback);
            video.pause();
        };
    }, [isVideo, playback]);

    const togglePlayback = () => {
        const video = videoRef.current;
        if (video) setPlayback(video.paused ? 'play' : 'pause');
    };

    return (
        <div ref={containerRef} className={`publication-preview${compact ? ' publication-preview-compact' : ''}`} style={{ aspectRatio: isVideo ? aspectRatio : 16 / 9 }}>
            {isVideo ? <video
                ref={videoRef} src={mediaPath} aria-label={title}
                className="publication-preview-media" muted loop playsInline preload="metadata"
                tabIndex={0} role="button" onClick={togglePlayback}
                onKeyDown={(event) => {
                    if (event.key === ' ' || event.key === 'Enter') {
                        event.preventDefault();
                        togglePlayback();
                    }
                }}
                onLoadedMetadata={(event) => {
                    const video = event.currentTarget;
                    if (video.videoWidth && video.videoHeight) setAspectRatio(video.videoWidth / video.videoHeight);
                }}
            /> : <Image src={mediaPath} alt={title} fill className="object-contain" sizes={sizes} />}
        </div>
    );
}
