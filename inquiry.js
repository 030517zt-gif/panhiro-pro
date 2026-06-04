const panhiroInquiryConfig = {
  recipientEmail: '2949799538@qq.com',
  formSubmitEndpoint: 'https://formsubmit.co/ajax/2949799538@qq.com',
};

const inquiryOptions = {
  intent: [
    '产品选型咨询',
    '渠道代理合作',
    '批量采购报价',
    'OEM / ODM 定制',
    '售后资料 / 配件支持',
    '产品手册与检测资料',
  ],
  product: [
    'VK-Y1 外放电永磁变频主推款',
    'VK-1010-P4 / VK-1011 商用级系列',
    'PH-0885 / PH-0995 高级家用与半商用',
    'P4 / P5 入门家用手提款',
    '全系列产品目录',
    '暂不确定，需要推荐',
  ],
  quantity: ['样机 1 台', '2-10 台', '10-50 台', '50 台以上', '长期渠道备货'],
};

function getInquirySource(form) {
  const hidden = form.querySelector('input[name="source"]');
  if (hidden?.value) return hidden.value;
  return form.classList.contains('contact-detail-form') ? '联系子页面询盘表单' : '首页询盘表单';
}

function createOptionList(items) {
  return items.map((item) => `<option value="${item}">${item}</option>`).join('');
}

function getInquiryFormTitle(form) {
  if (form.classList.contains('contact-detail-form')) {
    return {
      index: '01',
      title: '提交采购 / 渠道询盘',
      text: '适合产品选型、批量采购、代理合作、定制需求、售后资料与检测文件获取。',
    };
  }
  return {
    index: '询盘',
    title: '留下采购需求，获取匹配资料',
    text: '请尽量写清市场、数量、产品方向和联系方式，我们会按 B2B 合作场景整理回复。',
  };
}

function buildInquiryMarkup(form) {
  const title = getInquiryFormTitle(form);
  const source = getInquirySource(form);
  return `
    <div class="inquiry-form-title">
      <span>${title.index}</span>
      <div>
        <h3>${title.title}</h3>
        <p>${title.text}</p>
      </div>
    </div>
    <label class="inquiry-field">
      <span class="field-label-text">联系人 <b class="required-mark">*</b></span>
      <input type="text" name="name" placeholder="请输入联系人姓名" autocomplete="name" required />
    </label>
    <label class="inquiry-field">
      <span class="field-label-text">公司 / 门店</span>
      <input type="text" name="company" placeholder="请输入公司、门店或团队名称" autocomplete="organization" />
    </label>
    <label class="inquiry-field">
      <span class="field-label-text">联系方式 <b class="required-mark">*</b></span>
      <input type="text" name="contact" placeholder="电话 / 微信 / 邮箱均可" autocomplete="tel" required />
    </label>
    <label class="inquiry-field">
      <span class="field-label-text">所在地区 / 目标市场</span>
      <input type="text" name="region" placeholder="例如：浙江台州 / 华东渠道 / 海外市场" />
    </label>
    <label class="inquiry-field">
      <span class="field-label-text">合作类型</span>
      <select name="intent">${createOptionList(inquiryOptions.intent)}</select>
    </label>
    <label class="inquiry-field">
      <span class="field-label-text">产品意向</span>
      <select name="product">${createOptionList(inquiryOptions.product)}</select>
    </label>
    <label class="inquiry-field">
      <span class="field-label-text">预计数量</span>
      <select name="quantity">${createOptionList(inquiryOptions.quantity)}</select>
    </label>
    <label class="inquiry-field">
      <span class="field-label-text">电压 / 插头 / 配置</span>
      <input type="text" name="configuration" placeholder="如 220V、外贸插头、需要卷管器等" />
    </label>
    <label class="inquiry-field wide">
      <span class="field-label-text">需求说明</span>
      <textarea name="message" rows="4" placeholder="请补充使用场景、预算区间、交期、资料需求或售后问题"></textarea>
    </label>
    <input type="hidden" name="source" value="${source}" />
    <button class="inquiry-submit" type="submit">
      <span>提交询盘</span>
      <small>资料 / 报价 / 合作沟通</small>
    </button>
    <p class="form-status" data-form-status role="status" aria-live="polite"></p>
  `;
}

