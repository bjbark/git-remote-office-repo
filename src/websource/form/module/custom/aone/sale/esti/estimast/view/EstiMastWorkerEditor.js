Ext.define('module.custom.aone.sale.esti.estimast.view.EstiMastWorkerEditor', { extend: 'Axt.form.Editor',
	alias	: 'widget.module-estimast-worker-editor',
	height	: 200,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.aone.sale.esti.estimast.store.EstiMastInvoice' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.items = me.createTabs();
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
			fieldDefaults: { width : 280, labelWidth : 60 },
			items		: [
					{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '5 0 0 5',
						items : [
							{	fieldLabel	: Language.get('acpt_numb', '견적번호' ),
								xtype		: 'textfield',
								name		: 'invc_numb',
								width		: 310,
								allowBlank	: false,
								editable	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
							},{	xtype		: 'textfield',
								name		: 'amnd_degr',
								width		: 30,
								hidden		: true,
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								margin		: '7 5 0 0',
								emptyText	: Const.invalid.emptyValue,
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	fieldLabel	: Language.get('cstm_code', '거래처코드' ),
								name		: 'cstm_idcd',
								pair		: 'cstm_name',
								xtype		: 'popupfield',
								width		: 310,
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								popup		: {
									widget	: 'lookup-cstm-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1' },
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('cstm_idcd'));
										pairField.setValue(records[0].get('cstm_name'));
										var search = Ext.ComponentQuery.query('module-estimast-worker-search')[0];
										var item_popup = search.down('[name=item_code]');
									}
								}
							},{	name : 'cstm_code', xtype	: 'textfield', hidden : true
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
						{	fieldLabel	: Language.get('cstm_name', '거래처명' ),
							name		: 'cstm_name',
							xtype		: 'textfield',
							fieldCls	: 'requiredindex',
							width		: 310,
							allowBlank	: false,
							emptyText	: Const.invalid.emptyValue,
							clearable	: false ,
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
						{	fieldLabel	: Language.get('esti_case_name', '견적명' ),
							name		: 'esti_case_name',
							xtype		: 'textfield',
							width		: 310,
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
						{	fieldLabel	: Language.get('sale_drtr_name', '영업담당자' ),
							name		: 'drtr_name',
							pair		: 'drtr_idcd',
							xtype		: 'popupfield',
							width		: 310,
							editable	: true,
							enableKeyEvents : true,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							clearable	: true ,
							allowBlank	: false,
							popup		: {
								widget	: 'lookup-user-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{	name : 'drtr_idcd', xtype	: 'textfield', hidden : true
						},
					]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
						{	fieldLabel	: Language.get('esti_date', '견적일자' ),
							name		: 'invc_date',
							xtype		: 'datefield',
							width		: 155,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD
						},{	name : 'modi_yorn', xtype	: 'textfield', hidden : true, value : 'n'
						},{	fieldLabel	: Language.get('deli_date', '납기일자' ),
							name		: 'deli_date',
							xtype		: 'datefield',
							width		: 155,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							enableKeyEvents : true,
//							allowBlank	: false,
//							fieldCls	: 'requiredindex',
//							emptyText	: Const.invalid.emptyValue,
							listeners	: {
								change	: function(self, value) {
									var searchDeli = Ext.ComponentQuery.query('module-estimast-worker-search')[0];
									searchDeli.down('[name=deli_date2]').setValue(this.value);
									searchDeli.down('[name=deli_hidn]').setValue(this.value);
								}
							}
						}
					]
				},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
					items : [
						{	fieldLabel	: Language.get('esti_dvcd', '견적구분' ),
							name		: 'esti_dvcd',
							xtype		: 'lookupfield',
							lookupValue	: resource.lookup('esti_dvcd'),
							editable	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							width		: 310,
						}
					]
				}
			]
		};
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this,
			tabs = {
				xtype	: 'tabpanel',
				region	: 'center',
				plain	: true,
				margin	: 0 ,
				items	: [ me.createTab1() ]
			}
		;
		return tabs;
	},

	createTab1 : function() {
		var item = {
			title 			: '견적조건',
			xtype 			: 'form-panel',
			region			: 'west',
			border			: 0,
			bodyStyle		: { padding: '0px' },
			items			: [
				{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '4 0 0 5',
					items : [
						{	fieldLabel	: Language.get('esti_dvcd', '#1' ),
							name		: 'esti_cond_1fst',
							xtype		: 'textfield',
							width		: 615,
							margin		: '4 0 0 -55'
						},{	fieldLabel	: Language.get('esti_dvcd', '#2' ),
							name		: 'esti_cond_2snd',
							xtype		: 'textfield',
							width		: 615,
							margin		: '10 0 0 -55'
						},{	fieldLabel	: Language.get('esti_dvcd', '#3' ),
							name		: 'esti_cond_3trd',
							xtype		: 'textfield',
							width		: 615,
							margin		: '10 0 0 -55'
						},{	fieldLabel	: Language.get('esti_dvcd', '#4' ),
							name		: 'esti_cond_4frt',
							xtype		: 'textfield',
							width		: 615,
							margin		: '10 0 0 -55'
						},{	fieldLabel	: Language.get('esti_dvcd', '#5' ),
							name		: 'esti_cond_5fit',
							xtype		: 'textfield',
							width		: 615,
							margin		: '10 0 0 -55'
						}
					]
				}
			]
		}
	;
	return item;
	}
});
