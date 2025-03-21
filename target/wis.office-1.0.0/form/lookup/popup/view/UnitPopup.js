/**
 */
Ext.define('lookup.popup.view.UnitPopup', { extend: 'Axt.popup.Search',

	id			: 'lookup-unit-popup',
	alias		: 'widget.lookup-unit-popup',
	store		: 'lookup.popup.store.UnitPopup',

	title		: Language.get( 'unit_popup' , '단위 찾기') ,
	closable	: true,
	autoShow	: true,
	width		: 613,
	height		: 500,
	layout		: {
		type	: 'border'
	},
	matcode		: undefined,
	matname		: undefined,
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);
		me.selectAction();
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
			xtype : 'form-layout',
			region : 'center',
			border:false,
			dockedItems : [ me.searchForm() ] , items : [ me.createGrid() ]
		};
		return form;
	},
	/**
	 * 검색폼
	 */
	searchForm: function(){
		var me = this,
			form = {
			xtype		: 'form-search',
			bodyStyle	: { padding: '0', background: 'transparent' },
			dockedItems	: [
				{	xtype	: 'toolbar',
					dock	: 'top',
					items	: [
						{	xtype	: 'container',
							border	: 0,
							style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' },
							region	: 'center',
							flex	: 1,
							height	: 40,
							margin	: '0 5 0 1',
							items	: [
								{	xtype	: 'fieldset',
									border	: 3,
									flex	: 1,
									style	: { borderColor	: '#263c63', borderStyle	: 'solid' },
									region	: 'center',
									height	: 34,
									margin	: '3 0 0 0',
									layout	: 'hbox',
									items	: [
										{	xtype	: 'label',
											text	: 'SEARCH  | ',
											margin	: '7 10 0 0',
											style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
										},{	name	: 'find_name',
											xtype	: 'searchfield',
											margin	: '3 10 0 0',
											flex	: 1,
											emptyText	: '단위코드 또는 단위명을 입력하세요....',
//											value	: me.popup.params.find,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER || e.keyCode == 9) {
														var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
														searchButton.fireEvent('click', searchButton);					 /* 조회버튼 Click */
													}
												},
											}
										}
									]
								},
							]
						},
						{	xtype : 'button'     , scope: me, handler: me.selectAction,  width   : 40, height 	: 36,region : 'north', margin : '2 2 0 0',action : Const.SELECT.action ,
							style	: 'background:url("../../../resource/img/btn_search_icon.png")'
						}
					]
				},{
					xtype : 'container'  , layout: 'border', border : 0 , height: 3
				}
			],
			layout: { type: 'vbox' },
			fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
			items :	[] // 기타 검색 조건이 필요한 경우
		};
		return form;
	},
	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(){
		var me = this,
			grid = {
				xtype: 'grid-panel',
				header : false,
				region: 'center',
				viewConfig: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
				},
				selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store: Ext.create( me.store ),
				paging:{
					xtype: 'grid-paging',
					items:[
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					]
				},
				columns:[
					{	text: Language.get('unit_name' , '단위명'  )	, dataIndex: 'unit_name', width: 80
					},{	text: Language.get('unit_code' , '코드' )	, dataIndex: 'unit_code', width: 50
					},{ dataIndex: 'widh_yorn'		, text : Language.get('widh_yorn'		,'폭')		, width : 60 , align : 'center', xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'leng_yorn'		, text : Language.get('leng_yorn'		,'길이')		, width : 60 , align : 'center', xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'tick_yorn'		, text : Language.get('tick_yorn'		,'두께')		, width : 60 , align : 'center', xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'evlt_unit_yorn'	, text : Language.get('evlt_unit_yorn'	,'평가')		, width : 60 , align : 'center', xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'actv_unit_yorn'	, text : Language.get('actv_unit_yorn'	,'액티비티단위여부'), width : 100 , align : 'center', xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'dcml_calc_mthd'	, text : Language.get('dcml_calc_mthd'	,'소수점계산방식'), width : 100 , align : 'center', xtype :'lookupcolumn', lookupValue : resource.lookup('dcml_calc_mthd')
					}

				],
				listeners: {
					itemdblclick: function(dataview, index, item, e) {
						me.finishAction();
					},
					 render: function(){
						var me = this
						;
						new Ext.util.KeyMap({
							 target: me.getEl(),
							 eventName : 'keyup',
							 binding:[
								{	key: Ext.EventObject.ENTER,
									fn: function(key,e){
										me.fireEvent('itemdblclick', me.getView() );
									}
								}
							]
						});
					}
				}
			}
		;
		return grid;
	},

	/**
	 * 조회
	 */
	selectAction: function(){
		var me    = this,
			store = me.down('grid').getStore(),
			param = Ext.merge( me.down('form').getValues(), { hq_id : _global.hq_id
			}, me.popup.params );
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params   : {param:JSON.stringify(param)},
			scope    : me,
			callback : function(records, operation, success) {
				if (me.popup.values && me.popup.values.barcode) {
					delete me.popup.values.barcode ;
				}
				if(records){
					me.down('grid').getSelectionModel().select(0);
				}
			}
		});
	},

	/**
	 * 선택
	 */
	finishAction: function(){
		var me    = this,
			panel    = me.down('grid'),
			selects = panel.getSelectionModel().getSelection(),
			request = []
		;
		if (selects.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			if (me.popup.apiurl && me.popup.apiurl.master) {
				Ext.each( selects , function( eachrow ){
					request.push({
						unit_idcd  : eachrow.get('unit_idcd' ),
						unit_code  : eachrow.get('unit_code' )

					});
				});
				var store = Ext.create( me.store );
				param = Ext.merge( me.popup.params, {
					records : request
				});
				store.getProxy().api.read = me.popup.apiurl.master ;
				store.load({
					params   : {param:JSON.stringify(param)},
					scope    : me,
					callback : function(records, operation, success) {
						if (success) {
							me.setResponse(records);
						}
					}
				});
			} else {
				me.setResponse(selects);
			}
		}
	}


});
