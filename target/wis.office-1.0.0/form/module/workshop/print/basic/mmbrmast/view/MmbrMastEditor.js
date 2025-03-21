Ext.define('module.workshop.print.basic.mmbrmast.view.MmbrMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-mmbrmast-editor',

	height : 340,
	layout : {
	type: 'border'
	},

	title			: Language.get('item_info','회원 정보'),
	collapsible 	: true	,
	collapsed		: true	,
	defaultFocus	: 'item_idcd',


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
				itemId			: 'mainForm',
				width			: 360,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 65, labelSeparator : '' },
				items			: [
					{	fieldLabel	: Language.get('mmbr_name','회원명'),
						name		: 'mmbr_name',
						xtype		: 'textfield',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						width		: 340,
					},{ fieldLabel	: Language.get('mmbr_idcd','회원ID'),
						name		: 'mmbr_idcd',
						xtype		: 'textfield',
						hidden		: true
					},{	fieldLabel	: Language.get('mail_addr','이메일'),
						xtype		: 'textfield',
						name		: 'mail_addr',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						vtype		: 'email'
					},{	fieldLabel	: Language.get('lgin_pswd','비밀번호'),
						xtype		: 'textfield',
						name		: 'lgin_pswd',
						inputType	: 'password',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						width		: 340,
						margin		: '0 0 5 0'
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('hdph_numb','전화번호'),
								xtype		: 'textfield',
								name		: 'hdph_numb',
								margin		: '0 0 5 0',
								vtype		: 'mobile',
								width		: 170,
							},{	fieldLabel	: Language.get('faxi_numb','팩스번호'),
								xtype		: 'textfield',
								name		: 'faxi_numb',
								margin		: '0 0 5 0',
								vtype		: 'fax',
								width		: 170,
							}
						]
					},{	fieldLabel	: Language.get('addr_1fst','주소'),
						xtype		: 'popupfield',
						name		: 'addr_1fst',
						pair		: 'post_code',
						editable	: true,
						clearable	: true,
						width		: 340,
						popup		: {
							select	: 'DAUM',
							widget	: 'popup-zipcode-search',
							params	: { },
							result	: function(records, nameField, pairField){
								var panel   = nameField.up('form');
									if( records.length > 0 ){
										var address = records[0];
											pairField.setValue( address.zonecode );
											nameField.setValue( address.roadAddress );
											panel.down('[name=addr_2snd]').focus(true , 10);
									}
							}
						}
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('post_code','우편번호'),
								xtype		: 'textfield',
								name		: 'post_code',
								width		: 120,
								readOnly	: true,
							},{	fieldLabel	: Language.get('addr_2snd','상세주소'),
								xtype		: 'textfield',
								name		: 'addr_2snd',
								width		: 220,
								margin		: '0 0 5 0',
							}
						]
					},{	fieldLabel	: Language.get('asgn_mmbr_name','법인'),
						xtype		: 'popupfield',
						name		: 'asgn_mmbr_name',
						pair		: 'asgn_mmbr_idcd',
						editable	: true,
						clearable	: true,
						width		: 340,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-cstm-popup',
							params	: { stor_grp : _global.stor_grp, row_sts : '0' },
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].get('cstm_name'));
								pairField.setValue(records[0].get('cstm_idcd'));
							}
						}
					},{	xtype	: 'textfield',
						name	: 'asgn_mmbr_idcd',
						hidden	: true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('regi_dvcd','등록구분'), // 수기로 고정
								xtype		: 'lookupfield',
								name		: 'regi_dvcd',
								width		: 120,
								lookupValue	: resource.lookup('regi_dvcd'),
								hidden		: true,
								value		: '',
							},{	fieldLabel	: Language.get('entr_dvcd','가입구분'),
								xtype		: 'lookupfield',
								name		: 'entr_dvcd',
								width		: 170,
								lookupValue	: resource.lookup('entr_dvcd')
							},{	fieldLabel	: Language.get('mmbr_stat_dvcd','회원구분'),
								xtype		: 'lookupfield',
								name		: 'mmbr_stat_dvcd',
								width		: 170,
								lookupValue	: resource.lookup('mmbr_stat_dvcd')
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('mmbr_grad','회원등급'),
								xtype		: 'lookupfield',
								name		: 'mmbr_grad',
								width		: 170,
								lookupValue	: resource.lookup('mmbr_grad')
							},{	fieldLabel	: Language.get('mmbr_dvcd','상태구분'),
								xtype		: 'lookupfield',
								name		: 'mmbr_dvcd',
								width		: 170,
								lookupValue	: resource.lookup('mmbr_dvcd')
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
						height		: 235,
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