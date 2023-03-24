import { Component, Host, h, State, Element, Event, EventEmitter, Prop } from '@stencil/core';
import { StepBoxState, checkImage } from './utility';
@Component({
  tag: 'step-box',
  styleUrl: 'step-box.scss',
  shadow: true,
})
export class StepBox {
  @Prop() btnBacground?: string = '#0066ff';
  @Prop() btnHover?: string = '#005ce6';
  @Prop() btnColor?: string = 'white';
  @Prop() iconText?: string = '?';

  @Element() el: HTMLElement;
  @State() stepBoxState: StepBoxState = StepBoxState.default;
  @State() hasImage: boolean = false;

  @Event() stepBoxStateChange: EventEmitter<StepBoxState>;

  componentWillLoad() {
    this.hasImage = checkImage(this.el);
    if (this.hasImage === true) {
      this.stepBoxState = StepBoxState.active;
    }

    if (this.iconText.length > 1) {
      this.iconText = this.iconText[0];
    }
    this.iconText = this.iconText.toUpperCase();
  }

  changeState() {
    if (this.stepBoxState === StepBoxState.default) {
      this.stepBoxState = StepBoxState.active;
    } else {
      this.stepBoxState = StepBoxState.default;
    }
    this.stepBoxStateChange.emit(this.stepBoxState);
  }

  render() {
    const iconText = this.iconText;
    const btnOptions = {
      background: this.btnBacground,
      hover: this.btnHover,
      color: this.btnColor,
    };

    return (
      <Host>
        <div
          class={{
            'step-box': true,
          }}
        >
          <div
            class={{
              'image-wrapper': true,
              'default': this.stepBoxState === StepBoxState.default,
            }}
            data-content={iconText}
          >
            <slot name="image"></slot>
          </div>
          <div
            class={{
              'content-wrapper': true,
              'active': this.stepBoxState === StepBoxState.active,
            }}
          >
            <slot name="text-content"></slot>
            <button
              type="button"
              class="cst-btn"
              style={{
                '--btn-color': btnOptions.color,
                '--btn-background': btnOptions.background,
                '--btn-hover': btnOptions.hover,
              }}
              onClick={() => this.changeState()}
            >
              {this.stepBoxState === StepBoxState.active ? 'Reset' : 'Select'}
            </button>
          </div>
        </div>
      </Host>
    );
  }
}
