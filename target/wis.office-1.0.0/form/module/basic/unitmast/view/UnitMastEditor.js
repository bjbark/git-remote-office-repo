Ext.define('module.basic.unitmast.view.UnitMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-unitmast-editor',

	height : 200,
	layout : {
		type: 'border'
	},

	title			: Language.get('unit_idcd','단위코드 정보'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: 'unit_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
		me.callParent(arguments);
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
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	name	: 'unit_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('unit_code','단위코드'),
								name		: 'unit_code',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 280
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat'),
								width		: 55,
								margin		: '0 0 0 5'
							}
						]
					},{	fieldLabel	: Language.get('unit_name','단위명'),
						xtype		: 'textfield',
						name		: 'unit_name',
						width		: 340
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('yorn','폭여부'),
								xtype		: 'lookupfield',
								name		: 'widh_yorn',
								width		: 170,
								lookupValue	: resource.lookup('yorn'),
								hidden		: false
							},{	fieldLabel	: Language.get('yorn','길이여부'),
								xtype		: 'lookupfield',
								name		: 'leng_yorn',
								width		: 170,
								lookupValue	: resource.lookup('yorn'),
								hidden		: false
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('yorn','두께여부'),
								xtype		: 'lookupfield',
								name		: 'tick_yorn',
								width		: 170,
								lookupValue	: resource.lookup('yorn'),
								hidden		: false
							},{	fieldLabel	: Language.get('yorn','평가여부'),
								xtype		: 'lookupfield',
								name		: 'evlt_unit_yorn',
								width		: 170,
								lookupValue	: resource.lookup('yorn'),
								hidden		: false
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('actv_unit_yorn','액티비티단위여부'),
								xtype		: 'lookupfield',
								name		: 'actv_unit_yorn',
								width		: 170,
								margin		: '0 0 5 0',
								lookupValue	: resource.lookup('yorn'),
								hidden		: true
							},{	fieldLabel	: Language.get('dcml_calc_mthd','소수점계산방식'),
								xtype		: 'lookupfield',
								name		: 'dcml_calc_mthd',
								width		: 170,
								margin		: '0 0 0 0',
								lookupValue	: resource.lookup('dcml_calc_mthd'),
								hidden		: false
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
				region	: 'center'	,
				margin	: 0	,
				plain	: true,
				items	: [ me.createTab1()]
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
				border		: 0	,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '',
						name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '메모사항을 적어주십시오',
						height		: 110,
						flex		: 1
					},{	fieldLabel	: '',
						name		: 'lookup_val',
						xtype		: 'textarea',
						readOnly	: true,
						hidden		: true
					}
				]
			}
		;
		return item;
	}
});