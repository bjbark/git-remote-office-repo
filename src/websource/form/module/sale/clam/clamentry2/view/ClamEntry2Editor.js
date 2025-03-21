 Ext.define('module.sale.clam.clamentry2.view.ClamEntry2Editor', {extend  : 'Axt.form.Editor',
	alias		: 'widget.module-clamentry2-editor',
	height		: 440,
	layout		: { type: 'border' },
	title			: Language.get('clam_info','클레임 처리'),
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
				width		: 900,
				fieldDefaults: { width : 315, labelWidth : 50, labelSeparator : '' },
				items		: [
					{	xtype : 'fieldset',
						layout: 'hbox',
						border: 0,
						margin: '30 40 0 0',
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
										},{	fieldLabel	: Language.get('','처리일자'),
											xtype		: 'datefield',
											name		: 'proc_date',
											width		: 145,
											margin		: '0 0 0 0',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD
										},{	fieldLabel	: Language.get('','처리담당자'),
											xtype		: 'popupfield',
											name		: 'proc_drtr_name',
											pair		: 'proc_drtr_idcd',
											clearable	: true,
											labelWidth	: 60,
											width		: 140,
											margin		: '0 0 0 10',
											popup: {
												select : 'SINGLE',
												widget : 'lookup-user-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											}
										},{	name : 'proc_drtr_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('','처리구분'),
											xtype		: 'lookupfield',
											name		: 'clam_proc_dvcd',
											lookupValue : resource.lookup('clam_proc_dvcd'),
											labelWidth	: 50,
											width		: 245,
											margin		: '0 0 0 10',
										},{	fieldLabel	: Language.get('','재고처리'),
											xtype		: 'lookupfield',
											name		: 'stok_proc_dvcd',
											lookupValue : resource.lookup('stok_proc_dvcd'),
											labelWidth	: 60,
											width		: 140,
											margin		: '0 0 0 0',
										},{	text		: '<span class="btnTemp" style="font-size:1.2em">내용 Clear</span>',
											xtype		: 'button',
											width		: 85,
											height		: 22,
											margin		: '2 0 0 5',
											itemId		:'clear',
											cls			: 'button-style',
											action		: 'clearAction'
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	:  Language.get( 'caus_memo' , '원인분석'),
											name		: 'caus_memo',
											xtype		: 'textarea',
											width		: 780,
											height		: 85,
											margin		: '0 0 0 0',
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	:  Language.get( 'proc_memo' , '처리내용'),
											name		: 'proc_memo',
											xtype		: 'textarea',
											width		: 780,
											height		: 85,
											margin		: '0 0 0 0',
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	:  Language.get( 'mesu_memo' , '향후대책'),
											name		: 'mesu_memo',
											xtype		: 'textarea',
											width		: 780,
											height		: 85,
											margin		: '0 0 0 0',
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
				items  : [ me.createTab1(),me.createTab2(),{title : '첨부파일',xtype: 'module-clamentry2-editorlister'} ]
			}
		;
		return tabs;
	},

	createTab1 : function() {
		var item = {
				title		: '접수내역',
				layout		: 'vbox',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				region		: 'center',
				fieldDefaults: { labelWidth : 70, labelSeparator : '' },
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
											{	fieldLabel	: Language.get('','접수일자'),
												xtype		: 'datefield',
												name		: 'invc_date',
												width		: 170,
												margin		: '0 0 0 30',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
												readOnly	: true,
												fieldCls	: 'readonlyfield'
											},{	fieldLabel	: Language.get('','담당자'),
												xtype		: 'popupfield',
												name		: 'drtr_name',
												pair		: 'drtr_idcd',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
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
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												labelWidth	: 90,
												width		: 200,
												editable	: true,
												enableKeyEvents : true,
												clearable	: true ,
												popup		: {
													widget	: 'lookup-item-popup',
													select	: 'SINGLE',
													params	: { stor_grp : _global.stor_grp, line_stat : '0' },
													result	: function(records, nameField, pairField ) {
														var panel1 = nameField.up('form');
														var layout = ('[name=clam_info]');
														panel1.down('[name=item_name]').setValue(records[0].get('item_name'));
														panel1.down('[name=item_spec]').setValue(records[0].get('item_spec'));
														nameField.setValue(records[0].get('item_code'));
														pairField.setValue(records[0].get('item_idcd'));
													}
												}
											},{	name : 'item_idcd', xtype	: 'textfield', hidden : true
											},{ xtype		: 'textfield',
												name		: 'item_name',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												margin		: '0.5 0 0 5',
												width		: 320,
											},{ xtype		: 'textfield',
												name		: 'item_spec',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
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
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												clearable	: true,
												labelWidth	: 90,
												width		: 240,
												margin		: '0 0 0 0',
												popup: {
													select : 'SINGLE',
													widget : 'lookup-cstm-popup',
													params : { stor_grp : _global.stor_grp , line_stat : '0' },
													result : function(records, nameField, pairField) {
														nameField.setValue(records[0].get('cstm_name'));
														pairField.setValue(records[0].get('cstm_idcd'));
													}
												}
											},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
											},{	fieldLabel	: Language.get('','실험담당자'),
												xtype		: 'popupfield',
												name		: 'labr_drtr_name',
												pair		: 'labr_drtr_idcd',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												clearable	: true,
												labelWidth	: 70,
												width		: 165,
												margin		: '0 0 0 175',
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
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												labelWidth	: 90,
												width		: 195,
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
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												width		: 170,
												margin		: '0 0 0 30',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD
											},{	fieldLabel	: Language.get('','생산수량'),
												xtype		: 'numericfield',
												name		: 'prod_qntt',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												width		: 170,
												margin		: '0 0 0 40',
											},{	fieldLabel	: Language.get('','생산담당자'),
												xtype		: 'popupfield',
												name		: 'prod_drtr_name',
												pair		: 'prod_drtr_idcd',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												clearable	: true,
												labelWidth	: 75,
												width		: 170,
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
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												labelWidth	: 90,
												width		: 195,
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
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												width		: 170,
												margin		: '0 0 0 30',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD
											},{	fieldLabel	: Language.get('','출고수량'),
												xtype		: 'numericfield',
												name		: 'ostt_qntt',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												width		: 170,
												margin		: '0 0 0 40',
											},{	fieldLabel	: Language.get('','포장담당자'),
												xtype		: 'popupfield',
												name		: 'pckg_drtr_name',
												pair		: 'pckg_drtr_idcd',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												clearable	: true,
												labelWidth	: 75,
												width		: 170,
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
												width		: 195,
												labelWidth	: 90,
												readOnly	: true,
												fieldCls	: 'readonlyfield',
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
												submitFormat: Const.DATE_FORMAT_YMD,
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	fieldLabel	: Language.get('','입고수량'),
												xtype		: 'numericfield',
												name		: 'istt_qntt',
												width		: 170,
												margin		: '0 0 0 40',
												readOnly	: true,
												fieldCls	: 'readonlyfield'
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
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												width		: 170,
												margin		: '0 0 0 240',
											},{ fieldLabel	: Language.get('','클레임수량'),
												xtype		: 'numericfield',
												name		: 'clam_qntt',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												labelWidth	: 75,
												width		: 170,
												margin		: '0 0 0 0',
											},{	fieldLabel	: Language.get('','클레임종류'),
												xtype		: 'lookupfield',
												name		: 'clam_dvcd',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												lookupValue : resource.lookup('clam_dvcd'),
												width		: 185,
												margin		: '0 0 0 10',
											}
										]
									},{	xtype : 'fieldset',
											layout: 'hbox',
											border: 0,
											margin: '5 0 0 0',
											items : [
											{	fieldLabel	:  Language.get( '' , '제목'),
												name		: 'ttle',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
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
													readOnly	: true,
													fieldCls	: 'readonlyfield',
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
												readOnly	: true,
												fieldCls	: 'readonlyfield',
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

	createTab2 : function() {
		var item = {
				title		: '실험내역',
				layout		: 'vbox',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				region		: 'center',
				fieldDefaults: { labelWidth : 70, labelSeparator : '' },
				items		: [
					{	layout		: 'hbox',
						border		: 0,
						region		: 'center',
						margin		: '0 0 5 0',
						fieldDefaults: { labelSeparator : '' },
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
										margin		: '0 0 0 00',
										readOnly	: true,
										fieldCls	: 'readonlyfield',
									}
								]
							}
						]
					},
				]
			}
		;
		return item;
	},

});

