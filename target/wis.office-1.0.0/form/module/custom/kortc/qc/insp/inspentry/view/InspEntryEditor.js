 Ext.define('module.custom.kortc.qc.insp.inspentry.view.InspEntryEditor', {extend  : 'Axt.form.Editor',
	alias		: 'widget.module-inspentry-editor',
	height		: 350,
	layout		: { type: 'border' },
	title		: Language.get('clam_info',''),
	collapsible	: true,
	collapsed	: true,

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
					{ text : '<span class="write-button">저장</span>', action : 'updateAction'	, cls: 'button-style',itemId:'lister1',hidden:true},
					{ text : '<span class="write-button">저장</span>', action : 'updateAction2'	, cls: 'button-style',itemId:'lister2',hidden:true},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style',itemId:'cancel'},
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
				width		: 440,
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
										{	fieldLabel	: Language.get('','발행번호'),
											xtype		: 'textfield',
											name		: 'invc_numb',
											labelWidth	: 90,
											width		: 190,
											margin		: '0 2 0 10',
										},{	fieldLabel	: Language.get('','검사일자'),
											xtype		: 'datefield',
											name		: 'insp_date',
											width		: 168,
											margin		: '0 0 0 10',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											allowBlank	: false,
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{ 	fieldLabel	: Language.get('','거래처명'),
											xtype		: 'textfield',
											name		: 'cstm_code',
											readOnly	: true,
											margin		: '0 0 0 5',
											labelWidth	: 95,
											width		: 195,
										},{	xtype		: 'textfield',
											name		: 'cstm_name',
											readOnly	: true,
											width		: 170,
											margin		: '0.5 0 0 10',
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{ 	fieldLabel	: Language.get('','품명'),
											xtype		: 'textfield',
											name		: 'item_code',
											readOnly	: true,
											labelWidth	: 95,
											width		: 195,
											margin		: '0 0 0 5',
										},{	xtype		: 'textfield',
											name		: 'item_name',
											pair		: 'item_idcd',
											readOnly	: true,
											width		: 170,
											margin		: '0.5 0 0 10',
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','LOT NO'),
											xtype		: 'textfield',
											name		: 'lott_numb',
											readOnly	: true,
											labelWidth	: 100,
											width		: 380,
											margin		: '0 0 0 0',
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','입고수량'),
											xtype		: 'numericfield',
											name		: 'istt_qntt',
											labelWidth	: 100,
											width		: 170,
											readOnly	: true,
										},{	fieldLabel	: Language.get('','불량수량'),
											xtype		: 'numericfield',
											name		: 'poor_qntt',
											labelWidth	: 50,
											width		: 110,
										},{	fieldLabel	: Language.get('','불량률'),
											xtype		: 'numericfield',
											name		: 'poor_rate',
											labelWidth	: 40,
											width		: 100,
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','합격여부'),
											xtype		: 'lookupfield',
											name		: 'pass_yorn',
											lookupValue :  [['0','합격'],['1','불합격']] ,
											width		: 140,
											margin		: '0 0 0 30',
										},{	fieldLabel	: Language.get('','발생공정'),
											xtype		: 'popupfield',
											name		: 'wkct_name',
											pair		: 'wkct_idcd',
											clearable	: true,
											labelWidth	: 50,
											width		: 210,
											margin		: '0 0 0 0',
											popup: {
												select : 'SINGLE',
												widget : 'lookup-wkct-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('wkct_name'));
													pairField.setValue(records[0].get('wkct_idcd'));
												}
											}
										},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{ fieldLabel	: Language.get('','특이사항'),
											xtype		: 'textfield',
											name		: 'remk_text',
											labelWidth	: 100,
											width		: 380,
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	:  Language.get( '' , '불량현상'),
											name		: 'poor_cont',
											xtype		: 'textarea',
											width		: 350,
											height		: 80,
											margin		: '0 0 0 30',
										}
									]
								},{	fieldLabel	: Language.get('modify','수정'),
									xtype		: 'textfield',
									name		: 'modify',
									width		: 170,
									hidden		: true
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
				items  : [ me.createTab3(),
				          {title : 'MRB 검토의견',xtype: 'module-inspentry-mrblister'},
				          {title : '첨부파일',xtype: 'module-inspentry-filelister'},
//				          {title : '이미지',xtype: 'module-inspentry-imgelister'}

				]
			}
		;
		return tabs;
	},

	createTab3 : function() {
		var me = this,
			item = {
				title	: '추가정보',
				xtype	: 'form-panel',
				name	: 'edit_tab3',
				dock	:'left',
				region	: 'center',
				fieldDefaults	: { width : 290, labelWidth : 70, labelSeparator : ''},
				items	: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
						items	: [
							{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '10 0 10 0',
								items	: [
									{	xtype : 'fieldset',
										layout: 'hbox',
										border: 0,
										margin: '5 0 0 0',
										items : [
											{	fieldLabel	:  Language.get( '' , '부적합 원인'),
												name		: 'incn_caus',
												xtype		: 'textarea',
												width		: 450,
												height		: 80,
												margin		: '0 0 0 0',
											}
										]
									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
											items	: [
												{	xtype		: 'label',
													text		: '처리방안',
													width		: 100,
													margin		: '2 0 0 38',
												},{	xtype		: 'checkbox',
													boxLabel	: '특채',
													name		: 'optn_1',
													width		: 50,
													margin		: '0 0 0 -52',
													inputValue	: '1000',
													listeners: {
														change: function(chkbox,newVal,oldVal){
															if(chkbox.getValue() == true){
																me.chk(chkbox.getValue(),this);
															}
														}
													}
												},{	xtype		: 'checkbox',
													boxLabel	: '선별',
													name		: 'optn_2',
													width		: 50,
													margin		: '0 0 0 10',
													listeners: {
														change: function(chkbox,newVal,oldVal){
															if(chkbox.getValue() == true){
																me.chk(chkbox.getValue(),this);
															}
														}
													}
												},{	xtype		: 'checkbox',
													boxLabel	: '반품',
													name		: 'optn_3',
													width		: 50,
													margin		: '0 0 0 10',
													listeners: {
														change: function(chkbox,newVal,oldVal){
															if(chkbox.getValue() == true){
																me.chk(chkbox.getValue(),this);
															}
														}
													}
												},{	xtype		: 'checkbox',
													boxLabel	: '교환',
													name		: 'optn_4',
													width		: 50,
													margin		: '0 0 0 10',
													listeners: {
														change: function(chkbox,newVal,oldVal){
															if(chkbox.getValue() == true){
																me.chk(chkbox.getValue(),this);
															}
														}
													}
												},{	xtype		: 'checkbox',
													boxLabel	: '재작업',
													name		: 'optn_5',
													width		: 50,
													margin		: '0 0 0 10',
													listeners: {
														change: function(chkbox,newVal,oldVal){
															if(chkbox.getValue() == true){
																me.chk(chkbox.getValue(),this);
															}
														}
													}
												},{	xtype		: 'checkbox',
													boxLabel	: '수리',
													name		: 'optn_6',
													width		: 50,
													margin		: '0 0 0 15',
													listeners: {
														change: function(chkbox,newVal,oldVal){
															if(chkbox.getValue() == true){
																me.chk(chkbox.getValue(),this);
															}
														}
													}
												},{	xtype		: 'checkbox',
													boxLabel	: '폐기',
													name		: 'optn_7',
													width		: 50,
													margin		: '0 0 0 10',
													listeners: {
														change: function(chkbox,newVal,oldVal){
															if(chkbox.getValue() == true){
																me.chk(chkbox.getValue(),this);
															}
														}
													}
												},{	fieldLabel	: Language.get('cstm_spec','처리방안'),
													xtype		: 'textfield',
													name		: 'proc_schm',
													hidden		: true,
													width		: 200,
													labelWidth	: 80,
													margin		: '0 0 0 0'
												}
											]
									},{xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
										items	: [
											{	fieldLabel	: Language.get('','처리결과'),
												xtype		: 'textfield',
												name		: 'proc_rslt',
												width		: 462,
												labelWidth	: 80,
												margin		: '0 0 0 0'
											}
										]
									},{xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
										items	: [
											{	fieldLabel	: Language.get('','처리부서'),
												xtype		: 'popupfield',
												name		: 'dept_name',
												pair		: 'dept_idcd',
												labelWidth	: 80,
												width		: 180,
												popup		: {
													select  : 'SINGLE',
													widget  : 'lookup-dept-popup',
													params  : { stor_grp : _global.stor_grp , line_stat : '0'},
													result  : function(records, nameField, pairField) {
														nameField.setValue(records[0].get('dept_name'));
														pairField.setValue(records[0].get('dept_code'));
													}
												}
											},{	name	: 'dept_idcd'		, xtype : 'textfield', hidden : true
											},{	fieldLabel	: Language.get('','처리일자'),
												xtype		: 'datefield',
												name		: 'proc_date',
												labelWidth	: 50,
												width		: 150,
												margin		: '0 0 0 10',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
											}
										]
									},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
										items : [
											{	fieldLabel	: Language.get('','처리일자확인'),
												xtype		: 'datefield',
												name		: 'proc_cnfm_date',
												labelWidth	: 70,
												width		: 170,
												margin		: '0 0 0 10',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
											},{	xtype		: 'checkbox',
												boxLabel	: '적합',
												name		: 'use_yorn',
												width		: 50,
												margin		: '0 0 0 20',
												listeners: {
													change: function(chkbox,newVal,oldVal){
														if(chkbox.getValue() == true){
															me.chk(chkbox.getValue(),this);
														}
													}
												}
											},{	xtype		: 'checkbox',
												boxLabel	: '부적합',
												name		: 'nuse_yorn',
												width		: 50,
												margin		: '0 0 0 10',
												listeners: {
													change: function(chkbox,newVal,oldVal){
														if(chkbox.getValue() == true){
															me.chk(chkbox.getValue(),this);
														}
													}
												}
											},{	fieldLabel	: Language.get('','적합여부'),
												xtype		: 'lookupfield',
												name		: 'fitg_yorn',
												hidden		: true,
												lookupValue : resource.lookup('yorn'),
												width		: 140,
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

	chk : function(val, obj){
		var me = this;
		var op1 = me.down('[name=optn_1]');
		var op2 = me.down('[name=optn_2]');
		var op3 = me.down('[name=optn_3]');
		var op4 = me.down('[name=optn_4]');
		var op5 = me.down('[name=optn_5]');
		var op6 = me.down('[name=optn_6]');
		var op7 = me.down('[name=optn_7]');
		var val = me.down('[name=proc_schm]');


		var use = me.down('[name=use_yorn]');
		var nuse = me.down('[name=nuse_yorn]');
		var val2 = me.down('[name=fitg_yorn]');

		if(obj.getName() == 'optn_1'){
			op2.setValue(false);
			op3.setValue(false);
			op4.setValue(false);
			op5.setValue(false);
			op6.setValue(false);
			op7.setValue(false);
			val.setValue('1000');
		}else if(obj.getName() == 'optn_2'){
			op1.setValue(false);
			op3.setValue(false);
			op4.setValue(false);
			op5.setValue(false);
			op6.setValue(false);
			op7.setValue(false);
			val.setValue('2000');
		}else if(obj.getName() == 'optn_3'){
			op1.setValue(false);
			op2.setValue(false);
			op4.setValue(false);
			op5.setValue(false);
			op6.setValue(false);
			op7.setValue(false);
			val.setValue('3000');
		}else if(obj.getName() == 'optn_4'){
			op1.setValue(false);
			op2.setValue(false);
			op3.setValue(false);
			op5.setValue(false);
			op6.setValue(false);
			op7.setValue(false);
			val.setValue('4000');
		}else if(obj.getName() == 'optn_5'){
			op1.setValue(false);
			op2.setValue(false);
			op3.setValue(false);
			op4.setValue(false);
			op6.setValue(false);
			op7.setValue(false);
			val.setValue('5000');
		}else if(obj.getName() == 'optn_6'){
			op1.setValue(false);
			op2.setValue(false);
			op3.setValue(false);
			op4.setValue(false);
			op5.setValue(false);
			op7.setValue(false);
			val.setValue('6000');
		}else if(obj.getName() == 'optn_7'){
			op1.setValue(false);
			op2.setValue(false);
			op3.setValue(false);
			op4.setValue(false);
			op5.setValue(false);
			op6.setValue(false);
			val.setValue('7000');
		}

		if(obj.getName() == 'use_yorn'){
			nuse.setValue(false);
			val2.setValue('0')
		}else if(obj.getName() == 'nuse_yorn'){
			use.setValue(false);
			val2.setValue('1')
		}

	}
});

