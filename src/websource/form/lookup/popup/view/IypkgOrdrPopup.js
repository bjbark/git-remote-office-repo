Ext.define('lookup.popup.view.IypkgOrdrPopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.lookup-iypkg-ordr-popup',
	store	: 'lookup.popup.store.IypkgOrdrPopup',
	requires: [
		'lookup.popup.view.ProdPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup'
	],
	title	: Language.get('ordr_popup','주문서 찾기'),
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

		//  즉시 검색 되는 경우
		if ((me.popup.values.barcode && me.popup.values.barcode != '') || (me.popup.values.item_name && me.popup.values.item_name != '')) {
			autoSelect = true ;
			if (me.popup.option.direct_result) {
				console.debug( )
				me.autoShow = false;
			}
		}
		if(me.popup.params.find){
			autoSelect = true;
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
											emptyText	: '조회할 주문일자 또는 거래처명을 입력하세요.',
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
			items :	[
				{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 5 0',
						items : [
							{	fieldLabel	: Language.get('inqy_term','조회기간'),
								xtype		: 'betweenfield',
								name		: 'invc1_date',
								pair		: 'invc2_date',
								width		: 165,
								margin		: '0 0 0 0',
								root		: true,
								value		: new Date(),
								clearable	: true
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'invc2_date',
								pair		: 'invc1_date',
								labelWidth	: 15,
								width		: 110,
								value		: new Date(),
								clearable	: true
							},{	xtype		: 'lookupfield',
								name		: 'line_clos',
								margin		: '0 0 0 10',
								editable	: false,
								lookupValue	: resource.lookup('search_all').concat(resource.lookup('line_clos' )),
								value		: '0',
								width		: 55,
							},{	fieldLabel	: Language.get('cstm_name','거래처'),
								xtype		: 'popupfield',
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								width		: 250,
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-cstm-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name		: 'cstm_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('prod_name','품목'),
								xtype		: 'popupfield',
								name		: 'prod_name',
								pair		: 'prod_idcd',
								width		: 250,
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-prod-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'제품' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('prod_name'));
										pairField.setValue(records[0].get('prod_idcd'));
									}
								}
							},{	name		: 'prod_idcd', xtype : 'textfield' , hidden : true
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
					{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'		, '상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos'), hidden : true
					},{	dataIndex: 'invc_numb'		, width: 120, align : 'center'	, text: Language.get('acpt_numb'		, '수주번호'	)
					},{	dataIndex: 'invc_date'		, width: 100, align : 'center'	, text: Language.get('acpt_date'		, '수주일자'	)
					},{	dataIndex: 'cstm_name'		, width: 200, align : 'left'	, text: Language.get('cstm_name'		, '거래처명'	)
					},{	dataIndex: 'cstm_code'		, width: 100, align : 'center'	, text: Language.get('cstm_code'		, '거래처코드'	) , hidden : true
					},{	dataIndex: 'prod_name'		, width: 200, align : 'left'	, text: Language.get('prod_name'		, '제품명'		)
					},{	dataIndex: 'deli_date'		, width: 100, align : 'center'	, text: Language.get('deli_date'		, '납기일자'	)
					},{	dataIndex: 'pcod_numb'		, width: 120, align : 'center'	, text: Language.get('pcod_numb'		, '고객주문번호'	)
					},{	dataIndex: 'user_memo'		, width: 200, align : 'left'	, text: Language.get('user_memo'		, '비고'		)
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
			params		: {param:JSON.stringify(param)},
			scope		: me,
			callback	: function(records, operation, success) {
				if(records){
					me.down('grid').getSelectionModel().select(0);
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

