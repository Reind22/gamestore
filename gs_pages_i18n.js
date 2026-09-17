/* i18n для контентных страниц (guarantees/faq/reviews/stub) */
(() => {
  'use strict';
  const lang = localStorage.getItem('gs-lang') || 'ru';

  const T = {
    en: {
      // guarantees
      'g-title': 'Warranties & purchase safety',
      'g-lead': 'Every purchase at GameStore is protected. We have been working in the game accounts market since 2024 and value our reputation — here are specific commitments, not vague words.',
      'g-w30t': '30-day warranty', 'g-w30d': 'If the account stops working or the credentials do not fit within 30 days of purchase — we replace it with an identical one or refund your money.',
      'g-instt': 'Instant delivery', 'g-instd': 'Credentials arrive automatically right after payment — in your browser and by email. No waiting for “sometime later”.',
      'g-chekt': 'Pre-delivery check', 'g-chekd': 'Every account is tested before sale: login, game validity, inventory integrity. Screenshots sent on request.',
      'g-supt': '24/7 support', 'g-supd': 'We answer in the site chat and on Telegram. Average first response — 15 minutes, any time of day.',
      'g-datad': 'Full data change', 'g-datad-t': 'On all accounts where technically possible you change the email and password to yours — the purchase is finally secured to you.',
      'g-reft': 'Refund, no questions', 'g-refd': 'Changed your mind before delivery — we refund 100% without explanation within 24 hours after payment.',
      'g-notett': '⚠️ Deal safety notice', 'g-noted': 'We never ask for your Steam password, Steam Guard codes or wallet details in private messages. All payments go only through the official payment form on the site. If someone writes to you posing as “support” — they are scammers; real support writes only from the site chat.',
      'g-how': 'How a purchase works',
      'g-s1t': 'You pick an item', 'g-s1d': 'In the catalog — with filters and sorting. The item card shows contents, stats and price.',
      'g-s2t': 'You pay your way', 'g-s2d': 'Crypto (BTC, USDT, TON) or bank card. Payment goes through a secure gateway.',
      'g-s3t': 'You get credentials instantly', 'g-s3d': 'Login/password and instructions arrive on screen and by email right after payment is confirmed.',
      'g-s4t': 'You secure the account', 'g-s4d': 'Change email and password following our guide. If anything fails — support will walk you through.',
      'g-back': '← Back to home', 'navHome': 'Home', 'g-nav': 'Warranties', 'g-data-t': 'Full data change', 'g-data-d': 'On all accounts where technically possible you change the email and password to yours — the purchase is finally secured to you.',
      // faq
      'f-title': 'FAQ', 'f-lead': 'Everything people ask most often. Did not find an answer — use the chat (circle at bottom right) or our Telegram bot, we are online 24/7.',
      'f-cat1': 'Buying', 'f-cat2': 'Safety', 'f-cat3': 'Payment & refunds',
      'f-back': '← Back to home',
      // reviews
      'r-title': 'Customer reviews', 'r-alltime': 'reviews all-time', 'r-5of5': 'of buyers rate 5 of 5', 'r-deals': 'successful deals',
      'r-cta': 'Bought from us? Tell how it went', 'r-cta2': 'Review is published after a check — it helps other buyers', 'r-leave': 'Leave a review', 'r-back': '← Back to home', 'r-purchase': 'Purchase:',
      // stub
      's-soon': 'Coming soon', 's-title': 'This page is in the works', 's-sub': 'We are preparing this section. Check back later — it will be useful.', 's-cardt': 'What already works', 's-cardd': 'Catalog with filters, product cards, cart and wishlist. This section will be added in upcoming updates.', 's-home': '← Back to home',
    },
    ru: {}
  };

  const RU = {}; // кэш оригинального текста
  function apply(){
    document.querySelectorAll('[data-pg]').forEach(el => {
      const k = el.dataset.pg;
      if (lang === 'ru'){
        if (RU[k]) el.textContent = RU[k];
        return;
      }
      if (!RU[k]) RU[k] = el.textContent;
      if (T.en[k]) el.textContent = T.en[k];
    });
    document.documentElement.lang = lang;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();
