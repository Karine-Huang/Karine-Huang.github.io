import ReactMarkdown from 'react-markdown';
import { Publication } from '@/types/publication';

function InlineMarkdown({ children }: { children: string }) {
    return <ReactMarkdown components={{
        p: ({ children }) => <span>{children}</span>,
        a: props => <a {...props} target="_blank" rel="noopener noreferrer" />,
    }}>{children}</ReactMarkdown>;
}

export default function PublicationDetails({ publication }: { publication: Publication }) {
    const venue = (publication.journal || publication.conference || '').match(/\(([^)]+)\)\s*$/)?.[1]
        || publication.journal || publication.conference;
    const description = publication.description?.replace(
        /^(?:IEEE\s+)?(?:CVPR|ICLR|AAAI|NeurIPS|TPAMI|ICCV|ECCV)\s+\d{4}(?:\s+(?:Highlight|Oral|Spotlight))?\.\s*/i, '');
    const distinction = publication.description?.match(/\b(Highlight|Oral|Spotlight)\b/i)?.[1];

    return <>
        <p className="publication-card-venue" title={publication.journal || publication.conference}>
            <span>{venue} {publication.year}</span>
            {(publication.honor || distinction) && <span className="publication-card-honor">
                <InlineMarkdown>{publication.honor || distinction || ''}</InlineMarkdown>
            </span>}
        </p>
        <p className="publication-card-description">
            {publication.impact ? <span className="publication-impact-copy"><InlineMarkdown>{publication.impact}</InlineMarkdown></span> : description}
        </p>
    </>;
}
