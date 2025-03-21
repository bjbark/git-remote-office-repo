 Ext.define('module.sale.clam.clamentry1.view.ClamEntry1Editor', {extend  : 'Axt.form.Editor',
	alias		: 'widget.module-clamentry1-editor',
	height		: 415,
	layout		: { type: 'border' },
	title			: Language.get('clam_info','클레임 접수'),
	collapsible	: true,
	collapsed	:  true,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock() , me.createWest() ] ;
		me.items       = me.createTabs();
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this;
		var item =
			{	xtype : 'toolbar',
				dock  : 'bottom',
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style',hidden:true,itemId:'update'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style',hidden:true,itemId:'cancel'},
					'-'
				]
			};
		return item;
	},

	changeEdit : function( readonly ) {
		this.getForm().getFields().each (function (field) {
			if (field.onwerEditing) {
				field.setReadOnly (readonly);
			}
		});
	},

	/**
	 *
	 */
	createWest : function () {
		var me = this,
			item ={
				xtype		: 'form-panel',
				dock		: 'left',
				bodyStyle	: { padding: '5px' },
				width		: 800,
				fieldDefaults: { width : 315, labelWidth : 70, labelSeparator : '' },
				items		: [
					{	xtype : 'fieldset',
						layout: 'hbox',
						border: 0,
						margin: '5 0 0 -30',
						items : [
						{	xtype : 'fieldset',
							layout: 'vbox',
							border: 0,
							margin: '0 0 0 0',
							items : [
								{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '0 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','INVOICE번호'),
											xtype		: 'textfield',
											name		: 'invc_numb',
											width		: 145,
											margin		: '0 0 0 0',
											hidden		: true,
										},{	fieldLabel	: Language.get('','접수일자'),
											xtype		: 'datefield',
											name		: 'invc_date',
											width		: 170,
											margin		: '0 0 0 30',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											allowBlank	: false,
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue
										},{	fieldLabel	: Language.get('','담당자'),
											xtype		: 'popupfield',
											name		: 'drtr_name',
											pair		: 'drtr_idcd',
											clearable	: true,
											width		: 170,
											margin		: '0 0 0 40',
											popup: {
												select : 'SINGLE',
												widget : 'lookup-user-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											}
										},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','품목'),
											xtype		: 'popupfield',
											name		: 'item_code',
											pair		: 'item_idcd',
											labelWidth	: 100,
											width		: 200,
											editable	: true,
											allowBlank	: false,
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue,
											enableKeyEvents : true,
											clearable	: true ,
											popup		: {
												widget	: 'lookup-item-popup-v4',
												select	: 'SINGLE',
												params	: { stor_grp : _global.stor_grp, line_stat : '0' , acct_bacd : '삼정클레임'},
												result	: function(records, nameField, pairField ) {
													var panel1 = nameField.up('form');
													var layout = ('[name=clam_info]');
													panel1.down('[name=item_name]').setValue(records[0].get('item_name'));
													panel1.down('[name=item_spec]').setValue(records[0].get('item_spec'));
													panel1.down('[name=acct_bacd]').setValue(records[0].get('acct_bacd'));
													nameField.setValue(records[0].get('item_code'));
													pairField.setValue(records[0].get('item_idcd'));
												}
											}
										},{	name : 'item_idcd', xtype	: 'textfield', hidden : true
										},{	name : 'acct_bacd', xtype	: 'textfield', hidden : true,
											listeners	: {
												change	: function(){
													var baseform = me.down('form')
													if(this.value == '3000'){
														baseform.down('[name=cstm_name]').popup.params.sale_cstm_yorn = '1';
														baseform.down('[name=cstm_name]').popup.params.puch_cstm_yorn = '0';

														baseform.down('[name=ostt_date]').setReadOnly(false);
														baseform.down('[name=ostt_qntt]').setReadOnly(false);
														baseform.down('[name=istt_date]').setReadOnly(true);
														baseform.down('[name=istt_qntt]').setReadOnly(true);
														baseform.down('[name=make_cmpy_name]').setReadOnly(true);
														baseform.down('[name=mker_lott_numb]').setReadOnly(true);
													}
													else if (this.value == '1001'){
														baseform.down('[name=cstm_name]').popup.params.puch_cstm_yorn = '1';
														baseform.down('[name=cstm_name]').popup.params.sale_cstm_yorn = '0';

														baseform.down('[name=ostt_date]').setReadOnly(true);
														baseform.down('[name=ostt_qntt]').setReadOnly(true);
														baseform.down('[name=istt_date]').setReadOnly(false);
														baseform.down('[name=istt_qntt]').setReadOnly(false);
														baseform.down('[name=make_cmpy_name]').setReadOnly(false);
														baseform.down('[name=mker_lott_numb]').setReadOnly(false);
													}
												}
											}
										},{ xtype		: 'textfield',
											name		: 'item_name',
											margin		: '0.5 0 0 5',
											width		: 320,
										},{ xtype		: 'textfield',
											name		: 'item_spec',
											width		: 245,
											margin		: '0.5 0 0 5',
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','거래처'),
											xtype		: 'popupfield',
											name		: 'cstm_name',
											pair		: 'cstm_idcd',
											clearable	: true,
											labelWidth	: 100,
											width		: 270,
											margin		: '0 0 0 0',
											popup: {
												select : 'SINGLE',
												widget : 'lookup-cstm-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('cstm_name'));
													pairField.setValue(records[0].get('cstm_idcd'));
												},
												create : function (self ) {
													var item_idcd = me.down('form').down('[name=item_idcd]').getValue();
													if(item_idcd== '' || item_idcd == null ){
														Ext.Msg.alert("알림","품목을  먼저 선택하여 주십시오.");
														popup.close();
														return;
													}
												}
											}
										},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('','실험담당자'),
											xtype		: 'popupfield',
											name		: 'labr_drtr_name',
											pair		: 'labr_drtr_idcd',
											clearable	: true,
											width		: 165,
											margin		: '0 0 0 140',
											popup: {
												select : 'SINGLE',
												widget : 'lookup-user-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											}
										},{	name : 'labr_drtr_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('','Batch No'),
											xtype		: 'textfield',
											name		: 'lott_numb',
											labelWidth	: 90,
											width		: 200,
											margin		: '0 2 0 0',
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','생산일자'),
											xtype		: 'datefield',
											name		: 'prod_date',
											width		: 170,
											margin		: '0 0 0 30',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD
										},{	fieldLabel	: Language.get('','생산수량'),
											xtype		: 'numericfield',
											name		: 'prod_qntt',
											width		: 170,
											margin		: '0 0 0 40',
										},{	fieldLabel	: Language.get('','생산담당자'),
											xtype		: 'popupfield',
											name		: 'prod_drtr_name',
											pair		: 'prod_drtr_idcd',
											clearable	: true,
											width		: 165,
											margin		: '0 0 0 0',
											popup: {
												select : 'SINGLE',
												widget : 'lookup-user-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											}
										},{	name : 'prod_drtr_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('','제조사'),
											xtype		: 'textfield',
											name		: 'make_cmpy_name',
											labelWidth	: 90,
											width		: 200,
											margin		: '0 0 0 0',
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','출고일자'),
											xtype		: 'datefield',
											name		: 'ostt_date',
											width		: 170,
											margin		: '0 0 0 30',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD
										},{	fieldLabel	: Language.get('','출고수량'),
											xtype		: 'numericfield',
											name		: 'ostt_qntt',
											width		: 170,
											margin		: '0 0 0 40',
										},{	fieldLabel	: Language.get('','포장담당자'),
											xtype		: 'popupfield',
											name		: 'pckg_drtr_name',
											pair		: 'pckg_drtr_idcd',
											clearable	: true,
											width		: 165,
											margin		: '0 0 0 0',
											popup: {
												select : 'SINGLE',
												widget : 'lookup-user-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											}
										},{	name : 'pckg_drtr_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('','제조사 LOT 번호'),
											xtype		: 'textfield',
											name		: 'mker_lott_numb',
											width		: 200,
											labelWidth	: 90,
											margin		: '0 0 0 0',
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','입고일자'),
											xtype		: 'datefield',
											name		: 'istt_date',
											width		: 170,
											margin		: '0 0 0 30',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD
										},{	fieldLabel	: Language.get('','입고수량'),
											xtype		: 'numericfield',
											name		: 'istt_qntt',
											width		: 170,
											margin		: '0 0 0 40',
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{ fieldLabel	: Language.get('','재고수량'),
											xtype		: 'numericfield',
											name		: 'stok_qntt',
											width		: 170,
											margin		: '0 0 0 240',
										},{ fieldLabel	: Language.get('','클레임수량'),
											xtype		: 'numericfield',
											name		: 'clam_qntt',
											width		: 165,
											margin		: '0 0 0 0',
										},{	fieldLabel	: Language.get('','클레임종류'),
											xtype		: 'lookupfield',
											name		: 'clam_dvcd',
											lookupValue : resource.lookup('clam_dvcd'),
											width		: 200,
											margin		: '0 0 0 0',
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	:  Language.get( '' , '제목'),
											name		: 'ttle',
											xtype		: 'textfield',
											width		: 745,
											margin		: '0 0 0 30',
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	:  Language.get( '' , '클레임내용'),
											name		: 'clam_cont',
											xtype		: 'textarea',
											width		: 745,
											height		: 55,
											margin		: '0 0 0 30',
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	:  Language.get( '' , '특이사항'),
											name		: 'pcmt',
											xtype		: 'textarea',
											width		: 745,
											height		: 55,
											margin		: '0 0 0 30',
										}
									]
								}
							]
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
			tabs = {
				xtype  : 'tabpanel',
				region : 'center',
				plain  : true,
				margin : 0 ,
				items  : [ me.createTab1(),{title : '첨부파일',xtype: 'module-clamentry1-editorlister'} ]
			}
		;
		return tabs;
	},

	createTab1 : function() {
		var item = {
				title		: '실험내역',
				xtype		: 'form-panel',
				region		: 'center',
				fieldDefaults: { labelWidth : 70, labelSeparator : '' },
				items		: [
					{	xtype : 'fieldset',
						layout: 'hbox',
						border: 0,
						margin: '5 0 0 0',
						items : [
							{	fieldLabel	:  Language.get( '' , '결과'),
								name		: 'labr_memo',
								xtype		: 'textarea',
								width		: 745,
								height		: 80,
								margin		: '0 0 0 0',
							}
						]
					}
				]
			}
		;
		return item;
	},

});

