import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";

export namespace AppStateEvents {
  export class LoaderSet {
    static readonly type = '[Loader] Set';
    constructor(public show: boolean) {}
  }
}

export interface AppStateModel {
  loader: boolean;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    loader: false
  }
})
@Injectable({providedIn: 'root'})
export class AppState {
  @Selector()
  static loader(state: AppStateModel) {
    return state.loader;
  }

  @Action(AppStateEvents.LoaderSet)
  setLoader(ctx: StateContext<AppStateModel>, action: AppStateEvents.LoaderSet) {
    ctx.patchState({loader: action.show});
  }
}