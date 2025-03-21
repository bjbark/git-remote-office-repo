/**
 */
Ext.define('lookup.popup.view.ItemPopupV3', { extend: 'Axt.popup.Search',

	alias	: 'widget.lookup-item-popup-v3',
	store	: 'lookup.popup.store.ItemPopupV3',
	requires: [
		'lookup.popup.view.ClassPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.VendPopup',
		'lookup.popup.view.ItemCodeAddPopup'
	],
	title	: Language.get('item_popup','품목 찾기'),
	closable: true,
	autoShow: true,
	width	: 950,
	height	: 700,
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
		if(me.popup.params.find){
			autoSelect=true;
		}
		me.items = [me.createForm(tema)];
		me.callParent(arguments);


		/* 공통품목수신 버튼 표시 여부 */
		if ( me.popup.option.bonsa_item_recv ) {
			me.down('[name=commonBtn]').setVisible(true);
		}
		if	(_global.options.item_popp_auto) {
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
				items		: [ me.createGrid(tema), me.createTab(tema) ]
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
			region		: 'north',
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
										},{	fieldLabel	: Language.get('cstm','거래처'),
											xtype		: 'popupfield',
											name		: 'cstm_name',
											pair		: 'cstm_idcd',
											clearable	: true,
											labelWidth	: 35,
											width		: 200,
											margin		: '3 5 0 0',
											value		: (me.popup.params.cstm_name?me.popup.params.cstm_name:''),
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-cstm-popup',
												params	: { stor_grp : _global.stor_grp , line_stat : '0' },
												result	: function(records, nameField, pairField) {
													nameField.setValue(records[0].get('cstm_name'));
													pairField.setValue(records[0].get('cstm_idcd'));
												}
											}
										},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true, value : (me.popup.params.cstm?me.popup.params.cstm:''),
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
				flex		: 2,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
				},
				cls			: tema,
				selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store	: Ext.create(me.store),
				paging	: {
					xtype	: 'grid-paging'
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
					},{	dataIndex:	'item_code'	, width:  85, align : 'center' , text: Language.get( 'item_code'      , '품목코드'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 220;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'item_name'	, width: 180, align : 'left'   , text: Language.get( 'item_name'      , '품명'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[2].width = 500;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'item_spec'	, width: 100, align : 'left'   , text: Language.get( 'item_spec'      , '품목규격'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[3].width = 260;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'modl_name'	, width: 100, align : 'left'   , text: Language.get( 'modl_name'      , '모델명'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[4].width = 160;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'lcls_name'	, width:  80, align : 'left'   , text: Language.get( 'lcls_name'      , '대분류'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[5].width = 120;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'mcls_name'	, width:  80, align : 'left'   , text: Language.get( 'mcls_name'      , '중분류'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[6].width = 120;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'scls_name'	, width:  80, align : 'left'   , text: Language.get( 'scls_name'      , '소분류'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[7].width = 120;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'item_idcd'	, width:  80, align : 'left'   , text: Language.get( 'item_idcd'      , '품목id'	), hidden : true
					},{	dataIndex:	'cstm_name'	, width: 100, align : 'left'   , text: Language.get( 'cstm_name'      , '거래처명'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[9].width = 120;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'cstm_idcd'	, width:  80, align : 'left'   , text: Language.get( 'cstm_idcd'      , '거래처id'	), hidden : true
					},{	dataIndex:	'puch_pric'	, width:  80, align : 'left'   , text: Language.get( 'puch_pric'      , '단가'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[10].width = 120;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
							}
							return value;
						}
					}
				],
				listeners: {
					itemdblclick: function(dataview, index, item, e) {
						param= index.data.item_idcd;
//						console.log(index.data.item_idcd);
						me.selectDetail(param);
					}
				}
			};
		return grid;
	},

	createTab: function(){
		var me = this;
			tab  = {
				xtype		: 'tab-panel',
				header		: false,
				region		: 'south',
				cls			: tema,
				flex		: 2,
				items	: [
					{	title	: '수주',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype	: 'grid-panel',
								region	: 'center',
								style	: Const.borderLine.top,
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
								store		: Ext.create( 'lookup.popup.store.ItemPopupV3_1' ),
								itemId		: 'grid2',
								name		: 'grid2',
								columns: [
									{	dataIndex:	'acpt_numb'	, text: Language.get( 'acpt_numb'			, '수주번호'), width : 140, align : 'center'
									},{	dataIndex:	'acpt_date'	, text: Language.get( 'acpt_date'			, '수주일자'), width : 130, align : 'center',
										renderer:function(val){
											var value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
											return value;
										}
									},{	dataIndex:	'cstm_name'		, text: Language.get( 'cstm_name'			, '거래처	'), width : 170, align : 'left'
									},{	dataIndex:	'invc_qntt'		, text: Language.get( 'invc_qntt'			, '수주수량'), width : 100, align : 'right'
									},{	dataIndex:	'invc_pric'		, text: Language.get( 'invc_pric'			, '단가')	  , width : 100, align : 'right'
									},{	dataIndex:	'invc_amnt'		, text: Language.get( 'invc_amnt'			, '금액')	  , width : 100, align : 'right'
									},{	dataIndex:	'dlvy_qntt'		, text: Language.get( 'dlvy_qntt'			, '납품수량'), width : 100, align : 'right'
									},{	dataIndex:	'acpt_stat_dvcd', text: Language.get( 'acpt_stat_dvcd'		, '상태')	  , width :  94, align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'acpt_stat_dvcd' ),
									}
								]
							}
						]
					},{	title	: '생산',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype	: 'grid-panel',
								region	: 'center',
								style	: Const.borderLine.top,
								store		: Ext.create( 'lookup.popup.store.ItemPopupV3_2' ),
								itemId		: 'grid3',
								name		: 'grid3',
								paging	: {
									xtype	: 'grid-paging',
									items	: [
										'->' ,
										{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
										{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
									]
								},
								columns: [
									{	dataIndex:	'pdod_date'	, text: Language.get( 'pdod_date'      , '지시일자'), width: 150, align : 'center',
										renderer:function(val){
											var value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
											return value;
										}
									},{	dataIndex:	'wkod_numb'	, text: Language.get( 'wkod_numb'      , '지시번호'), width: 170, align : 'center'
									},{	dataIndex:	'prod_date'	, text: Language.get( 'prod_date'      , '생산일자'), width: 150, align : 'center',
										renderer:function(val){
											var value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
											return value;
										}
									},{	dataIndex:	'wkct_name'	, text: Language.get( 'wkct_name'      , '공정명') , width: 133, align : 'center'
									},{	dataIndex:	'prod_qntt'	, text: Language.get( 'prod_qntt'      , '작업수량'), width: 110, align : 'right'
									},{	dataIndex:	'good_qntt'	, text: Language.get( 'good_qntt'      , '양품수량'), width: 110, align : 'right'
									},{	dataIndex:	'poor_qntt'	, text: Language.get( 'poor_qntt'      , '불량수량'), width: 110, align : 'right'
									}
								]
							}
						]
					},{	title	: '출하/반품',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype	: 'grid-panel',
								region	: 'center',
								style	: Const.borderLine.top,
								store		: Ext.create( 'lookup.popup.store.ItemPopupV3_3' ),
								itemId		: 'grid4',
								name		: 'grid4',
								paging	: {
									xtype	: 'grid-paging',
									items	: [
										'->' ,
										{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
										{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
									]
								},
								columns: [
									{	dataIndex:	'invc_date'	, text: Language.get( 'invc_date'      , '출하일자'), width: 140, align : 'center',
										renderer:function(val){
											var value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
											return value;
										}
									},{	dataIndex:	'invc_numb'	, text: Language.get( 'invc_numb'      , '출하번호'), width: 170, align : 'center'
									},{	dataIndex:	'cstm_name'	, text: Language.get( 'cstm_name'      , '거래처'	), width: 205, align : 'left'
									},{	dataIndex:	'ostt_qntt'	, text: Language.get( 'ostt_qntt'      , '출하수량'), width: 100, align : 'right'
									},{	dataIndex:	'sale_pric'	, text: Language.get( 'sale_pric'      , '단가')	 , width: 100, align : 'right'
									},{	dataIndex:	'ttsm_amnt'	, text: Language.get( 'ttsm_amnt'      , '금액')	 , width: 100, align : 'right'
									},{	dataIndex:	'dvcd'		, text: Language.get( 'dvcd'           , '구분')	 , width:  90, align : 'center', xtype: 'lookupcolumn'  , lookupValue : [['0','출고'],['1','반품']]
									}
								]
							}
						]
					}
				]
			}
	return tab;
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
//		store.load({
//			params   : {param:JSON.stringify(param)},
//			scope    : me,
//			callback : function(records, operation, success) {
//				if (success && me.popup.option.direct_result && records.length === 1) {
//					me.finishAction(records);
//				} else {
//					if(!me.autoShow) {
//						me.autoShow = !me.autoShow;
//						me.show();
//					}
//				}
//			}
//		});
		store.load({
			params:{param:JSON.stringify(param)}, scope:me,
			callback:function(records, operation, success) {
				 if(records){
						me.down('grid').getSelectionModel().select(0);
				}
			}
		});

	},

	selectDetail: function(param){
		var me = this,
			store2 = me.down('#grid2').getStore();
			store3 = me.down('#grid3').getStore();
			store4 = me.down('#grid4').getStore();
		console.log(param);

		store2.load({
			params		: {
				token	: _global.token_id,
				param	:	JSON.stringify({
					item_idcd	: param,
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd
				})
			}
		});

		store3.load({
			params		: {
				token	: _global.token_id,
				param	:	JSON.stringify({
					item_idcd	: param,
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd
				})
			}
		});

		store4.load({
			params		: {
				token	: _global.token_id,
				param	:	JSON.stringify({
					item_idcd	: param,
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd
				})
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

