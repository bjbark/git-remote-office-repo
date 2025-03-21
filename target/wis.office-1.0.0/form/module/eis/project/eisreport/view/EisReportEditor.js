Ext.define('module.eis.project.eisreport.view.EisReportEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-eisreport-editor',

	height : 320,
	layout : {
		type: 'border'
	},

	title			: Language.get('prjt_info','프로젝트 정보'),
	collapsible 	: true	,
	collapsed		: true	,
	defaultFocus	: 'prjt_code',

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
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 400, labelWidth : 80, labelSeparator : ''},
				items			: [
					{	name	: 'prjt_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('prjt_code','프로젝트코드'),
								name		: 'prjt_code',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 320
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat')	,
								width		: 75,
								margin		: '0 0 0 5'
							}
						]
					},{	fieldLabel	: Language.get('prjt_name','프로젝트명')	,
						xtype		: 'textfield'						,
						name		: 'prjt_name'
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('regi_date','등록일자'),
								xtype		: 'datefield',
								name		: 'nxrm_chek_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 200
							},{	fieldLabel	: '영업담당',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'drtr_name',
								pair		: 'drtr_idcd',
								allowBlank	: true,
								clearable	: false ,
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
					},{	fieldLabel	: '거래처',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'cstm_name',
						pair		: 'cstm_idcd',
						allowBlank	: true,
						clearable	: false ,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-cstm-popup',
							params	: { stor_grp : _global.stor_grp, line_stat : '0' },
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].get('cstm_name'));
								pairField.setValue(records[0].get('cstm_idcd'));
							}
						}
					},{	name		: 'cstm_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('prjt_name','거래처명')	,
						xtype		: 'textfield'						,
						name		: 'cstm_name'
					},{	fieldLabel	: '품목코드',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'item_name',
						pair		: 'item_idcd',
						allowBlank	: true,
						clearable	: false ,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-item-popup',
							params	: { stor_grp : _global.stor_grp, line_stat : '0' },
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].get('item_name'));
								pairField.setValue(records[0].get('item_idcd'));
							}
						}
					},{	name		: 'item_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('item_name','품명')	,
						xtype		: 'textfield'						,
						name		: 'item_name'
					},{	fieldLabel	: Language.get('item_spec','규격')	,
						xtype		: 'textfield'						,
						name		: 'item_spec'
					},{	fieldLabel	: Language.get('item_modl','모델')	,
						xtype		: 'textfield'						,
						name		: 'item_modl'
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
				items	: [ me.createTab1(),me.createTab2(),me.createTab3()]
			}
		;
		return item;
	},
	createTab1 : function() {
		var me = this,
			item = {
				title	: '거래처 정보',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	xtype 	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '5 0 0 0',
							items	: [
								{	xtype		: 'form-panel',
									border		: 0,
									width		: 250,
									fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
									items		: [
										{	fieldLabel	: '사업자명'	, name : 'bzmn_name'	, xtype  : 'textfield'	, readOnly : false	, onwerEditing : true
										},{	fieldLabel	: '사업자번호'	, name : 'buss_numb'	, xtype  : 'textfield'	, readOnly : false	, onwerEditing : true , vtype : 'bizno'
										},{	fieldLabel	: '업태'		, name : 'buss_kind'	, xtype  : 'textfield'	, readOnly : false	, onwerEditing : true
										},{	fieldLabel	: '업종'		, name : 'buss_type'	, xtype  : 'textfield'	, readOnly : false	, onwerEditing : true }
									]
								},{	xtype		: 'form-panel',
									border		:   0,
									width		: 250,
									fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
									items		: [
										{ fieldLabel : '사업자 구분'		, name : 'corp_dvcd'	, xtype : 'lookupfield'	, lookupValue   : resource.lookup('corp_dvcd') , onwerEditing : true },
										{ fieldLabel : '대표자명'		, name : 'boss_name'	, xtype : 'textfield'	, readOnly : false	, onwerEditing : true },
										{ fieldLabel : '전화번호'		, name : 'tele_numb'	, xtype : 'textfield'	, vtype : 'phone'	, readOnly   : false , onwerEditing : true } ,
										{ fieldLabel : '팩스번호'		, name : 'faxi_numb'	, xtype : 'textfield'	, vtype : 'fax'		, onwerEditing : true }  //, width : 250 , labelWidth : 70
									]
								}
							]
						},{	layout		: 'hbox',
							border		: 0,
							region		: 'center',
							margin		: '0 0 5 0',
							fieldDefaults: { labelSeparator : '' }, // width : 245, labelWidth : 70,
							items		: [
								{	fieldLabel : '계산서메일'	, name : 'mail_addr'	, xtype : 'textfield'	, vtype : 'email'	, width : 245, labelWidth : 70 , readOnly   : false , onwerEditing : true
								},{	fieldLabel : '휴대전화'		, name : 'hdph_numb'	, xtype : 'textfield'	, vtype : 'mobile'	, width : 250, labelWidth : 75, onwerEditing : true }  // width : 250,
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
							fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
							items	: [
								{	fieldLabel	: '주소',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'post_code',
									pair		: '',
									allowBlank	: true,
									clearable	: false ,
									editable	: true,
									vtype		: 'zipcode',
									width		: 160,
									popup		: {
										select	: 'DAUM',
										widget	: 'popup-zipcode-search',
										params	: { },
										result	: function(records, nameField, pairField){
											var panel   = nameField.up('form');
												if( records.length > 0 ){
													var address = records[0];
													nameField.setValue( address.postcode );
													panel.down('[name=addr_1fst]' ).setValue( address.roadAddress );
													panel.down('[name=addr_2snd]').focus(true , 10);
												}
										}
									}
								},{	name	: 'addr_1fst' ,  xtype  : 'textfield' ,  margin : '0 0 2 2', width : 333
								}
							]
						},{	xtype		: 'textfield',
							name		: 'addr_2snd',
							width		: 420,
							readOnly	: false,
							maxLength	: 100,
							maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.',
							margin		: '0 0 5 75'
						}
					]
				}
			;
		return item;
	},
	createTab2 : function() {
		var me = this,
			item = {
				title	: '게약금액 및 결제조건',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				fieldDefaults	: { width : 400, labelWidth : 80, labelSeparator : '' },
					items	: [
						{	xtype 	: 'panel',
							layout	: 'vbox',
							border	: 0,
							margin	: '5 0 0 0',
							items	: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('esti_amnt','견적금액'),
											xtype		: 'numericfield',
											name		: 'esti_amnt',
											width		: 200
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('cont_amnt','계약금액'),
											xtype		: 'numericfield',
											name		: 'cont_amnt',
											width		: 200
										},{	fieldLabel	: Language.get('regi_date','일자'),
											xtype		: 'datefield',
											name		: 'nxrm_chek_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('cont_amnt','중도금액'),
											xtype		: 'numericfield',
											name		: 'cont_amnt',
											width		: 200
										},{	fieldLabel	: Language.get('regi_date','일자'),
											xtype		: 'datefield',
											name		: 'nxrm_chek_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('cont_amnt','잔금'),
											xtype		: 'numericfield',
											name		: 'cont_amnt',
											width		: 200
										},{	fieldLabel	: Language.get('regi_date','일자'),
											xtype		: 'datefield',
											name		: 'nxrm_chek_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
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
	createTab3 : function() {
		var me = this,
			item = {
				title	: '주요 일정',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				fieldDefaults	: { width : 400, labelWidth : 80, labelSeparator : '' },
					items	: [
						{	xtype 	: 'panel',
							layout	: 'vbox',
							border	: 0,
							margin	: '5 0 0 0',
							items	: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('regi_date','착수일자'),
											xtype		: 'datefield',
											name		: 'nxrm_chek_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										},{	fieldLabel	: Language.get('regi_date','종료일자'),
											xtype		: 'datefield',
											name		: 'nxrm_chek_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('regi_date','확정일자'),
											xtype		: 'datefield',
											name		: 'nxrm_chek_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										},{	fieldLabel	: Language.get('regi_date','계약일자'),
											xtype		: 'datefield',
											name		: 'nxrm_chek_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('regi_date','기타1'),
											xtype		: 'datefield',
											name		: 'nxrm_chek_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										},{	fieldLabel	: Language.get('regi_date','기타2'),
											xtype		: 'datefield',
											name		: 'nxrm_chek_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										}
									]
								}
							]
						}
					]
				}
			;
		return item;
	}
});