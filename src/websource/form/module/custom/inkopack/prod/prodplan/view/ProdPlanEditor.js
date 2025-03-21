Ext.define('module.custom.inkopack.prod.prodplan.view.ProdPlanEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-prodplan-editor',

	height : 320,
	layout : {
		type: 'border'
	},

	title		: Language.get('pror_item','생산지시정보'),
	collapsible	: true,
	collapsed	: true,
	defaultFocus: 'user_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createWest()];
		me.items = me.createTabs();
		me.callParent(arguments)  ;
	},

	createDock : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom' ,
				items	: [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
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
				width			: 620,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 285, labelWidth : 60, labelSeparator : '' },
				layout			: 'hbox',
				items			: [
					{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						width	: 330,
						items	: [
							{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
								items	: [
									{	fieldLabel	: Language.get('invc_numb','invc_numb'),
										name		: 'invc_numb',
										xtype		: 'textfield',
										hidden		: true
									},{	fieldLabel	: Language.get('line_seqn','line_seqn'),
										name		: 'line_seqn',
										xtype		: 'textfield',
										hidden		: true
									}
								]
							},{	fieldLabel	: Language.get('acpt_numb','수주번호'),
								xtype		: 'textfield',
								name		: 'pdsd_numb',
								readOnly	: true,
								fieldCls	: 'requiredindex',
							},{	fieldLabel	: Language.get('item_code','품목코드'),
								xtype		: 'textfield',
								name		: 'item_code',
								fieldCls	: 'requiredindex',
								readOnly	: true
							},{	fieldLabel	: Language.get('item_name','품명'),
								xtype		: 'textfield',
								name		: 'item_name',
								fieldCls	: 'requiredindex',
								readOnly	: true
							},{	fieldLabel	: Language.get('item_spec','품목규격'),
								xtype		: 'textfield',
								name		: 'item_spec',
								fieldCls	: 'requiredindex',
								readOnly	: true
							},{	fieldLabel	: Language.get('wkfw_name','생산라인'),
								xtype		: 'popupfield', editable : true, enableKeyEvents : true,
								name 		: 'wkfw_name',
								pair 		: 'wkfw_idcd',
								clearable	: true ,
								readOnly	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-wkfw-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wkfw_name'));
										pairField.setValue(records[0].get('wkfw_idcd'));
									}
								}
							},{name : 'wkfw_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('wkct_name','공정'),
								xtype		: 'textfield',
								name 		: 'wkct_name',
								readOnly	: true,
							},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true,
								listeners:{
									change:function(self, e){
										me.down('[name=cvic_name]').popup.params = { wkct_idcd : this.getValue(), stor_grp : _global.stor_grp , line_stat : '0'}
										if(e == '' || e == null){
											me.down('[name=cvic_name]').reset();
											me.down('[name=cvic_idcd]').reset();
										}
									}
								}
							},{	fieldLabel	: Language.get('cvic_name','설비'),
								xtype		: 'popupfield', editable : true, enableKeyEvents : true,
								name 		: 'cvic_name',
								pair 		: 'cvic_idcd',
								clearable	: true ,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-cvic-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cvic_name'));
										pairField.setValue(records[0].get('cvic_idcd'));
									}
								}
							},{name : 'cvic_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('mtrl_name','재질'),
								xtype		: 'popupfield', editable : true, enableKeyEvents : true,
								name 		: 'mtrl_name',
								pair 		: 'mtrl_bacd',
								clearable	: true ,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '3101'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{name : 'mtrl_bacd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('pckg_cotr_name','포장용기'),
								xtype		: 'popupfield', editable : true, enableKeyEvents : true,
								name 		: 'pckg_cotr_name',
								pair 		: 'pckg_cotr_bacd',
								clearable	: true ,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '8004'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{name : 'pckg_cotr_bacd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype			: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						width			: 330,
						fieldDefaults	: { width : 315, labelWidth : 80, labelSeparator : '' },
						items			: [
							{	fieldLabel	: Language.get('lott_numb','LOT번호'),
								xtype		: 'textfield',
								name		: 'lott_numb',
								width		: 250,
							},{	fieldLabel	: Language.get('stok_used_qntt','재고사용수량'),
								xtype		: 'numericfield',
								name		: 'stok_used_qntt',
								width		: 250,
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var panel = self.up('form');
											var indn_qntt      = self.up('form').down('[name=indn_qntt]').getValue();
											var stok_used_qntt = self.up('form').down('[name=stok_used_qntt]').getValue();
											var qntt           = indn_qntt-stok_used_qntt;

											if(qntt<0){
												self.up('form').down('[name=stok_used_qntt]').setValue(0);
												Ext.Msg.alert("알림","재고사용수량을 다시 입력하여주십시오.")
											}else{
												panel.down('[name=indn_qntt]').setValue(qntt);
											}
										}
									}
								}
							},{	fieldLabel	: Language.get('indn_qntt','지시수량'),
								xtype		: 'numericfield',
								name		: 'indn_qntt',
								width		: 250,
							},{	fieldLabel	: Language.get('pref_rank','우선순위'),
								xtype		: 'numericfield',
								name		: 'pref_rank',
								width		: 250,
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
				title		: Language.get('remk_text','비고'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0 ,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '' ,
						name		: 'remk_text',
						xtype		: 'textarea',
						emptyText	: '비고사항을 적어주십시오',
						height		: 225,
						flex		: 1
					}
				]
			}
		;
		return item;
	}
});