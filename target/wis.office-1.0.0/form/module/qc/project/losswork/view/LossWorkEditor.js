Ext.define('module.qc.project.losswork.view.LossWorkEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-losswork-editor',

	height : 240,
	layout : {
	type: 'border'
	},

	title			: Language.get('pjod_mast_prod','손실공수정보'),
	collapsible 	: true			,
	collapsed		: true			,
	defaultFocus	: 'invc_numb'	,

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
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style', itemId:'editor' }, '-'
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
				name			: 'pjod_info',
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 355, labelWidth : 80, labelSeparator : '' },
				items			: [
					{	xtype	: 'textfield',	name : 'invc_numb',hidden:true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('pjod_idcd','금형번호'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'pjod_idcd',
								clearable	: false ,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-pjod-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' , cvic_kind_dvcd : '1000'},
									result	: function(records, nameField, pairField) {
//										var panel = me.down('form');
										nameField.setValue(records[0].get('pjod_idcd'));
									}
								},
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('prts_name','부품명'),
									name		: 'prts_name',
									xtype		: 'textfield',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									hidden		: false
								}
							]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('occr_date','발생일자'),
								name		: 'occr_date',
								xtype		: 'datefield',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 188,
								maxValue	: new Date()
							},{	fieldLabel	: Language.get('proc_date','처리일자'),
								name		: 'proc_date',
								xtype		: 'datefield',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 168,
								labelWidth	: 60,
								maxValue	: new Date()
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('occr_date','사상팀명'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'dept_name',
								pair		: 'dept_idcd',
								clearable	: false ,
								width		: 188,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-dept-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' , cvic_kind_dvcd : '1000'},
									result	: function(records, nameField, pairField) {
//										var panel = me.down('form');
										nameField.setValue(records[0].get('dept_name'));
										pairField.setValue(records[0].get('dept_idcd'));
									}
								},
							},{ xtype		: 'textfield' , name : 'dept_idcd', hidden:true
							},{	fieldLabel	: Language.get('proc_date','귀책팀명'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'resp_dept_name',
								pair		: 'resp_dept_idcd',
								clearable	: false ,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-dept-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' , cvic_kind_dvcd : '1000'},
									result	: function(records, nameField, pairField) {
//										var panel = me.down('form');
										nameField.setValue(records[0].get('dept_name'));
										pairField.setValue(records[0].get('dept_idcd'));
									}
								},
								width		: 168,
								labelWidth	: 60,
								maxValue	: new Date()
							},{ xtype		: 'textfield' , name : 'resp_dept_idcd', hidden:true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('wker_name','작성자'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wker_name',
								pair		: 'wker_idcd',
								clearable	: false ,
								width		: 188,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' , cvic_kind_dvcd : '1000'},
									result	: function(records, nameField, pairField) {
//												var panel = me.down('form');
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								},
							},{ xtype		: 'textfield' , name : 'wker_idcd', hidden:true
							},{	fieldLabel	: Language.get('cnfm_drtr_name','확인자'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cnfm_drtr_name',
								pair		: 'cnfm_drtr_idcd',
								clearable	: false ,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' , cvic_kind_dvcd : '1000'},
									result	: function(records, nameField, pairField) {
//												var panel = me.down('form');
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								},
								width		: 168,
								labelWidth	: 60,
								maxValue	: new Date()
							},{ xtype		: 'textfield' , name : 'cnfm_drtr_idcd', hidden:true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('loss_dvcd','분류'),
								name		: 'loss_dvcd',
								xtype		: 'lookupfield',
								lookupValue	: resource.lookup('loss_dvcd'),
								width		: 188,
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
				title		: Language.get('dtil_cont','불량원인 및 대책'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '' 		,
						name		: 'dtil_cont',
						xtype		: 'textarea',
						emptyText	: '내용을 적어주십시오',
						height		: 150,
						flex		: 1
					}
				]
			}
		;
		return item;
	}
});