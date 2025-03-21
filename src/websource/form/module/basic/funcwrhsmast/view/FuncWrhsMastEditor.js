Ext.define('module.basic.funcwrhsmast.view.FuncWrhsMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-funcwrhsmast-editor',

	height : 300,
	layout : {
		type: 'border'
	},

	title			: Language.get('unit_idcd','기능창고 정보'),
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
							{	fieldLabel	: Language.get( 'func_wrhs_code','창고코드'),
								name		: 'func_wrhs_code',
								xtype		: 'textfield',
								readOnly	: false,
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
					},{	fieldLabel	: Language.get( 'func_wrhs_name','창고명'),
						name		: 'func_wrhs_name',
						xtype		: 'textfield',
						width		: 340
					},{	fieldLabel	: Language.get( 'mngt_wrhs_dvcd','창고구분'),
						name		: 'mngt_wrhs_dvcd',
						xtype		: 'lookupfield',
						readOnly	: false,
						editable	: false,
						lookupValue	: resource.lookup('mngt_wrhs_dvcd'),
						width		: 340
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 2 0',
						items	: [
							{	fieldLabel	: Language.get( 'istt_insp_yorn','입고검사'),
								name		: 'istt_insp_yorn',
								xtype		: 'lookupfield',
								readOnly	: false,
								editable	: false,
								lookupValue	: resource.lookup('yorn'),
								width		: 170
							},{	fieldLabel	: Language.get( 'poor_yorn','불량'),
								name		: 'poor_yorn',
								xtype		: 'lookupfield',
								readOnly	: false,
								editable	: false,
								lookupValue	: resource.lookup('yorn'),
								width		: 170
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 2 0',
						items	: [
							{	fieldLabel	: Language.get( 'prod_optn_yorn','생산옵션'),
								name		: 'prod_optn_yorn',
								xtype		: 'lookupfield',
								readOnly	: false,
								editable	: false,
								lookupValue	: resource.lookup('yorn'),
								width		: 170
							},{	fieldLabel	: Language.get( 'dlvy_yorn','적송'),
								name		: 'dlvy_yorn',
								xtype		: 'lookupfield',
								readOnly	: false,
								editable	: false,
								lookupValue	: resource.lookup('yorn'),
								width		: 170
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 2 0',
						items	: [
							{	fieldLabel	: Language.get( 'sale_idle_yorn','매출대기'),
								name		: 'sale_idle_yorn',
								xtype		: 'lookupfield',
								readOnly	: false,
								editable	: false,
								lookupValue	: resource.lookup('yorn'),
								width		: 170
							},{	fieldLabel	: Language.get( 'cspc_idle_yorn','수탁대기'),
								name		: 'cspc_idle_yorn',
								xtype		: 'lookupfield',
								readOnly	: false,
								editable	: false,
								lookupValue	: resource.lookup('yorn'),
								width		: 170
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 2 0',
						items	: [
							{	fieldLabel	: Language.get( 'sets_cnst_yorn','세트구성'),
								name		: 'sets_cnst_yorn',
								xtype		: 'lookupfield',
								readOnly	: false,
								editable	: false,
								lookupValue	: resource.lookup('yorn'),
								width		: 170
							},{	fieldLabel	: Language.get( 'issb_poor_yorn','입고불량'),
								name		: 'issb_poor_yorn',
								xtype		: 'lookupfield',
								readOnly	: false,
								editable	: false,
								lookupValue	: resource.lookup('yorn'),
								width		: 170
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 2 0',
						items	: [
							{	fieldLabel	: Language.get( 'prod_cotr_yorn','제품용기'),
								name		: 'prod_cotr_yorn',
								xtype		: 'lookupfield',
								readOnly	: false,
								editable	: false,
								lookupValue	: resource.lookup('yorn'),
								width		: 170
							},{	fieldLabel	: Language.get( 'wdrw_cotr_yorn','회수용기'),
								name		: 'wdrw_cotr_yorn',
								xtype		: 'lookupfield',
								readOnly	: false,
								editable	: false,
								lookupValue	: resource.lookup('yorn'),
								width		: 170
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 2 0',
						items	: [
							{	fieldLabel	: Language.get( 'istt_idle_yorn','입고대기'),
								name		: 'istt_idle_yorn',
								xtype		: 'lookupfield',
								readOnly	: false,
								editable	: false,
								lookupValue	: resource.lookup('yorn'),
								width		: 170
							},{	fieldLabel	: Language.get( 'puch_idle_yorn','매입대기'),
								name		: 'puch_idle_yorn',
								xtype		: 'lookupfield',
								readOnly	: false,
								editable	: false,
								lookupValue	: resource.lookup('yorn'),
								width		: 170
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
						height		: 205,
						flex		: 1
					}
				]
			}
		;
		return item;
	}
});