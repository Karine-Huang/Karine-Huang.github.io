# Research metrics

The homepage and publication list share `src/data/publicationMetrics.json`.
Citation links open the exact Google Scholar article. Counts are per article;
duplicate Scholar entries and the original/++ papers are not added together.
The T2I-CompBench card shows its repository stars; the ++ card only shows its own citations.
Papers without a verified public code repository do not show a made-up GitHub link.

Run `python3 scripts/update_publication_metrics.py` to update the snapshot.
It uses the article IDs and repositories in `content/publication-metrics.json`.
GitHub stars also refresh in the browser via Shields.io (which caches GitHub data).

The existing GitHub Pages deployment workflow now refreshes the snapshot before
each build and has a daily schedule. After this repository is pushed and GitHub
Pages/Actions is configured, the published website will receive daily citation
updates. GitHub scheduled workflows run on the default branch; GitHub can pause
schedules on inactive public repositories. No deployment has been performed locally.

Google Scholar may rate-limit or block automated requests. The script does not
bypass access controls: it preserves the previous verified count and its date,
and logs a warning. The Scholar verification date is available in the citation link tooltip,
so readers can check when a snapshot was verified.

The CineScene “top 2.8%” wording is supplied by the homepage owner. The project
page confirms Highlight status; the percentage has not been independently verified.
TPAMI's IF 20.4 is labeled with the year 2025 and links to the IEEE Computer Society.
