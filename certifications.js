const certificationAssets = {
  standard: './assets/certifications/gb-t-45165-2024-small-pressure-washer.pdf',
  inspectionPdf: './assets/certifications/inspection-report.pdf',
  isoPdf: './assets/certifications/panhiro-iso9001-certificate.pdf',
  standardCover: './assets/certifications/cover-gb-t-45165.png',
  inspectionCover: './assets/certifications/cover-inspection-report.png',
  isoCover: './assets/certifications/cover-iso9001.png',
  reportImages: [
    './assets/certifications/trolley-pressure-washer-report-1.jpg',
    './assets/certifications/trolley-pressure-washer-report-2.jpg',
  ],
};

const certificationCopy = {
  zh: {
    profile: {
      eyebrow: '资质认证',
      title: '把管理体系、产品检测和标准依据集中呈现',
      intro:
        '公司简介页补充展示 ISO9001 质量管理体系证书、产品检验报告与小型高压清洗机国家标准资料，方便客户在了解企业背景时同步查看资质文件。',
      cards: [
        {
          label: 'ISO9001',
          title: '质量管理体系认证',
          text: '台州磐宏机电有限公司 ISO9001 认证证书，用于展示企业质量管理体系建设情况。',
          href: certificationAssets.isoPdf,
          cta: '查看证书 PDF',
        },
        {
          label: 'GB/T 45165-2024',
          title: '小型高压清洗机国家标准',
          text: '国家标准资料可作为产品规范、检测口径和客户沟通时的技术依据参考。',
          href: certificationAssets.standard,
          cta: '查看标准 PDF',
        },
        {
          label: 'Inspection',
          title: '产品检验报告',
          text: '检验报告资料与报告扫描件一起展示，强化客户对产品合规和检测记录的信任。',
          href: certificationAssets.inspectionPdf,
          cta: '查看报告 PDF',
        },
      ],
    },
    strength: {
      eyebrow: '检测与标准',
      title: '检测报告可视化展示，增强企业实力背书',
      intro:
        '企业实力页重点展示推车款高压清洗机检测报告扫描件，并保留完整 PDF 和国家标准下载入口，便于采购、渠道和海外客户核对资料。',
      cards: [
        {
          label: '检验报告',
          title: '推车款高压清洗机检测报告',
          text: '报告扫描件展示样品信息、检验依据、检验项目和单项判定结果，适合作为产品实力证明。',
          href: certificationAssets.inspectionPdf,
          cta: '下载完整报告',
        },
        {
          label: '标准依据',
          title: 'GB/T 45165-2024',
          text: '小型高压清洗机国家标准资料，用于说明产品类目对应的标准化技术背景。',
          href: certificationAssets.standard,
          cta: '查看国家标准',
        },
        {
          label: '体系认证',
          title: 'ISO9001 认证证书',
          text: '质量管理体系认证资料与检测报告共同构成企业质量能力展示。',
          href: certificationAssets.isoPdf,
          cta: '查看认证证书',
        },
      ],
    },
    previewTitle: '检测报告原件',
    previewHint: '页面内完整缩略展示，点击可放大查看',
    reportAlt: ['推车款高压清洗机检测报告封面与注意事项', '推车款高压清洗机检测报告检验项目'],
  },
  en: {
    profile: {
      eyebrow: 'Certificates',
      title: 'Management system, inspection files, and standards in one place',
      intro:
        'The company profile now highlights the ISO9001 certificate, product inspection report, and GB/T 45165-2024 standard so buyers can review credibility documents while learning about Panhiro.',
      cards: [
        {
          label: 'ISO9001',
          title: 'Quality Management Certification',
          text: 'ISO9001 certificate for Taizhou Panhiro Electromechanical Co., Ltd., supporting the company quality management story.',
          href: certificationAssets.isoPdf,
          cta: 'Open certificate PDF',
        },
        {
          label: 'GB/T 45165-2024',
          title: 'National Standard Reference',
          text: 'The national standard for small high-pressure cleaning machines helps support technical and compliance conversations.',
          href: certificationAssets.standard,
          cta: 'Open standard PDF',
        },
        {
          label: 'Inspection',
          title: 'Product Inspection Report',
          text: 'The inspection report PDF and scanned previews help customers verify product testing records quickly.',
          href: certificationAssets.inspectionPdf,
          cta: 'Open report PDF',
        },
      ],
    },
    strength: {
      eyebrow: 'Testing',
      title: 'Visual inspection evidence for stronger company credibility',
      intro:
        'The capability page focuses on scanned inspection report pages for the trolley pressure washer, with PDF downloads for buyers, distributors, and overseas customers.',
      cards: [
        {
          label: 'Inspection',
          title: 'Trolley Pressure Washer Report',
          text: 'Scanned report pages show sample information, test basis, test items, and item conclusions as practical proof points.',
          href: certificationAssets.inspectionPdf,
          cta: 'Download full report',
        },
        {
          label: 'Standard',
          title: 'GB/T 45165-2024',
          text: 'National standard material for small high-pressure cleaning machines, useful for technical background checks.',
          href: certificationAssets.standard,
          cta: 'Open standard',
        },
        {
          label: 'ISO9001',
          title: 'ISO9001 Certificate',
          text: 'Quality management certification complements the inspection report in the company capability story.',
          href: certificationAssets.isoPdf,
          cta: 'Open certificate',
        },
      ],
    },
    previewTitle: 'Inspection Report Scans',
    previewHint: 'Complete thumbnails on page. Click to enlarge',
    reportAlt: ['Trolley pressure washer inspection report cover and notes', 'Trolley pressure washer inspection report test items'],
  },
};

