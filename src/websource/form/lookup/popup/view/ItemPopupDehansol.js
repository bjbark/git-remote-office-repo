/**
 */
Ext.define('lookup.popup.view.ItemPopupDehansol', { extend: 'Axt.popup.Search',

	alias	: 'widget.lookup-item-popup-dehansol',
	store	: 'lookup.popup.store.ItemPopupDehansol',
	requires: [
		'lookup.popup.view.ClassPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.VendPopup',
		'lookup.popup.view.ItemCodeAddPopup'
	],
	title	: Language.get('','표준 품목 찾기'),
	closable: true,
	autoShow: true,

	width	: 450,
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

		me.items = [me.createForm(tema)];
		me.callParent(arguments);


		/* 공통품목수신 버튼 표시 여부 */
		if ( me.popup.option.bonsa_item_recv ) {
			me.down('[name=commonBtn]').setVisible(true);
		}
		if	(_global.options.item_popp_auto || me.popup.params.find) {
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
											emptyText	: '품목코드 또는 품명을 입력하세요....',
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
				paging	: {
					xtype	: 'grid-paging',
					items	: [
						{	xtype	: 'fieldcontainer',
							layout	: { type: 'vbox', align: 'stretch' },
							width	: 50,
							margin	: '3 0 3 0',
							items	: [
								{	text	: '<span class="write-button">추가</span>',
									name	: 'inputBtn',
									xtype	: 'button',
									handler	: function () {
										resource.loadPopup({
											widget : 'module-itemcode-add-popup',
											params : { acct_bacd	: me.popup.params.acct_bacd },
											result : function(records) {
												Ext.ComponentQuery.query('#search')[0].down('[name=find_name]').setValue(records.values.item_code);
												me.selectAction();
											}
										});
									},
									cls		: 'button1-style',
									hidden	: true
								}
							]
						},'-',
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					]
				},
				columns: [
					{	dataIndex:	'line_stat'	, width:  50, align : 'center' , text: Language.get( 'line_stat'      , '상태'	) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'line_stat' ),
						hidden	: true,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[0].width = 80;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return resource.lookup( 'line_stat' )[value][1];
						}
					},{	dataIndex:	'rpst_item_idcd'	, width:  95, align : 'center' , text: Language.get( ''      , '표준품목코드'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 220;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						}
					},
//					{	dataIndex:	'cstm_name'	, width:  80, align : 'left'   , text: Language.get( 'cstm_name'      , '거래처명'	),
//						renderer: function(value, meta){
//							if(me.popup.params.tema){
//								this.columns[2].width = 160;
//								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
//							}
//							return value;
//						}
//					},
//					{	dataIndex:	'item_make_dvcd'	, width: 180, align : 'left'   , text: Language.get( ''      , '제판종류'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'item_make_dvcd' ),
//						renderer: function(value, meta){
//							if(me.popup.params.tema){
//								this.columns[3].width = 500;
//								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
//							}
//							return resource.lookup( 'item_make_dvcd' )[value][1];
//						}
//					},
//					{	dataIndex:	'item_type_dvcd'	, width: 150, align : 'left'   , text: Language.get( ''      , '필름유제'), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'item_type_dvcd' ),
//						renderer: function(value, meta){
//							if(me.popup.params.tema){
//								this.columns[4].width = 260;
//								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
//							}
//							return resource.lookup( 'item_type_dvcd' )[value][1];
//						}
//					},
//					{	dataIndex:	'mesh_name'	, width:  80, align : 'left'   , text: Language.get( ''      , '망사명'	),
//						renderer: function(value, meta){
//							if(me.popup.params.tema){
//								this.columns[5].width = 120;
//								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
//							}
//							return value;
//						}
//					},
//					{	dataIndex:	'diag_sqre'	, width:  80, align : 'left'   , text: Language.get( ''      , '대각평각'	),
//						renderer: function(value, meta){
//							if(me.popup.params.tema){
//								this.columns[6].width = 120;
//								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
//							}
//							return value;
//						}
//					},
					{	dataIndex:	'plmk_size_horz'	, width:  70, align : 'right' , text: Language.get( ''      , '가로'), xtype: 'numericcolumn',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[7].width = 220;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return Ext.util.Format.number(value, '0,000') ;
						}
					},{	dataIndex:	'plmk_size_vrtl'	, width:  70, align : 'right' , text: Language.get( ''      , '세로'), xtype: 'numericcolumn',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[8].width = 220;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return Ext.util.Format.number(value, '0,000') ;
						}
					},{	dataIndex:	'sale_pric'	, width:  80, align : 'right'   , text: Language.get( ''      , '판매단가'	), xtype: 'numericcolumn',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[9].width = 120;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
							}
							return Ext.util.Format.number(value, '0,000') ;
						}
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
				Ext.each( selects , function( eachrow ){
					request.push({
						item_idcd : eachrow.get('item_idcd')
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
//	임시로 막아둔다.. 향후 조건에 따라 조정 가능 함(2019.06.10 pbj)
//								records.forEach( function( data ) {
//									if ( !Ext.isEmpty( data.get('item_ds') ) ) { /* item_ds 값이 있으면 */
//										data.set('item_name', data.get('item_ds') );
//									} else {
//										var brand_nm = data.get('brand_nm');
//										if (brand_nm) {
//											if (brand_nm != ""){
//												data.set('item_name', data.get('brand_nm')+"/"+data.get('item_name') );
//											}
//										}
//									}
//								});
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

