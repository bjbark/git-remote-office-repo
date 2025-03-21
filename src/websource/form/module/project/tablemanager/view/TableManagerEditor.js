Ext.define('module.project.tablemanager.view.TableManagerEditor', { extend: 'Axt.form.Editor',
	alias: 'widget.module-tablemanager-editor',
	height : 200,
	layout : {
		type: 'border'
	},
	title		: '기초 정보',
	collapsible	: true,
	collapsed	: true,
	defaultFocus: 'code_nm',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createWest()];
//		me.items = me.createTabs();
		me.callParent(arguments);
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom',
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style'}, '-'
				]
			}
		;
		return item;
	},

	/**
	 * 왼쪽 메뉴
	 */
	createWest : function () {
		var me = this,
			item = {
				xtype	: 'form-panel',
				dock	: 'left',
				flex	: 1,
//				width	: 330,
				bodyStyle: { padding: '5px' },
				fieldDefaults: { width : 200, labelWidth : 60, labelSeparator : '' },
				items : [
					{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items : [
							{	fieldLabel	: 'Table ID' ,
								name		: 'tabl_idcd',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								readOnly	: true
							},{	fieldLabel	: 'Table 명',
								name		: 'tabl_name',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								readOnly	: true
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
							items : [
								{	fieldLabel	: 'Field ID',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'fied_idcd',
									pair		: 'fied_name',
									allowBlank	: false,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-domain-popup',
										params	: { },
										result	:  function(records, nameField, pairField ){
											var panel = nameField.up('form') ;
											nameField.setValue(records[0].get('fied_idcd'));
											pairField.setValue(records[0].get('fied_name'));
											panel.down('[name=data_type]').setValue( records[0].get('data_type') );
											panel.down('[name=data_leng]').setValue( records[0].get('data_leng') );
											panel.down('[name=oldd_idcd]').setValue( records[0].get('oldd_idcd') );
											panel.down('[name=oldd_name]').setValue( records[0].get('oldd_name') );
											panel.down('[name=word_1]').setValue( records[0].get('word_1') );
											panel.down('[name=word_2]').setValue( records[0].get('word_2') );
											panel.down('[name=word_3]').setValue( records[0].get('word_3') );
											panel.down('[name=word_4]').setValue( records[0].get('word_4') );
											panel.down('[name=word_5]').setValue( records[0].get('word_5') );
											panel.down('[name=engl_word_1]').setValue( records[0].get('engl_word_1') );
											panel.down('[name=engl_word_2]').setValue( records[0].get('engl_word_2') );
											panel.down('[name=engl_word_3]').setValue( records[0].get('engl_word_3') );
											panel.down('[name=engl_word_4]').setValue( records[0].get('engl_word_4') );
											panel.down('[name=engl_word_5]').setValue( records[0].get('engl_word_5') );
										}
									}
								},{	fieldLabel	: 'Field 명',
									name		: 'fied_name',
									xtype		: 'textfield',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									width		: 300
								},{	fieldLabel	: 'Type' ,
									xtype		: 'lookupfield',
									name		: 'data_type',
									lookupValue	: [['varchar','varchar'],['numeric','numeric'],['char','char'],['integer','integer']],
									width		: 150,
								},{	fieldLabel	: '길이' ,
									name		: 'data_leng',
									xtype		: 'textfield',
									allowBlank	: true,
									fieldCls	: 'requiredindex',
									width		: 150,
								},{	fieldLabel	: 'Null' ,
									xtype		: 'lookupfield',
									name		: 'null_dvcd',
									lookupValue	: [['','Null Ok'],['N','Not Null']],
									width		: 150,
								}
							]
					},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items : [
							{	fieldLabel	: '참조 ID' ,
								name		: 'oldd_idcd',
								xtype		: 'textfield',
								allowBlank	: true,
								fieldCls	: 'requiredindex',
							},{	fieldLabel	: '참조 명' ,
								name		: 'oldd_name',
								xtype		: 'textfield',
								allowBlank	: true,
								fieldCls	: 'requiredindex',
								width		: 300
							},{	fieldLabel	: 'is Key' ,
								xtype		: 'lookupfield',
								name		: 'key_dvcd' ,
								lookupValue	: [['','No'],['K','Yes']],
								width		: 150,
							},{	fieldLabel	: 'Default',
								name		: 'dflt_valu',
								xtype		: 'textfield',
								allowBlank	: true,
								fieldCls	: 'requiredindex',
								width		: 150,
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items : [
							{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								fieldLabel	: '단어코드',
								name		: 'word_1',
								pair		: 'engl_word_1',
								allowBlank	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-word-popup',
									params	: { },
									result	:  function(records, nameField, pairField ){
										nameField.setValue(records[0].get('word_idcd'));
										pairField.setValue(records[0].get('word_name'));
									}
								}
							},{	xtype		: 'textfield'	, name	: 'engl_word_1'	, hidden	: true
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'word_2',
								pair		: 'engl_word_2',
								width		: 140,
								allowBlank	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-word-popup',
									params	: { },
									result	: function(records, nameField, pairField ){
										nameField.setValue(records[0].get('word_idcd'));
										pairField.setValue(records[0].get('word_name'));
									}
								}
							},{	xtype		: 'textfield'	, name	:	'engl_word_2'	,	hidden	: true
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'word_3',
								pair		: 'engl_word_3',
								width		: 140,
								allowBlank	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-word-popup',
									params	: { },
									result	: function(records, nameField, pairField ){
										nameField.setValue(records[0].get('word_idcd'));
										pairField.setValue(records[0].get('word_name'));
									}
								}
							},{	xtype		: 'textfield'	, name	: 'engl_word_3'  ,	hidden	: true
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'word_4',
								pair		: 'engl_word_4',
								width		: 140,
								allowBlank	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-word-popup',
									params	: { },
									result	: function(records, nameField, pairField ){
										nameField.setValue(records[0].get('word_idcd'));
										pairField.setValue(records[0].get('word_name'));
									}
								}
							},{	xtype		: 'textfield'	, name	: 'engl_word_4'	, hidden	: true
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'word_5',
								pair		: 'id_5',
								width		: 140,
								allowBlank	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-word-popup',
									params	: { },
									result	:  function(records, nameField, pairField ){
										nameField.setValue(records[0].get('word_idcd'));
										pairField.setValue(records[0].get('word_name'));
									}
								}
							},{	xtype		: 'textfield',	name	: 'engl_word_5'	, hidden	: true
							}
						]
					}
				]
			}
		;
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0 ,
				plain	: true ,
				items	: [ me.createTab1() ]
			}
		;
		return item;
	},
	/**
	 *
	 */
	createTab1 : function() {
		var me = this,
			item = {
				title		: '코드항목' ,
				xtype		: 'form-panel' ,
				layout		: 'hbox',
				border		: 0 ,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '' ,
						name		: 'itm_val' ,
						xtype		: 'textarea',
						emptyText	: 'key : value  형식으로 작성 하시기 바랍니다.',
						height		: 167 ,
						flex		: 1
					},{	fieldLabel	: '' ,
						name		: 'lookup_val' ,
						xtype		: 'textarea',
						readOnly	: true,
						//width	:100
						hidden		: true
					}
				]
			}
		;
		return item;
	}
});


