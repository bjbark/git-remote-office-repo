Ext.define('lookup.popup.view.ShetWghtPopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.lookup-shetwght-popup',
	store	: 'lookup.popup.store.ShetWghtPopup',
	title	: Language.get('shet_popup','용지 코드 목록'),
	closable: true,
	autoShow: true,

	width	: 400,
	height	: 600,
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
				items		: [ me.createTabs()]
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
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					]
				},
				columns: [
					{	dataIndex: 'shet_idcd'			, text : Language.get('shet_idcd'			,'용지ID')		, width :  70 , align : 'center',hidden : true,
					},{ dataIndex: 'colr_name'			, text : Language.get('colr_name'			,'컬러')			, width : 150 , align : 'left',
					},{ dataIndex: 'shet_wght'			, text : Language.get('shet_wght'			,'무게(g)')		, width : 70 , align : 'center',
					},{ dataIndex: 'puch_pric'			, text : Language.get('puch_pric'			,'구매단가')		, width :  60 , align : 'right',
					},{ dataIndex: 'esti_pric'			, text : Language.get('esti_pric'			,'견적단가')		, width :  60 , align : 'right',
					},{ dataIndex: 'sale_pric'			, text : Language.get('sale_pric'			,'판매단가')		, width :  60 , align : 'right',
					},{ dataIndex: 'dprt_blwt_pric'		, text : Language.get('dprt_blwt_pric'		,'흑백양면')		, width :  60 , align : 'right',
					},{ dataIndex: 'sprt_blwt_pric'		, text : Language.get('sprt_blwt_pric'		,'흑백단면')		, width :  60 , align : 'right',
					},{ dataIndex: 'dprt_colr_pric'		, text : Language.get('dprt_colr_pric'		,'컬러양면')		, width :  60 , align : 'right',
					},{ dataIndex: 'sprt_colr_pric'		, text : Language.get('sprt_colr_pric'		,'컬러단면')		, width :  60 , align : 'right',
					},{ dataIndex: 'mixx_colr_dprt_pric', text : Language.get('mixx_colr_dprt_pric'	,'컬러양면(혼합)')	, width :  60 , align : 'right',
					},{ dataIndex: 'mixx_blwt_dprt_pric', text : Language.get('mixx_blwt_dprt_pric'	,'흑백양면(혼합)')	, width :  60 , align : 'right',
					},{ dataIndex: 'mixx_colr_sprt_pric', text : Language.get('mixx_colr_sprt_pric'	,'컬러단면(혼합)')	, width :  60 , align : 'right',
					},{ dataIndex: 'mixx_blwt_sprt_pric', text : Language.get('mixx_blwt_sprt_pric'	,'흑백단면(혼합)')	, width :  60 , align : 'right',
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
			store = me.down('grid').getStore(),
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
	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me		= this,
			panel	= me.down('grid'),
			selects	= panel.getSelectionModel().getSelection(),
			request	= []
		;
		if (selects.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			if (me.popup.apiurl && me.popup.apiurl.master) {
				Ext.each( selects , function( eachrow ){
					request.push({
						mnbr_idcd	: eachrow.get('mmbr_idcd' )
					});
				});
				var store = Ext.create( me.store );
				param = Ext.merge( me.popup.params, {
					records : request
				});
				store.getProxy().api.read = me.popup.apiurl.master ;
				store.load({
					params	: {param:JSON.stringify(param)},
					scope	: me,
					callback: function(records, operation, success) {
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

