# ApexGaming.fp Media Kit

A responsive, single-page creator media kit for `https://apexgaming.epsingh.in/`, with a separate privacy notice page. It is a lightweight static site: no build step or runtime server is required. Sponsorship/callback submissions are routed through the supplied Formspree endpoint.

## Included

- `index.html` — media kit, audience fit, performance proof, campaign formats, FAQs and inquiry form.
- `styles.css` — responsive premium charcoal/orange/cream design and motion/accessibility styling.
- `script.js` — mobile navigation, form mode switch, custom validation, AJAX submission, success/error feedback and subtle reveal motion.
- `privacy.html` — plain-language notice for form submissions.
- `sitemap.xml`, `robots.txt`, `site.webmanifest`, `vercel.json`.
- `assets/` — generated brand/OG icons and compressed, creator-supplied Instagram Insights screenshots.

## Formspree setup

The form action is already set to the endpoint you provided:

`https://formspree.io/f/xaeeekeq`

The website cannot see or change the destination inbox configured inside your Formspree account. Before sharing the site with sponsors:

1. Sign in to Formspree and open the form matching ID `xaeeekeq`.
2. Confirm the recipient email address is correct and any required email verification/activation is complete.
3. Deploy the site, submit a test inquiry using an email address you control, and confirm it arrives in the intended inbox (and in Formspree submissions).
4. Test both **Campaign inquiry** and **Request a call**. The callback path requires a contact number and callback window; it does not place a call automatically.
5. After the domain is live, enable Formspree’s allowed-domain restriction for `apexgaming.epsingh.in` if that option is available on your plan, and keep its spam filtering enabled.
6. If the email does not arrive, check Formspree's submission history, spam folder, and form notification settings.

The form has a hidden honeypot field, client-side validation, and success/error states. The form processor remains Formspree; this package deliberately does not expose a personal phone number or include a custom API key. The form endpoint itself is public by design and should not be treated as a secret.

## Deploy to Vercel at `apexgaming.epsingh.in`

1. Upload this folder to a Git repository, keeping `index.html`, `styles.css`, `script.js`, `privacy.html`, `robots.txt`, `sitemap.xml`, `vercel.json` and `assets/` at the repository root.
2. Import that repository into Vercel. This is a static site; no framework preset or build command is needed. Leave the output/root directory at the repository root.
3. In the Vercel project settings, add the domain `apexgaming.epsingh.in`. Follow the exact DNS record and target shown by Vercel for this project; do not guess the CNAME target.
4. Wait until Vercel reports the domain as configured and HTTPS is active. Then open the canonical domain and check mobile and desktop layouts.
5. Test all form options and the DevArea footer link.

## Search setup

- Canonical URL: `https://apexgaming.epsingh.in/`
- Sitemap: `https://apexgaming.epsingh.in/sitemap.xml`
- Robots file: `https://apexgaming.epsingh.in/robots.txt`
- Open Graph/Twitter preview: `https://apexgaming.epsingh.in/assets/og-apex.jpg`

Once live, add the URL prefix/domain property in Google Search Console, inspect `https://apexgaming.epsingh.in/`, then submit the sitemap URL. SEO/AEO/GEO elements are included, but indexing, rankings and AI-generated results are not guaranteed.

## Metrics and claims

Visible figures are transcribed from the owner-supplied screenshots: the profile dashboard shows 9.3L views in the last 30 days; the profile shows 1,531/1,532 followers in the provided snapshots; the audience screenshot shows India at 96.1%; the follower screenshot shows 16% growth; and the recent content screenshot lists individual results of 146K, 80.2K, 42.7K and 39.6K views. Screenshots may represent different reports or reporting windows, so the page distinguishes individual content views from account-level profile views and states that results are not guaranteed. Please refresh figures if the account metrics change before a sponsor pitch.

The page identifies ApexGaming.fp as an independent fan page rather than an official esports organization or game publisher account. The earlier rate-card graphic was not published on the landing page: its very low fixed rates can anchor negotiations before a sponsor shares the campaign scope, so the page prompts brands for a brief and then a tailored quote.
