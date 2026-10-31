// Constructeur de pages systeme.io aux couleurs RunCare (29/10/2026).
// S'exécute dans l'éditeur systeme.io (Claude in Chrome) : fabrique des éléments natifs de l'éditeur
// (Section, Row, Column, Headline, Text, Button, Image, Video, BulletList, Faq), puis remplace la page
// d'un coup par l'action Redux UPDATE_ENTITIES. Tout reste modifiable à la main ensuite dans l'éditeur.
// Polices : TTF statiques importées dans le compte (Fraunces 600 opsz 48, Instrument Sans 400/700).
window.RC = (() => {
  const C = {
    bg: 'rgb(247, 246, 241)', bg2: 'rgb(239, 238, 231)', white: 'rgb(255, 255, 255)',
    ink: 'rgb(20, 34, 56)', ink2: 'rgb(74, 85, 102)', line: 'rgb(220, 218, 209)',
    accent: 'rgb(31, 94, 58)', accentSoft: 'rgb(226, 236, 228)',
    dark: 'rgb(20, 34, 56)', darkInk: 'rgb(247, 246, 241)', darkMuted: 'rgba(247, 246, 241, 0.78)', mint: 'rgb(159, 196, 168)',
  };
  const F = {
    serif: ['FrauncesSemiBold50659884', 50659884], serifI: ['FrauncesSemiBoldItalic50659888', 50659888],
    sans: ['InstrumentSans50659877', 50659877], sansB: ['InstrumentSansBold50659890', 50659890],
  };
  const FILES = { logo: [50658508, 1253 / 348], duo: [50658511, 1200 / 914] };
  const TIDY_APPEL = 'https://tidycal.com/team/runcare/appel-gratuit';
  const TIDY_BILAN = 'https://tidycal.com/team/runcare/bilan-diagnostic-runcare';

  let E = {};
  const uid = () => crypto.randomUUID();
  const m = (t = 0, b = 0, l = 0, r = 0) => ({ marginTop: t, marginLeft: l, marginRight: r, marginBottom: b });
  const p = (t = 0, r = 0, b = t, l = r) => ({ paddingTop: t, paddingLeft: l, paddingRight: r, paddingBottom: b });
  const radius = (n) => ({ borderTopLeftRadius: n, borderTopRightRadius: n, borderBottomLeftRadius: n, borderBottomRightRadius: n });
  const border = (width, color, r = 4) => ({ type: 'fullBorder', style: 'solid', width, color, radius: radius(r) });
  const font = (k, pre = '') => ({ [pre ? pre + 'FontFamily' : 'fontFamily']: F[k][0], [pre ? pre + 'FontFileId' : 'fontFileId']: F[k][1] });
  // L'italique de Fraunces est un fichier à part : <em> garde un span dans cette police (page publiée) ; la couleur
  // est répétée sur le span car l'éditeur ignore la police en ligne et ne propagerait pas la couleur du parent.
  const it = (html, c = C.ink) => html.replace(/<em>(.*?)<\/em>/g, `<em><span style="color: ${c}; font-family: ${F.serifI[0]}; font-style: normal">$1</span></em>`);
  const color = (html, c) => c ? html.replace(/<p>/g, `<p><span style="color: ${c}">`).replace(/<\/p>/g, '</span></p>') : html;
  // Typographie française : espace insécable avant ? ! : ; » et après «.
  const nb = (s) => s.replace(/ ([?!:;»])/g, '\u00a0$1').replace(/« /g, '«\u00a0');
  const paras = (html) => /^\s*<p/.test(html) ? html : html.split('\n').map((l) => `<p>${l}</p>`).join('');

  function mk(type, props, children) {
    const id = uid();
    const e = { id, type, htmlAttrId: `${type.toLowerCase()}-${id.slice(0, 8)}`, appearance: { desktop: true, mobile: true }, ...props };
    if (children) e.childIds = children.map((c) => { E[c].parentId = id; return c; });
    E[id] = e;
    return id;
  }

  const col = (size, kids, o = {}) => mk('Column', { size, alignSelf: o.alignSelf || 'flex-start', ...(o.extra || {}) }, kids);
  function row(cols, o = {}) {
    return mk('Row', {
      margin: m(o.mt || 0, o.mb || 0), mobileMargin: m(o.mmt ?? o.mt ?? 0, o.mmb ?? o.mb ?? 0),
      padding: o.pad || p(0), mobilePadding: o.mpad || o.pad || p(0),
      background: {}, ...(o.bg ? { backgroundColor: o.bg, mobileBackgroundColor: o.bg } : {}),
      ...(o.border ? { border: o.border } : {}),
    }, cols);
  }
  const box = (kids, o = {}) => row([col(12, kids)], o);
  function sec(o, items) {
    const isRow = (id) => E[id].type === 'Row';
    const rows = items.every(isRow) ? items : [box(items)];
    return mk('Section', {
      background: {}, backgroundColor: o.bg || C.bg, mobileBackgroundColor: o.bg || C.bg,
      contentWidth: o.width || 'medium',
      padding: p(o.pt ?? 80, 24, o.pb ?? o.pt ?? 80), mobilePadding: p(o.mpt ?? 52, 16, o.mpb ?? o.mpt ?? 52),
      margin: m(), mobileMargin: m(),
    }, rows);
  }

  function h(html, o = {}) {
    const size = o.size || 44, msize = o.msize || Math.round(size * 0.68), tag = o.tag || 'h2';
    return mk('Headline', {
      content: `<${tag}>${color('<p>' + it(nb(html), o.color || C.ink) + '</p>', o.color).replace(/^<p>|<\/p>$/g, '')}</${tag}>`,
      fontSize: size, mobileFontSize: msize, lineHeight: Math.round(size * 1.14), mobileLineHeight: Math.round(msize * 1.18),
      textAlign: o.align || 'left', mobileTextAlign: o.malign || o.align || 'left',
      ...font(o.font || 'serif'), ...font(o.font || 'serif', 'mobile'),
      padding: p(0), mobilePadding: p(0), margin: m(o.mt || 0, o.mb ?? 20), mobileMargin: m(o.mmt ?? o.mt ?? 0, o.mmb ?? o.mb ?? 16),
    });
  }
  function t(html, o = {}) {
    const size = o.size || 20, msize = o.msize || (size >= 20 ? 18 : size);
    return mk('Text', {
      content: color(it(paras(nb(html)), o.color || C.ink), o.color),
      fontSize: size, mobileFontSize: msize, lineHeight: Math.round(size * (o.lh || 1.6)), mobileLineHeight: Math.round(msize * (o.lh || 1.6)),
      textAlign: o.align || 'left', mobileTextAlign: o.malign || o.align || 'left',
      ...font(o.font || 'sans'), ...font(o.font || 'sans', 'mobile'),
      padding: p(0), mobilePadding: p(0), margin: m(o.mt || 0, o.mb ?? 16), mobileMargin: m(o.mmt ?? o.mt ?? 0, o.mmb ?? o.mb ?? 14),
    });
  }
  const eyebrow = (txt, o = {}) => t(txt.toUpperCase(), { size: 14, msize: 13, lh: 1.4, font: 'sansB', color: o.dark ? C.mint : C.accent, align: o.align, mb: o.mb ?? 12 });
  const small = (txt, o = {}) => t(txt, { size: 16, msize: 15, lh: 1.45, color: o.dark ? C.darkMuted : C.ink2, align: o.align || 'center', mt: 10, mb: o.mb ?? 8 });

  function btn(text, url, o = {}) {
    const ghost = o.variant === 'ghost', second = o.variant === 'secondary';
    const fg = ghost ? (o.dark ? C.darkInk : C.ink) : second ? C.accent : C.white;
    const bgc = ghost ? 'rgba(0, 0, 0, 0)' : second ? C.white : C.accent;
    const bd = ghost ? (o.dark ? 'rgba(247, 246, 241, 0.45)' : C.line) : C.accent;
    const size = ghost ? 17 : 20;
    return mk('Button', {
      text: nb(text), subText: '', action: 'openUrl', redirectionType: 'customUrl', linkUrl: url,
      width: o.full ? '100%' : 'auto', mobileWidth: '100%', alignSelf: o.align || 'center', mobileAlignSelf: 'center',
      background: bgc, mobileBackground: bgc, textColor: fg, mobileTextColor: fg,
      textFontSize: size, mobileTextFontSize: ghost ? 16 : 18, lineHeight: Math.round(size * 1.25),
      ...font(ghost ? 'sans' : 'sansB', 'text'), ...font(ghost ? 'sans' : 'sansB', 'mobileText'),
      padding: ghost ? p(13, 26) : p(20, 40), mobilePadding: ghost ? p(13, 18) : p(19, 20),
      border: border(2, bd), boxShadow: ghost || second ? 'none' : '0px 8px 20px -10px rgba(31, 94, 58, 0.75)', mobileBoxShadow: ghost || second ? 'none' : '0px 8px 20px -10px rgba(31, 94, 58, 0.75)',
      subTextColor: 'rgba(255, 255, 255, 0.8)', subTextFontSize: 14, mobileSubTextFontSize: 13,
      margin: m(o.mt ?? 8, o.mb ?? 4), mobileMargin: m(o.mt ?? 8, o.mb ?? 4),
    });
  }
  function img(key, o = {}) {
    const [fileId, ratio] = typeof key === 'string' ? FILES[key] : key;
    return mk('Image', {
      fileId, ratio, mobileRatio: ratio, width: o.width || 240, mobileWidth: o.mwidth || o.width || 240,
      alignSelf: o.align || 'center', mobileAlignSelf: o.align || 'center', alt: o.alt || '',
      margin: m(o.mt || 0, o.mb || 0), mobileMargin: m(o.mt || 0, o.mb || 0),
    });
  }
  const vid = (url, o = {}) => mk('Video', { url, controls: true, border: { radius: 4 }, margin: m(o.mt ?? 12, o.mb ?? 20), mobileMargin: m(o.mt ?? 8, o.mb ?? 16) });
  function list(items, o = {}) {
    const fg = o.dark ? C.darkInk : C.ink;
    return mk('BulletList', {
      content: '<ul>' + items.map((i) => `<li><span style="color: ${fg}">${nb(i)}</span></li>`).join('') + '</ul>',
      textAlign: 'left', fontSize: 20, mobileFontSize: 18, lineHeight: 32, mobileLineHeight: 28,
      ...font('sans'), ...font('sans', 'mobile'),
      listItemIconColor: o.iconColor || (o.cross ? 'rgb(150, 156, 166)' : (o.dark ? C.mint : C.accent)),
      listItemIconSize: 16, listItemClassName: o.icon || (o.cross ? 'fas fa-times' : 'fas fa-check'),
      padding: p(0), margin: m(o.mt || 0, o.mb ?? 16), mobileMargin: m(o.mt || 0, o.mb ?? 14),
    });
  }
  function faq(items) {
    const kids = items.map(([q, a], i) => mk('FaqItem', { title: nb(q), isStylesFramework: true, creationItemNumber: i + 1 }, [t(a, { size: 18, msize: 17, color: C.ink2, mb: 0 })]));
    return mk('Faq', {
      showIcons: true, mobileShowIcons: true, iconClassName: 'fas fa-plus', iconColor: C.accent,
      backgroundColor: C.white, titleColor: C.ink, titleFontSize: 20, mobileTitleFontSize: 18, ...font('sansB', 'title'),
      spaceBetweenItems: 12, itemBorderRadius: 4,
      padding: p(0), mobilePadding: p(0), itemPadding: p(20, 22, 20, 24), mobileItemPadding: p(16, 16, 16, 18),
    }, kids);
  }
  // Conserve un élément existant et tous ses descendants (mêmes identifiants), avec des réglages modifiés.
  function keepTree(old, id, patch = {}) {
    const walk = (i) => { E[i] = { ...old[i] }; (old[i].childIds || []).forEach(walk); };
    walk(id); Object.assign(E[id], patch); return id;
  }
  // Habille un bouton existant (formulaire, étape suivante) avec le style RunCare sans toucher à son action.
  function restyleBtn(old, id, text, o = {}) {
    const tmp = btn(text, '#', o), style = { ...E[tmp] }; delete E[tmp];
    ['id', 'htmlAttrId', 'type', 'action', 'linkUrl', 'redirectionType', 'parentId'].forEach((k) => delete style[k]);
    return keepTree(old, id, style);
  }
  const hidden = (id) => { E[id].appearance = { desktop: false, mobile: false }; return id; };
  const keep = (old) => { const id = uid(); E[id] = { ...old, id, htmlAttrId: `${old.type.toLowerCase()}-${id.slice(0, 8)}` }; delete E[id].childIds; return id; };

  function store() {
    const els = [document.body, ...document.body.querySelectorAll('div')].slice(0, 50);
    for (const el of els) {
      const k = Object.keys(el).find((k) => k.startsWith('__reactContainer') || k.startsWith('__reactFiber'));
      if (!k) continue;
      let f = el[k]; if (f && f.stateNode && f.stateNode.current) f = f.stateNode.current;
      const stack = [f]; let n = 0;
      while (stack.length && n < 20000) { const x = stack.pop(); n++; if (!x) continue; const pr = x.memoizedProps; if (pr && pr.store && pr.store.getState) return pr.store; if (x.child) stack.push(x.child); if (x.sibling) stack.push(x.sibling); }
    }
    return null;
  }
  const S = () => window.__cs || (window.__cs = store());
  const page = () => S().getState().page.present;
  function begin() { E = {}; return page().entities; }
  // Remplace tout le contenu de la page par les sections fournies (le Body et les popups sont conservés).
  function apply(sections, o = {}) {
    // systeme.io ne publie que les polices référencées par un élément (fontFileId) : un texte masqué en
    // Fraunces italique fait charger l'italique utilisée dans les spans.
    if (Object.values(E).some((e) => (e.content || '').includes(F.serifI[0]))) {
      const first = E[sections[0]], firstCol = E[E[first.childIds[0]].childIds[0]];
      const id = hidden(t('NE PAS SUPPRIMER (texte masqué) : il fait charger la police Fraunces italique utilisée dans les titres de la page.', { font: 'serifI', size: 10, mb: 0 }));
      E[id].parentId = firstCol.id; firstCol.childIds.push(id);
    }
    const s = S(), cur = page().entities;
    const body = Object.values(cur).find((e) => e.type === 'Body');
    const keepIds = new Set();
    const mark = (id) => { keepIds.add(id); (cur[id].childIds || []).forEach(mark); };
    Object.values(cur).filter((e) => e.type === 'Popup' || e.parentId === undefined && e.type !== 'Body').forEach((e) => mark(e.id));
    const out = {};
    keepIds.forEach((id) => { out[id] = cur[id]; });
    Object.assign(out, E);
    out[body.id] = { ...body, childIds: sections, backgroundColor: o.bodyBg || C.bg, background: {} };
    sections.forEach((id) => { out[id].parentId = body.id; });
    const uf = s.getState().files.userFiles, pf = s.getState().files.pageFiles;
    const need = new Set([F.serif[1], F.serifI[1], F.sans[1], F.sansB[1]]);
    Object.values(E).forEach((e) => { if (e.fileId) need.add(e.fileId); });
    need.forEach((id) => { if (!pf[id] && uf[id]) s.dispatch({ type: 'ADD_FILE_TO_PAGE_FILES', payload: uf[id] }); });
    s.dispatch({
      type: 'UPDATE_PAGE_SETTINGS', payload: {
        ...page().globalSettings, fontFamily: F.sans[0], fontFileId: F.sans[1], fontStyle: 'normal', fontWeight: '400',
        headingFontFamily: F.serif[0], headingFontFileId: F.serif[1], headingColor: C.ink, textColor: C.ink, linkColor: C.accent,
      },
    });
    s.dispatch({ type: 'UPDATE_ENTITIES', payload: out });
    return { entities: Object.keys(out).length, missing: [...need].filter((id) => !uf[id]) };
  }

  return { nb, C, F, FILES, TIDY_APPEL, TIDY_BILAN, S, page, begin, apply, sec, row, col, box, h, t, eyebrow, small, btn, img, vid, list, faq, hidden, keep, keepTree, restyleBtn, mk, p, m, border };
})();
