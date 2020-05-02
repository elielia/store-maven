import { Component, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const UI_SWITCH_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable-next-line: no-use-before-declare */
  useExisting: forwardRef(() => ToggleComponent),
  multi: true,
};

@Component({
  selector: 'app-toggle',
  template: `
    <span
      class="switch"
      [class.checked]="checked"
      [class.disabled]="disabled"
      [class.switch-large]="size === 'large'"
      [class.switch-medium]="size === 'medium'"
      [class.switch-small]="size === 'small'"
      [class.switch-labeled]="!!labelOn || !!labelOff"
      [style.background-color]="getColor()"
      [style.border-color]="getColor('borderColor')"
    >
      <i *ngIf="checked" class="fas fa-check"></i>
      <input
        type="checkbox"
        id="enabled"
        name="enabled"
        [checked]="checked"
        style="display: none;"
        aria-invalid="false"
      />
      <small [style.background]="getColor('switchColor')"> </small>
      <span class="switch-text" *ngIf="!!labelOn || !!labelOff">
        <span class="on" [innerHtml]="labelOn"></span>
        <span class="off" [innerHtml]="labelOff"></span>
      </span>
    </span>
  `,
  styles: [
    `
      .switch {
        background: #f00;
        border: 1px solid #dfdfdf;
        position: relative;
        display: inline-block;
        box-sizing: content-box;
        overflow: visible;
        padding: 0;
        margin: 0;
        cursor: pointer;
        box-shadow: rgb(223, 223, 223) 0 0 0 0 inset;
        transition: 0.3s ease-out all;
        -webkit-transition: 0.3s ease-out all;
      }

      .fa-check {
        position: absolute;
        top: 5px;
        left: 9px;
        color: white;
      }

      small {
        border-radius: 100%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        position: absolute;
        top: 0;
        left: 4px;
        transition: 0.3s ease-out all;
        -webkit-transition: 0.3s ease-out all;
      }

      .switch-large {
        width: 66px;
        height: 40px;
        border-radius: 40px;
      }

      .switch-large small {
        width: 40px;
        height: 40px;
      }

      .switch-medium {
        width: 50px;
        height: 24px;
        border-radius: 30px;
      }

      .switch-medium.switch-labeled {
        width: 60px;
      }

      .switch-medium small {
        width: 15px;
        height: 15px;
        top: 4px;
      }

      .switch-small {
        width: 33px;
        height: 20px;
        border-radius: 20px;
      }

      .switch-small small {
        width: 20px;
        height: 20px;
      }

      .switch-labeled {
        cursor: pointer;
      }

      .checked {
        background: rgb(100, 189, 99);
        border-color: rgb(100, 189, 99);
      }

      .switch-large.checked small {
        left: 26px;
      }

      .switch-medium.checked small {
        left: 30px;
      }

      .switch-medium.switch-labeled.checked small {
        left: 30px;
      }

      .switch-small.checked small {
        left: 13px;
      }

      .disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .switch .switch-text {
        font-size: 13px;
      }

      .switch .off {
        opacity: 1;
        position: absolute;
        right: 10%;
        top: 25%;
        z-index: 0;
        color: #a9a9a9;
        transition: 0.4s ease-out all;
      }

      .switch .on {
        opacity: 0;
        z-index: 0;
        color: #fff;
        position: absolute;
        top: 25%;
        left: 9%;
        transition: 0.4s ease-out all;
      }

      .switch.checked .off {
        opacity: 0;
      }

      .switch.checked .on {
        opacity: 1;
      }
    `,
  ],
  providers: [UI_SWITCH_CONTROL_VALUE_ACCESSOR],
})
export class ToggleComponent implements ControlValueAccessor {
  /* tslint:disable member-ordering*/

  get checked() {
    return this._checked;
  }

  @Input() set checked(v: boolean) {
    this._checked = v !== false;
  }

  get disabled() {
    return this._disabled;
  }

  @Input() set disabled(v: boolean) {
    this._disabled = v !== false;
  }

  @Input() toggleOnClick = true;
  private onTouchedCallback = (v: any) => {};

  /* tslint:disable adjacent-overload-signatures */
  private onChangeCallback = (v: any) => {};

  @Input() size = 'medium';
  // tslint:disable-next-line:no-output-native
  @Output() change = new EventEmitter<boolean>();
  @Input() color = 'rgb(100, 189, 99)';
  @Input() switchOffColor = '';
  @Input() switchColor = '#fff';
  @Input() defaultBgColor = 'rgba(226, 229, 230, 0.4)';
  @Input() defaultBoColor = '#dfdfdf';
  @Input() labelOn = '';
  @Input() labelOff = '';

  // tslint:disable-next-line:variable-name
  private _checked: boolean;

  // tslint:disable-next-line:variable-name
  private _disabled: boolean;

  // tslint:disable-next-line:variable-name
  private _reverse: boolean;

  get reverse() {
    return this._reverse;
  }

  @Input() set reverse(v: boolean) {
    this._reverse = v !== false;
  }

  // tslint:disable-next-line:typedef
  getColor(flag = '') {
    if (flag === 'borderColor') {
      return this.defaultBoColor;
    }
    if (flag === 'switchColor') {
      if (this.reverse) {
        return !this.checked ? this.switchColor : this.switchOffColor || this.switchColor;
      }
      return this.checked ? this.switchColor : this.switchOffColor || this.switchColor;
    }
    if (this.reverse) {
      return !this.checked ? this.color : this.defaultBgColor;
    }
    return this.checked ? this.color : this.defaultBgColor;
  }

  writeValue(obj: any): void {
    if (obj !== this.checked) {
      this.checked = !!obj;
    }
  }

  @HostListener('click')
  onToggle() {
    if (this.disabled || !this.toggleOnClick) {
      return;
    }
    this.checked = !this.checked;
    this.change.emit(this.checked);
    this.onChangeCallback(this.checked);
    this.onTouchedCallback(this.checked);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
