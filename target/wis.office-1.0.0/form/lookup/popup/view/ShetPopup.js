Ext.define('lookup.popup.view.ShetPopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.lookup-shet-popup',
	store	: 'lookup.popup.store.ShetPopup',
	requires: [
		'lookup.popup.view.ClassPopup',
	],
	title	: Language.get('shet_popup','용지 찾기'),
	closable: true,
	autoShow: true,

	width	: 800,
	height	: 900,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this,
			autoSelect = false
		;
		if (!me.popup.values){ me.popup.values ={}; }
		if (!me.popup.option){ me.popup.option ={}; }

		me.items = [me.createForm()];
		me.callParent(arguments);
		me.selectAction();
	},

	/**
	 * 화면폼
	 */
	 createForm: function(){
		var	me   = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.searchForm() ],
				items		: [ me.createTabs(),me.createDetail() ]
			}
		;
		return form;
	},
	/**
	 * 검색폼
	 */
	searchForm: function(){
		var me = this,
			form = {
			xtype		: 'form-search',
			id			: 'search',
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
											emptyText	: '',
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

	createTabs : function () {
		var me = this,
			item = {
				layout	: 'border',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [
					me.createClass1(),
					me.createClass2(),
					me.createClass3(),
					me.createGrid()
				]
			}
		;
		return item;
	},
	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	 createGrid: function(){
			var me = this,
			grid = {
				xtype		: 'grid-panel',
				title		: '용지',
				header		: false,
				region		: 'center',
				itemId		: 'shet_popup_master',
				flex		: 3,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
				},
				selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store	: Ext.create(me.store),
				plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
					ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
					trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
					leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
				}],

				paging	: {
					xtype	: 'grid-paging',
					items	: [
					]
				},
				columns: [
					{	dataIndex: 'shet_code'		, text : Language.get(''				,'용지코드'), width : 70 , align : 'center',
					},{ dataIndex: 'shet_name'		, text : Language.get('shet_name'		,'용지명')	, width : 150 , align : 'left',
					},{ dataIndex: 'horz_leng'		, text : Language.get('horz_leng'		,'가로')	, width : 60  , align : 'right',
					},{ dataIndex: 'vrtl_leng'		, text : Language.get('vrtl_leng'		,'세로')	, width : 60  , align : 'right',
					}
				],
				listeners: {
					selectionchange: function(cont,records) {
						if(records[0]){
							me.selectRecord(records[0]);
						}
					}
				}
			};
		return grid;
	},
	createClass1: function(){
		var me = this,
		grid = {
			xtype		: 'grid-panel',
			itemId		: 'itemclass1' ,
			flex		: 1 ,
			region		: 'west',
			style		: Const.borderLine.right,
			border		: 0  ,
			split		: true,
			margin		: '0 1 0 0' ,
			defaults	: {style: 'text-align:center'},
			viewConfig	: { loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask }) },
			store		: Ext.create('lookup.popup.store.ItemClassPopup'),
			columns		: [{ text: '대분류' , dataIndex: 'clss_name',  flex : 1  }],
			listeners	: {
				selectionchange : function(grid, records ) {
					var record = records[0],
						class2 = me.down('#itemclass2').getStore()
						class3 = me.down('#itemclass3').getStore(),
						item   = me.down('#shet_popup_master').getStore()
						detail = me.down('#shet_popup_detail').getStore()
					;

					class2.loadData([],false);
					class3.loadData([],false);
					item.loadData([],false);
					detail.loadData([],false);
					if (record) {
						var param = Ext.merge({ hq_id : record.get('hq_id'), prnt_idcd : record.get('clss_idcd') }, me.popup.params);
						class2.load({
							params:{param:JSON.stringify(param)},scope: me,
							callback: function(records, operation, success) {
								if (!success) {
								}
							}
						});
					}
				}
			}
		}
		return grid;
	},
	createClass2: function(){
		var me = this,
		grid = {
			xtype		: 'grid-panel',
			itemId		: 'itemclass2' ,
			flex		: 1,
			style		: Const.borderLine.left + Const.borderLine.right,
			border		: 0  ,
			margin		: '0 1 0 0' ,
			region		: 'west',
			split		: true,
			defaults	: {style: 'text-align:center'},
			viewConfig	: { loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask }) },
			store		: Ext.create('lookup.popup.store.ItemClassPopup'),
			columns		: [{ text: '중분류' , dataIndex: 'clss_name',  flex : 1  }],
			listeners	: {
				selectionchange : function(grid, records ) {
					var record = records[0],
						class3 = me.down('#itemclass3').getStore()
						item   = me.down('#shet_popup_master').getStore(),
						detail = me.down('#shet_popup_detail').getStore()
					;
					class3.loadData([],false);
					item.loadData([],false);
					detail.loadData([],false);
					if (record) {
						var param = Ext.merge({ hq_id : record.get('hq_id'), prnt_idcd : record.get('clss_idcd')}, me.popup.params);
						class3.load({
							params:{param:JSON.stringify(param)},scope: me,
							callback: function(records, operation, success) {
								if (!success) {
								}
							}
						});
					}
				}
			}
		}
		return grid;
	},
	createClass3: function(){
		var me = this,
		grid = {
			xtype		: 'grid-panel',
			itemId		: 'itemclass3' ,
			flex		: 1 ,
			style		: Const.borderLine.left + Const.borderLine.right,
			border		: 0  ,
			margin		: '0 1 0 0' ,
			region		: 'west',
			split		: true,
			defaults	: {style: 'text-align:center'},
			viewConfig	: { loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask }) },
			store		: Ext.create('lookup.popup.store.ItemClassPopup'),
			columns		: [{ text: '소분류' , dataIndex: 'clss_name',  flex : 1  }],
			listeners	: {
				selectionchange : function(grid, records ) {
					var record = records[0],
						lister = me.down('#shet_popup_master').getStore(),
						selectL = me.down('#itemclass1').getSelectionModel().getSelection()[0],
						selectM = me.down('#itemclass2').getSelectionModel().getSelection()[0],
						detail = me.down('#shet_popup_detail').getStore()
					;
					if (!lister.hidden && selectL && selectM) {
						lister.loadData([],false);
						detail.loadData([],false);
						if (record) {
							var param = Ext.merge({ hq_id : record.get('hq_id'), lcls_idcd: selectL.get('clss_idcd'), mcls_idcd: selectM.get('clss_idcd'), scls_idcd : record.get('clss_idcd') }, me.popup.params);
							lister.load({
								params:{param:JSON.stringify(param)},scope: me,
								callback: function(records, operation, success) {
									if (!success) {
									}
								}
							});
						}
					}
				}
			}
		}
		return grid;
	},
	/**
	 * Detail
	 * @return {Ext.grid.Panel} Detail 그리드
	 */
	 createDetail: function(){
			var me = this,
			grid = {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'south',
				itemId		: 'shet_popup_detail',
				flex		: 2,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
				},
				selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store	: Ext.create('lookup.popup.store.ShetPopupDetail'),
				plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
					ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
					trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
					leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
				}],

				paging	: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					]
				},
				columns: [
					{	dataIndex: 'shet_wght'				, text : Language.get('shet_wght'			,'무게(g)'		), width : 70  , align : 'right', xtype: 'numericcolumn',
					},{ dataIndex: 'colr_name'				, text : Language.get('colr_name'			,'컬러'			), width : 100 , align : 'center'
					},{ dataIndex: 'puch_pric'				, text : Language.get('puch_pric'			,'구매단가'		), width :  80, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
					},{ dataIndex: 'esti_pric'				, text : Language.get('esti_pric'			,'견적단가'		), width :  80, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
					},{ dataIndex: 'sale_pric'				, text : Language.get('sale_pric'			,'판매단가'		), width :  80, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
					},{ dataIndex: 'sprt_blwt_pric'			, text : Language.get('sprt_blwt_pric'		,'단면흑백'		), width :  80, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
					},{ dataIndex: 'sprt_colr_pric'			, text : Language.get('sprt_colr_pric'		,'단면컬러'		), width :  80, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
					},{ dataIndex: 'dprt_blwt_pric'			, text : Language.get('dprt_blwt_pric'		,'양면흑백'		), width :  80, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
					},{ dataIndex: 'dprt_colr_pric'			, text : Language.get('dprt_colr_pric'		,'양면컬러'		), width :  80, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
					},{ dataIndex: 'mixx_colr_dprt_pric'	, text : Language.get('mixx_colr_dprt_pric'	,'컬러양면(혼합)'	), width : 100, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
					},{ dataIndex: 'mixx_blwt_dprt_pric'	, text : Language.get('mixx_blwt_dprt_pric'	,'흑백양면(혼합)'	), width : 100, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
					},{ dataIndex: 'mixx_colr_sprt_pric'	, text : Language.get('mixx_colr_sprt_pric'	,'컬러단면(혼합)'	), width : 100, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
					},{ dataIndex: 'mixx_blwt_sprt_pric'	, text : Language.get('mixx_blwt_sprt_pric'	,'흑백단면(혼합)'	), width : 100, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
					}
				],
				listeners: {
					itemdblclick: function(dataview, index, item, e) {
						me.finishAction();
					},
					render: function(){
						var me = this,
							popup	= me.ownerCt.ownerCt
						;
						new Ext.util.KeyMap({
							target: me.getEl(),
							eventName : 'keyup',
							binding: [{ key: Ext.EventObject.ENTER ,fn: function(key,e) { if(popup.enterDelay===true){popup.enterDelay = false;return;}else{me.fireEvent('itemdblclick', me.getView());}}}]
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
		var me = this,
			store = me.down('#itemclass1').getStore(),
			param = Ext.merge( me.down('form').getValues(), me.popup.params , {hq_id : _global.hq_id,line_levl:"1"});
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params   : {param:JSON.stringify(param)},
			scope    : me,
			callback : function(records, operation, success) {
				me.autoShow = !me.autoShow;
				me.show();
			}
		});
	},
	selectRecord: function(record){
		var me = this;
		var detail = me.down('[itemId=shet_popup_detail]'),
			store  = detail.getStore()
		;
		store.load({
			params   : {param:JSON.stringify(record.data)},
			scope    : me,
			callback : function(records, operation, success) {
				me.autoShow = !me.autoShow;
				me.show();
			}
		});
	},
	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function( records ){
		var me            = this,
			selectsMaster = me.down('[itemId=shet_popup_master]').getSelectionModel().getSelection()[0],
			selectsDetail = me.down('[itemId=shet_popup_detail]').getSelectionModel().getSelection()[0]
		;
		if (selectsMaster.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			var merge = Ext.merge(selectsMaster.data,selectsDetail?selectsDetail.data:'');
			selectsMaster.data = merge;
			selects = [selectsMaster,selectsDetail];

			me.setResponse(selects);
		}
	}
});

