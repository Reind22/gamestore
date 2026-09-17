/* ═══════════════════════════════════════════
   GameStore — общий модуль (GS)
   Тема / язык / валюта / wishlist / toast / i18n
   Подключается на всех страницах после gs_data.js
   ═══════════════════════════════════════════ */

const GS = (() => {
  'use strict';

  const RATES = { USD: 1, RUB: 92.5, EUR: 0.92 };   // демо-курсы; в бою — API
  const SYM   = { USD: '$', RUB: '₽', EUR: '€' };
  const DEC   = { USD: 2, RUB: 0, EUR: 2 };

  const state = {
    theme: localStorage.getItem('gs-theme') || 'light',
    lang:  localStorage.getItem('gs-lang')  || 'ru',
    cur:   localStorage.getItem('gs-cur')   || 'USD',
    wish:  JSON.parse(localStorage.getItem('gs-wish') || '[]'),
  };

  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  /* ── helpers ── */
  const lang = () => state.lang;
  const money = usd => {
    const v = usd * RATES[state.cur];
    const d = DEC[state.cur];
    const n = v.toLocaleString(state.lang === 'ru' ? 'ru-RU' : 'en-US', {
      minimumFractionDigits: d, maximumFractionDigits: d
    });
    return state.cur === 'RUB' ? `${n} ${SYM.RUB}` : `${SYM[state.cur]}${n}`;
  };

  /* ── Тема ── */
  function applyTheme(){
    document.documentElement.dataset.theme = state.theme;
    $$('[data-set-theme]').forEach(b => b.classList.toggle('on', b.dataset.setTheme === state.theme));
  }

  /* ── Валюта ── */
  function applyCur(){
    $$('[data-usd]').forEach(el => { el.textContent = money(parseFloat(el.dataset.usd)); });
    $$('[data-set-cur]').forEach(b => b.classList.toggle('on', b.dataset.setCur === state.cur));
  }

  /* ── Язык ── */
  const RU = {
    brandSub:'ЭКСКЛЮЗИВНЫЕ АККАУНТЫ', navHome:'Главная', navCatalog:'Каталог', navHelp:'Помощь',
    searchPh:'Найти аккаунт, игру или ключ…', login:'Войти', filters:'Фильтры', reset:'Сбросить', menu:'Меню',
    fPlatform:'Платформа', fGenre:'Жанр', fPrice:'Цена', fType:'Тип аккаунта', fRegion:'Регион',
    gShooter:'Шутеры', gSim:'Симуляторы', gStrategy:'Стратегии', gRacing:'Гонки',
    tGames:'С играми', tEmpty:'Пустой', tSkins:'Со скинами', tRank:'С рангом',
    rRu:'Россия', rCis:'СНГ', rEu:'Европа', rOther:'Другое',
    found:'Найдено', items:'товара', of:'из', sortLabel:'Сортировка:',
    sortPopular:'По популярности', sortCheap:'Сначала дешёвые', sortExp:'Сначала дорогие',
    sortRating:'По рейтингу', sortNew:'По новизне', sortUpdated:'Недавно обновлённые',
    seeAll:'Смотреть все', viewMore:'Подробнее',
    shNew:'Новинки', shNewSub:'Только что добавили в магазин',
    shHot:'Популярное', shHotSub:'Покупают чаще всего',
    shUpdated:'Недавно обновлено', shUpdatedSub:'Обновили описание или цены',
    shAll:'Все товары', shAllSub:'Полный каталог с фильтрами',
    themeLight:'☀️ Светлая', themeDark:'🌙 Тёмная',
    curNote:'Все цены в USD. Другая валюта — для удобства просмотра.',
    showResults:'Показать результаты', ftAbout:'О магазине', ftWarranty:'Гарантии', ftPay:'Оплата', ftSupport:'Поддержка',
    wishAdd:'Добавлено в желаемое', wishDel:'Убрано из желаемого',
    toWish:'В желаемое', inWish:'В желаемом ★', similar:'Похожие товары',
    from:'От', to:'До',
    buyNow:'Купить сейчас', toCart:'Добавить в корзину', inCart:'В корзине',
    guarantee:'Гарантия 30 дней', delivery:'Мгновенная выдача',
    desc:'Описание', features:'Что вы получаете', media:'Медиа',
    back:'Назад в каталог', notFound:'Товар не найден',
    rating:'рейтинг', reviews:'отзывов', sold:'продано',
    empty:'Ничего не найдено', emptySub:'Попробуйте изменить фильтры',
    clearFilters:'Сбросить фильтры',
  };

  const RU_CACHE = {};
  const I18N = {
    en: {
      brandSub:'EXCLUSIVE ACCOUNTS', navHome:'Home', navCatalog:'Catalog', navHelp:'Help',
      searchPh:'Search accounts, games, keys…', login:'Sign in', filters:'Filters', reset:'Reset', menu:'Menu',
      fPlatform:'Platform', fGenre:'Genre', fPrice:'Price', fType:'Account type', fRegion:'Region',
      gShooter:'Shooters', gSim:'Simulators', gStrategy:'Strategy', gRacing:'Racing',
      tGames:'With games', tEmpty:'Empty', tSkins:'With skins', tRank:'With rank',
      rRu:'Russia', rCis:'CIS', rEu:'Europe', rOther:'Other',
      found:'Found', items:'items', of:'of', sortLabel:'Sort:',
      sortPopular:'Most popular', sortCheap:'Price: low to high', sortExp:'Price: high to low',
      sortRating:'Top rated', sortNew:'Newest', sortUpdated:'Recently updated',
      seeAll:'View all', viewMore:'View',
      shNew:'New arrivals', shNewSub:'Just added to the store',
      shHot:'Popular', shHotSub:'Most frequently purchased',
      shUpdated:'Recently updated', shUpdatedSub:'Description or prices updated',
      shAll:'All items', shAllSub:'Full catalog with filters',
      themeLight:'☀️ Light', themeDark:'🌙 Dark',
      curNote:'All prices are in USD. Other currencies are for convenience only.',
      showResults:'Show results', ftAbout:'About', ftWarranty:'Warranty', ftPay:'Payment', ftSupport:'Support',
      wishAdd:'Added to wishlist', wishDel:'Removed from wishlist',
      toWish:'Add to wishlist', inWish:'In wishlist ★', similar:'Similar items',
      from:'From', to:'To', priceUpTo:'Up to', priceRange:'More than',
      buyNow:'Buy now', toCart:'Add to cart', inCart:'In cart',
      guarantee:'30-day warranty', delivery:'Instant delivery',
      desc:'Description', features:'What you get', media:'Media',
      back:'Back to catalog', notFound:'Item not found',
      rating:'rating', reviews:'reviews', sold:'sold',
      empty:'Nothing found', emptySub:'Try changing filters',
      clearFilters:'Clear filters',
    },
    ru: {}
  };

  function L(key){
    if (state.lang === 'ru') return RU[key] || RU_CACHE[key] || key;
    return I18N.en[key] || RU[key] || RU_CACHE[key] || key;
  }

  function applyLang(){
    $$('[data-i18n]').forEach(el => {
      const k = el.dataset.i18n;
      if (state.lang === 'ru') { el.textContent = RU[k] || RU_CACHE[k] || el.textContent; return; }
      if (!RU_CACHE[k]) RU_CACHE[k] = el.textContent;
      if (I18N.en[k]) el.textContent = I18N.en[k];
    });
    $$('[data-i18n-ph]').forEach(el => {
      const k = el.dataset.i18nPh;
      if (state.lang === 'ru') { el.placeholder = RU[k] || RU_CACHE['ph_'+k] || el.placeholder; return; }
      if (!RU_CACHE['ph_'+k]) RU_CACHE['ph_'+k] = el.placeholder;
      if (I18N.en[k]) el.placeholder = I18N.en[k];
    });
    document.documentElement.lang = state.lang;
    $$('[data-set-lang]').forEach(b => b.classList.toggle('on', b.dataset.setLang === state.lang));
    applyCur();
  }

  /* ── Toast ── */
  let toastT;
  function toast(msg){
    let el = $('#toast'), msgEl = $('#toastMsg');
    if (!el){
      el = document.createElement('div');
      el.id = 'toast'; el.className = 'toast'; el.setAttribute('role','status');
      el.innerHTML = '<span class="s">★</span><span id="toastMsg"></span>';
      document.body.appendChild(el);
      msgEl = $('#toastMsg');
    }
    msgEl.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove('show'), 1900);
  }

  /* ── Wishlist ── */
  function wishToggle(id, starEl){
    const i = state.wish.indexOf(id);
    const on = i === -1;
    if (on) state.wish.push(id); else state.wish.splice(i, 1);
    localStorage.setItem('gs-wish', JSON.stringify(state.wish));
    if (starEl){
      starEl.classList.toggle('on', on);
      starEl.textContent = on ? '★' : '☆';
    }
    updateWishPip();
    toast(L(on ? 'wishAdd' : 'wishDel'));
  }
  function updateWishPip(){
    const pip = $('#heartPip');
    if (!pip) return;
    pip.textContent = state.wish.length;
    pip.toggleAttribute('data-zero', !state.wish.length);
  }
  function wishBind(){
    document.addEventListener('click', e => {
      const st = e.target.closest('.star');
      if (!st) return;
      e.preventDefault();
      e.stopPropagation();
      // id берём из ближайшей карточки или data-атрибута
      const holder = st.closest('[data-game-id]');
      const id = holder ? parseInt(holder.dataset.gameId) : null;
      if (id !== null) wishToggle(id, st);
    });
    updateWishPip();
    // восстановить звёзды из localStorage
    $$('.star').forEach(st => {
      const holder = st.closest('[data-game-id]');
      if (holder && state.wish.includes(parseInt(holder.dataset.gameId))){
        st.classList.add('on');
        st.textContent = '★';
      }
    });
  }

  /* ── Инициализация общих обработчиков ── */
  function init(){
    applyTheme();
    applyLang();
    wishBind();

    $$('[data-set-theme]').forEach(b => b.addEventListener('click', () => {
      state.theme = b.dataset.setTheme;
      localStorage.setItem('gs-theme', state.theme);
      applyTheme();
    }));
    $$('[data-set-lang]').forEach(b => b.addEventListener('click', () => {
      state.lang = b.dataset.setLang;
      localStorage.setItem('gs-lang', state.lang);
      // перезагрузка: динамический контент (полки, каталог, карточки) перерендерится на новом языке
      location.reload();
    }));
    $$('[data-set-cur]').forEach(b => b.addEventListener('click', () => {
      state.cur = b.dataset.setCur;
      localStorage.setItem('gs-cur', state.cur);
      applyCur();
      toast(state.lang === 'ru'
        ? `Цены показаны в ${state.cur}. Расчёт и оплата — в USD.`
        : `Prices shown in ${state.cur}. Billing is in USD.`);
    }));

    /* Ctrl+K */
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){
        e.preventDefault();
        $('.find input')?.focus();
      }
    });

    /* Мобильное меню */
    const burger = $('#burger');
    if (burger){
      const sheet = $('#sheet'), veil = $('#veil');
      const open = () => {
        sheet.classList.add('open'); veil.classList.add('open');
        sheet.setAttribute('aria-hidden','false');
        burger.setAttribute('aria-expanded','true');
        document.body.style.overflow = 'hidden';
      };
      const close = () => {
        sheet.classList.remove('open'); veil.classList.remove('open');
        sheet.setAttribute('aria-hidden','true');
        burger.setAttribute('aria-expanded','false');
        document.body.style.overflow = '';
      };
      burger.addEventListener('click', open);
      $('#sheetX')?.addEventListener('click', close);
      veil.addEventListener('click', close);
      document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    }
  }

  /* Автозапуск при DOM-ready */
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { $, $$, lang, L, money, fmt: money, toast, wishToggle, wishBind, state };
})();
