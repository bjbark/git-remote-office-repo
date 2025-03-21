Ext.define('module.basic.delylcalmast.view.DelyLcalMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-delylcalmast-editor',

	height : 210,
	layout : {
		type: 'border'
	},

	title			: Language.get('','운송지역 정보'),
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
					{	name	: 'lcal_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get( 'lcal_code','지역코드'),
								name		: 'lcal_code',
								xtype		: 'textfield',
								readOnly	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 280
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat'),
								width		: 55,
								margin		: '0 0 0 5',
								value		: '0',
							}
						]
					},{	fieldLabel	: Language.get( 'lcal_name','지역명'),
						name		: 'lcal_name',
						xtype		: 'textfield',
						width		: 340
					},{	fieldLabel	: Language.get( 'trnt_cost_1fst','운송비#1'),
						name		: 'trnt_cost_1fst',
						xtype		: 'numericfield',
						width		: 340,
						listeners	:{
							blur:function(val){
								var v = Number(val.getValue());
								if(v < 0){
									val.setValue(0);
								}
							}
						}
					},{	fieldLabel	: Language.get( 'trnt_cost_2snd','운송비#2'),
						name		: 'trnt_cost_2snd',
						xtype		: 'numericfield',
						width		: 340,
						listeners	:{
							blur:function(val){
								var v = Number(val.getValue());
								if(v < 0){
									val.setValue(0);
								}
							}
						},
						hidden : true
					},{	fieldLabel	: Language.get( 'trnt_cost_3trd','운송비#3'),
						name		: 'trnt_cost_3trd',
						xtype		: 'numericfield',
						width		: 340,
						listeners	:{
							blur:function(val){
								var v = Number(val.getValue());
								if(v < 0){
									val.setValue(0);
								}
							}
						},
						hidden : true
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
					}
				]
			}
		;
		return item;
	}
});