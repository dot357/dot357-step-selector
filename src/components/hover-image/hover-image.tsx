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
  @Prop() secondary?: ImageProps;
  @Prop() width?: number = 300;
  @Prop() height?: number = 300;
  @Prop() backgroundColor?: string = '#000';
  render() {
    const main = this.main;
    const secondary = this.secondary;
    const width = this.width;
    const height = this.height;
    const backgroundColor = DOMPurify.sanitize(this.backgroundColor);

    const outerSize = {
      width: `${width}px`,
      height: `${height}px`,
    };
    const innerSize = {
      width: `${width - 10}px`,
      height: `${height - 10}px`,
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
              src={main.src || ''}
              alt={main.alt || ''}
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
                src={secondary.src ?? ''}
                alt={secondary.alt ?? ''}
                loading="lazy"
              />
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
