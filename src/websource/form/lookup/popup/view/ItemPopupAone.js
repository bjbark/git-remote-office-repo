Ext.define('lookup.popup.view.ItemPopupAone', { extend: 'Axt.popup.Search',

	alias	: 'widget.lookup-item-popup-aone',
	store	: 'lookup.popup.store.ItemPopupAone',
	requires: [
		'lookup.popup.view.ClassPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.VendPopup',
		'lookup.popup.view.ItemCodeAddPopup2',
		'lookup.popup.view.ItemCodeAddPopupAone'

	],
	title	: Language.get('item_popup','품목 찾기'),
	closable: true,
	autoShow: true,

	width	: 910,
	height	: 600,
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
											margin	: '4 10 0 0',
											style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
										},{	fieldLabel	: Language.get('wrhs_name','창고'),
											xtype		: 'popupfield',
											margin		: '3 10 0 0',
											editable	: true,
											enableKeyEvents : true,
											name		: 'wrhs_name',
											pair		: 'wrhs_idcd',
											clearable	: true,
											labelWidth	: 25,
											width		: 150,
											hidden		: me.popup.params.tble_name == 'acpt'? true : false,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-wrhs-popup',
												params	: { stor_grp : _global.stor_grp , line_stat : '0',mngt_wrhs_dvcd:'0001' },
												result	: function(records, nameField, pairField) {
													nameField.setValue(records[0].get('wrhs_name'));
													pairField.setValue(records[0].get('wrhs_idcd'));
												}
											},
										},{	name : 'wrhs_idcd', xtype : 'textfield' , hidden : true,
										},{	fieldLabel	: Language.get('_name','계정구분'),
											xtype		: 'popupfield',
											itemID		: 'acct_bacd_name',
											name		: 'acct_bacd_name',
											pair		: 'acct_bacd',
											labelWidth	: 50,
											width		: 150,
											margin		: '3 10 0 0',
											editable	: false,
											clearable	: true,
											allowBlank	: true,
											enableKeyEvents : true,
											hidden		: me.popup.params.tble_name == 'acpt'? false : true,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-base-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '1102'},
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('base_name'));
													pairField.setValue(records[0].get('base_name'));
												}
											},
										},{	name : 'acct_bacd', xtype : 'textfield' , hidden : true,
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
						{	text	: '<span class="write-button">추가</span>',
									name	: 'inputBtn',
									xtype	: 'button',
									width	: 50,
									handler	: function (grid, rowIndex, colIndex, item, e, record) {
										var	mod = '',item_name = '',
											mngt_sbsc_valu = '',
											mngt_sbsc_idcd = '',
											acct_name='',acct=''
										;
										if(me.popup.params.mngt_sbsc_valu){
											mngt_sbsc_valu= me.popup.params.mngt_sbsc_valu;
										}
										if(me.popup.params.mngt_sbsc_idcd){
											mngt_sbsc_idcd = me.popup.params.mngt_sbsc_idcd;
										}
										if(me.popup.params.acct_name){
											acct_name = me.popup.params.acct_name
										}
										if(me.popup.params.acct){
											acct = me.popup.params.acct
										}
											mod = 'module-itemcode-add-popup2';
										item_name = Ext.ComponentQuery.query('#search')[0].down('[name=find_name]').getValue();

										resource.loadPopup({
											widget : mod,
											params : { acct	: acct, item_name : item_name,mngt_sbsc_valu:mngt_sbsc_valu,mngt_sbsc_idcd:mngt_sbsc_idcd,acct_name:acct_name },
											result : function(records) {
												Ext.ComponentQuery.query('#search')[0].down('[name=find_name]').setValue(records.values.item_code);
												me.selectAction();
											}
										});

									},
									cls		: 'button1-style',
									hidden	: true
								},'-',
								{	text	: '<span class="write-button">추가</span>',
									name	: 'inputBtn',
									xtype	: 'button',
									width	: 50,
									handler	: function (grid, rowIndex, colIndex, item, e, record) {
										var	mod = '',item_name = '',
											mngt_sbsc_valu = '',
											mngt_sbsc_idcd = '',
											acct_name='',acct=''
										;
										if(me.popup.params.mngt_sbsc_valu){
											mngt_sbsc_valu= me.popup.params.mngt_sbsc_valu;
										}
										if(me.popup.params.mngt_sbsc_idcd){
											mngt_sbsc_idcd = me.popup.params.mngt_sbsc_idcd;
										}
										if(me.popup.params.acct_name){
											acct_name = me.popup.params.acct_name
										}
										if(me.popup.params.acct){
											acct = me.popup.params.acct
										}
											mod = 'module-itemcode-add-popup-aone';
										item_name = Ext.ComponentQuery.query('#search')[0].down('[name=find_name]').getValue();

										resource.loadPopup({
											widget : mod,
											params : { acct	: acct, item_name : item_name,mngt_sbsc_valu:mngt_sbsc_valu,mngt_sbsc_idcd:mngt_sbsc_idcd,acct_name:acct_name },
											result : function(records) {
												Ext.ComponentQuery.query('#search')[0].down('[name=find_name]').setValue(records.values.item_code);
												me.selectAction();
											}
										});

									},
									cls		: 'button1-style',
									hidden: _global.hqof_idcd.toUpperCase()!= 'N1000A-ONE'
								},'-',
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					]
				},
				columns: [
					{	dataIndex:	'line_stat'	, width:  50, align : 'center' , text: Language.get( 'line_stat'      , '상태') , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'line_stat' ),
						hidden	: true,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[0].width = 80;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return resource.lookup( 'line_stat' )[value][1];
						}
					},{	dataIndex:	'acct_bacd_name', width:  75, align : 'center' , text: Language.get( 'acct_bacd_name'      , '계정구분'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[0].width = 110;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'zone_idcd'	, width: 120, align : 'center' , text: Language.get( 'zone_idcd'      , '구역ID'), hidden:true,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 220;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'zone_name'	, width: 120, align : 'center' , text: Language.get( 'zone_idcd'      , '구역'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 220;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'item_code'	, width: 120, align : 'center' , text: Language.get( 'item_code'      , '품목코드'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 220;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'item_name'	, width: 150, align : 'center'   , text: Language.get( 'item_name'      , '품명'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[2].width = 500;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'item_spec'	, width: 150, align : 'center'   , text: Language.get( 'item_spec'      , '규격'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[3].width = 260;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'modl_name'	, width: 100, align : 'center'   , text: Language.get( 'modl_name'      , '모델명'	), hidden : true,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[4].width = 160;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'lcls_name'	, width:  110, align : 'center'   , text: Language.get( 'lcls_name'      , '대분류'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[5].width = 140;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'mcls_name'	, width:  110, align : 'center'   , text: Language.get( 'mcls_name'      , '중분류'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[6].width = 140;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'scls_name'	, width:  140, align : 'center'   , text: Language.get( 'scls_name'      , '소분류'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[7].width = 140;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'item_idcd'	, width:  80 , align : 'center'   , text: Language.get( 'item_idcd'      , '품목id'	), hidden : true,
					},{	dataIndex:	'clss_desc'	, width:  140, align : 'center'   , text: Language.get( 'clss_desc'      , '수리품목'	), hidden : true,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[9].width = 140;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'max_pric'	, width:  140, align : 'center'   , text: Language.get( 'max_pric'      , '단가'		), hidden : true,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[10].width = 140;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'istt_wrhs_name'	, width:  140, align : 'center'   , text: Language.get( 'istt_wrhs_name'      , '입고창고'		),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[11].width = 140;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'istt_wrhs_idcd'	, width:  140, align : 'center'   , text: Language.get( 'istt_wrhs_idcd'      , '입고창고'		), hidden :true,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[11].width = 140;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
							}
							return value;
						}
					},
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
						item_idcd : eachrow.get('item_idcd'),
						item_code : eachrow.get('item_code')
					});
				});
				var store = Ext.create(me.store ),
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
				if(me.onwer){
					var grid       = me.onwer.up('grid'),
						onwerStore = grid.getStore(),
						chk        = 0
					;
					onwerStore.each(function(records){
						if(selects[0].get('item_code')==records.get('item_code')){
							chk = 1;
						}
					})
					if(chk){
						Ext.Msg.alert('알림','이미 중복된 품목이 추가되어있습니다.')
					}else{
						me.setResponse(selects);
					}
				}else{
					me.setResponse(selects);
				}
			}
		}
	}
});

