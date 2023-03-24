import { Component, Host, h, State, Element, Event, EventEmitter } from '@stencil/core';
import { StepBoxState, checkImage } from './utility';
@Component({
  tag: 'step-box',
  styleUrl: 'step-box.scss',
  shadow: true,
})
export class StepBox {
  @Element() el: HTMLElement;
  @State() stepBoxState: StepBoxState = StepBoxState.default;
  @State() hasImage: boolean = false;

  @Event() stepBoxStateChange: EventEmitter<StepBoxState>;

  componentWillLoad() {
    this.hasImage = checkImage(this.el);
    if (this.hasImage === true) {
      this.stepBoxState = StepBoxState.active;
    }
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
            data-content="?"
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
            <button onClick={() => this.changeState()}>{this.stepBoxState === StepBoxState.active ? 'Reset' : 'Select'}</button>
          </div>
        </div>
      </Host>
    );
  }
}
