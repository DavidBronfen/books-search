import { createAction, props } from '@ngrx/store';

export const LoginUser = createAction(
  '[Login] Login user',
  props<{ name: string; }>()
);
