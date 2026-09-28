/* @ds-bundle: {"format":4,"namespace":"DookieDogsDesignSystem_0a43c6","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"ServiceCard","sourcePath":"components/marketing/ServiceCard.jsx"},{"name":"StepCard","sourcePath":"components/marketing/StepCard.jsx"},{"name":"TestimonialCard","sourcePath":"components/marketing/TestimonialCard.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"e114ab81d7b8","components/core/Button.jsx":"333aa9df6ff8","components/core/Card.jsx":"70f9261935a8","components/core/Icon.jsx":"320d372186f9","components/core/IconButton.jsx":"f91b012af3a4","components/core/Input.jsx":"951ac780a7bd","components/marketing/ServiceCard.jsx":"d7c30d328e94","components/marketing/StepCard.jsx":"abf56c0d7068","components/marketing/TestimonialCard.jsx":"81ae5b367c2e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DookieDogsDesignSystem_0a43c6 = window.DookieDogsDesignSystem_0a43c6 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small emphatic label. Used for "Most Popular", "Spots Available",
 * "#1", proof chips. `variant`: 'yellow' | 'ink' | 'outline' | 'soft'.
 */
function Badge({
  children,
  variant = 'yellow',
  uppercase = true,
  style = {},
  ...rest
}) {
  const variants = {
    yellow: {
      background: 'var(--dd-yellow)',
      color: 'var(--dd-black)',
      border: '2px solid var(--dd-black)'
    },
    ink: {
      background: 'var(--dd-ink)',
      color: 'var(--dd-white)',
      border: '2px solid var(--dd-ink)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--dd-ink)',
      border: '2px solid var(--dd-ink)'
    },
    soft: {
      background: 'var(--dd-yellow-wash)',
      color: 'var(--dd-ink)',
      border: '2px solid var(--dd-yellow-soft)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
      fontFamily: 'var(--font-text)',
      fontWeight: 800,
      fontSize: '0.75rem',
      letterSpacing: uppercase ? '0.08em' : '0.01em',
      textTransform: uppercase ? 'uppercase' : 'none',
      lineHeight: 1,
      padding: '0.4rem 0.7rem',
      borderRadius: 'var(--r-pill)',
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Dookie Dogs Button.
 * Bold, friendly, action-first. Yellow = primary CTA (black text),
 * ink = secondary, outline + ghost for lower emphasis.
 * `sticker` gives the signature hard-offset shadow that "presses down".
 */
function Button({
  children,
  variant = 'primary',
  // 'primary' | 'ink' | 'outline' | 'ghost'
  size = 'md',
  // 'sm' | 'md' | 'lg'
  sticker = false,
  block = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  disabled = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      fontSize: '0.9375rem',
      padding: '0.5rem 1rem',
      gap: '0.4rem'
    },
    md: {
      fontSize: '1.0625rem',
      padding: '0.75rem 1.5rem',
      gap: '0.5rem'
    },
    lg: {
      fontSize: '1.1875rem',
      padding: '1rem 2rem',
      gap: '0.6rem'
    }
  };
  const variants = {
    primary: {
      background: 'var(--dd-yellow)',
      color: 'var(--dd-black)',
      border: '2px solid var(--dd-black)'
    },
    ink: {
      background: 'var(--dd-ink)',
      color: 'var(--dd-white)',
      border: '2px solid var(--dd-ink)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--dd-ink)',
      border: '2px solid var(--dd-ink)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--dd-ink)',
      border: '2px solid transparent'
    }
  };
  const base = {
    display: block ? 'flex' : 'inline-flex',
    width: block ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizes[size].gap,
    fontFamily: 'var(--font-text)',
    fontWeight: 800,
    letterSpacing: '0.01em',
    lineHeight: 1,
    textDecoration: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: 'var(--r-pill)',
    transition: 'transform var(--dur) var(--ease-bounce), background var(--dur), box-shadow var(--dur), filter var(--dur)',
    boxShadow: sticker ? '4px 4px 0 var(--dd-ink)' : 'none',
    opacity: disabled ? 0.45 : 1,
    ...sizes[size],
    ...variants[variant],
    ...style
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `dd-btn dd-btn--${variant}${sticker ? ' dd-btn--sticker' : ''}`,
    style: base,
    disabled: as === 'button' ? disabled : undefined
  }, rest), iconLeft, /*#__PURE__*/React.createElement("span", null, children), iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — warm surface container. `tone`: 'surface' | 'sand' | 'yellow' | 'ink'.
 * `elevation`: 'flat' | 'sm' | 'md' | 'lg' | 'sticker'. `interactive` adds hover-lift.
 */
function Card({
  children,
  tone = 'surface',
  elevation = 'md',
  interactive = false,
  radius = 'var(--r-lg)',
  bordered = false,
  style = {},
  ...rest
}) {
  const tones = {
    surface: {
      background: 'var(--dd-white)',
      color: 'var(--dd-ink-2)'
    },
    sand: {
      background: 'var(--dd-sand)',
      color: 'var(--dd-ink-2)'
    },
    yellow: {
      background: 'var(--dd-yellow)',
      color: 'var(--dd-black)'
    },
    ink: {
      background: 'var(--dd-ink)',
      color: 'var(--dd-white)'
    }
  };
  const elevations = {
    flat: 'none',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    sticker: '4px 4px 0 var(--dd-ink)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `dd-card${interactive ? ' dd-card--link' : ''}`,
    style: {
      borderRadius: radius,
      padding: 'var(--sp-5)',
      boxShadow: elevations[elevation],
      border: bordered ? '2px solid var(--dd-ink)' : '1px solid var(--border-hairline)',
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Icon — thin wrapper over the Lucide icon set (SUBSTITUTION: brand has no
 * proprietary icon set). Renders an <i data-lucide> that lucide.createIcons()
 * upgrades to an SVG. Load https://unpkg.com/lucide@latest and call
 * lucide.createIcons() after mount.
 */
function Icon({
  name,
  size = 24,
  stroke = 2,
  color = 'currentColor',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("i", _extends({
    "data-lucide": name,
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      color,
      strokeWidth: stroke,
      verticalAlign: 'middle',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — round tap target for a single Lucide icon.
 * `variant`: 'ghost' (default) | 'solid' (yellow) | 'ink'.
 */
function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 44,
  style = {},
  ...rest
}) {
  const variants = {
    ghost: {
      background: 'transparent',
      color: 'var(--dd-ink)'
    },
    solid: {
      background: 'var(--dd-yellow)',
      color: 'var(--dd-black)',
      border: '2px solid var(--dd-black)'
    },
    ink: {
      background: 'var(--dd-ink)',
      color: 'var(--dd-white)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    className: `dd-iconbtn${variant === 'solid' ? ' dd-iconbtn--solid' : ''}`,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: 'var(--r-pill)',
      border: 'none',
      cursor: 'pointer',
      ...variants[variant],
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.5)
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — labelled text field. Warm hairline border, yellow focus glow.
 * Pass `label`, `hint`, `error`; any input props via ...rest.
 */
function Input({
  label,
  hint,
  error,
  id,
  style = {},
  ...rest
}) {
  const inputId = id || (label ? `dd-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.35rem',
      fontFamily: 'var(--font-text)'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: '0.8125rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      color: 'var(--dd-ink-2)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    className: "dd-input",
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: '1.0625rem',
      color: 'var(--dd-ink)',
      background: 'var(--dd-white)',
      border: `2px solid ${error ? '#C0392B' : 'var(--border-hairline)'}`,
      borderRadius: 'var(--r-md)',
      padding: '0.7rem 0.9rem',
      width: '100%',
      boxSizing: 'border-box',
      ...style
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.8125rem',
      color: error ? '#C0392B' : 'var(--dd-ink-3)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ServiceCard.jsx
try { (() => {
/**
 * ServiceCard — a pricing/plan tier (Weekly / Bi-Weekly / Custom).
 * `featured` flips it to the yellow "Most Popular" treatment.
 */
function ServiceCard({
  name,
  tagline,
  price,
  cadence,
  bullets = [],
  featured = false,
  badge,
  ctaLabel = 'Get Started',
  onCta,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--r-xl)',
      padding: 'var(--sp-6)',
      background: featured ? 'var(--dd-yellow)' : 'var(--dd-white)',
      color: featured ? 'var(--dd-black)' : 'var(--dd-ink-2)',
      border: featured ? '2px solid var(--dd-black)' : '1px solid var(--border-hairline)',
      boxShadow: featured ? '6px 6px 0 var(--dd-ink)' : 'var(--shadow-md)',
      position: 'relative',
      ...style
    }
  }, (badge || featured) && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -14,
      left: 24
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    variant: featured ? 'ink' : 'yellow'
  }, badge || 'Most Popular')), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: '2rem',
      lineHeight: 1,
      margin: '0.25rem 0 0.5rem',
      color: 'var(--dd-ink)'
    }
  }, name), price && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '0.35rem',
      marginBottom: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '2.5rem',
      color: 'var(--dd-ink)'
    }
  }, price), cadence && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      opacity: 0.75
    }
  }, cadence)), tagline && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: '1rem',
      lineHeight: 1.55,
      margin: '0 0 1.25rem'
    }
  }, tagline), bullets.length > 0 && /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem',
      fontFamily: 'var(--font-text)'
    }
  }, bullets.map((b, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: '0.6rem',
      alignItems: 'flex-start',
      fontSize: '0.95rem'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    style: {
      width: 18,
      height: 18,
      marginTop: 2,
      color: featured ? 'var(--dd-black)' : 'var(--dd-grass)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", null, b)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: featured ? 'ink' : 'primary',
    block: true,
    sticker: !featured,
    onClick: onCta
  }, ctaLabel)));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/StepCard.jsx
try { (() => {
/**
 * StepCard — one numbered step in a "How It Works" sequence.
 * Big yellow number chip + Lucide icon + title + copy.
 */
function StepCard({
  step,
  icon,
  title,
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.9rem',
      textAlign: 'center',
      alignItems: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 96,
      height: 96,
      borderRadius: 'var(--r-pill)',
      background: 'var(--dd-yellow)',
      border: '2px solid var(--dd-black)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '4px 4px 0 var(--dd-ink)'
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 40,
      height: 40,
      color: 'var(--dd-black)',
      strokeWidth: 2
    }
  }), step != null && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -10,
      right: -10,
      width: 32,
      height: 32,
      borderRadius: 'var(--r-pill)',
      background: 'var(--dd-ink)',
      color: 'var(--dd-white)',
      fontFamily: 'var(--font-display)',
      fontSize: '1.1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, step)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: '1.5rem',
      lineHeight: 1.05,
      margin: 0,
      color: 'var(--dd-ink)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: '1rem',
      lineHeight: 1.55,
      margin: 0,
      maxWidth: 300,
      color: 'var(--dd-ink-2)'
    }
  }, children));
}
Object.assign(__ds_scope, { StepCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/StepCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/TestimonialCard.jsx
try { (() => {
/**
 * TestimonialCard — a customer quote with name/location + star rating.
 */
function TestimonialCard({
  quote,
  name,
  location,
  stars = 5,
  tone = 'surface',
  style = {}
}) {
  const dark = tone === 'ink';
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      borderRadius: 'var(--r-lg)',
      padding: 'var(--sp-6)',
      background: dark ? 'var(--dd-ink)' : 'var(--dd-white)',
      color: dark ? 'var(--dd-white)' : 'var(--dd-ink-2)',
      border: dark ? 'none' : '1px solid var(--border-hairline)',
      boxShadow: dark ? 'none' : 'var(--shadow-md)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-label": `${stars} out of 5 stars`,
    style: {
      display: 'flex',
      gap: '2px'
    }
  }, Array.from({
    length: 5
  }).map((_, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    "data-lucide": "star",
    style: {
      width: 20,
      height: 20,
      color: i < stars ? 'var(--dd-star)' : 'var(--dd-line-strong)',
      fill: i < stars ? 'var(--dd-star)' : 'none'
    }
  }))), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-text)',
      fontSize: '1.125rem',
      lineHeight: 1.5,
      fontWeight: 500
    }
  }, "\u201C", quote, "\u201D"), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: '0.9rem',
      fontWeight: 700,
      marginTop: 'auto'
    }
  }, name, location && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      opacity: 0.7
    }
  }, `  ·  ${location}`)));
}
Object.assign(__ds_scope, { TestimonialCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/TestimonialCard.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.StepCard = __ds_scope.StepCard;

__ds_ns.TestimonialCard = __ds_scope.TestimonialCard;

})();
