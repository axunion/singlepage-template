import { icons } from '@/services';

export class SvgIcon extends HTMLElement {
  static componentName = 'svg-icon';
  static #cache: Map<string, Node> = new Map();

  constructor() {
    super();

    const name = this.getAttribute('name');

    if (name && icons[name]) {
      let svgNode = SvgIcon.#cache.get(name);

      if (!svgNode) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(icons[name], 'image/svg+xml');
        const el = doc.documentElement;

        svgNode = document.importNode(el, true);
        SvgIcon.#cache.set(name, svgNode);
      }

      this.appendChild(svgNode.cloneNode(true));
    }
  }
}
