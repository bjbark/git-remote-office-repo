/**
 */
Ext.define('lookup.popup.view.PjodPopup', { extend: 'Axt.popup.Search',
	id: 'lookup-pjod-popup',
	alias: 'widget.lookup-pjod-popup',
	store: 'lookup.popup.store.PjodPopup',
	title: Language.get('','수주 선택'),
	closable: true,
	autoShow: true,
	width: 680,
	height: 500,
	layout: {
		type: 'border'
	},
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
//	initComponent: function(config){
//		var me = this;
//			me.items = [me.createForm()];
//			me.callParent(arguments);
//			me.selectAction();
//	},
	initComponent: function(config){
		var me = this;
		var tema	= '';
		if(me.popup.params.tema){
			tema = me.popup.params.tema+'grid';
		}
		me.items = [me.createForm(tema)];
		me.callParent(arguments);
		me.selectAction();
	},
	/**
	 * 화면폼
	 */
	createForm: function(tema){
		var me = this, form =
		{
			xtype : 'form-layout',
			region : 'center',
			border:false,
			dockedItems : [ me.searchForm(tema) ],
			items : [ me.createGrid(tema) ]
		};
		return form;
	},
	/**
	 * 검색폼
	 */
	searchForm: function(tema){
		var me = this,
			form = {
			xtype		: 'form-search',
			cls			: tema,
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
											emptyText	: Language.get('acpt_numb', '금형코드'	)+' 또는 '+Language.get('acpt_case_name', '금형명')+'을 입력하세요....',
									 		enableKeyEvents : true,
									 		value	: me.popup.params.find,
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
					xtype : 'container'  , layout: 'border', border : 0 , height: 3  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
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
	createGrid: function(tema){
		var me = this,
			grid = {
			xtype: 'grid-panel',
			header : false,
			region: 'center',
			cls: _global.hq_id+'grid',
			viewConfig: {
				loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
			},
			cls			: tema,
			selModel	: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
			store		: Ext.create(me.store),
			paging		: {
				xtype	: 'grid-paging',
				items	: [
					'->' ,
					{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
					{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
				]
			},
			columns:[
				{	dataIndex: 'line_stat', text : Language.get('line_stat', '상태'		), width :  50 , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center' , hidden : true,
				},{ dataIndex: 'pjod_idcd', text : Language.get('pjod_idcd', '금형번호'		), width : 130 , align : 'center',
					renderer: function(value, meta){
						if(me.popup.params.tema){
							this.columns[1].width = 160;
							meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
						}
						return value;
					}
				},{ dataIndex: 'pjod_code', text : Language.get('pjod_code', '프로젝트코드'	), width : 110 , align : 'center', hidden : true
				},{ dataIndex: 'pjod_name', text : Language.get('pjod_name', '프로젝트명'	), width : 170 , align : 'left'  , hidden : true
				},{ dataIndex: 'cstm_name', text : Language.get('cstm_name', '거래처명'		), width : 170 , align : 'left', hidden : true,
					renderer: function(value, meta){
						if(me.popup.params.tema){
							this.columns[4].width = 220;
							meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
						}
						return value;
					}
				},{ dataIndex: 'item_code', text : Language.get('acpt_numb', '금형코드'		), width : 120 , align : 'center', hidden : true
				},{ dataIndex: 'item_name', text : Language.get('acpt_case_name', '금형명'	), flex  :   1 , align : 'left',
					renderer: function(value, meta){
						if(me.popup.params.tema){
							this.columns[6].width = 430;
							meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
						}
						return value;
					}
				},{ dataIndex: 'item_spec', text : Language.get('item_spec', '규격'		), width : 180 , align : 'left', hidden : true,
					renderer: function(value, meta){
						if(me.popup.params.tema){
							meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
						}
						return value;
					}
				},{ dataIndex: 'modl_name', text : Language.get('modl_name', '모델명'		), width : 130 , align : 'left',
					renderer: function(value, meta){
						if(me.popup.params.tema){
							meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
						}
						return value;
					}
				},{ dataIndex: 'strt_date', text : Language.get('strt_date', '착수일자'		), width :  90 , align : 'center', hidden : true
				},{ dataIndex: 'endd_date', text : Language.get('endd_date', '완료일자'		), width :  90 , align : 'center', hidden : true
				},{ dataIndex: 'prnt_idcd', text : Language.get('prnt_idcd', '영업담당'		), width :  90 , align : 'center', hidden : true
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
							  {
								 key: Ext.EventObject.ENTER,
								 fn: function(key,e){
									me.fireEvent('itemdblclick', me.getView() );
								 }
							  }
						]
					});
				}
			}
		};
		return grid;
	},


	 /**
	  * 조회
	*/
	selectAction: function(){
		var me    = this,
			store = me.down('grid').getStore(),
			param = Ext.merge( me.down('form').getValues() , {
			}, me.popup.params, {hq_id : _global.hq_id} )
		;

		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params   : {param:JSON.stringify(param)},
			scope    : me,
			callback : function(records, operation, success) {
				 if(records){
						me.down('grid').getSelectionModel().select(0);
				}
			}
		});
	},
	/**
	 * 확인 버튼 이벤트
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
					});
				});
				var store = Ext.create(me.store );
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
