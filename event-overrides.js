(function () {
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function textWithBreaks(value) {
    return escapeHtml(value).replace(/\n/g, '<br class="wixui-rich-text__text">');
  }

  function setHtml(id, html) {
    var el = document.getElementById(id);
    if (el) {
      el.innerHTML = html;
    }
  }

  function setTitleBlock(id, text, fontClass, useBoldSpan) {
    var content = useBoldSpan
      ? '<span style="font-weight:bold;" class="wixui-rich-text__text">' + escapeHtml(text) + "</span>"
      : '<span class="wixui-rich-text__text">' + escapeHtml(text) + "</span>";
    setHtml(id, '<h2 class="' + fontClass + ' wixui-rich-text__text">' + content + "</h2>");
  }

  function setParagraphBlock(id, text) {
    setHtml(
      id,
      '<p class="font_8 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        textWithBreaks(text) +
        "</span></p>"
    );
  }

  function updateButtons(config) {
    ["#comp-m7xb380k a", "#comp-m7xce3ra a"].forEach(function (selector) {
      var link = document.querySelector(selector);
      if (!link) {
        return;
      }
      link.href = config.buttonUrl;
      link.setAttribute("aria-label", config.buttonLabel);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      var label = link.querySelector(".wixui-button__label, .w4Vxx6, .gIbEBg");
      if (label) {
        label.textContent = config.buttonLabel;
      }
    });
  }

  function updateFooterIdentity(config) {
    var contactBlock = document.getElementById("comp-m7x93b201_r_comp-m5ot5s24");
    if (contactBlock) {
      contactBlock.innerHTML =
        '<p class="font_8 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        escapeHtml(config.churchName) +
        '</span></p><p class="font_8 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        escapeHtml(config.churchAddress) +
        "</span></p>";
    }

    var copyrightBlock = document.getElementById("comp-m7x93b201_r_comp-m7xgo3hy");
    if (copyrightBlock) {
      copyrightBlock.innerHTML =
        '<p class="font_9 wixui-rich-text__text"><span class="wixui-rich-text__text">&copy; ' +
        new Date().getFullYear() +
        " " +
        escapeHtml(config.churchName).toUpperCase() +
        "&nbsp;</span></p>";
    }
  }

  function updateImageSlot(selector, src, alt) {
    var image = document.querySelector(selector + " img");
    if (image) {
      image.src = src;
      if (alt) {
        image.alt = alt;
      }
    }

    var source = document.querySelector(selector + " source");
    if (source) {
      source.srcset = src;
    }
  }

  function updateImages(config) {
    if (!config.images) {
      return;
    }

    updateImageSlot("#img_comp-m7x93b1811", config.images.heroBackground, "Alpha hero");
    updateImageSlot("#img-comp-m7xai1gu6", config.images.introImage1, "Alpha intro 1");
    updateImageSlot("#img-comp-m7xahkwm", config.images.introImage2, "Alpha intro 2");
    updateImageSlot("#img-comp-m7xahqd3", config.images.introImage3, "Alpha intro 3");
    updateImageSlot("#img-comp-m7xbkf0f__item1", config.images.stepImage1, "Alpha step 1");
    updateImageSlot(
      "#img-comp-m7xbkf0f__item-j9ples3e",
      config.images.stepImage2,
      "Alpha step 2"
    );
    updateImageSlot(
      "#img-comp-m7xbkf0f__item-j9plerjk",
      config.images.stepImage3,
      "Alpha step 3"
    );
    updateImageSlot(
      "#img-comp-m7xbkf0f__item-m7xbjbya",
      config.images.stepImage4,
      "Alpha step 4"
    );
    updateImageSlot("#img_comp-m7xc4yop", config.images.bottomBanner, "Alpha banner");
  }

  function renderLinks(links, className) {
    return (links || [])
      .map(function (link) {
        return (
          '<a class="' +
          className +
          '" href="' +
          escapeHtml(link.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          escapeHtml(link.label) +
          "</a>"
        );
      })
      .join("");
  }

  function applyPageBranding(config) {
    if (config.pageTitle) {
      document.title = config.pageTitle;
    }

    var faviconUrl = config.faviconUrl || config.logoUrl;
    if (!faviconUrl) {
      return;
    }

    var iconSelectors = [
      'link[rel="icon"]',
      'link[rel="shortcut icon"]',
      'link[rel="apple-touch-icon"]',
    ];

    iconSelectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (node) {
        node.setAttribute("href", faviconUrl);
      });
    });
  }

  function applyBrandTheme(config) {
    var theme = config.theme || {};
    var css = [
      ":root{",
      "--sp-surface:" + (theme.surface || "#161311") + ";",
      "--sp-surface-soft:" + (theme.surfaceSoft || "#231d19") + ";",
      "--sp-text:" + (theme.text || "#f7efe8") + ";",
      "--sp-muted:" + (theme.muted || "#d8c5b3") + ";",
      "--sp-accent:" + (theme.accent || "#e26f3f") + ";",
      "--sp-accent-hover:" + (theme.accentHover || "#f08b5e") + ";",
      "--sp-border:" + (theme.border || "#3a2b20") + ";",
      "}",
      ".sp-header{position:sticky;top:0;z-index:9999;background:rgba(22,19,17,.95);backdrop-filter:blur(8px);border-bottom:1px solid var(--sp-border);}",
      ".sp-header-inner{max-width:1200px;margin:0 auto;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;gap:20px;}",
      ".sp-header-right{display:flex;align-items:center;gap:10px;}",
      ".sp-brand{display:flex;align-items:center;gap:12px;color:var(--sp-text)!important;text-decoration:none!important;font:600 14px/1.2 Arial,sans-serif;letter-spacing:.03em;text-transform:uppercase;}",
      ".sp-brand img{height:38px;width:auto;display:block;filter:brightness(1.05);}",
      ".sp-brand span{display:inline;}",
      ".sp-nav{display:flex;flex-wrap:wrap;gap:14px;justify-content:flex-end;}",
      ".sp-header-sponsor{display:inline-flex;align-items:center;gap:8px;padding:6px 10px;border:1px solid var(--sp-border);border-radius:999px;background:rgba(255,255,255,.03);color:var(--sp-text)!important;text-decoration:none!important;font:600 11px/1 Arial,sans-serif;letter-spacing:.04em;white-space:nowrap;}",
      ".sp-header-sponsor img{height:16px;width:16px;object-fit:contain;border-radius:3px;}",
      ".sp-burger{display:none;align-items:center;justify-content:center;width:38px;height:38px;border-radius:10px;border:1px solid var(--sp-border);background:transparent;color:var(--sp-text);font:700 20px/1 Arial,sans-serif;cursor:pointer;}",
      ".sp-mobile-backdrop{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9997;}",
      ".sp-mobile-menu{display:none;position:absolute;top:100%;left:0;right:0;background:var(--sp-surface);border-bottom:1px solid var(--sp-border);padding:8px 14px 14px;z-index:9998;}",
      ".sp-mobile-link{display:block;padding:12px 6px;border-bottom:1px solid var(--sp-border);color:var(--sp-text)!important;text-decoration:none!important;font:700 12px/1 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;}",
      ".sp-mobile-link:last-child{border-bottom:0;}",
      ".sp-nav-link{color:var(--sp-text)!important;text-decoration:none!important;font:600 12px/1 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;padding:7px 10px;border-radius:999px;border:1px solid transparent;}",
      ".sp-nav-link:hover{background:var(--sp-accent);border-color:var(--sp-accent);color:#120c08!important;}",
      "#SITE_HEADER-placeholder{display:none!important;height:0!important;min-height:0!important;}",
      "#SITE_HEADER,#SITE_HEADER_WRAPPER,#comp-m7x93b2112,#comp-m7x93b2112-pinned-layer{height:auto!important;min-height:0!important;}",
      "#comp-m7x93b2112 .sp-header{position:relative!important;}",
      ".sp-try-section{background:#111;padding:56px 20px 64px;color:var(--sp-text);}",
      ".sp-try-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1.15fr 1fr;gap:30px;align-items:start;}",
      ".sp-try-media{position:relative;z-index:1;border-radius:12px;overflow:hidden;background:#000;}",
      ".sp-try-media img,.sp-try-media iframe{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border:0;}",
      ".sp-try-copy{position:relative;z-index:3;pointer-events:auto;}",
      ".sp-try-overlay{position:absolute;inset:0;z-index:2;display:flex;align-items:center;justify-content:center;padding:20px;text-align:center;pointer-events:none;color:#f72518;font:800 clamp(28px,5vw,72px)/0.95 Arial,sans-serif;letter-spacing:.01em;text-transform:uppercase;text-shadow:0 2px 10px rgba(0,0,0,.4);}",
      ".sp-try-heading{margin:0 0 10px;font:700 14px/1.2 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--sp-muted);}",
      ".sp-try-intro{margin:0 0 14px;font:400 20px/1.45 Arial,sans-serif;color:var(--sp-text);}",
      ".sp-try-questions{margin:0 0 14px;font:700 14px/1.6 Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:var(--sp-muted);}",
      ".sp-try-body{margin:0;font:400 16px/1.65 Arial,sans-serif;color:var(--sp-text);}",
      ".sp-try-link{display:inline-block;position:relative;z-index:4;pointer-events:auto;margin-top:20px;padding:11px 16px;border-radius:999px;background:var(--sp-accent);color:#1a110a!important;font:700 12px/1 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;text-decoration:none!important;}",
      ".sp-try-link:hover{background:var(--sp-accent-hover);}",
      ".sp-footer{background:var(--sp-surface);color:var(--sp-text);padding:42px 20px 28px;border-top:1px solid var(--sp-border);}",
      ".sp-footer-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.2fr 2fr;gap:26px;}",
      ".sp-footer h4{margin:0 0 10px;font:700 14px/1.2 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--sp-muted);}",
      ".sp-footer p,.sp-footer a{font:400 14px/1.5 Arial,sans-serif;color:var(--sp-text);text-decoration:none;}",
      ".sp-footer-links{display:grid;grid-template-columns:repeat(2,minmax(140px,1fr));gap:8px 16px;}",
      ".sp-footer-link:hover,.sp-social-link:hover{color:var(--sp-accent);}",
      ".sp-social{display:flex;gap:12px;flex-wrap:wrap;margin-top:12px;}",
      ".sp-bottom{max-width:1200px;margin:20px auto 0;padding-top:12px;border-top:1px solid var(--sp-border);font:400 12px/1.4 Arial,sans-serif;color:var(--sp-muted);}",
      ".sp-bottom-content{display:flex;align-items:center;justify-content:space-between;gap:16px;}",
      ".sp-sponsor{display:flex;align-items:center;gap:10px;justify-content:flex-end;color:var(--sp-muted);background:rgba(255,255,255,.03);border:1px solid var(--sp-border);border-radius:999px;padding:7px 10px;}",
      ".sp-sponsor-label{font:400 12px/1.2 Arial,sans-serif;letter-spacing:.03em;}",
      ".sp-sponsor a{display:inline-flex;align-items:center;gap:8px;color:var(--sp-text)!important;text-decoration:none!important;font:600 12px/1.2 Arial,sans-serif;}",
      ".sp-sponsor img{height:20px;width:20px;display:block;object-fit:contain;border-radius:4px;}",
      "#comp-m7xb380k a,#comp-m7xce3ra a{background:var(--sp-accent)!important;border-color:var(--sp-accent)!important;color:#1a110a!important;}",
      "#comp-m7xb380k a:hover,#comp-m7xce3ra a:hover{background:var(--sp-accent-hover)!important;border-color:var(--sp-accent-hover)!important;}",
      "#comp-mclebto0{display:none!important;}",
      "@media (max-width:860px){.sp-footer-inner{grid-template-columns:1fr}.sp-header-inner{padding:10px 14px;justify-content:space-between}.sp-brand img{height:30px}.sp-brand span{display:none}.sp-nav{display:none!important}.sp-header-sponsor{display:none}.sp-burger{display:inline-flex}.sp-mobile-menu{display:block}.sp-mobile-backdrop{display:block;opacity:0;pointer-events:none;transition:opacity .2s}.sp-header.is-open .sp-mobile-backdrop{opacity:1;pointer-events:auto}.sp-header:not(.is-open) .sp-mobile-menu{display:none}.sp-header.is-open .sp-mobile-menu{display:block}.sp-nav-link{font-size:11px}.sp-try-inner{grid-template-columns:1fr;gap:18px}.sp-try-section{padding:34px 16px 40px}.sp-try-intro{font-size:18px}.sp-try-overlay{font-size:clamp(22px,9vw,40px)}.sp-bottom-content{flex-direction:column;align-items:flex-start}.sp-sponsor{justify-content:flex-start}}",
    ].join("");

    var style = document.getElementById("sp-theme-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "sp-theme-style";
      document.head.appendChild(style);
    }
    style.textContent = css;
  }

  function renderTrySection(config) {
    var trySection = config.trySection;
    var existing = document.getElementById("sp-try-section");
    if (existing) {
      existing.remove();
    }

    var anchor = document.getElementById("comp-m7xcak5j");
    if (!anchor || !trySection || trySection.enabled === false) {
      return;
    }

    var legacySection = document.getElementById("comp-mclebto0");
    if (legacySection) {
      legacySection.style.display = "none";
    }

    var mediaMarkup = "";
    if (trySection.videoEmbedUrl) {
      mediaMarkup =
        '<iframe src="' +
        escapeHtml(trySection.videoEmbedUrl) +
        '" title="Try Alpha video" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    } else {
      mediaMarkup =
        '<img src="' +
        escapeHtml(trySection.mediaImageUrl || "") +
        '" alt="Try Alpha">';
    }

    var section = document.createElement("section");
    section.id = "sp-try-section";
    section.className = "sp-try-section";
    var overlayMarkup = trySection.overlayText
      ? '<div class="sp-try-overlay">' + escapeHtml(trySection.overlayText) + "</div>"
      : "";

    section.innerHTML =
      '<div class="sp-try-inner">' +
      '<div class="sp-try-media">' +
      mediaMarkup +
      overlayMarkup +
      "</div>" +
      '<div class="sp-try-copy">' +
      '<h3 class="sp-try-heading">' +
      escapeHtml(trySection.heading || "Try Alpha") +
      "</h3>" +
      '<p class="sp-try-intro">' +
      escapeHtml(trySection.intro || "") +
      "</p>" +
      '<p class="sp-try-questions">' +
      escapeHtml(trySection.questions || "") +
      "</p>" +
      '<p class="sp-try-body">' +
      escapeHtml(trySection.body || "") +
      "</p>" +
      '<a class="sp-try-link" href="' +
      escapeHtml(trySection.buttonUrl || config.buttonUrl || "https://www.alpha.org.au/try") +
      '" target="_blank" rel="noopener noreferrer">' +
      escapeHtml(trySection.buttonLabel || config.buttonLabel || "Find an Alpha") +
      "</a></div></div>";

    anchor.parentNode.insertBefore(section, anchor);
  }

  function replaceHeaderFooter(config) {
    var header = document.getElementById("comp-m7x93b2112");
    var headerLinks = (config.headerNav || []).filter(function (link) {
      return String(link.label || "").trim().toUpperCase() !== "ALPHA";
    });
    var headerSponsorMarkup = "";
    if (config.sponsor && config.sponsor.url) {
      var headerSponsorIcon = config.sponsor.logoUrl
        ? '<img src="' +
          escapeHtml(config.sponsor.logoUrl) +
          '" alt="" aria-hidden="true" onerror="this.style.display=\'none\'">'
        : "";
      headerSponsorMarkup =
        '<a class="sp-header-sponsor" href="' +
        escapeHtml(config.sponsor.url) +
        '" target="_blank" rel="noopener noreferrer">' +
        headerSponsorIcon +
        "<span>" +
        escapeHtml(config.sponsor.name || "Sponsor") +
        "</span></a>";
    }
    if (header) {
      header.innerHTML =
        '<div class="sp-header"><div class="sp-header-inner">' +
        '<a class="sp-brand" href="' +
        escapeHtml(config.churchWebsite) +
        '" target="_blank" rel="noopener noreferrer">' +
        '<img src="' +
        escapeHtml(config.logoUrl) +
        '" alt="' +
        escapeHtml(config.churchName) +
        ' logo">' +
        "<span>" +
        escapeHtml(config.churchName) +
        "</span></a>" +
        '<div class="sp-header-right">' +
        '<button class="sp-burger" type="button" aria-label="Open menu" aria-expanded="false">&#9776;</button>' +
        '<nav class="sp-nav">' +
        renderLinks(headerLinks, "sp-nav-link") +
        "</nav>" +
        headerSponsorMarkup +
        "</div></div>" +
        '<div class="sp-mobile-backdrop" aria-hidden="true"></div>' +
        '<nav class="sp-mobile-menu" aria-label="Mobile menu">' +
        renderLinks(headerLinks, "sp-mobile-link") +
        "</nav></div>";
    }

    var footer = document.getElementById("comp-m7x93b201");
    if (footer) {
      var sponsorMarkup = "";
      if (config.sponsor && config.sponsor.url) {
        var sponsorIcon = config.sponsor.logoUrl
          ? '<img src="' +
            escapeHtml(config.sponsor.logoUrl) +
            '" alt="" aria-hidden="true" onerror="this.style.display=\'none\'">'
          : "";
        sponsorMarkup =
          '<div class="sp-sponsor">' +
          '<span class="sp-sponsor-label">' +
          escapeHtml(config.sponsor.label || "Sponsored by") +
          "</span>" +
          '<a href="' +
          escapeHtml(config.sponsor.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          sponsorIcon +
          "<span>" +
          escapeHtml(config.sponsor.name || "") +
          "</span></a></div>";
      }

      footer.innerHTML =
        '<footer class="sp-footer"><div class="sp-footer-inner">' +
        "<div>" +
        "<h4>St Philip's Anglican Cottesloe</h4>" +
        "<p>" +
        escapeHtml(config.churchAddress) +
        "</p>" +
        '<p><a href="tel:+61893851042">' +
        escapeHtml(config.churchPhone) +
        "</a></p>" +
        '<p><a href="mailto:' +
        escapeHtml(config.churchEmail) +
        '">' +
        escapeHtml(config.churchEmail) +
        "</a></p>" +
        '<div class="sp-social">' +
        renderLinks(config.socialLinks, "sp-social-link") +
        "</div>" +
        "</div>" +
        '<div><h4>Quick Links</h4><div class="sp-footer-links">' +
        renderLinks(config.footerLinks, "sp-footer-link") +
        "</div></div>" +
        '</div><div class="sp-bottom"><div class="sp-bottom-content"><span>&copy; ' +
        new Date().getFullYear() +
        " " +
        escapeHtml(config.churchName) +
        ". All rights reserved.</span>" +
        sponsorMarkup +
        "</div></div></footer>";
    }
  }

  function wireTrySectionButton(config) {
    var link = document.querySelector("#sp-try-section .sp-try-link");
    if (!link) {
      return;
    }
    var href = "https://stphilipsanglican.churchsuite.com/-/forms/xkbydkaa";
    link.href = href;
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    link.onclick = function (event) {
      event.preventDefault();
      event.stopPropagation();
      window.open(href, "_blank", "noopener,noreferrer");
    };
  }

  function setupMobileMenu() {
    var container = document.getElementById("comp-m7x93b2112");
    if (!container) {
      return;
    }
    var header = container.querySelector(".sp-header");
    var burger = container.querySelector(".sp-burger");
    var backdrop = container.querySelector(".sp-mobile-backdrop");
    var menuLinks = container.querySelectorAll(".sp-mobile-menu a");
    if (!header || !burger) {
      return;
    }

    function closeMenu() {
      header.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }

    function toggleMenu() {
      var open = !header.classList.contains("is-open");
      header.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    }

    burger.onclick = toggleMenu;
    if (backdrop) {
      backdrop.onclick = closeMenu;
    }
    menuLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  function applyEventConfig() {
    var config = window.EVENT_CONFIG;
    if (!config) {
      return;
    }

    applyPageBranding(config);

    setTitleBlock("comp-m7x93b1b8", config.heroTag, "font_3", false);
    setTitleBlock("comp-m7x9xgdb", config.heroInvite, "font_2", true);
    setHtml(
      "comp-m7x9y2ke",
      '<h2 class="font_2 wixui-rich-text__text">' + escapeHtml(config.heroSubheading) + "</h2>"
    );
    setHtml(
      "comp-m7x9y8g2",
      '<p class="font_8 wixui-rich-text__text">' +
        '<span class="wixui-rich-text__text">' +
        escapeHtml(config.introParagraph1) +
        "</span>" +
        '<span class="wixui-rich-text__text">' +
        escapeHtml(config.introParagraph2) +
        "</span>" +
        "</p>"
    );
    setHtml(
      "comp-m7x9yb2u",
      '<h2 class="font_2 wixui-rich-text__text">' + escapeHtml(config.launchHeading) + "</h2>"
    );
    setHtml(
      "comp-m7xa3bg0",
      '<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        escapeHtml(config.launchLine1) +
        "</span></h2>"
    );
    setHtml(
      "comp-m7xa46ue",
      '<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        escapeHtml(config.launchLine2) +
        "</span></h2>"
    );
    setHtml(
      "comp-m7xb8fnk",
      '<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        escapeHtml(config.howItWorksHeading) +
        "</span></h2>"
    );

    var stepTitleIds = [
      "comp-m7xblndi__item1",
      "comp-m7xblndi__item-j9ples3e",
      "comp-m7xblndi__item-j9plerjk",
      "comp-m7xblndi__item-m7xbjbya",
    ];
    var stepBodyIds = [
      "comp-m7xbnsld__item1",
      "comp-m7xbnsld__item-j9ples3e",
      "comp-m7xbnsld__item-j9plerjk",
      "comp-m7xbnsld__item-m7xbjbya",
    ];

    config.steps.slice(0, 4).forEach(function (step, index) {
      setHtml(
        stepTitleIds[index],
        '<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
          escapeHtml(step.title) +
          "</span></h2>"
      );
      if (index === 0) {
        setHtml(
          stepBodyIds[index],
          '<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
            escapeHtml(step.description) +
            "</span></h2>"
        );
      } else {
        setParagraphBlock(stepBodyIds[index], step.description);
      }
    });

    setHtml(
      "comp-m7xcas2w",
      '<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        escapeHtml(config.ctaSectionHeading) +
        "</span></h2>"
    );
    setHtml(
      "comp-m7xcbvkh",
      '<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        textWithBreaks(config.ctaBody) +
        "</span></h2>"
    );
    setHtml(
      "comp-m7xcdn51",
      '<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        escapeHtml(config.eventDateTime) +
        '<br class="wixui-rich-text__text">' +
        escapeHtml(config.eventLocation) +
        "</span></h2>"
    );
    setHtml(
      "comp-mcleq4kt",
      '<h3 class="font_3 wixui-rich-text__text">' + escapeHtml(config.footerHero) + "</h3>"
    );

    applyBrandTheme(config);
    renderTrySection(config);
    wireTrySectionButton(config);
    replaceHeaderFooter(config);
    setupMobileMenu();
    updateButtons(config);
    updateFooterIdentity(config);
    updateImages(config);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyEventConfig);
  } else {
    applyEventConfig();
  }
})();