function enhanceInquiryForms() {
  document.querySelectorAll('[data-inquiry-form]').forEach((form) => {
    if (form.dataset.inquiryEnhanced === 'true') return;
    form.dataset.inquiryEnhanced = 'true';
    form.classList.add('inquiry-form');
    form.innerHTML = buildInquiryMarkup(form);
  });
  window.applyPanhiroLanguage?.();
}

function getInquiryFields(form) {
  const formData = new FormData(form);
  return {
    source: String(formData.get('source') || document.title).trim(),
    name: String(formData.get('name') || '').trim(),
    company: String(formData.get('company') || '').trim(),
    contact: String(formData.get('contact') || '').trim(),
    region: String(formData.get('region') || '').trim(),
    intent: String(formData.get('intent') || '').trim(),
    product: String(formData.get('product') || '').trim(),
    quantity: String(formData.get('quantity') || '').trim(),
    configuration: String(formData.get('configuration') || '').trim(),
    message: String(formData.get('message') || '').trim(),
  };
}

function buildInquiryEmail(fields) {
  const lines = [
    `来源：${fields.source}`,
    `联系人：${fields.name || '未填写'}`,
    `公司 / 门店：${fields.company || '未填写'}`,
    `联系方式：${fields.contact || '未填写'}`,
    `所在地区 / 目标市场：${fields.region || '未填写'}`,
    `合作类型：${fields.intent || '未选择'}`,
    `产品意向：${fields.product || '未选择'}`,
    `预计数量：${fields.quantity || '未选择'}`,
    `电压 / 插头 / 配置：${fields.configuration || '未填写'}`,
    '',
    '需求说明：',
    fields.message || '未填写',
  ];

  return {
    subject: `磐宏官网询盘 - ${fields.intent || '合作咨询'} - ${fields.name || fields.contact || '新客户'}`,
    body: lines.join('\n'),
  };
}

function ensureInquiryDialog() {
  let dialog = document.querySelector('[data-inquiry-dialog]');
  if (dialog) return dialog;

  dialog = document.createElement('div');
  dialog.className = 'inquiry-dialog';
  dialog.setAttribute('data-inquiry-dialog', '');
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.innerHTML = `
    <div class="inquiry-dialog-backdrop" data-inquiry-dialog-close></div>
    <div class="inquiry-dialog-panel">
      <button class="inquiry-dialog-close" type="button" data-inquiry-dialog-close aria-label="关闭">×</button>
      <div class="inquiry-dialog-orbit" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      <div class="inquiry-dialog-icon" data-inquiry-dialog-icon aria-hidden="true"></div>
      <p class="eyebrow" data-inquiry-dialog-eyebrow>询盘状态</p>
      <h3 data-inquiry-dialog-title>正在整理询盘</h3>
      <p data-inquiry-dialog-message>我们正在提交您的需求信息。</p>
      <div class="inquiry-dialog-summary" data-inquiry-dialog-summary></div>
      <button class="inquiry-dialog-action" type="button" data-inquiry-dialog-close>知道了</button>
    </div>
  `;
  document.body.append(dialog);
  dialog.addEventListener('click', (event) => {
    if (event.target.closest('[data-inquiry-dialog-close]')) closeInquiryDialog();
  });
  return dialog;
}

