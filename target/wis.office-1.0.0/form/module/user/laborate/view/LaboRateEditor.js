Ext.define('module.user.laborate.view.LaboRateEditor', { extend: 'Axt.form.Editor',

	alias  : 'widget.module-laborate-editor',
	height : 230,
	layout : {
		type : 'border'
	},

	title		: Language.get('user_info','임율 정보'),
	collapsible	: true,
	collapsed	: true,
	defaultFocus: 'labo_rate_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(),me.createWest()];
		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},

	createDock : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom' ,
				items	: [
					'->', '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},

	createWest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 360,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 70, labelSeparator : '' },
				layout			: 'hbox',
				items			: [
					{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						width	: 330,
						items	: [
							{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('labo_code','임율코드'),
										name		: 'labo_rate_idcd',
										xtype		: 'textfield',
										readOnly	: true,
										fieldCls	: 'requiredindex',
										allowBlank	: false,
										emptyText	: Const.invalid.emptyValue
									}
								]
							},{	fieldLabel	: Language.get('labo_rate_dvcd','임율구분'),
								xtype		: 'lookupfield',
								name		: 'labo_rate_dvcd',
								hidden		: false,
								lookupValue	: resource.lookup('labo_rate_dvcd'),
								listeners	: {
									change	: function(self, value) {
										Ext.ComponentQuery.query('module-laborate-editor')[0].down('[name=wkrn_name]').setValue(null);
										Ext.ComponentQuery.query('module-laborate-editor')[0].down('[name=wkrn_idcd]').setValue(null);
									}
								}
							},{	fieldLabel	: Language.get('rela_code','관련코드'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wkrn_name',
								pair		: 'wkrn_idcd',
								clearable	: false,
								width		: 315,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-wkrn-code-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wkrn_name'));
										pairField.setValue(records[0].get('wkrn_idcd'));
									},
									create : function (self ) {
										var panel     = self.up('form'),
											wkrn_dvcd = panel.down('[name=labo_rate_dvcd]').getValue()
										;
										Ext.merge(self.popup.params, {
											wkrn_dvcd : wkrn_dvcd
										});
									}
								}
							},{	name : 'wkrn_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('labo_rate_name','임율명'),
								xtype		: 'textfield',
								name		: 'labo_rate_name',
							},{	fieldLabel	: Language.get('labo_rate_1fst','임율'),
								xtype		: 'numericfield',
								name		: 'labo_rate_1fst',
								width		: 315,
							}
						]
					},{	xtype			: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0', hidden : true,
						width			: 330,
						fieldDefaults	: { width : 300, labelWidth : 30, labelSeparator : '' },
						items			: [
							{	fieldLabel	: Language.get('labo_rate_2snd','임율2'),
								xtype		: 'numericfield',
								name		: 'labo_rate_2snd',
								width		: 200,
								hidden		: true
							},{	fieldLabel	: Language.get('labo_rate_3trd','임율3'),
								xtype		: 'numericfield',
								name		: 'labo_rate_3trd',
								width		: 200,
								hidden		: true
							},{	fieldLabel	: Language.get('labo_rate_4frt','임율4'),
								xtype		: 'numericfield',
								name		: 'labo_rate_4frt',
								width		: 200,
								hidden		: true
							},{	fieldLabel	: Language.get('labo_rate_5fit','임율5'),
								xtype		: 'numericfield',
								name		: 'labo_rate_5fit',
								width		: 200,
								hidden		: true
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
				xtype		: 'tabpanel' ,
				region		: 'center',
				itemId		: 'memo',
				margin		: 0 ,
				plain		: true ,
				items		: [ me.createTab1() ]
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
				border		: 0 ,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '' ,
						name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '메모사항을 적어주십시오',
						height		: 142,
						flex		: 1
					},{	fieldLabel	: '' ,
						name		: 'lookup_val',
						xtype		: 'textarea	',
						readOnly	: true,
						hidden		: true
					}
				]
			}
		;
		return item;
	}
});