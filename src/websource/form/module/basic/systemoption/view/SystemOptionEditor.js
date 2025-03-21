Ext.define('module.basic.systemoption.view.SystemOptionEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-systemoption-editor',

	height : 300,
	layout : {
	type: 'border'
	},

	title			: Language.get('optn_idcd','옵션 정보'),
	collapsible 	: true			,
	collapsed		: true			,
	defaultFocus	: 'dept_idcd'	,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 620,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 60, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
					{	name	: 'prjt_idcd', xtype : 'textfield' , hidden : true
					},{	name	: 'hqof_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('optn_idcd','옵션ID'),
								name		: 'optn_idcd',
								xtype		: 'textfield',
								allowBlank	: false	,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 255
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat'),
								width		: 55,
								margin		: '0 0 0 5'
							},{	fieldLabel	: Language.get('optn_name','옵션명'),
								name		: 'optn_name',
								xtype		: 'textfield',
								allowBlank	: false	,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 280,
								labelWidth	: 80
							},
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('clss_1fst','분류1'),
								xtype		: 'textfield',
								name		: 'clss_1fst',
								width		: 195
							},{	fieldLabel	: Language.get('clss_2snd','분류2'),
								xtype		: 'textfield',
								name		: 'clss_2snd',
								width		: 200
							},{	fieldLabel	: Language.get('clss_3trd','분류3'),
								xtype		: 'textfield',
								name		: 'clss_3trd',
								width		: 200
							}
						]
					},{	fieldLabel	: Language.get('optn_desc','옵션설명'),
						xtype		: 'textarea',
						name		: 'optn_desc',
						width		: 595,
						labelWidth	: 60,
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: '옵션구분',
								xtype		: 'lookupfield',
								name		: 'sysm_optn_dvcd',
								lookupValue	: resource.lookup('sysm_optn_dvcd'),
								width		: 215,
								labelWidth	: 60
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('optn_logc_valu','논리값'),
								xtype		: 'lookupfield',
								name		: 'optn_logc_valu',
								lookupValue	: resource.lookup('yorn'),
								width		: 215,
								labelWidth	: 60
							},{	fieldLabel	: Language.get('optn_yorn_valu','여부값'),
								xtype		: 'lookupfield',
								name		: 'optn_yorn_valu',
								lookupValue	: resource.lookup('yorn'),
								width		: 180,
								labelWidth	: 90
							},{	fieldLabel	: Language.get('optn_nmbr_valu','숫자값'),
								xtype		: 'numericfield',
								name		: 'optn_nmbr_valu',
								width		: 200,
								labelWidth	: 90
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('optn_char_valu','문자값'),
								name		: 'optn_char_valu',
								xtype		: 'textfield',
								width		: 215
							},{	fieldLabel	: Language.get('optn_scpe_from','범위부터'),
								xtype		: 'numericfield',
								name		: 'optn_scpe_from',
								width		: 180,
								labelWidth	: 90
							},{	fieldLabel	: Language.get('optn_scpe_util','범위까지'),
								xtype		: 'numericfield',
								name		: 'optn_scpe_util',
								width		: 200,
								labelWidth	: 90
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('optn_etcc','옵션기타'),
								name		: 'optn_etcc',
								xtype		: 'textfield',
								width		: 595
							}
						]
					}
				]
			}
		;
		return item;
	},
		createTabs : function () {
			var me = this,
				item = {
					xtype	: 'tabpanel',
					region	: 'center',
					margin	: 0,
					plain	: true,
					items	: [ me.createTab1() ]
				}
			;
			return item;
		},

		createTab1 : function() {
			var me = this,
				item = {
					title		: Language.get('user_memo','메모사항'),
					xtype		: 'form-panel',
					layout		: 'hbox',
					border		: 0,
					bodyStyle	: { padding: '5px' },
					items		: [
						{	fieldLabel	: '' 		,
							name		: 'user_memo',
							xtype		: 'textarea',
							emptyText	: '메모사항을 적어주십시오',
							height		: 167,
							flex		: 1
						},{	fieldLabel	: '' ,
							name		: 'lookup_val',
							xtype		: 'textarea'  ,
							readOnly	: true,
							hidden		: true
						}
					]
				}
			;
			return item;
	}
});