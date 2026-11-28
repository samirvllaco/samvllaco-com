_The European Accessibility Act has applied since 28 June 2025. If you sell a covered product or service to people in the EU, your website and app need to meet it, even if your company is outside the EU. This checklist is the one I work through on an EAA audit, written so your team can start on it today._

I'm a designer, not a lawyer. Use this to find and fix the problems, and ask your legal team to confirm whether and how the act applies to you.

## Does the European Accessibility Act apply to you?

The act, [Directive (EU) 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj), covers a set of products and consumer services sold in the EU. For websites and apps, these services are the ones that matter:

- E-commerce: selling products or services online to consumers
- Consumer banking services
- E-books and the software used to read them
- Electronic communications services, such as calling and messaging
- Services that give access to audiovisual media
- Passenger transport by air, bus, rail and water: the websites, apps, e-tickets and travel information

Three things decide it for most teams:

1. **You sell to consumers.** The act is about products and services offered to the public. A tool used only by businesses or by your own staff is generally outside it, but a system that also faces consumers is in.
2. **You are not a microenterprise providing services.** A microenterprise has fewer than 10 people and an annual turnover or balance sheet total of no more than €2 million. Microenterprises that provide services are exempt from the service rules. Products are not exempt.
3. **Location does not save you.** A company in the US or the UK that sells to people in the EU is covered the same way as one in Berlin.

If you sell online to consumers in the EU and you have 10 or more people, assume it applies and check.

## What standard do you need to meet?

The act describes requirements in general terms. In practice, teams show they meet them with the harmonised European standard, EN 301 549, which maps to WCAG 2.1 level AA for web content. I audit against WCAG 2.2 AA, because it covers 2.1 AA and adds the newer criteria a future update is likely to include.

## The EAA checklist for websites and apps

Work through it on your three most used flows first: sign up or log in, the main task, and checkout or payment. Those are where an excluded customer loses the most and where a complaint is most likely to start.

### Keyboard and focus

- Every link, button, field and menu works with the keyboard alone: Tab, Shift+Tab, Enter, Space and the arrow keys.
- Focus is always visible. A 2px outline with a 2px offset in a color that keeps 3:1 against the background.
- Focus order follows the reading order. Nothing jumps from the header to the footer and back.
- Nothing traps focus. Every dialog, menu and cookie banner can be closed with Escape.
- A "Skip to main content" link comes first on every page.
- Sticky headers and chat widgets never cover the element that has focus.

### Screen readers

- Every page has one H1, and headings run in order without skipping levels.
- Every image that carries meaning has alt text that says what it shows. Decorative images have empty alt text.
- Every button and link has a name a screen reader can say: "Remove item", never just an X icon.
- Every form field has a visible label that is linked to the field in code.
- Status messages, such as "Added to cart" or "3 results", are announced without moving focus.
- The page language is set, so the screen reader uses the right voice.

### Color and contrast

- Body text keeps 4.5:1 against its background. Large text and icons keep 3:1. [Check any pair here](/tools/contrast-checker/).
- Color is never the only signal. An error has an icon and words, not just a red border.
- Text inside images, banners and buttons on photos still passes.

### Forms and checkout

- Errors say what went wrong and how to fix it, next to the field: "Enter a card number with 16 digits."
- Required fields are marked in the label, not only with an asterisk in a color.
- Inputs use the right autocomplete values, so names, emails and addresses fill in.
- Nothing times out without a warning and a way to ask for more time.
- Any captcha has an alternative that does not rely on sight or on solving a puzzle.
- Payment steps hosted by a third party are checked too. You are responsible for the whole journey.

### Layout and zoom

- The page works at 200% zoom and at 320px width without scrolling sideways.
- Text spacing can be increased without text being cut off.
- Touch targets are at least 24 by 24px, and 44 by 44px for main actions.
- Nothing depends on a gesture with two fingers or on dragging, unless there is a single-tap alternative.

### Media and motion

- Videos have captions. Audio has a transcript.
- Nothing flashes more than three times a second.
- Carousels and autoplay can be paused, and motion respects the reduced motion setting.

