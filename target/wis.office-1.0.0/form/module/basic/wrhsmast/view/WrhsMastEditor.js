Ext.define('module.basic.wrhsmast.view.WrhsMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-wrhsmast-editor',

	height : 300,
	layout : {
		type: 'border'
	},

	title			: Language.get('wrhs_idcd','창고코드 정보'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: 'wrhs_idcd',

	initComponent: function(config) {
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
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
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	name 	: 'wrhs_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('wrhs_code','창고코드'),
								name		: 'wrhs_code',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 255
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat'),
								width		: 55,
								margin		: '0 0 0 5'
							}
						]
					},{	fieldLabel	: Language.get( '' , '사업장'),
						xtype		: 'popupfield',
						editable : true,
						enableKeyEvents : true,
						name		: 'bzpl_name',
						pair		: 'bzpl_idcd',
						allowBlank	: true,
						clearable	: false ,
						onwerEditing: true,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-bzpl-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0'},
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].get('bzpl_name'));
								pairField.setValue(records[0].get('bzpl_idcd'));
							}
						}
					},{	name		: 'bzpl_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('wrhs_name','창고명'),
						xtype		: 'textfield',
						name		: 'wrhs_name'
					},{	fieldLabel	: Language.get('mngt_wrhs_dvcd','창고기능구분'),
						xtype		: 'lookupfield',
						name		: 'mngt_wrhs_dvcd',
						lookupValue	: resource.lookup('mngt_wrhs_dvcd')
					},{	fieldLabel	: Language.get('mngt_wrhs_name','창고기능명'),
						xtype		: 'textfield',
						name		: 'mngt_wrhs_name',
						hidden		: false
					},{	fieldLabel	: Language.get('mngt_dept','관리부서'),
						xtype		: 'popupfield'		,
						name		: 'dept_name'	,
						pair		: 'dept_idcd'	,
						clearable	: false ,
						editable : true,
						enableKeyEvents : true,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-dept-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('dept_name'));
								pairField.setValue(records[0].get('dept_idcd'));
							}
						}
					},{	name : 'dept_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('drtr_name','담당자'),
						xtype		: 'popupfield'	,
						name		: 'drtr_name'	,
						pair		: 'drtr_idcd'	,
						editable	: true,
						enableKeyEvents : true,
						clearable	: false ,
							popup	: {
								select : 'SINGLE',
								widget : 'lookup-user-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							}
					},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('nega_stok_yorn','음수허용'),
						xtype		: 'lookupfield',
						name		: 'nega_stok_yorn',
						lookupValue	: resource.lookup('yorn')
					}
//					,{	fieldLabel	: Language.get('prnt_dept_name','생산사업장'),
//						xtype		: 'popupfield'		,
//						name		: 'prnt_dept_name'	,
//						pair		: 'prnt_idcd'		,
//						clearable	: false ,
//							popup: {
//								select : 'SINGLE',
//								widget : 'lookup-dept-popup',
//								params : { stor_grp : _global.stor_grp , row_sts : '0' },
//								result : function(records, nameField, pairField) {
//									nameField.setValue(records[0].get('dept_name'));
//									pairField.setValue(records[0].get('dept_idcd'));
//								}
//							}
//					},{ name : 'prnt_idcd', xtype : 'textfield' , hidden : true
//					}
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
				items	: [ me.createTab1()]
			}
		;
		return item;
	},

	createTab1	: function() {
		var me	= this,
		item	= {
			title			: Language.get('full_addr','주소 등'),
			xtype			: 'form-panel',
			dock			: 'left',
			width			: 500,
			bodyStyle		: { padding: '5px' },
			fieldDefaults	: { width : 315, labelWidth : 50, labelSeparator : '' },
			items			: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
					items	: [
						{	xtype		: 'fieldset',
							layout		: 'hbox',
							padding		: '0',
							border		:  0,
							margin		: '0 0 5 0',
							items		: [
								{	fieldLabel	: '주소',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'post_code',
									pair		: '',
									allowBlank	: true,
									clearable	: false ,
//									vtype		: 'zipcode',
									width		: 130,
									popup		: {
										select	: 'DAUM',
										widget	: 'popup-zipcode-search',
										params	: { },
										result	: function(records, nameField, pairField){
											var panel   = nameField.up('form');
											if( records.length > 0 ){
												var address = records[0];
													nameField.setValue( address.zonecode );
													panel.down('[name=addr_1fst]' ).setValue( address.roadAddress );
													panel.down('[name=addr_2snd]').focus(true , 10);
											}
										}
									}
								}
							]
						},{	name : 'addr_1fst' , width : 350 , xtype  : 'textfield' ,  margin : '0 0 2 10'
						},
					]
				},{	fieldLabel : '상세주소', xtype: 'textfield', name: 'addr_2snd',  width : 490, readOnly : false 	, maxLength   : 100, 	maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.',
					margin	: '0 0 5 0'
				},{	fieldLabel	: Language.get('lcal_dvcd','지역'),
					xtype		: 'lookupfield',
					name		: 'lcal_dvcd',
					width		: 250,
					lookupValue	: resource.lookup('lcal_dvcd')
				}
			]
		}
		;
		return item;
	}
});