function showInquiryDialog(state, options) {
  const dialog = ensureInquiryDialog();
  const content = {
    pending: {
      eyebrow: '正在提交',
      title: '正在整理您的询盘',
      message: '系统正在把联系人、合作类型、产品意向和配置需求发送给磐宏团队。',
    },
    success: {
      eyebrow: '提交成功',
      title: '询盘已收到',
      message: '我们会根据您的合作类型、产品意向和数量需求整理资料，并尽快联系您。',
    },
    fallback: {
      eyebrow: '已生成邮件',
      title: '请确认发送邮件',
      message: '当前浏览器已打开邮件草稿，请确认发送。也可以电话联系或扫码添加企业微信。',
    },
    error: {
      eyebrow: '提交未完成',
      title: '暂时没有提交成功',
      message: '可以稍后再试，或直接电话联系、扫码添加企业微信发送需求。',
    },
  }[state];

  dialog.dataset.state = state;
  dialog.querySelector('[data-inquiry-dialog-eyebrow]').textContent = content.eyebrow;
  dialog.querySelector('[data-inquiry-dialog-title]').textContent = content.title;
  dialog.querySelector('[data-inquiry-dialog-message]').textContent = options?.message || content.message;
  dialog.querySelector('[data-inquiry-dialog-summary]').innerHTML = options?.summary || '';
  dialog.classList.add('open');
  document.body.classList.add('inquiry-dialog-open');
}

function closeInquiryDialog() {
  document.querySelector('[data-inquiry-dialog]')?.classList.remove('open');
  document.body.classList.remove('inquiry-dialog-open');
}

function buildInquirySummary(fields) {
  return `
    <dl>
      <div><dt>合作类型</dt><dd>${fields.intent || '未选择'}</dd></div>
      <div><dt>产品意向</dt><dd>${fields.product || '未选择'}</dd></div>
      <div><dt>预计数量</dt><dd>${fields.quantity || '未选择'}</dd></div>
      <div><dt>联系方式</dt><dd>${fields.contact || '未填写'}</dd></div>
    </dl>
  `;
}

function setInquiryButton(form, pending) {
  const button = form.querySelector('button[type="submit"]');
  if (!button) return;
  button.disabled = pending;
  button.querySelector('span').textContent = pending ? '正在提交' : '提交询盘';
  button.querySelector('small').textContent = pending ? '请稍候...' : '资料 / 报价 / 合作沟通';
}

async function sendInquiry(fields, email) {
  if (!panhiroInquiryConfig.formSubmitEndpoint) return false;
  const payload = {
    _subject: email.subject,
    _template: 'table',
    _captcha: 'false',
    来源: fields.source,
    联系人: fields.name,
    公司门店: fields.company,
    联系方式: fields.contact,
    所在地区目标市场: fields.region,
    合作类型: fields.intent,
    产品意向: fields.product,
    预计数量: fields.quantity,
    电压插头配置: fields.configuration,
    需求说明: fields.message,
  };

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.contact)) {
    payload.email = fields.contact;
    payload._replyto = fields.contact;
  }

  const response = await fetch(panhiroInquiryConfig.formSubmitEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('FormSubmit request failed');
  const result = await response.json().catch(() => ({}));
  if (result.success === false) throw new Error(result.message || 'FormSubmit rejected the submission');
  return true;
}

function openInquiryMailDraft(email) {
  const query = new URLSearchParams({
    subject: email.subject,
    body: email.body,
  });
  window.location.href = `mailto:${encodeURIComponent(panhiroInquiryConfig.recipientEmail)}?${query.toString()}`;
}

async function submitEnhancedInquiry(form) {
  const fields = getInquiryFields(form);
  if (!fields.name || !fields.contact) {
    showInquiryDialog('error', {
      message: '请先填写联系人和联系方式，方便我们回访并匹配资料。',
      summary: buildInquirySummary(fields),
    });
    return;
  }

  const email = buildInquiryEmail(fields);
  setInquiryButton(form, true);
  showInquiryDialog('pending', { summary: buildInquirySummary(fields) });

  try {
    await sendInquiry(fields, email);
    showInquiryDialog('success', { summary: buildInquirySummary(fields) });
    form.reset();
  } catch {
    openInquiryMailDraft(email);
    showInquiryDialog('fallback', { summary: buildInquirySummary(fields) });
  } finally {
    setInquiryButton(form, false);
  }
}

enhanceInquiryForms();

document.addEventListener(
  'submit',
  (event) => {
    const form = event.target.closest('[data-inquiry-form]');
    if (!form) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    submitEnhancedInquiry(form);
  },
  true,
);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeInquiryDialog();
});
