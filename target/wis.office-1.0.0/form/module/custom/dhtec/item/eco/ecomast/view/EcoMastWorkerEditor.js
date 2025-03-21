Ext.define('module.custom.dhtec.item.eco.ecomast.view.EcoMastWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-ecomast-worker-editor',
	store: 'module.custom.dhtec.item.eco.ecomast.store.EcoMastMaster',
	height	: 150,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.basic.item.eco.ecomast.store.EcoMastInvoice' );
	},
	initComponent: function(config){
		var me = this;

		me.dockedItems = [ me.createWest(), me.createCenter(), me.createEast()] ;
//		me.items = me.createTabs();
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 70  },
			items		: [
				{	fieldLabel	: Language.get('ecod_idcd', 'ECO no' ),
					name		: 'ecod_idcd',
					width		: 335,
					xtype		: 'textfield',
					fieldCls	: 'requiredindex',
					allowBlank	: false,
					emptyText	: Const.invalid.emptyValue,
					readOnly	: true
				},{	layout:'hbox' , border: 0 ,
					items : [
						{	fieldLabel	: Language.get('item_code', '조립품목' ),
							name		: 'item_code',
							pair		: 'prnt_item_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							fieldCls	: 'requiredindex',
							allowBlank	: false,
							emptyText	: Const.invalid.emptyValue,
							width		: 280,
							margin		: '0 5 5 0',
							clearable	: true ,
							listeners	: {
								keydown : function(self, e) {
									/* 엔터키 이벤트를 호출한다. */
									if (e.keyCode == e.ENTER ) {
										/* 팝업창을 호출한다. */
										self.onTriggerClick();
									} else if (e.keyCode == e.ESC) {
										me.attachItem({ clear : true });
									}
								}
							},
							popup		: {
								widget	: 'lookup-item-popup-kortc',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0',acct_bacd:'ECO품목'},
								result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('item_code'));
										pairField.setValue(records[0].get('item_idcd'));
										var search = Ext.ComponentQuery.query('module-ecomast-worker-search')[0]
//											item = search.down('[name=item_code]');
										;
										var panel = nameField.up('form');
										panel2	= Ext.ComponentQuery.query('module-ecomast-worker-editor')[0];
										panel.down('[name=item_name]').setValue(records[0].get('item_name'));
										panel.down('[name=item_spec]').setValue(records[0].get('item_spec'));
										panel.down('[name=crty_bacd_name]').setValue(records[0].get('crty_bacd_name'));
										panel2.down('[name=cstm_spec]').setValue(records[0].get('cstm_spec'));
										panel2.down('[name=cstm_itid]').setValue(records[0].get('cstm_itid'));
										panel2.down('[name=dely_cstm_itid]').setValue(records[0].get('dely_cstm_itid'));
										panel2.down('[name=dely_cstm_spec]').setValue(records[0].get('dely_cstm_spec'));
										panel2.down('[name=cstm_item_name]').setValue(records[0].get('cstm_item_name'));
										panel2.down('[name=dely_cstm_item_name]').setValue(records[0].get('dely_cstm_item_name'));
								}
							},
						},{	name : 'item_code', xtype	: 'textfield', hidden : true
						},{	name : 'prnt_item_idcd', xtype	: 'textfield', hidden : true,
							listeners:{
								change:function(){
									var val = this.getValue();
									if(val==""){
										var panel = this.up('form'),
											panel2	= Ext.ComponentQuery.query('module-ecomast-worker-editor')[0],
											store	= Ext.ComponentQuery.query('module-ecomast-worker-lister')[0].getStore()
										;
										panel.down('[name=item_name]').setValue('');
										panel.down('[name=item_spec]').setValue('');
										panel.down('[name=crty_bacd_name]').setValue('');
										panel2.down('[name=cstm_spec]').setValue('');
										panel2.down('[name=cstm_itid]').setValue('');
										panel2.down('[name=dely_cstm_itid]').setValue('');
										panel2.down('[name=dely_cstm_spec]').setValue('');
										panel2.down('[name=cstm_item_name]').setValue('');
										panel2.down('[name=dely_cstm_item_name]').setValue('');
										store.clearData();
										store.loadData([],false);

									}
								}
							}
						},{ xtype		: 'numericfield',
							name		: 'cofm_degr',
							emptyText	: '1',
							readOnly	: true,
							hidden		: false,
							fieldCls	: 'readonlyfield',
							width		: 50,
							margin		: '1 5 5 0'
						}
					]
				},{	layout:'hbox' , border: 0 ,
					items : [
					{	fieldLabel	: Language.get('item_name', '품명' ),
						xtype		: 'textfield',
						allowBlank	: false,
						readOnly	: true,
						name		: 'item_name',
						width		: 335,
						margin		: '0 5 5 0'
					}
				]
				},{	layout:'hbox' , border: 0 ,
					items : [
					{	fieldLabel	: Language.get('item_spec', '규격' ),
						xtype		: 'textfield',
						allowBlank	: true,
						readOnly	: true,
						name		: 'item_spec',
						width		: 335,
						margin		: '0 5 5 0'
					}
				]
				},{	fieldLabel	: Language.get('crty_bacd', '차종' ),
					xtype		: 'textfield',
					allowBlank	: true,
					readOnly	: true,
					name		: 'crty_bacd_name',
					width		: 335,
					margin		: '0 5 5 0'
				}
			]
		};
		return item;
	},
	createCenter : function () {
		var me	= this,
		item = {
		xtype		: 'form-panel' ,
		dock		: 'left',
		border		: 0,
		bodyStyle	: { padding: '5px' },
		flex		: 100 ,
		fieldDefaults: { width : 280, labelWidth : 70 },
		items		: [
			{	fieldLabel	: Language.get('ecod_date', '변경일자' ),
				name		: 'ecod_date',
				xtype		: 'datefield',
				format		: Const.DATE_FORMAT_YMD_BAR,
				submitFormat: Const.DATE_FORMAT_YMD,
				width		: 170,
				margin		: '0 5 5 0'
			},{	layout:'hbox' , border: 0 ,
				items : [
					,{	fieldLabel	: Language.get('dely_cstm_itid', '(납품처)퓸번' ),
						xtype		: 'textfield',
//						fieldCls	: 'requiredindex',
						allowBlank	: true,
						readOnly	: true,
//						emptyText	: Const.invalid.emptyValue,
						name		: 'dely_cstm_itid',
						width		: 335,
						margin		: '0 5 5 0'
					},{	name : 'item_code', xtype	: 'textfield', hidden : true
					},{ xtype		: 'numericfield',
						name		: 'cofm_degr',
						emptyText	: '1',
						readOnly	: true,
						hidden		: true,
						fieldCls	: 'readonlyfield',
						width		: 50,
						margin		: '1 5 5 0'
						}
					]
			},{	layout:'hbox' , border: 0 ,
				items : [
					{	fieldLabel	: Language.get('dely_cstm_item_name', '(납품처)품명' ),
						xtype		: 'textfield',
//						fieldCls	: 'requiredindex',
						allowBlank	: true,
						readOnly	: true,
//						emptyText	: Const.invalid.emptyValue,
						name		: 'dely_cstm_item_name',
						width		: 335,
						margin		: '0 5 5 0'
					}
				]
			},{	layout:'hbox' , border: 0 ,
				items : [
					{	fieldLabel	: Language.get('dely_cstm_spec', '(납품처)규격' ),
						xtype		: 'textfield',
//						fieldCls	: 'requiredindex',
						allowBlank	: true,
						readOnly	: true,
//						emptyText	: Const.invalid.emptyValue,
						name		: 'dely_cstm_spec',
						width		: 335,
						margin		: '0 5 5 0'
					},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
					}
				]
			},{	layout:'hbox' , border: 0 ,
				items : [
					{	fieldLabel	: Language.get('cofm_yorn', '승인' ),
						name		: 'cofm_yorn',
						xtype		: 'lookupfield',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						lookupValue	:  resource.lookup('yorn' ),
						width		: 170,
						margin		: '0 5 5 0'
					},{	fieldLabel	: Language.get('dtrb_date', '배포일자' ),
						name		: 'dtrb_date',
						xtype		: 'datefield',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						width		: 170,
						margin		: '0 5 5 -10'
					},
				]
			}
		]
	};
	return item;
},

	createEast : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 70 },
			items		: [
				{	fieldLabel	: Language.get('chge_resn', '변경사유' ),
					name		: 'chge_resn',
					width		: 250,
					xtype		: 'lookupfield',
					lookupValue	:  resource.lookup('chge_resn_dvcd' ),
					allowBlank	: true
				},{	layout:'hbox' , border: 0 ,
					items : [
					,{	fieldLabel	: Language.get('cstm_itid', '(고객)퓸번' ),
						xtype		: 'textfield',
						allowBlank	: true,
						readOnly	: true,
						name		: 'cstm_itid',
						width		: 335,
						margin		: '0 5 5 0'
					},{	name : 'item_code', xtype	: 'textfield', hidden : true
					},{ xtype		: 'numericfield',
						name		: 'cofm_degr',
						emptyText	: '1',
						readOnly	: true,
						hidden		: true,
						fieldCls	: 'readonlyfield',
						width		: 50,
						margin		: '0 5 5 0'
						}
					]
					},{	fieldLabel	: Language.get('cstm_item_name', '(고객)품명' ),
						xtype		: 'textfield',
						allowBlank	: true,
						readOnly	: true,
						name		: 'cstm_item_name',
						width		: 335,
						margin		: '0 5 5 0'
					},{	fieldLabel	: Language.get('cstm_spec', '(고객)규격' ),
						xtype		: 'textfield',
						name		: 'cstm_spec',
						readOnly	: true,
						width		: 335,
						margin		: '5 5 5 0'
					},{	fieldLabel	: Language.get('prnt_date', '출력일자' ),
						name		: 'prnt_date',
						xtype		: 'datefield',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						width		: 170,
						margin		: '5 5 5 0'
				},{	name : 'modi_yorn', xtype	: 'textfield', hidden : true, value : 'n'
				}
			]
		};
		return item;
	},

	/**
	 *
	 */

});
