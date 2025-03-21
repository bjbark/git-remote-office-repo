Ext.define('module.custom.sjflv.item.mtrlsubslist.view.MtrlSubsListEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-mtrlsubslist-editor',

	height : 280,
	layout : {
		type: 'border'
	},

	title			: Language.get('','원료대치정보'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: 'invc_numb',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
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
				width			: 1750,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	name	: 'invc_numb', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							,{	fieldLabel	: Language.get('','실험일자'),
								xtype		: 'datefield',
								margin		: '10 0 5 0',
								name		: 'test_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								allowBlank	: false,
								width		: 205
							},{	fieldLabel	: Language.get('','실험자'),
								xtype		: 'textfield',
								name		: 'test_drtr_name',
								width		: 340,
								margin		: '10 0 5 193',
							}						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','품목'),
								xtype		: 'popupfield',
								name		: 'item_code',
								pair		: 'item_idcd',
								labelWidth	: 100,
								width		: 250,
								editable	: true,
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								margin		: '0 0 5 0',
								emptyText	: Const.invalid.emptyValue,
								enableKeyEvents : true,
								clearable	: true ,
								popup		: {
									widget	: 'lookup-item-popup-sjflv',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0', acct_bacd : '원재료' },
									result	: function(records, nameField, pairField ) {
										var panel1 = nameField.up('form');
										var layout = ('[name=clam_info]');
										panel1.down('[name=item_name]').setValue(records[0].get('item_name'));
										panel1.down('[name=hala_yorn]').setValue(records[0].get('hala_yorn'));
										panel1.down('[name=fema]').setValue(records[0].get('fema'));
										nameField.setValue(records[0].get('item_code'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'item_idcd', xtype	: 'textfield', hidden : true
							},{ xtype		: 'textfield',
								name		: 'item_name',
								margin		: '1 0 5 5',
								width		: 485,
								readOnly	: true,
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('','기존 공급사'),
								xtype		: 'textfield',
								name		: 'befr_splr_name',
								width		: 340,
								margin		: '0 0 5 0'
							},{	fieldLabel	: Language.get('','기존 제조사'),
								xtype		: 'textfield',
								name		: 'befr_mker_name',
								margin		: '0 0 5 60',
								width		: 340
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('','대치 공급사'),
								xtype		: 'textfield',
								name		: 'splr_name',
								width		: 340,
								margin		: '0 0 5 0'
							},{	fieldLabel	: Language.get('','대치 제조사'),
								xtype		: 'textfield',
								name		: 'mker_name',
								margin		: '0 0 5 60',
								width		: 340
							},{	fieldLabel	: Language.get('','대치유형'),
								xtype		: 'lookupfield',
								name		: 'mtrl_sbzt_dvcd',
								width		: 180,
								margin		: '0 0 5 0',
								lookupValue	: resource.lookup('mtrl_sbzt_dvcd')
							},{	fieldLabel	: Language.get('','할랄여부'),
								xtype		: 'lookupfield',
								margin		: '0 0 5 0',
								name		: 'hala_yorn',
								width		: 180,
								lookupValue	: resource.lookup('yorn'),
							},{	fieldLabel	: Language.get('','FEMA'),
								xtype		: 'textfield',
								name		: 'fema',
								width		: 200,
								margin		: '0 0 5 0'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','사용량'),
								xtype		: 'textfield',
								name		: 'usag_qntt_memo',
								margin		: '0 0 5 0',
								width		: 740
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','Test 목적'),
								xtype		: 'textfield',
								name		: 'ecod_purp',
								margin		: '0 0 5 0',
								width		: 740
							}
						]
					}
				]
			}
		;
		return item;
	},

});