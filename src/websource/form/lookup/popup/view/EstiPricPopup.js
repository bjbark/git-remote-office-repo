Ext.define('lookup.popup.view.EstiPricPopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.lookup-estipric-popup',
	store	: 'lookup.popup.store.EstiPricPopup',
	requires: [
		'lookup.popup.view.ClassPopup',
	],
	title	: Language.get('estipric_popup','단가 찾기'),
	closable: true,
	autoShow: true,

	width	: 1050,
	height	: 508,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this,
			autoSelect = false
			tema	= ''
		;
		if (!me.popup.values){ me.popup.values ={}; }
		if (!me.popup.option){ me.popup.option ={}; }
		if(me.popup.params.tema){
			tema = me.popup.params.tema+'grid';
		}

		//  품목이 즉시 검색 되는 경우
		if ((me.popup.values.barcode && me.popup.values.barcode != '') || (me.popup.values.item_name && me.popup.values.item_name != '')) {
			autoSelect = true ;
			if (me.popup.option.direct_result) {
				console.debug( )
				me.autoShow = false;
			}
		}
		if(me.popup.params.item_name){
			autoSelect=true;
		}

		me.items = [me.createForm(tema)];
		me.callParent(arguments);

		/* 공통품목수신 버튼 표시 여부 */
		if ( me.popup.option.bonsa_item_recv ) {
			me.down('[name=commonBtn]').setVisible(true);
		}
		if	(_global.options.item_popp_auto || me.popup.params.find || me.popup.params.item_name) {
			me.selectAction();
		}
		/* 품목의 조회 조건을 숨기고자 하는 목록을 받아 숨김 처리 한다. */
		var hiddenlist = me.popup.hidden;
		Ext.each(hiddenlist, function(record, index) {
			me.down('[name='+record+']').setVisible(false);
		});
		/* 품목 추가 버튼 */
		if	(me.popup.params.add == '1') {
			me.down('[name=inputBtn]').setVisible(true);
		}
	},

	/**
	 * 화면폼
	 */
	 createForm: function(tema){
		var	me   = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.searchForm(tema) ],
				items		: [ me.createGrid(tema) ]
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
			cls			: tema,
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
	 createGrid: function(){
			var me = this,
			grid = {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
				},
				cls			: tema,
				selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store	: Ext.create(me.store),
				plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
			        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
			        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
			        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
			    } ],

				paging	: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					]
				},
				columns: [
					{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'견적번호'	) , width :  90 , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'견적일자'	) , width :  90 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'	) , width : 120 , align : 'left'
					},{ dataIndex: 'ttle'			, text : Language.get('ttle'			,'주문명'	) , width : 150 , align : 'left'
					},{ dataIndex: 'lcls_name'		, text : Language.get('lcls_name'		,'대분류'	) , width : 100 , align : 'left'
					},{ dataIndex: 'mcls_name'		, text : Language.get('mcls_name'		,'중분류'	) , width : 100 , align : 'left'
					},{ dataIndex: 'scls_name'		, text : Language.get('scls_name'		,'소분류'	) , width : 100 , align : 'left'
					},{ dataIndex: 'shet_name'		, text : Language.get('shet_name'		,'용지명'	) , width : 120 , align : 'left'
					},{ dataIndex: 'esti_pric'		, text : Language.get('esti_pric'		,'견적단가'	) , width :  80 , align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
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
			param = Ext.merge( me.down('form').getValues(), me.popup.params , {hq_id : _global.hq_id});

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
				if (success && me.popup.option.direct_result && records.length === 1) {
					me.finishAction(records);
				} else {
					if(!me.autoShow) {
						me.autoShow = !me.autoShow;
						me.show();
					}
				}
			}
		});
	},

	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function( records ){
		var me = this,
			selects = records ? records : me.down('grid').getSelectionModel().getSelection(),
			request = []
		;

		if ( selects.xtype ){
			selects = me.down('grid').getSelectionModel().getSelection() ;
		}

		if (selects.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			if (me.popup.apiurl && me.popup.apiurl.master) {

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
			} else{
				me.setResponse(selects);
			}
		}
	}
});

