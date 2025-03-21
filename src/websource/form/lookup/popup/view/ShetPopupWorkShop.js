/**
 */
Ext.define('lookup.popup.view.ShetPopupWorkShop', { extend: 'Axt.popup.Search',

	alias	: 'widget.lookup-shet-popup-workshop',
	store	: 'lookup.popup.store.ShetPopup',
	requires: [
		'lookup.popup.view.ClassPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.VendPopup',
		'lookup.popup.view.ItemCodeAddPopup',
		'lookup.popup.view.ItemCodeAddPopup2',
		'lookup.popup.view.ItemCodeAddPopup3'
	],
	title	: Language.get('item_popup','용지 찾기'),
	closable: true,
	autoShow: true,

	width	: 1580,
	height	: 550,
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
				dockedItems : [ me.searchForm() ],
				items		: [ me.createTabs() ]
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


	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(){
			var me = this,
			grid = {
				xtype		: 'grid-panel',
				header		: false,
				split		: true,
				itemId		: 'grid1',
				flex		: 0.9,
				border		: 1,
				height		: 460,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask }),
					markDirty: false,
				},
				plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
				cls			: tema,
				selModel: {	selType: 'checkboxmodel', mode : 'SINGLE' },
				store	: Ext.create(me.store),
				paging	: {
					xtype	: 'grid-paging',
					items	: [
						{	xtype	: 'fieldcontainer',
							layout	: { type: 'vbox', align: 'stretch' },
							width	: 50,
							margin	: '3 0 3 0',
							items	: [

							]
						},'-',
						'->' ,
					]
				},
				columns: [
					{	xtype: 'rownumberer'		, width:  50, text: '순번', align : 'center', hidden : _global.hq_id.toUpperCase() == 'N1000NBOLT'? false : true,
					},{	dataIndex:	'shet_idcd'	, width:  50, align : 'center' , text: Language.get( 'shet_idcd'      , ''	) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'line_stat' ), value : '2',
						hidden	: true,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[0].width = 80;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return resource.lookup( 'shet_idcd' )[value][2];
						}
					},{	dataIndex:	'shet_code'	, width:  70, align : 'center' , text: Language.get( 'shet_code'      , '용지코드'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 110;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						},
					},{	dataIndex:	'shet_name'	, align : 'center' , text: Language.get( 'shet_name'      , '용지명'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 220;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						},
						width : 120
					},{	dataIndex:	'horz_leng'	, align : 'right'   , text: Language.get( 'horz_leng'      , '가로'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[2].width = 500;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						},
						width: 80
					},{	dataIndex:	'vrtl_leng'	, width: 80, align : 'right'   , text: Language.get( 'vrtl_leng'      , '세로'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[5].width = 260;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						},
					}
				],
				listeners: {
					selectionchange : function(grid, records ) {
						var record = records[0],
						class2 = me.down('#grid2').getStore()
					;
					class2.loadData([],false);
						if (record) {
							me.selectRecord( record);

							var param =  Ext.merge({ shet_idcd : record.get('shet_idcd')}, me.popup.params);
							console.log(me.popup.params.line_stat);
							class2.load({
								params:{param:JSON.stringify(param)},scope: me,
								callback: function(records, operation, success) {
									if (!success) {
									}
								}
							});
						}
					}
				},
			};
		return grid;
	},

	createTab:function(){
		var me = this,
		item = {
			xtype		: 'panel',
			header		: false,
			width		: 20,
			height		: 460,
			border		: 0,
			items	: [

			]
		}
		return item;
	},
	createTabs : function () {
		var me = this,
			tabs = {
				xtype	: 'panel',
				region	: 'center',
				layout	: 'hbox',
				plain	: true,
				margin	: 0 ,
				items	: [ me.createGrid(),me.createTab(),me.createGrid2(),me.createGrid3() ]
			}
		;
		return tabs;
	},
	createGrid2: function(){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				itemId		: 'grid2',
				header		: false,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
				},
				flex		: 2.5,
				height		: 460,
				border		: 1,
				cls			: tema,
				selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'  },
				paging	: {
					xtype	: 'grid-paging',
					items	: [
						'-' ,'->',
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					],pagingButton : false
				},
				store		: Ext.create( 'lookup.popup.store.ShetPopupWorkShop' ),
				itemId		: 'grid2',
				name		: 'grid2',
				columns: [
					{	dataIndex:	'shet_wght'	, width:  50, align : 'center'    , text: Language.get( ''      , '무게(g)'	),
					},{	dataIndex:	'puch_pric'	, width:  95, align : 'right'     , text: Language.get( ''      , '구매단가'), xtype:'numericcolumn'
					},{	dataIndex:	'esti_pric'	, width:  95, align : 'right'     , text: Language.get( ''      , '견적단가'), xtype:'numericcolumn'
					},{	dataIndex:	'sale_pric'	, width:  95, align : 'right'     , text: Language.get( ''      , '판매단가'), xtype:'numericcolumn'
					},{	dataIndex:	'dprt_blwt_pric', width:  95, align : 'right' , text: Language.get( ''      , '흑백양면'), xtype:'numericcolumn'
					},{	dataIndex:	'sprt_blwt_pric', width:  95, align : 'right' , text: Language.get( ''      , '흑백단면'), xtype:'numericcolumn'
					},{	dataIndex:	'dprt_colr_pric', width:  95, align : 'right' , text: Language.get( ''      , '컬러양면'), xtype:'numericcolumn'
					},{	dataIndex:	'sprt_colr_pric', width:  95, align : 'right' , text: Language.get( ''      , '컬러단면'), xtype:'numericcolumn'
					},{	dataIndex:	'mixx_colr_dprt_pric', width:  95, align : 'right' , text: Language.get( ''      , '컬러양면(혼합)'), xtype:'numericcolumn'
					},{	dataIndex:	'mixx_blwt_dprt_pric', width:  95, align : 'right' , text: Language.get( ''      , '흑백양면(혼합)'), xtype:'numericcolumn'
					},{	dataIndex:	'mixx_blwt_sprt_pric', width:  95, align : 'right' , text: Language.get( ''      , '컬러단면(혼합)'), xtype:'numericcolumn'
					},{	dataIndex:	'sprt_colr_pric', width:  95, align : 'right' , text: Language.get( ''      , '흑백단면(혼합)'), xtype:'numericcolumn'
					},{	dataIndex:	'shet_name'	, width:  95, align : 'right'     , text: Language.get( ''      , '용지명'),hidden : true
					},{	dataIndex:	'line_seqn'	, flex : 1, align : 'left'        , text: Language.get( ''      , '순번'	),hidden:true,
					},{	dataIndex:	'shet_idcd'	, flex : 1, align : 'left'        , text: Language.get( ''      , '상위품명'	),hidden:true,
					}
				],
				listeners: {
					selectionchange : function(grid, records ) {
						var record = records[0],
						class2 = me.down('#grid3').getStore()
					;
					class2.loadData([],false);
						if (record) {
							me.selectRecord( record);

							var param =  Ext.merge({ shet_idcd : record.get('shet_idcd') }, me.popup.params);
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
			};
		return grid;
	},

	createGrid3: function(){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				itemId		: 'grid3',
				header		: false,
				hidden		: true,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
				},
				flex		: 10,
				height		: 460,
				border		: 1,
				cls			: tema,
				selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'  },
				store		: Ext.create( 'lookup.popup.store.ShetPopupWorkShop' ),
				itemId		: 'grid3',
				name		: 'grid3',
				columns: [
					{	dataIndex:	'shet_wght'	, width:  50, align : 'center' , text: Language.get( ''      , '무게(g)'	),hidden:true,
					},{	dataIndex:	'puch_pric'	, width:  95, align : 'right'  , text: Language.get( ''      , '구매단가'),hidden:true,
					},{	dataIndex:	'esti_pric'	, width:  95, align : 'right'  , text: Language.get( ''      , '견적단가'),hidden:true,
					},{	dataIndex:	'sale_pric'	, width:  95, align : 'right'  , text: Language.get( ''      , '판매단가'),hidden:true,
					},{	dataIndex:	'dprt_blwt_pric'	, width:  95, align : 'right'  , text: Language.get( ''      , '흑백양면'),hidden:true,
					},{	dataIndex:	'sprt_blwt_pric'	, width:  95, align : 'right'  , text: Language.get( ''      , '흑백단면'),hidden:true,
					},{	dataIndex:	'dprt_colr_pric'	, width:  95, align : 'right'  , text: Language.get( ''      , '컬러양면'),hidden:true,
					},{	dataIndex:	'sprt_colr_pric'	, width:  95, align : 'right'  , text: Language.get( ''      , '컬러단면'),hidden:true,
					},{	dataIndex:	'mixx_colr_dprt_pric'	, width:  95, align : 'right'  , text: Language.get( ''      , '컬러양면(혼합)'),hidden:true,
					},{	dataIndex:	'mixx_blwt_dprt_pric'	, width:  95, align : 'right'  , text: Language.get( ''      , '흑백양면(혼합)'),hidden:true,
					},{	dataIndex:	'mixx_colr_sprt_pric'	, width:  95, align : 'right'  , text: Language.get( ''      , '컬러단면(혼합)'),hidden:true,
					},{	dataIndex:	'mixx_blwt_sprt_pric'	, width:  95, align : 'right'  , text: Language.get( ''      , '흑백단면(혼합)'),hidden:true,
					},{	dataIndex:	'shet_idcd'	, flex : 1, align : 'left'   , text: Language.get( ''      , '상위품명'	),hidden:true,
					}
				],
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
				if (success && me.popup.option.direct_result && records.length === 1) {
				} else {
					if(!me.autoShow) {
						me.autoShow = !me.autoShow;
						me.show();
					}
				}
			}
		});
	},

	selectDetail: function(param){
		var me = this,
			store2 = me.down('#grid2').getStore();

		store2.load({
			params		: {
				token	: _global.token_id,
				param	:	JSON.stringify({
					shet_idcd		: param,
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd
				})
			}
		});
	},

	selectRecord : function( record ) {
		var me = this;
		if (record) {
			me.choiceRecord = record ;
			base = me.down('#grid2');
		}
	},

	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function( records ){
		var me = this,
			owner	= Ext.ComponentQuery.query('lookup-shet-popup-workshop')[0],
			grid	= owner.down('#grid3'),
			grid2	= owner.down('#grid2'),
			store	= grid.getStore();
			store2	= grid.getStore();
			selects = store.data.items,
			selects2 = store2.data.items,
			request = []
		;
		console.log(selects2);
		if ( selects.xtype ){
			selects2 = grid.getSelectionModel().getSelection() ;
		}
		if (selects2.length === 0) {
			resource.showError( '무게를 선택해주세요.'  );
		} else {
			if (me.popup.apiurl && me.popup.apiurl.master) {
				Ext.each( selects , function( eachrow ){
					request.push({
						shet_idcd : eachrow.get('shet_idcd'),
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

