import {
  Component,
  Input,
  Self,
  Optional,
  OnDestroy,
  HostBinding,
  OnInit,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'sos-input',
  templateUrl: './sos-input.component.html',
  styleUrls: ['./sos-input.component.scss'],
  providers: [
    {
      provide: SosInputComponent,
      useExisting: forwardRef(() => SosInputComponent),
      multi: true,
    },
  ],
  host: {
    '(focusout)': 'onTouched()',
  },
})
export class SosInputComponent
  implements
    ControlValueAccessor,
    MatFormFieldControl<string>,
    OnInit,
    OnDestroy {
  static nextId: number = 0;

  private _minlength: number = 0;
  private _pattern: string | RegExp = '';
  private _disabled: boolean = false;
  private _focused: boolean = false;
  private _placeholder: string = '';
  private _required: boolean = false;
  private destroy: Subject<void> = new Subject();

  control = new FormControl();
  stateChanges: Subject<void> = new Subject();

  @Input() error?: string;
  @Input() label?: string;
  @Input() type: string = 'text';

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get minlength(): number {
    return this._minlength;
  }
  set minlength(value: number) {
    this._minlength = value;
    this.stateChanges.next();
  }

  @Input()
  get value(): string {
    return this.control.value;
  }
  set value(value: string) {
    this.control.setValue(value);
    this.stateChanges.next();
  }

  @Input()
  get pattern(): string | RegExp {
    return this._pattern;
  }
  set pattern(value: string | RegExp) {
    this._pattern = value;
    this.stateChanges.next();
  }

  min = 0;
  max = 10;

  @HostBinding('attr.aria-describedby')
  describedBy: string = '';

  @HostBinding()
  id = `input-control-${++SosInputComponent.nextId}`;

  @HostBinding('class.floating')
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }
  get focused(): boolean {
    return this._focused;
  }
  set focused(value: boolean) {
    this._focused = value;
    this.stateChanges.next();
  }
  get empty(): boolean {
    return !this.control.value;
  }
  get errorState(): boolean {
    return this.ngControl?.control != null ? !!this.ngControl?.control : false;
  }

  constructor(@Optional() @Self() public ngControl: NgControl | null) {
    if (ngControl) {
      // Set the value accessor directly (instead of providing NG_VALUE_ACCESSOR) to avoid running into a circular import
      this.ngControl!.valueAccessor = this;
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.stateChanges.complete();
  }

  onTouched(): void {}

  registerOnChange(onChange: (value: string | null) => void): void {
    this.control.valueChanges.pipe(takeUntil(this.destroy)).subscribe(onChange);
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  setDisabledState(shouldDisable: boolean): void {
    if (shouldDisable) {
      this.control.disable();
    } else {
      this.control.enable();
    }

    this.disabled = shouldDisable;
  }

  onContainerClick(event: MouseEvent): void {
    // if ((event.target as Element).tagName.toLowerCase() !== 'input') {
    //   this.focusMonitor.focusVia(this.areaRef.nativeElement, 'mouse');
    // }
  }

  writeValue(value: string | null): void {
    this.control.setValue(value);
  }
}
