/**
 */
Ext.define('lookup.popup.view.PurcOrdrPopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.lookup-purcordr-popup',
	store	: 'lookup.popup.store.PurcOrdrPopup',
	requires: [
		'lookup.popup.view.ClassPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.VendPopup'
	],
	title	: Language.get('purc_ordr_popup','발주서 찾기'),
	closable: true,
	autoShow: true,

	width	: 900,
	height	: 508,
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


		//  품목이 즉시 검색 되는 경우
		if ((me.popup.values.barcode && me.popup.values.barcode != '') || (me.popup.values.item_name && me.popup.values.item_name != '')
			|| (me.popup.params.find)) {
			autoSelect = true ;
			if (me.popup.option.direct_result) {
				console.debug( )
				me.autoShow = false;
			}
		}
		me.items = [me.createForm()];
		me.callParent(arguments);


		if (autoSelect) {
			me.selectAction();
		}
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
				items		: [ me.createGrid() ]
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
											emptyText	: '발주번호 또는 거래처를 입력하세요....',
											value	: me.popup.params.find,
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
					xtype : 'container'  , layout: 'border', border : 0 , height: 3  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
				}
			],
			layout: { type: 'vbox' },
//			fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
			items :	[
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('item_name','품목코드'),
							xtype		: 'popupfield',
							name		: 'item_name',
							pair		: 'item_idcd',
							labelWidth	: 60,
							width		: 275,
							editable	: true,
							enableKeyEvents : true,
							clearable	: true,
							popup		: {
								select  : 'SINGLE',
								widget  : 'lookup-item-popup',
								params  : { stor_grp : _global.stor_grp , line_stat : '0' , acct_bacd : me.popup.params.acct_bacd },
								result  : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('item_name'));
									pairField.setValue(records[0].get('item_idcd'));
								}
							},
							listners	: {
								change	: function() {
									var val = this.getValue();
									if(val=='' || val == null){
										me.down('[name=item_idcd]').reset();
									}
								}
							}
						},{	name		: 'item_idcd', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('cstm_name','거래처'),
							xtype		: 'popupfield',
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							labelWidth	: 60,
							clearable	: true,
							editable	: true,
							enableKeyEvents : true,
							width		: 275,
							popup		: {
								select  : 'SINGLE',
								widget  : 'lookup-cstm-popup',
								params  : { stor_grp : _global.stor_grp , line_stat : '0' , cstm_dvcd : '구매' },
								result  : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							},
							listners	: {
								change	: function() {
									var val = this.getValue();
									if(val=='' || val == null){
										me.down('[name=cstm_idcd]').reset();
									}
								}
							}
						},{	name		: 'cstm_idcd', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('line_stat','상태'),
							xtype		: 'lookupfield',
							name		: 'line_stat1',
							labelWidth	:  30,
							width		: 120,
							lookupValue	: resource.lookup('search_all').concat( resource.lookup('line_stat' )),
							value		: '',
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('offr_term','발주기간'),
							xtype		: 'betweenfield',
							name		: 'fr_dt',
							pair		: 'to_dt',
							labelWidth	: 60,
							width		: 160,
							margin		: '0 0 0 2',
							root		: true,
							value		: ''
						},{	xtype		: 'betweenfield',
							fieldLabel	:'~',
							name		: 'to_dt',
							pair		: 'fr_dt',
							labelWidth	: 15,
							width		: 115,
							value		: ''
						}
					]
				}
			]
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
				selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store	: Ext.create(me.store),
				paging	: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					]
				},
				columns: [
					{	dataIndex:	'invc_numb'		, width:  80, align : 'center' , text: Language.get( 'offr_numb'      , '발주번호')
					},{	dataIndex:	'invc_date'		, width:  80, align : 'center' , text: Language.get( 'offr_date'      , '발주일자')
					},{	dataIndex:	'cstm_name'		, width: 150, align : 'center' , text: Language.get( 'cstm_name'      , '거래처')
					},{	dataIndex:	'item_name'		, width: 180, align : 'left'   , text: Language.get( 'item_name'      , '품명'	)
					},{	dataIndex:	'item_spec'		, width: 150, align : 'left'   , text: Language.get( 'item_spec'      , '품목규격')
					},{	dataIndex:	'offr_qntt'		, width:  80, align : 'right'  , text: Language.get( 'offr_qntt'      , '발주수량'), xtype: 'numericcolumn'	, format : '#,##0'  , font_color : Const.COLOR.FONT.inv_amt , summaryType : 'sum' ,
					},{	dataIndex:	'dlvy_qntt'		, width:  80, align : 'right'  , text: Language.get( 'dlvy_qntt'      , '납품수량'), xtype: 'numericcolumn'	, format : '#,##0'  , font_color : Const.COLOR.FONT.inv_amt , summaryType : 'sum' ,
					},{	dataIndex:	'not_dlvy_qntt'	, width:  80, align : 'right'  , text: Language.get( 'not_dlvy_qntt'  , '미납잔량'), xtype: 'numericcolumn'	, format : '#,##0'  , font_color : Const.COLOR.FONT.inv_amt , summaryType : 'sum' ,
					},{	dataIndex:	'item_idcd'		, width:  80, align : 'left'   , text: Language.get( 'item_idcd'      , '품목id'	), hidden : true
					},{	dataIndex:	'istt_wrhs_idcd', width:  80, align : 'left'   , text: Language.get( 'istt_wrhs_name' , '입고창고ID'), hidden : true
					},{	dataIndex:	'istt_wrhs_name', width:  80, align : 'left'   , text: Language.get( 'istt_wrhs_idcd' , '입고창고'	), hidden : true
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
		console.log(param);
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params   : {param:JSON.stringify(param)},
			scope    : me,
			callback : function(records, operation, success) {
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
						full_invc_numb : eachrow.get('invc_numb') + eachrow.get('line_seqn')
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