### Documents and content

- PDFs and other downloads that customers need are accessible, or the same content is available as a page.
- Links say where they go. "Read the returns policy", not "Click here".
- Instructions do not rely on shape or position alone: "the green button on the right".

## What you need to publish

Service providers covered by the act have to explain how their service meets the accessibility requirements. The directive asks for this information in the general terms and conditions or in another place customers can easily find, in an accessible format. In practice most teams publish an accessibility statement page and link it from the footer. Keep it plain:

- Which standard you test against, such as WCAG 2.2 AA
- What you tested and when
- What is not accessible yet, and when it will be fixed
- How a customer can report a problem or ask for an alternative, with a real contact

An honest statement with a list of known issues is better than a claim of full compliance that a customer can disprove in a minute.

## Deadlines and transition periods

- **28 June 2025:** the act applies to products and services placed on the market from this date.
- **Until 28 June 2030:** service providers can keep using products they already used to provide the service before 28 June 2025, and service contracts agreed before that date can run until they end, for no longer than five years.
- **Self-service terminals** already in use, such as ticket machines and ATMs, can stay in service until the end of their economic life, for no longer than 20 years.

None of the transition periods cover a new website or a redesign. Anything you launch or rebuild now has to meet the requirements from day one.

## Who checks, and what happens if you don't comply

Each EU country enforces the act through its own authorities, and each sets its own penalties. The directive requires them to be effective, proportionate and dissuasive, so the amounts and the process differ by country. Authorities can also require you to fix a service or stop offering it. Customers and consumer groups can complain, so the first sign of a problem is often a complaint, not an inspection.

## Overlays will not get you compliant

An accessibility widget or overlay adds a toolbar on top of your site. It does not change your design or your code, and it can get in the way of the screen readers people already use. The checklist above is fixed in the source: the design, the components and the content.

## How to run this check in a week

1. **Day 1.** Run an automated scan on your top 10 pages to catch the easy failures: missing alt text, contrast, missing labels.
2. **Days 2 and 3.** Go through the three main flows with the keyboard only, then with VoiceOver on a Mac or iPhone and NVDA on Windows. This is where most real problems show up.
3. **Day 4.** Sort what you found by severity: anything that blocks a task first, then anything that makes it hard.
4. **Day 5.** Write the accessibility statement with the known issues and a date for each fix.

Automated tools find a minority of the problems. The keyboard and screen reader pass is the part that cannot be skipped.

## Questions people ask

### Does the European Accessibility Act apply to B2B software?

Generally no. The act covers products and services offered to consumers. Software sold only to businesses, or used only by your own employees, is mostly outside it. If the same system also serves consumers, it is in. Check with your legal team, because some countries go further in their own laws.

### Does the EAA apply to companies outside the EU?

Yes. It covers covered products and services offered to consumers in the EU, wherever the company is based.

### Is WCAG 2.1 AA enough for the EAA?

Today, the harmonised standard EN 301 549 maps to WCAG 2.1 AA, so meeting it is the usual way to show conformity. Testing against WCAG 2.2 AA covers 2.1 AA and the newer criteria too.

### Are small businesses exempt from the European Accessibility Act?

Microenterprises that provide services are exempt: fewer than 10 people and no more than €2 million in annual turnover or balance sheet total. Small and medium businesses above that are covered. Microenterprises that make or sell covered products are not exempt.

### What does an EAA audit cost?

It depends on the size of the product. I run a fixed [one-week EAA audit](/eaa-audit/): five working days on up to 10 key pages, with keyboard, screen reader and automated testing, a ranked fix list mapped to WCAG 2.2 AA and EN 301 549, and a draft accessibility statement you can publish.

## Where to go next

If your product was built with an AI tool, start with [the 12 accessibility fixes for AI-built apps](/writing/vibe-coding-accessibility-wcag-22-aa/), each with a prompt. If you want the whole check done and the fixes designed, [book the one-week EAA audit](/eaa-audit/). I test with VoiceOver and NVDA on web, iOS and Android, and I can fix front-end code myself.