function getCertificationLanguage() {
  return document.documentElement.lang === 'en' ? 'en' : 'zh';
}

function getComplianceCover(href) {
  if (href === certificationAssets.isoPdf) return certificationAssets.isoCover;
  if (href === certificationAssets.standard) return certificationAssets.standardCover;
  if (href === certificationAssets.inspectionPdf) return certificationAssets.inspectionCover;
  return certificationAssets.inspectionCover;
}

function createCertificationSection(pageKey, lang) {
  const copy = certificationCopy[lang];
  const pageCopy = pageKey === 'company-strength' ? copy.strength : copy.profile;
  const section = document.createElement('section');
  section.className = `compliance-section compliance-${pageKey === 'company-strength' ? 'strength' : 'profile'} reveal in-view`;
  section.setAttribute('data-certification-section', '');
  section.innerHTML = `
    <div class="compliance-head">
      <p class="eyebrow">${pageCopy.eyebrow}</p>
      <h2>${pageCopy.title}</h2>
      <p>${pageCopy.intro}</p>
    </div>
    <div class="compliance-layout">
      <div class="compliance-card-grid">
        ${pageCopy.cards
          .map(
            (card) => `
              <article class="compliance-card">
                <a class="compliance-cover" href="${card.href}" target="_blank" rel="noopener" aria-label="${card.cta}">
                  <img src="${getComplianceCover(card.href)}" alt="${card.title}" loading="lazy" />
                </a>
                <div class="compliance-card-copy">
                  <span>${card.label}</span>
                  <h3>${card.title}</h3>
                  <p>${card.text}</p>
                  <a href="${card.href}" target="_blank" rel="noopener">${card.cta}</a>
                </div>
              </article>
            `,
          )
          .join('')}
      </div>
      <div class="report-preview-panel">
        <div class="report-preview-head">
          <strong>${copy.previewTitle}</strong>
          <span>${copy.previewHint}</span>
        </div>
        <div class="report-preview-grid">
          ${certificationAssets.reportImages
            .map(
              (src, index) => `
                <button type="button" data-report-lightbox="${src}" aria-label="${copy.reportAlt[index]}">
                  <img src="${src}" alt="${copy.reportAlt[index]}" loading="lazy" />
                </button>
              `,
            )
            .join('')}
        </div>
      </div>
    </div>
  `;
  return section;
}

function renderCertificationSection() {
  const params = new URLSearchParams(window.location.search);
  const pageKey = params.get('page');
  if (!['company-profile', 'company-strength'].includes(pageKey)) return;

  document.querySelector('[data-certification-section]')?.remove();
  const main = document.querySelector('main');
  if (!main) return;

  const section = createCertificationSection(pageKey, getCertificationLanguage());
  const anchor =
    pageKey === 'company-strength'
      ? document.querySelector('.company-strength-detail')
      : document.querySelector('.company-profile-detail');

  if (anchor) {
    anchor.insertAdjacentElement('afterend', section);
  } else {
    main.append(section);
  }
}

renderCertificationSection();

document.querySelector('[data-language-toggle]')?.addEventListener('click', () => {
  window.setTimeout(renderCertificationSection, 0);
});

function closeReportLightbox() {
  document.querySelector('[data-report-lightbox-modal]')?.remove();
  document.body.classList.remove('report-lightbox-open');
}

function openReportLightbox(src, alt) {
  closeReportLightbox();
  const modal = document.createElement('div');
  modal.className = 'report-lightbox';
  modal.setAttribute('data-report-lightbox-modal', '');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `
    <button class="report-lightbox-close" type="button" data-report-lightbox-close aria-label="关闭">×</button>
    <img src="${src}" alt="${alt}" />
  `;
  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.closest('[data-report-lightbox-close]')) {
      closeReportLightbox();
    }
  });
  document.body.append(modal);
  document.body.classList.add('report-lightbox-open');
}

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-report-lightbox]');
  if (!trigger) return;
  openReportLightbox(trigger.getAttribute('data-report-lightbox'), trigger.querySelector('img')?.alt || '');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeReportLightbox();
});
