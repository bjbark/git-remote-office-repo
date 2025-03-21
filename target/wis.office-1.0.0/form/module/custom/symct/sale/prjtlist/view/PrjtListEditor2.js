Ext.define('module.custom.symct.sale.prjtlist.view.PrjtListEditor2', { extend: 'Axt.form.Editor',

	alias: 'widget.module-prjtlist-editor2',

	height : 348,
	layout : {
		type: 'border'
	},

	title			: Language.get('amend_info','amend 정보'),
	collapsible 	: true	,
	collapsed		: true	,
	defaultFocus	: 'pjod_code',

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
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('pjod_idcd','수주번호'),
								name		: 'pjod_idcd',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 320,
								readOnly	: true
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat')	,
								width		: 75,
								margin		: '0 0 0 5'
							}
						]
					},{	fieldLabel	: '프로젝트',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'prjt_name',
						pair		: 'prjt_idcd',
						allowBlank	: true,
						clearable	: false ,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-prjt-popup',
							params	: { stor_grp : _global.stor_grp, line_stat : '0' },
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].get('prjt_name'));
								pairField.setValue(records[0].get('prjt_idcd'));
							}
						}
					},{	name	: 'prjt_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: '승인담당',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'apvl_drtr_name',
								pair		: 'apvl_drtr_idcd',
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
							},{	name	: 'apvl_drtr_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	fieldLabel	: '거래처',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'cstm_idcd',
						pair		: 'cstm_name',
						allowBlank	: true,
						clearable	: false ,
						readOnly	: true,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-cstm-popup',
							params	: { stor_grp : _global.stor_grp, line_stat : '0' },
							result	: function(records, nameField, pairField){
								var panel1 = nameField.up('form');
								var layout = panel1.up('form');
								var panel  = layout.down('[name=cstm_info]');
								panel.down('[name=buss_name]').setValue(records[0].get('buss_name'));
								panel.down('[name=buss_numb]').setValue(records[0].get('buss_numb'));
								panel.down('[name=buss_kind]').setValue(records[0].get('buss_kind'));
								panel.down('[name=buss_type]').setValue(records[0].get('buss_type'));
								panel.down('[name=corp_dvcd]').setValue(records[0].get('corp_dvcd'));
								panel.down('[name=boss_name]').setValue(records[0].get('boss_name'));
								panel.down('[name=tele_numb]').setValue(records[0].get('tele_numb'));
								panel.down('[name=faxi_numb]').setValue(records[0].get('faxi_numb'));
								panel.down('[name=mail_addr]').setValue(records[0].get('mail_addr'));
								panel.down('[name=hdph_numb]').setValue(records[0].get('hdph_numb'));
								nameField.setValue(records[0].get('cstm_idcd'));
								pairField.setValue(records[0].get('cstm_name'));
							}
						}
					},{	name		: 'cstm_code', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('cstm_name','거래처명'),
						xtype		: 'textfield' ,
						name		: 'cstm_name',
						readOnly	: true
					},{	fieldLabel	: '품목코드',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'item_idcd',
						pair		: 'item_name',
						allowBlank	: true,
						clearable	: false ,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-item-popup',
							params	: { stor_grp : _global.stor_grp, line_stat : '0' },
							result	: function(records, nameField, pairField){
								var panel1 = nameField.up('form');
								var layout = ('[name=pjod_info]');
								panel1.down('[name=item_spec]').setValue(records[0].get('item_spec'));
								nameField.setValue(records[0].get('item_idcd'));
								pairField.setValue(records[0].get('item_name'));
							}
						}
					},{	name		: 'item_code', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('item_name','품명'),
						xtype		: 'textfield',
						name		: 'item_name'
					},{	fieldLabel	: Language.get('item_spec','규격'),
						xtype		: 'textfield',
						name		: 'item_spec',
						hidden		: true
					},{	fieldLabel	: Language.get('item_modl','차종'),
						xtype		: 'textfield',
						name		: 'item_modl'
					},{	fieldLabel	: Language.get('amnd_resn','AMEND사유'),
						xtype		: 'textarea',
						name		: 'amnd_resn',
						hieght		: 7
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
				items	: [ me.createTab1(),me.createTab2()]
			}
		;
		return item;
	},

	createTab1 : function() {
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
										{	fieldLabel	: Language.get('regi_date','등록일자'),
											xtype		: 'datefield',
											name		: 'regi_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										},{	fieldLabel	: Language.get('deli_date','납기일자'),
											xtype		: 'datefield',
											name		: 'deli_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 201
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('frst_exam_date','1차시험일자'),
											xtype		: 'datefield',
											name		: 'frst_exam_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										},{	fieldLabel	: Language.get('send_exam_date','2차시험일자'),
											xtype		: 'datefield',
											name		: 'send_exam_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 201
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('strt_date','착수일자'),
											xtype		: 'datefield',
											name		: 'strt_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										},{	fieldLabel	: Language.get('endd_date','종료일자'),
											xtype		: 'datefield',
											name		: 'endd_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 201
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('amnd_date','AMEND일자'),
											xtype		: 'datefield',
											name		: 'amnd_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 201
										},{	fieldLabel	: Language.get('esti_amnt','견적금액'),
											xtype		: 'numericfield',
											name		: 'esti_amnt',
											width		: 201,
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

	createTab2 : function() {
		var me = this,
			item = {
				title	: '거래처 정보',
				name	: 'cstm_info',
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
										{	fieldLabel	: '사업명'	, name : 'buss_name'	, xtype  : 'textfield'	, readOnly : true	, onwerEditing : true
										},{	fieldLabel	: '사업자번호', name : 'buss_numb'	, xtype  : 'textfield'	, readOnly : true	, onwerEditing : true , vtype : 'bizno'
										},{	fieldLabel	: '업태'		, name : 'buss_kind'	, xtype  : 'textfield'	, readOnly : true	, onwerEditing : true
										},{	fieldLabel	: '업종'		, name : 'buss_type'	, xtype  : 'textfield'	, readOnly : true	, onwerEditing : true }
									]
								},{	xtype		: 'form-panel',
									border		:   0,
									width		: 250,
									fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
									items		: [
										{ fieldLabel : '사업자 구분'	, name : 'corp_dvcd'	, xtype : 'lookupfield'	, lookupValue   : resource.lookup('corp_dvcd') , onwerEditing : true , readOnly : true},
										{ fieldLabel : '대표자명'	, name : 'boss_name'	, xtype : 'textfield'	, readOnly : true	, onwerEditing : true },
										{ fieldLabel : '전화번호'	, name : 'tele_numb'	, xtype : 'textfield'	, vtype : 'phone'	, readOnly   : true , onwerEditing : true } ,
										{ fieldLabel : '팩스번호'	, name : 'faxi_numb'	, xtype : 'textfield'	, vtype : 'fax'		, onwerEditing : true , readOnly : true}  //, width : 250 , labelWidth : 70
									]
								}
							]
						},{	layout		: 'hbox',
							border		: 0,
							region		: 'center',
							margin		: '0 0 5 0',
							fieldDefaults: { labelSeparator : '' }, // width : 245, labelWidth : 70,
							items		: [
								{	fieldLabel : '계산서메일'	, name : 'mail_addr'	, xtype : 'textfield'	, vtype : 'email'	, width : 245, labelWidth : 70 , readOnly   : true , onwerEditing : true
								},{	fieldLabel : '휴대전화'	, name : 'hdph_numb'	, xtype : 'textfield'	, vtype : 'mobile'	, width : 250, labelWidth : 75, onwerEditing : true , readOnly   : true}  // width : 250,
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
									readOnly	: true,
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
								},{	name	: 'addr_1fst' ,  xtype  : 'textfield' ,  margin : '0 0 2 2', width : 333 , readOnly : true
								}
							]
						},{	xtype		: 'textfield',
							name		: 'addr_2snd',
							width		: 420,
							readOnly	: true,
							maxLength	: 100,
							maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.',
							margin		: '0 0 5 75'
						}
					]
				}
			;
		return item;
	}
});