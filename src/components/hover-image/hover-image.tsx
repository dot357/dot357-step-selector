import { Component, Host, h, Prop, State } from '@stencil/core';
import type { ImageProps } from './types';

@Component({
  tag: 'hover-image',
  styleUrl: 'hover-image.scss',
  shadow: true,
})
export class HoverImage {
  @Prop() main: ImageProps;
  @Prop() secondary: ImageProps;
  @Prop() size?: {
    width: string;
    height: string;
  };
  @State() count: number = 0;
  render() {
    const main = this.main;
    const secondary = this.secondary;
    const size = this.size;

    return (
      <Host>
        {size.height} {size.width}
        <div class="main">
          <div class="image-wrapper">
            <img src={main.src} alt={main.alt} loading="lazy" />
          </div>
          <div class="image-wrapper secondary">
            <img src={secondary.src} alt={secondary.alt} loading="lazy" />
          </div>
        </div>
      </Host>
    );
  }
}
