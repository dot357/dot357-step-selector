import { Component, Host, h, Prop } from '@stencil/core';
import type { ImageProps } from './types';
import DOMPurify from 'dompurify';

@Component({
  tag: 'hover-image',
  styleUrl: 'hover-image.scss',
  shadow: true,
})
export class HoverImage {
  @Prop() main: ImageProps;
  @Prop() secondary: ImageProps;
  @Prop() size?: {
    width: number | string;
    height: number | string;
  };
  @Prop() backgroundColor?: string = '#000';
  render() {
    const main = this.main;
    const secondary = this.secondary;
    const size = this.size;
    const backgroundColor = DOMPurify.sanitize(this.backgroundColor);

    const outerSize = {
      width: typeof size.width === 'string' ? size.width : `${size.width + 10}px`,
      height: typeof size.height === 'string' ? size.height : `${size.height + 10}px`,
    };
    const innerSize = {
      width: typeof size.width === 'string' ? size.width : `${size.width}px`,
      height: typeof size.height === 'string' ? size.height : `${size.height}px`,
    };

    return (
      <Host>
        <div
          class={{
            main: true,
            animation: secondary ? true : false,
          }}
          style={{
            ...outerSize,
          }}
        >
          <div
            class="image-wrapper"
            style={{
              ...outerSize,
              background: backgroundColor,
            }}
          >
            <img
              style={{
                ...innerSize,
              }}
              src={main.src}
              alt={main.alt}
              loading="lazy"
            />
          </div>
          {secondary ? (
            <div
              class="image-wrapper secondary"
              style={{
                ...outerSize,
                background: backgroundColor,
              }}
            >
              <img
                style={{
                  ...innerSize,
                }}
                src={secondary.src}
                alt={secondary.alt}
                loading="lazy"
              />
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
