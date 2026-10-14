'use client';

import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import PublicationPreview from '@/components/publications/PublicationPreview';
import PublicationImpact from '@/components/publications/PublicationImpact';
import PublicationDetails from '@/components/publications/PublicationDetails';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    scholarUrl?: string;
}

export default function SelectedPublications({ publications, title, scholarUrl }: SelectedPublicationsProps) {
    const messages = useMessages();
    return (
        <section id="selected-publications" className="scroll-mt-24">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <h2 className="text-2xl font-serif font-bold text-primary">{title || messages.home.selectedPublications}</h2>
                {scholarUrl && <a href={scholarUrl} target="_blank" rel="noopener noreferrer" className="ml-auto shrink-0 text-sm font-medium text-accent hover:text-accent-dark">{messages.home.allPublications} ↗</a>}
            </div>
            <div className="space-y-5">
                {publications.map(pub => {
                    const links = [
                        { label: messages.publications.paper, href: pub.pdfUrl },
                        { label: messages.publications.project, href: pub.url },
                        { label: messages.publications.code, href: pub.code },
                        { label: messages.publications.video, href: pub.video },
                    ].filter(link => link.href);
                    return (
                        <article key={pub.id} className="publication-card">
                            <div className="publication-card-layout">
                                {pub.preview && <div className="publication-card-preview"><PublicationPreview preview={pub.preview} compact={pub.id === 'huang2026genmac'} title={pub.title} sizes="(max-width: 639px) calc(100vw - 80px), 224px" /></div>}
                                <div className="min-w-0 flex-1">
                                    <h3 className="publication-card-title">
                                        {pub.url ? <a href={pub.url} target="_blank" rel="noopener noreferrer">{pub.title}</a> : pub.title}
                                    </h3>
                                    <p className="publication-card-authors">
                                        {pub.authors.map((author, idx) => <span key={`${author.name}-${idx}`}><span className={`${author.isHighlighted ? 'font-semibold text-primary' : ''} ${author.isCoAuthor ? 'underline underline-offset-4' : ''}`}>{author.name}</span>{author.isCorresponding && <sup>†</sup>}{idx < pub.authors.length - 1 ? ', ' : ''}</span>)}
                                    </p>
                                    <PublicationDetails publication={pub} />
                                    <div className="publication-links-row">
                                        {links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="publication-resource-link">{link.label}</a>)}
                                        <PublicationImpact publication={pub} />
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
