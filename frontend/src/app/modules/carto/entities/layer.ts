import VectorLayer from 'ol/layer/Vector';

export interface LAYER_INTERFACE {
  ID: string,
  type: 'repartition'|'pression'|'richesse',
  url: string,
  title: string,
  queryable: boolean, 
  visible: boolean, 
  displayInLegend: boolean
  style?: any,
  state: 'init'|'load'|'done'|'error',
  olLayer?: VectorLayer,
  properties?: any
};

export abstract class Layer {

	protected _ID: string;
  protected _type: 'repartition'|'pression'|'richesse';
  protected _url: string;
  protected _title: string;
  protected _queryable: boolean;
  protected _visible: boolean;
  protected _displayInLegend: boolean;
  protected _style: any;
  protected _state: 'init'|'load'|'done'|'error';
  protected _olLayer: VectorLayer;
  protected _properties: any;

  public get ID(){ return this._ID; }
  public set ID(ID) { this._ID = ID}
  public get type(){ return this._type; }
  public set type(type) { this._type = type}
  public get url(){ return this._url; }
  public set url(url) { this._url = url}
  public get title(){ return this._title; }
  public set title(title) { this._title = title}
  public get queryable(){ return this._queryable; }
  public set queryable(queryable) { this._queryable = queryable}
  public get visible(){ return this._visible; }
  public set visible(visible) { this._visible = visible}
  public get displayInLegend(){ return this._displayInLegend; }
  public set displayInLegend(displayInLegend) { this._displayInLegend = displayInLegend}
  public get style(){ return this._style; }
  public set style(style) { this._style = style}
  public get state(){ return this._state; }
  public set state(state) { this._state = state}
  public get olLayer(){ return this._olLayer; }
  public set olLayer(olLayer) { this._olLayer = olLayer}
  public get properties(){ return this._properties; }
  public set properties(properties) { this._properties = properties}



	protected assign(event: LAYER_INTERFACE) {
		Object.assign(this, event);
    return this;
  }

}


