export enum StepBoxState {
  default = 0,
  active = 1,
}

export function checkImage(el: HTMLElement): boolean {
  const image = el.querySelector('[slot="image"]');
  if (image) {
    return true;
  } else {
    return false;
  }
}
