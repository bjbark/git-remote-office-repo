Ext.define('module.workshop.sale.sale.coltwork.view.ColtOrderPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-coltorder-popup',
//	store		: 'module.custom.sjflv.sale.export.ordermast2.store.OrderMast2PackingPopup',

	title		: '수금 등록',
	closable	: true,
	autoShow	: true,
	width		: 761 ,
	height		: 435,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
//		me.selection();
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
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.UPDATE.text, iconCls: Const.UPDATE.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var	me	= this,
			form = {
				xtype		: 'form-panel' ,
				bodyStyle	: { padding: '5px' },
				flex		: 1 ,
				height		: 400,
				fieldDefaults	: { width : 200, labelWidth : 80, labelSeparator : '' , },
				items			: [
					{	xtype : 'fieldset', layout: 'vbox', border		: 0, region:'north',
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('','고객'),
										name		: '',
										pair		: '',
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										clearable	: true ,
										labelWidth	: 60,
										width		: 180,
										popup		: {
											widget	: 'lookup-cstm-popup',
											select	: 'SINGLE',
											params	: { stor_grp : _global.stor_grp, line_stat : '0' },
											result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get('cstm_name'));
												pairField.setValue(records[0].get('cstm_idcd'));
											}
										}
									},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('','수금일자'),
										xtype		: 'datefield',
										name		: '',
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										labelWidth	: 60,
										width		: 160,
									},{	fieldLabel	: Language.get('','담당자'),
										name		: '',
										pair		: '',
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										clearable	: true ,
										labelWidth	: 60,
										width		: 170,
										margin		:'0 0 0 20',
										popup		: {
											widget	: 'lookup-cstm-popup',
											select	: 'SINGLE',
											params	: { stor_grp : _global.stor_grp, line_stat : '0' },
											result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get('cstm_name'));
												pairField.setValue(records[0].get('cstm_idcd'));
											}
										}
									},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('','미수금액'),
										xtype		: 'numericfield'	,
										name		: '',
										lookupValue	: resource.lookup(''),
										labelWidth	: 60,
										width		: 160,
									},{	xtype		: 'label',
										text		: '수금액',
										style		: { color : 'Blue' },
										width		: 37,
										margin		: '2 0 0 48',
									},{	xtype		: 'numericfield',
										name		: '',
										width		: 80,
									},{	xtype		: 'label',
										text		: '할인',
										style		: { color : 'Blue' },
										width		: 27,
										margin		: '2 0 0 23',
									},{	xtype		: 'numericfield',
										name		: '',
										width		: 75,
									},{	xtype		: 'label',
										text		: '잔액',
										style		: { color : 'Red' },
										width		: 27,
										margin		: '2 0 0 23',
									},{	xtype		: 'numericfield',
										name		: '',
										width		: 75,
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 5',
								items	: [
									{	fieldLabel	: Language.get('','수금방법'),
										xtype		: 'lookupfield'	,
										name		: '',
										lookupValue	: resource.lookup(''),
										labelWidth	: 60,
										width		: 180,
										margin		: '0 0 0 10'
									},{	fieldLabel	: Language.get('','근거'),
										xtype		: 'textfield'	,
										name		: '',
										lookupValue	: resource.lookup(''),
										labelWidth	: 60,
										width		: 270,
										margin		: '0 0 0 0',
									}
								]
							}
						]
					},{
						xtype   : 'grid-panel',
						header  : false,
						region  : 'center',
						height	: 260,
						viewConfig: {
							loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
						},
						selModel: {selType:'cellmodel'},
						features: [{ftype :'grid-summary'}],
						plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
//						store    : Ext.create( me.store ),
						columns: [
							{   text : Language.get( ''	,'항번'		),   dataIndex: ''	, width: 40
							},{   text : Language.get( ''	,'일자'	),   dataIndex: ''	, width: 70
							},{   text : Language.get( ''	,'대분류' 		),   dataIndex: ''	, width: 70
							},{   text : Language.get( ''	,'중분류'		),   dataIndex: ''	, width: 70
							},{   text : Language.get( ''	,'페이지'	),   dataIndex: ''	, width: 55 ,
							},{   text : Language.get( ''	,'권'	),   dataIndex: ''	, width: 30 ,
							},{   text : Language.get( ''	,'공급가'	),   dataIndex: ''	, width: 80 ,
							},{   text : Language.get( ''	,'부가세'	),   dataIndex: ''	, width: 80 ,
							},{   text : Language.get( ''	,'합계금액'	),   dataIndex: ''	, width: 80 ,
							},{   text : Language.get( ''	,'수금액'	),   dataIndex: ''	, width: 80 ,
							},{   text : Language.get( ''	,'미수잔액'	),   dataIndex: ''	, width: 80 ,
							},
						],
					}
				]
			};
		return form;
	},
	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			grid	= me.down('grid'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			store	= grid.getStore(),
			master	= Ext.ComponentQuery.query('module-sjflv-export-ordermast2-lister-master')[0]
		;
		if(store.getUpdatedRecords().length>0 || me.params.pckg_unit != values.pckg_unit || me.params.pckg_totl_wigt != values.pckg_totl_wigt){
			if(me.params.pckg_unit != values.pckg_unit || me.params.pckg_totl_wigt != values.pckg_totl_wigt){
				Ext.Ajax.request({
//					url		: _global.api_host_info + "/system/custom/sjflv/sale/export/ordermast2/set/packing.do",
					params	: {
						token : _global.token_id,
						param : JSON.stringify(values)
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
					},
					failure : function(result, request) {
						Ext.Msg.error(result.mesage);
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			}
			store.sync({
			});
			master.getStore().reload();
			baseform.ownerCt.close();
		}
	},

//	selection:function(){
//		var	me		= this,
//			grid	= me.down('grid')
//		;
//		if(me.params.invc_numb){
//			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
//
//			mask.show();
//
//			grid.select({
//				callback:function(records, operation, success) {
//					if (success) {
//					} else { me.pocket.editor().getForm().reset(true);
//					}
//					mask.hide();
//				}, scope:me
//			}, { invc_numb : me.params.invc_numb});
//
//		}
//	}
});
