Ext.define('module.user.usermast.view.UserMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-usermast-editor',

	height : 290,
	layout : {
		type: 'border'
	},

	title		: Language.get('user_info','사용자 정보'),
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
				width			: 580,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 60, labelSeparator : '' },
				layout			: 'hbox',
				items			: [
					{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						width	: 330,
						items	: [
							{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('user_code','사원번호'),
										name		: 'user_code',
										xtype		: 'textfield',
										allowBlank	: false,
										fieldCls	: 'requiredindex',
										emptyText	: Const.invalid.emptyValue
									},{	fieldLabel	: Language.get('line_stat',''),
										xtype		: 'lookupfield',
										name		: 'line_stat',
										lookupValue	: resource.lookup('line_stat'),
										width		: 55,
										margin		: '0 0 0 5',
										hidden		: true
									},{	fieldLabel	: Language.get('user_idcd','사원ID'),
										xtype		: 'textfield',
										name		: 'user_idcd',
										hidden		: true
									}
								]
							},{	fieldLabel	: Language.get('user_name','성명'),
								xtype		: 'textfield',
								name		: 'user_name'
							},{	fieldLabel	: Language.get('lgin_idcd','로그인ID'),
								xtype		: 'textfield',
								name		: 'lgin_idcd'
							},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items		: [
									{	fieldLabel	: Language.get('lgin_pswd','비밀번호'),
										xtype		: 'textfield',
										inputType	: 'password',
										name		: 'lgin_pswd',
										width		: 235,
									},{	text		: Language.get( 'pwd_change','PW초기화'),
										xtype		: 'button',
										width		: 75 ,
										iconCls		: 'icon-pwd',
										margin		: '0 0 0 5',
										action		: 'passwdChange'
									}
								]
							},{	fieldLabel	: Language.get('mail_addr','이메일'),
								xtype		: 'textfield',
								name		: 'mail_addr',
							},{	fieldLabel	: Language.get('hdph_numb','연락처'),
								xtype		: 'textfield',
								name		: 'hdph_numb'
							},{	fieldLabel	: Language.get('duty_dvcd','업무구분'),
								xtype		: 'lookupfield',
								name		: 'duty_dvcd',
								lookupValue	: resource.lookup('duty_dvcd'),
								width		: 200
							},{fieldLabel	: Language.get('natn_bacd_name','국적'),
								width		: 200,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name 		: 'natn_bacd_name',
								pair 		: 'natn_bacd',
								clearable	: true ,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '1202'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{name : 'natn_bacd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype			: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						width			: 330,
						fieldDefaults	: { width : 315, labelWidth : 60, labelSeparator : '' },
						items			: [
							{	fieldLabel	: Language.get( 'wkrn_name','직급'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wkrn_name',
								pair		: 'wkrn_idcd',
								clearable	: true,
								width		: 200,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-wkrn-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wkrn_name'));
										pairField.setValue(records[0].get('wkrn_idcd'));
									}
								}
							},{	name : 'wkrn_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('auth_dvcd','사용권한'),
								xtype		: 'lookupfield',
								name		: 'auth_dvcd',
								width		: 200,
								lookupValue	: resource.lookup('auth_dvcd' ),
								hidden		: true
							},{	fieldLabel	: Language.get('join_date','입사일자'),
								xtype		: 'datefield',
								name		: 'join_date',
								width		: 200,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD
							},{	fieldLabel	: Language.get('rtmt_date','퇴사일자'),
								xtype		: 'datefield',
								name		: 'rtmt_date',
								width		: 200,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD
							},{	fieldLabel	: Language.get('brth_date','생년월일'),
								xtype		: 'datefield',
								name		: 'brth_date',
								width		: 200,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD
							},{	fieldLabel	: Language.get( 'dept_name','소속'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'dept_name',
								pair		: 'dept_code',
								clearable	: false,
								width		: 200,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-dept-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										me.down('[name=dept_idcd]').setValue(records[0].get('dept_idcd'));
										nameField.setValue(records[0].get('dept_name'));
										pairField.setValue(records[0].get('dept_code'));
									}
								}
							},{	name : 'dept_code', xtype : 'textfield' , hidden : true
							},{	name : 'dept_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get( 'labo_rate_name','임율'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'labo_rate_name',
								pair		: 'labo_rate_idcd',
								clearable	: true,
								width		: 200,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-laborate-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										me.down('[name=labo_rate_idcd]').setValue(records[0].get('labo_rate_idcd'));
										nameField.setValue(records[0].get('labo_rate_name'));
										pairField.setValue(records[0].get('labo_rate_idcd'));
									}
								}
							},{	name : 'labo_rate_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('hoof_stat_dvcd','재직상태'),
								xtype		: 'lookupfield',
								name		: 'hoof_stat_dvcd',
								width		: 200,
								lookupValue	: resource.lookup('hoof_stat_dvcd' ),
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								allowBlank	: false,
							},{	fieldLabel	: Language.get('cost_drtr_yorn','원가담당'),
								xtype		: 'lookupfield',
								name		: 'cost_drtr_yorn',
								width		: 200,
								lookupValue	: resource.lookup('yorn' )
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
						height		: 195,
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