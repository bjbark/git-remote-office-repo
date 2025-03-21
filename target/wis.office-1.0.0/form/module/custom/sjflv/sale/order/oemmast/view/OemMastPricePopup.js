Ext.define('module.custom.sjflv.sale.order.oemmast.view.OemMastPricePopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-sjflv-oemmast-price-popup',
	store: 'module.custom.sjflv.sale.order.oemmast.store.OemMastPrice',

	title		: 'OEM 생산비 등록',
	closable	: true,
	autoShow	: true,
	width		: 930 ,
	height		: 410,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this
			tema	= '';
		;
		if(me.popup.params.tema){
			tema = me.popup.params.tema+'grid';
		}

		me.items = [me.createForm()];
		me.callParent(arguments);
		me.selectAction();
	},


	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			itemId		: 'masterform',
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
					         ,'->' ,
						'-',
						{	fieldLabel	: '제품임가공비',
							xtype		: 'numericfield',
							name		: 'make_cost',
							value		: me.popup.params.make_cost,
							margin		: '10 10 0 0',
							width		: 150,
//							fieldCls	: 'readonlyfield',
//							readOnly	: true,
						},
						'-',

						{ xtype: 'button' , text : Const.UPDATE.text, iconCls: Const.UPDATE.icon , scope: me, handler: me.finishAction	,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close			,cls: 'button-style' }
					]
				}
			],
			items : [me.searchForm(),me.createGrid() ]
		};
		return form;
	},

	searchForm: function(){
		var me = this,
			form = {
			xtype		: 'form-search',
			cls			: tema,
			region		: 'north',
			id			: 'search',
			viewConfig: {
				loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
			},
			bodyStyle	: { padding: '0', background: 'transparent' },
			dockedItems	: [
				{
					xtype	: 'toolbar',
					dock	: 'top',
					items	: [
						{
							xtype	: 'container',
							border	: false,
							region	: 'center',
							height	: 30,
							margin	: '0 0 0 1',
							items	: [
								{	xtype	: 'fieldcontainer',
									region	: 'center',
									height	: 10,
									margin	: '0 0 0 0',
									items	: [
									{	fieldLabel	: Language.get('', '인수처명' ),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										margin		: '5 0 0 0',
										name		: 'rcpt_cmpy_name',
										pair		: 'rcpt_cmpy_idcd',
										handler		: me.selectAction,
										itemId		: 'initfocused' ,
										width		: 250,
										labelWidth	: 75,
										clearable	: false,
										value       : me.params.rcpt_cmpy_name,
										listeners	: {
											keydown : function(self, e) {
												/* 엔터키 이벤트를 호출한다. */
												if (e.keyCode == e.ENTER ) {
													/* 팝업창을 호출한다. */
													self.onTriggerClick();
												} else if (e.keyCode == e.ESC) {
													me.attachItem({ clear : true });
												}
											},
											change:function(){
												var	form  = me.up('[itemId=masterform]'),
//												grid = me.up('[itemId=masterGrid]')
												store = me.down('grid').getStore()
												;
												if(this.getValue()==""){
													Ext.create( me.store ).clearData();
													Ext.create( me.store ).loadData([],false);
												}
											}
										},
										popup		: {
											select	: 'SINGLE',
											widget	: 'lookup-cstm-popup',
											option	: { direct_result : true },
											params	: { stor_grp : _global.stor_grp, line_stat : '0', oem_company : 'Y' },
											result	: function(records, nameField, pairField) {
												nameField.setValue(records[0].get('cstm_name'));
												pairField.setValue(records[0].get('cstm_idcd'));
												
												if (records[0].get('cstm_idcd') != me.params.rcpt_cmpy_idcd) {
													me.down('[name=rcpt_cmpy_new]').setValue("Y");
												}
												
												Ext.create( me.store ).clearData();
												Ext.create( me.store ).loadData([],false);
												store = me.down('grid').getStore(),
												param = Ext.merge( me.down('form').getValues(), {hq_id : _global.hq_id
												});
												
												var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
												mask.show();

												store.load({
													 params:{param:JSON.stringify(param)}, scope:me,
													 callback:function(records, operation, success) {
														 if(records){
														 }
														 // 인수처변경 시 임가공비를 계산한다.
														 Ext.Ajax.request({
															url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/sale/order/oemmast/get/makeCost.do',
															method		: "POST",
															params		: {
																token	: _global.token_id,
																param	: Ext.encode({
																	invc_numb : me.params.invc_numb,
																	line_seqn : me.params.line_seqn
																})
															},
															success : function(response, request) {
																var object = response,
																result = Ext.decode(object.responseText)
																;
																if (result.success) {
																	me.down('[name=make_cost]').setValue(result.records[0].make_cost);
																} else {
																	Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
																}
															},
															failure : function(response, request) {
																resource.httpError(response);
															},
															callback : function() {
															}
														});
														 
														 mask.hide();
													}
												});
											},
										}
									},{	name : 'invc_numb', xtype : 'textfield', value : me.params.invc_numb, hidden : true
									},{	name : 'line_seqn', xtype : 'textfield', value : me.params.line_seqn, hidden : true
									},{	name : 'prnt_item_idcd', xtype	: 'textfield', value : me.params.item_idcd, hidden : true
									},{	name : 'revs_numb', xtype : 'textfield', value : me.params.revs_numb, hidden : true
									},{	name : 'rcpt_cmpy_idcd', xtype : 'textfield',  value : me.params.rcpt_cmpy_idcd, hidden : true
									},{	name : 'rcpt_cmpy_new', xtype : 'textfield',  value : me.params.rcpt_cmpy_new, hidden : true
									}
									]
								},
							]
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


	createGrid: function(){
		var  me = this,
			grid = {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'center',
				itemId		: 'masterGrid',
				height		: 300,
				viewConfig: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
				},
				selModel	:{ selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				features: [{  ftype: 'grid-summary'  } ],
				store		: Ext.create( me.store ),
				plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 }],
				columns : [
					{	dataIndex:	'assi_seqn'		, width:  40,  text: Language.get('','순번'	) , align:'center'
					},{	dataIndex:	'acct_bacd'		, width:  60,  text: Language.get('', '계정구분'	), align:'center'
					},{	dataIndex:	'item_code'		, width:  100, text: Language.get('', '품목코드'	), align:'center'
					},{	dataIndex:	'item_name'		, width:  150, text: Language.get('', '품명'	) , align:'left'
					},{	dataIndex:	'item_spec'		, width:  170, text: Language.get('', '규격'	) , align:'left'
					},{	dataIndex:	'mixx_rate'		, width:  90,  text: Language.get('', '배합비'	) , align:'right', xtype: 'numericcolumn',
					},{	dataIndex:	'istt_qntt'		, width:  90,  text: Language.get('', '사용량'	) , align:'right', xtype: 'numericcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								change	: function(self, value) {
									var grid = self.up('grid'),
										store = grid.getStore(),
										selection = grid.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
										istt_amnt = (Number(value) * Number(grid.view.getSelectionModel().selected.items[0].get('istt_qntt'))).toFixed(6)
									;
									grid.view.getSelectionModel().selected.items[0].set('istt_amnt', istt_amnt);
								},
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);

										grid.plugins[0].startEdit(row, grid.columns[7]);
									}
								}
							}
						}
					},{	dataIndex:	'istt_pric'		, width:  90,  text: Language.get('', '단가'	) , align:'right', xtype: 'numericcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								change	: function(self, value) {
									var grid = self.up('grid'),
										store = grid.getStore(),
										selection = grid.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
										istt_amnt = (Number(value) * Number(grid.view.getSelectionModel().selected.items[0].get('istt_qntt'))).toFixed(6)
									;
									grid.view.getSelectionModel().selected.items[0].set('istt_amnt', istt_amnt);
								},
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);

										grid.plugins[0].startEdit(row, grid.columns[8]);
									}
								}
							}
						}
					},{	dataIndex:	'istt_amnt'		, width:  90, text: Language.get('', '금액'	) , align:'right', xtype: 'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return grid;
	},

	finishAction: function(){
		var me    = this,
			store = me.down('grid').getStore(),
			master = Ext.ComponentQuery.query('module-sjflv-oemmast-lister-master')[0],
			param = Ext.merge( me.down('form').getValues(), {hq_id : _global.hq_id} )
		;
		
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();

		// 제품원료비, 제품임가공비 처리
		var bsmt_pric = 0;
		store.each(function(record){
			bsmt_pric += record.get("istt_amnt");
			record.setDirty();
		});
			
		var make_cost = param.make_cost;
			
		store.data.items[0].set("bsmt_pric", bsmt_pric);
		store.data.items[0].set("make_cost", make_cost);

		store.sync({
			success	: function(response, request) {
				me.close();
			},
			failure : function(operation){ },
			callback: function(operation){
				mask.hide();
				master.getStore().reload();
			}
		});
	},

	selectAction:function(){
		var	me		= this,
			grid	= me.down('grid')
		;
		if(me.params.rcpt_cmpy_idcd){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			grid.select({
				callback:function(records, operation, success) {
					if (success) {
					}
					mask.hide();
				}, scope:me
			}, { rcpt_cmpy_idcd : me.params.rcpt_cmpy_idcd , orig_rcpt_cmpy_idcd : me.params.rcpt_cmpy_idcd , invc_numb :me.params.invc_numb , line_seqn: me.params.line_seqn});		
		}
	}
});
