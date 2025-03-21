Ext.define('module.prod.mold.moldcheck.view.MoldCheckEditor2', { extend: 'Axt.form.Editor',

	alias: 'widget.module-moldcheck-editor2',

	height : 270,
	layout : {
		type: 'border'
	},

	title			: Language.get('mold_idcd','점검정보'),
	collapsible 	: true	,
	collapsed		: true	,
	defaultFocus	: 'mold_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = [me.createTabs()];
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
				bodyStyle		: { padding: '10px' },
				fieldDefaults	: { width : 340, labelWidth : 70, labelSeparator : ''},
				items			: [
					{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('line_seqn','항번'),
								name		: 'line_seqn',
								xtype		: 'textfield',
								allowBlank	: false,
								readOnly	: true,
								fieldCls	: 'requiredindex',
								width		: 150
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('chek_date','점검일자'),
								xtype		: 'datefield',
								name		: 'chek_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 200
							},{	fieldLabel	: Language.get('chek_time','점검시간'),
								name		: 'chek_time',
								xtype		: 'timefield',
								format		: 'H:i',
								submitFormat: 'Hi',
								increment	: 30,
								labelWidth	: 85,
								width		: 200,
								anchor		: '100%'
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('dept_name','부서'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'dept_name',
								pair		: 'dept_idcd',
								clearable	: true ,
								width		: 200,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-dept-popup',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].get('dept_name'));
										pairField.setValue(records[0].get('dept_idcd'));
									}
								}
							},{	name	: 'dept_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('drtr_name','담당자'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'drtr_name',
								pair		: 'drtr_idcd',
								clearable	: true ,
								labelWidth	: 85,
								width		: 200,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name	: 'drtr_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('base_clen','베이스세정'),
								xtype		: 'lookupfield',
								name		: 'base_clen',
								lookupValue	: resource.lookup('yorn'),
								width		: 150
							},{	fieldLabel	: Language.get('lbct_appl','구리스도포'),
								xtype		: 'lookupfield',
								name		: 'lbct_appl',
								lookupValue	: resource.lookup('yorn'),
								labelWidth	: 135,
								width		: 220
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('airr_clen','에어청소'),
								xtype		: 'lookupfield',
								name		: 'airr_clen',
								lookupValue	: resource.lookup('yorn'),
								width		: 150
							},{	fieldLabel	: Language.get('core_clen','코어세정'),
								xtype		: 'lookupfield',
								name		: 'core_clen',
								lookupValue	: resource.lookup('yorn'),
								labelWidth	: 135,
								width		: 220
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('core_rust','코어방청'),
								xtype		: 'lookupfield',
								name		: 'core_rust',
								lookupValue	: resource.lookup('yorn'),
								width		: 150
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
				border:0,
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1(),{title : '첨부파일',xtype: 'module-moldcheck-file2'}]
			}
		;
		return item;
	},
	createTab1 : function() {
		var me = this,
		item = {
				title		:  Language.get('remk_text','메모'),
				layout		: 'hbox'		,
				border		: 0				,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	name		: 'remk_text',
						xtype		: 'textarea',
						emptyText	: '내용을 적어주십시오',
						height		: 180,
						flex		: 1
					}
				]
		}
		;
		return item;
	}
});