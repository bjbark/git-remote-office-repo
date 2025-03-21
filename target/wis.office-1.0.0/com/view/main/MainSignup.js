Ext.define('com.view.main.MainSignup', { extend: 'Ext.window.Window',
	alias: 'widget.popup-main-signup',

	closable  : true,
	modal     : true,
	autoShow  : true,
	resizable : false,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm() ];
		me.dockedItems = [ me.createToolbar() ];
		me.callParent(arguments);
	},

	createForm : function () {
		var me = this;
		return {
			xtype:'form',
			name: 'signupForm',
			layout:{  type:'vbox'  },
			width:'100%',
			bodyPadding: 10,
			items:[
				{	xtype	: 'fieldcontainer',
					layout	: 'hbox',
					fieldDefaults: { labelSeparator : '', labelAlign: 'right', labelWidth: 65 },
					items	: [
						{	xtype : 'popupfield',
							fieldLabel : Language.get('', '회사명'),
							maxLength : 200,
							editable : true,
							enableKeyEvents : true,
							name : 'buss_name',
							clearable : true,
							popup : {
								select : 'SINGLE',
								widget : 'lookup-cstm-popup4',
								params : {
									stor_grp : _global.stor_grp,
								},
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('buss_name'));
									me.down('[name=cstm_idcd]').setValue(records[0].get('cstm_idcd'));
									me.down('[name=boss_name]').setValue(records[0].get('boss_name'));
									me.down('[name=buss_numb]').setValue(records[0].get('buss_numb'));
								}
							},
						},{	xtype		: 'textfield',
							name		: 'boss_name',
							fieldLabel	: '대표자명'
						},{	xtype		: 'textfield',
							name		: 'buss_numb',
							fieldLabel	: '사업자번호'
						}
					]
				},{	xtype	: 'fieldcontainer',
					layout	: 'hbox',
					fieldDefaults: { labelSeparator : '', labelAlign: 'right', labelWidth: 65 },
					items	: [
						{	xtype		: 'textfield',
							fieldLabel	: '사용자명',
							name		: 'user_name'
						},{	xtype 		: 'textfield',
							fieldLabel	: 'Email',
							name		: 'mail_addr',
							listeners : {
								blur : function() {
									var val = this.getValue(), reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
									if (!val == '' || !val == null) {
										if (!reg_email.test(val)) {
											Ext.Msg.alert("알림", "이메일 형식에 맞게 작성하여 주십시오. (띄어쓰기 확인필요)");
											this.reset();
										}
									}
								}
							}
						}
					]
				},{	xtype	: 'fieldcontainer',
					layout	: 'hbox',
					fieldDefaults: { labelSeparator : '', labelAlign: 'right', labelWidth: 65 },
					items	: [
						{	xtype	: 'textfield',
							fieldLabel	: '휴대폰번호',
							name	: 'hdph_numb'
						},{	xtype	: 'textfield',
							fieldLabel	: '일반전화',
							name	: 'tele_numb',
						}
					]
				},{	xtype	: 'fieldcontainer',
					layout	: 'hbox',
					fieldDefaults: { labelSeparator : '', labelAlign: 'right', labelWidth: 65 },
					items	: [
						{	xtype : 'popupfield',
							fieldLabel : '주소',
							editable : true,
							enableKeyEvents : true,
							name : 'post_code',
							allowBlank : true,
							clearable : false,
							editable : true,
							hidden : false,
							width : 160,
							popup : {
								select : 'DAUM',
								widget : 'popup-zipcode-search',
								params : {},
								result : function(records, nameField, pairField) {
									var panel = nameField.up('form');
									if (records.length > 0) {
										var address = records[0];
										nameField.setValue(address.zonecode);
										panel.down('[name=addr_1fst]').setValue(address.roadAddress);
									}
								}
							}
						},{	xtype	: 'textfield',
							name	: 'addr_1fst',
							margin	: '1 0 2 2',
							width	: 244
						}
					]
				},{	xtype	: 'fieldcontainer',
					hidden	: true,
					items	: [
						{	xtype	: 'textfield',
							name	: 'cstm_idcd'
						},{	xtype	: 'datefield',
							name	: 'sign_reqt_date',
							submitFormat: 'Ymd',
							value	: new Date(),
						}
					]
				}
			]
		};
	},

	createToolbar : function () {
		var me = this;
		return {
			xtype	: 'toolbar',
			dock	: 'bottom',
			height	: 40,
			items	: [
				{	xtype		: 'fieldset',
					height		: '100%',
					width		: '100%',
					layout		: {
						type	: 'hbox', align:'top', pack:'center'
					},
					border		: 0,
					defaults	: {
						style	: 'margin:2px;',
						width	: 50,
					},
					items	: [
						{	xtype	:'button',
							text	:'저장',
							handler : me.saveAction,
							scope:me
						},{	xtype	:'button',
							text	:'닫기',
							handler : function () {
								me.close();
							}
						}
					]
				}
			]
		};
	},

	saveAction : function () {
		var me = this,
			form = me.down('[name=signupForm]'),
			params = Ext.merge(form.getValues(), {hq_id: 'N1000SJUNG'});
			
		form.getForm().submit({
			params: {param: JSON.stringify(params)},
			url: 'system/custom/sjflv/cust/userreqt/set/userreqt.do',
			method: 'POST',
			success: function() {
				Ext.Msg.alert('Success', '등록 완료');
				me.close();
			},
			failure: function() {
				Ext.Msg.alert('Error', '제출 실패');
				me.close();
			}
		});
		
	}
});
