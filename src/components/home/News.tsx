'use client';

import { motion } from 'framer-motion';
import { useId, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useMessages } from '@/lib/i18n/useMessages';

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
    visibleCount?: number;
}

export default function News({ items, title, visibleCount = 4 }: NewsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.news;
    const [expanded, setExpanded] = useState(false);
    const archiveId = useId();
    const recentItems = items.slice(0, visibleCount);
    const olderItems = items.slice(visibleCount);
    const renderItem = (item: NewsItem, index: number) => (
        <div key={`${item.date}-${index}`} className="flex items-start space-x-3">
            <span className="text-xs text-neutral-500 mt-1 w-16 flex-shrink-0">{item.date}</span>
            <p className="text-sm text-neutral-700">
                <ReactMarkdown components={{
                    p: ({ children }) => <span>{children}</span>,
                    a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent font-medium hover:underline">{children}</a>,
                }}>{item.content}</ReactMarkdown>
            </p>
        </div>
    );

    return (
        <motion.section
            aria-label={resolvedTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{resolvedTitle}</h2>
            <div className="space-y-3">
                {recentItems.map(renderItem)}
            </div>
            {olderItems.length > 0 && <>
                <div id={archiveId} hidden={!expanded} className="space-y-3 mt-3">
                    {olderItems.map(renderItem)}
                </div>
                <button type="button" aria-expanded={expanded} aria-controls={archiveId}
                    onClick={() => setExpanded(!expanded)}
                    className="mt-4 text-sm text-accent font-medium hover:underline">
                    {expanded ? messages.home.lessNews : messages.home.moreNews}
                </button>
            </>}
        </motion.section>
    );
}
