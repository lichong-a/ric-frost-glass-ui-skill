// Deliberately small DOM boundary for Node React lifecycle tests. This is not a browser.
export function installPreviewDom({ component = 'aero-shards', embedded = true } = {}) {
  const saved = new Map();
  const replace = (name, value) => { saved.set(name, Object.getOwnPropertyDescriptor(globalThis, name)); Object.defineProperty(globalThis, name, { configurable: true, writable: true, value }); };
  const observations = new Set();
  class Node extends EventTarget {
    constructor(type, ownerDocument, name) { super(); this.nodeType = type; this.ownerDocument = ownerDocument; this.nodeName = name; this.parentNode = null; this.childNodes = []; }
    appendChild(child) { return this.insertBefore(child, null); }
    insertBefore(child, before) { child.parentNode?.removeChild(child); const index = before === null ? this.childNodes.length : this.childNodes.indexOf(before); this.childNodes.splice(index, 0, child); child.parentNode = this; return child; }
    removeChild(child) { this.childNodes.splice(this.childNodes.indexOf(child), 1); child.parentNode = null; return child; }
    contains(child) { return this === child || this.childNodes.some(node => node.contains(child)); }
    get firstChild() { return this.childNodes[0] ?? null; }
    get lastChild() { return this.childNodes.at(-1) ?? null; }
    get textContent() { return this.nodeType === 3 ? this.nodeValue : this.childNodes.map(child => child.textContent).join(''); }
    set textContent(value) { for (const child of this.childNodes) child.parentNode = null; this.childNodes = []; if (value !== '') this.appendChild(this.ownerDocument.createTextNode(value)); }
  }
  class Element extends Node {
    constructor(name, document) { super(1, document, name.toUpperCase()); this.tagName = this.nodeName; this.localName = name; this.namespaceURI = 'http://www.w3.org/1999/xhtml'; this.attributes = new Map(); this.style = { setProperty(name, value) { this[name] = value; }, removeProperty(name) { delete this[name]; } }; if (name === 'iframe') this.contentWindow = { postMessage() {} }; }
    setAttribute(name, value) { this.attributes.set(name, String(value)); for (const observer of observations) if (observer.target?.contains(this)) queueMicrotask(() => { if (observer.target) observer.callback([{ type: 'attributes', target: this, attributeName: name }]); }); }
    removeAttribute(name) { this.attributes.delete(name); }
    getAttribute(name) { return this.attributes.get(name) ?? null; }
    querySelector(selector) { return this.querySelectorAll(selector)[0] ?? null; }
    querySelectorAll(selector) { const result = []; const visit = node => { for (const child of node.childNodes) { if (child.nodeType === 1 && (selector === child.localName || /^\[.+\]$/.test(selector) && child.attributes.has(selector.slice(1, -1)))) result.push(child); visit(child); } }; visit(this); return result; }
  }
  class Document extends Node {
    constructor() { super(9, null, '#document'); this.ownerDocument = this; this.hidden = false; this.documentElement = new Element('html', this); this.body = new Element('body', this); this.documentElement.appendChild(this.body); this.appendChild(this.documentElement); this.activeElement = this.body; }
    createElement(name) { return new Element(name, this); }
    createElementNS(_, name) { return this.createElement(name); }
    createTextNode(value) { const node = new Node(3, this, '#text'); node.nodeValue = String(value); return node; }
    createComment(value) { const node = new Node(8, this, '#comment'); node.nodeValue = value; return node; }
  }
  class MutationObserver {
    constructor(callback) { this.callback = callback; }
    observe(target) { this.target = target; observations.add(this); }
    disconnect() { this.target = undefined; observations.delete(this); }
  }
  const document = new Document(), window = new EventTarget(), messages = [];
  window.document = document; document.defaultView = window;
  window.location = { search: `?component=${component}&channel=test-channel&motion=allow`, href: `https://gallery.example/preview.html?component=${component}`, origin: 'https://gallery.example', reload() {} };
  window.parent = embedded ? { postMessage: value => messages.push(value) } : window;
  window.matchMedia = () => Object.assign(new EventTarget(), { matches: false });
  window.isSecureContext = true; window.devicePixelRatio = 1;
  window.setTimeout = setTimeout; window.clearTimeout = clearTimeout;
  window.HTMLIFrameElement = class extends Element {};
  replace('window', window); replace('document', document); replace('navigator', {});
  replace('HTMLCanvasElement', class extends Element {}); replace('MutationObserver', MutationObserver);
  replace('IS_REACT_ACT_ENVIRONMENT', true);
  const container = document.createElement('div'); document.body.appendChild(container);
  const hostMessage = message => { const event = new Event('message'); Object.assign(event, { origin: window.location.origin, source: window.parent, data: message }); window.dispatchEvent(event); };
  return {
    window, document, container, messages, hostMessage,
    restore() { for (const [name, descriptor] of saved) { if (descriptor) Object.defineProperty(globalThis, name, descriptor); else delete globalThis[name]; } },
  };
}
