 Ext.define('module.cust.cstmlist.view.CstmListEditor2', {extend  : 'Axt.form.Editor',
	alias		: 'widget.module-cstmlist-editor2',
	layout		: { type: 'border' },
	title		: '거래처 정보',
	defaultFocus : 'cust_nm',
	//64 +
	initComponent: function(config){
		var me = this;
		me.dockedItems	= [ me.createWest(), me.createDock() ] ;
		me.items		= me.createTabs();
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this;
		var item =
			{	xtype : 'toolbar',
				dock  : 'bottom',
				items : [
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

	createWest : function () {
		var me = this,
			item ={
				xtype		: 'form-panel',
//				dock		: 'left',
				bodyStyle	: { padding: '10px' },
//				width		: 330,
				minWidth	: 2000,
				flex		: 1,
				fieldDefaults: { width : 315, labelWidth : 70, labelSeparator : ''},
				items		: [
					{	name	: 'cstm_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '0 0 5 0' ,
						items	: [
							{	fieldLabel	: Language.get( 'cstm_code', '거래처코드' ),
								name		: 'cstm_code',
								xtype		: 'textfield',
								maxLength	: 50,
								width		: 240,
								allowBlank	: true,
								readOnly	: true,
								emptyText	: Const.invalid.emptyValue
							},{	name		: 'line_stat'  ,
								xtype		: 'lookupfield',
								lookupValue	: resource.lookup('line_stat'),
								width		: 70,
								margin		: '1 0 0 5',
								readOnly	: true
							}
						]
					},{	fieldLabel	:  Language.get( '' , '거래처명'),
						name		: 'cstm_name',
						xtype		: 'textfield',
						maxLength	: 200,
						allowBlank	: false,
						onwerEditing: true,
						readOnly	: true,
						emptyText	: Const.invalid.emptyValue
					},{	fieldLabel	:  Language.get( '' , '약칭'),
						name		: 'cstm_stnm_1fst',
						xtype		: 'textfield',
						maxLength	: 200,
						allowBlank	: true,
						readOnly	: true,
						onwerEditing: true,
					},{	fieldLabel	:  Language.get( '' , '영문명'),
						name		: 'engl_name',
						xtype		: 'textfield',
						maxLength	: 200,
						allowBlank	: true,
						readOnly	: true,
						onwerEditing: true
					},{	fieldLabel	:  Language.get( '' , '영문약칭'),
						name		: 'engl_stnm',
						xtype		: 'textfield',
						maxLength	: 200,
						allowBlank	: true,
						readOnly	: true,
						onwerEditing: true,
					},{	fieldLabel	: Language.get('','분류정보'),
						maxLength	: 200,
						xtype		: 'popupfield', editable : true, enableKeyEvents : true,
						name		: 'clss_desc',
						pair		: 'lcls_idcd',
						clearable	: false ,
						readOnly	: true,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-cstm-clss-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0' },
							result : function(records, nameField, pairField) {
								me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
								me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
								me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
								nameField.setValue(records[0].get('clss_desc'));
							}
						},
						listeners	: {
							change	: function(){
								Ext.ComponentQuery.query('module-cstmlist-editor')[0].down('[name=change]').setValue('Y');
							}
						}
					},{	fieldLabel	: Language.get( '' , '관리사업장'),
						xtype		: 'popupfield',
						editable : true,
						enableKeyEvents : true,
						name		: 'mngt_bzpl_name',
						pair		: 'mngt_bzpl_idcd',
						allowBlank	: true,
						clearable	: false ,
						onwerEditing: true,
						readOnly	: true,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-bzpl-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0'},
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].get('bzpl_name'));
								pairField.setValue(records[0].get('bzpl_idcd'));
							}
						}
					},{	name		: 'mngt_bzpl_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: '영업담당',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'sale_drtr_name',
						pair		: 'sale_drtr_idcd',
						allowBlank	: true,
						clearable	: false ,
						readOnly	: true,
						popup			: {
							select	: 'SINGLE',
							widget	: 'lookup-user-popup',
							params	: { stor_grp : _global.stor_grp, line_stat : '0' },
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].get('user_name'));
								pairField.setValue(records[0].get('user_idcd'));
							}
						}
					},{	name	: 'sale_drtr_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '0 0 0 45',
						items	: [
							{	fieldLabel	: Language.get('sale_cstm_yorn','판매'),
								xtype		: 'lookupfield',
								name		: 'sale_cstm_yorn',
								width		: 90,
								labelWidth	: 26,
								readOnly	: true,
								lookupValue	: resource.lookup('yorn')
							},{	fieldLabel	: Language.get('puch_cstm_yorn','구매'),
								xtype		: 'lookupfield',
								name		: 'puch_cstm_yorn',
								width		: 90,
								labelWidth	: 26,
								readOnly	: true,
								lookupValue	: resource.lookup('yorn')
							},{	fieldLabel	: Language.get( 'otod_cstm_yorn','외주'),
								xtype		: 'lookupfield',
								name		: 'otod_cstm_yorn',
								width		: 90,
								labelWidth	: 26,
								readOnly	: true,
								lookupValue	: resource.lookup('yorn')
							}
						]
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '5 0 0 45',
						items	: [
							{	fieldLabel	: Language.get('expt_cstm_yorn','수출'),
								xtype		: 'lookupfield',
								name		: 'expt_cstm_yorn',
								width		: 90,
								labelWidth	: 26,
								hidden		: true,
								readOnly	: true,
								lookupValue	: resource.lookup('yorn')
							},{	fieldLabel	: Language.get('incm_cstm_yorn','수입'),
								xtype		: 'lookupfield',
								name		: 'incm_cstm_yorn',
								width		: 90,
								labelWidth	: 26,
								hidden		: true,
								readOnly	: true,
								lookupValue	: resource.lookup('yorn')
							},{	fieldLabel	: Language.get('etcc_cstm_yorn','기타'),
								xtype		: 'lookupfield',
								name		: 'etcc_cstm_yorn',
								width		: 90,
								labelWidth	: 26,
								readOnly	: true,
								lookupValue	: resource.lookup('yorn')
							}
						]
					},{xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '5 0 0 45',
						items	: [
							{	fieldLabel	: Language.get( 'change','change'),
								xtype		: 'textfield',
								name		: 'change',
								hidden		: true
							},{	name : 'lcls_idcd', xtype : 'textfield' , hidden : true
							},{	name : 'mcls_idcd', xtype : 'textfield' , hidden : true
							},{	name : 'scls_idcd', xtype : 'textfield' , hidden : true
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
			tabs = {
				xtype  : 'tabpanel',
				region : 'center',
				itemId : 'editTab',
				plain  : true,
				margin : 0 ,
				items  : [ me.createTab1()/*, me.createTab2()*/, me.createTab3(), me.createTab4(),{title : '첨부파일',xtype: 'module-cstmlist-editorlister'} ]
			}
		;
		return tabs;
	},

	createTab1 : function() {
		var item = {
				title		: '사업장정보',
				layout		: 'vbox',
				bodyStyle	: { padding: '5px' },
				region		: 'center',
				fieldDefaults: { labelWidth : 70, labelSeparator : '' },
				items		: [
					{	xtype 	: 'panel',
						layout	: 'hbox',
						border	: 0,
						margin : '8 0 0 0',
						items	: [
							{	xtype		: 'form-panel',
								border		: 0,
								width		: 250,
								fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
								items		: [
									{	fieldLabel	: '사업자명'		, name : 'buss_name'	, xtype  : 'textfield'	, readOnly : true	, onwerEditing : true
									},{	fieldLabel	: '사업자번호'		, name : 'buss_numb'	, xtype  : 'textfield'	, readOnly : true	, onwerEditing : true , vtype : 'bizno'
									},{	fieldLabel	: '업태'			, name : 'buss_type'	, xtype  : 'textfield'	, readOnly : true	, onwerEditing : true
									},{	fieldLabel	: '업종'			, name : 'buss_kind'	, xtype  : 'textfield'	, readOnly : true	, onwerEditing : true }
								]
							},{	xtype		: 'form-panel',
								border		:   0,
								width		: 250,
								fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
								items		: [
									{ fieldLabel : '사업자 구분'		, name : 'corp_dvcd'	, xtype : 'lookupfield'	, readOnly      : true		,lookupValue   : resource.lookup('corp_dvcd') , onwerEditing : true },
									{ fieldLabel : '대표자명'		, name : 'boss_name'	, xtype : 'textfield'	, readOnly      : true		, onwerEditing     : true },
									{ fieldLabel : '전화번호'		, name : 'tele_numb'	, xtype : 'textfield'	, vtype         : 'phone'	, readOnly     : true , onwerEditing : true } ,
									{ fieldLabel : '팩스번호'		, name : 'faxi_numb'	, xtype : 'textfield'	, vtype         : 'fax'		, readOnly     : true , onwerEditing : true }
								]
							}
						]
					},{	layout		: 'hbox',
						border		: 0,
						region		: 'center',
						margin		: '0 0 5 0',
						fieldDefaults: { labelSeparator : '' },
						items		: [
							{	fieldLabel : '계산서메일'	, name : 'mail_addr'	, xtype : 'textfield'	, vtype : 'email'	, width : 245, labelWidth : 70 , readOnly     : true , onwerEditing : true
							},{	fieldLabel : '휴대전화'	, name : 'hdph_numb'	, xtype : 'textfield'	, vtype : 'mobile'	, width : 250, labelWidth : 75 , readOnly     : true , onwerEditing : true}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
						fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
						items	: [
							{	fieldLabel	: '주소',
								xtype		: 'popupfield',
								editable : true,
								enableKeyEvents : true,
								name		: 'post_code',
								pair		: '',
								allowBlank	: true,
								clearable	: false ,
								editable	: true,
								hidden		: false,
								width		: 160,
								readOnly	: true,
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
								},
								listeners	: {
									change	: function(){
										Ext.ComponentQuery.query('module-cstmlist-editor2')[0].down('[name=change]').setValue('Y');
									}
								}
							},{	name	: 'addr_1fst' ,  xtype  : 'textfield' ,  margin : '0 0 2 2', width : 333, readOnly	: true
							}
						]
					},{	xtype		: 'textfield',
						name		: 'addr_2snd',
						width		: 420,
						readOnly	: true,
						hidden		: false,
						maxLength	: 100,
						maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.',
						margin		: '0 0 5 75'
					},{	layout		: 'hbox',
						border		: 0,
						region		: 'center',
						margin		: '0 0 5 0',
						fieldDefaults: { labelSeparator : '' },
						items		: [
							{	xtype		: 'numericfield',
								fieldLabel	: '즐겨찾기',
								name		: 'favo_numb',
								width		: 235,
								lalelWidth	: 70,
								readOnly	: true,
								hidden		: false,
								margin		: '0 0 0 10'
							},{	fieldLabel	: Language.get( '' , '주문인식'),
								xtype		: 'textfield',
								name		: 'acpt_typl_char',
								width		: 250,
								readOnly	: true,
								hidden		: _global.options.mes_system_type !='Frame',
//								hidden		: _global.hq_id == 'N1000hjsys'? false : true,
								labelWidth	: 75,
								minLength	: 2,
								minLengthText : '영문 2자로 작성하여 주시기 바랍니다.',
								maxLength	: 2,
								maxLengthText : '영문 2자로 작성하여 주시기 바랍니다.',
								regex: /^[a-zA-Z]{2}$/,
								margin		: '0 0 5 0'
							}
						]
					}
				]
			}
		;
		return item;
	},

	createTab2 : function() {
		var item ={
				title		: Language.get( '' , '신용정보'),
				layout		: 'vbox',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				region		: 'center',
				fieldDefaults: { labelWidth : 70, labelSeparator : ''},
				items		: [
					{	fieldLabel	: '청구거래처',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'blto_idcd_1fst_name',
						pair		: 'blto_idcd_1fst',
						allowBlank	: true,
						clearable	: false ,
						width		: 320,
						labelWidth	: 80,
						readOnly	: true,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-cstm-popup',
							params	: { stor_grp : _global.stor_grp, row_sts : '0' },
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].get('cstm_name'));
								pairField.setValue(records[0].get('cstm_idcd'));
							}
						}
					},{	name		: 'blto_idcd_1fst', xtype : 'textfield' , hidden : true
					},{	layout		: 'hbox',
						border		: 0,
						region		: 'center',
						margin		: '0 0 5 0',
						fieldDefaults: {labelSeparater: '' },
						items		: [
							{	fieldLabel	: Language.get('scrt_sett_dvcd', '담보설정'),
								xtype		: 'lookupfield',
								name		: 'scrt_sett_dvcd',
								width		: 160,
								labelWidth	: 80,
								readOnly	: true,
								lookupValue	: resource.lookup('scrt_sett_dvcd')
							},{	fieldLabel	: Language.get('scrt_sett_amnt','담보금액'),
								xtype		: 'numericfield',
								name		: 'scrt_sett_amnt',
								width		: 160,
								labelWidth	: 80,
								readOnly	: true
							}
						]
					},{	fieldLabel	: '담보제공자',
						name		: 'scrt_offr_aman',
						xtype		: 'textfield',
						width		: 320,
						labelWidth	: 80,
						readOnly	: true
					},{	fieldLabel	: Language.get('scrt_mltl','담보물건'),
						name		: 'scrt_mltl',
						xtype		: 'textfield',
						hight		: 100,
						width		: 320,
						labelWidth	: 80,
						readOnly	: true
					},{	layout		: 'hbox',
						border		: 0,
						region		: 'center',
						margin		: '0 0 5 0',
						fieldDefaults: {labelSeparater: '' },
						items		: [
							{	fieldLabel	: '신용등급',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'crdt_name',
								pair		: 'crdt_bacd',
								allowBlank	: true,
								clearable	: false ,
								width		: 160,
								labelWidth	: 80,
								readOnly	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params	: { prnt_idcd : '1103' , stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{	name		: 'crdt_bacd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('crdt_lmit_amnt','여신한도'),
								xtype		: 'numericfield',
								name		: 'crdt_lmit_amnt',
								width		: 160,
								labelWidth	: 80,
								readOnly	: true
							}
						]
					},{	layout		: 'hbox',
						border		: 0,
						region		: 'center',
						margin		: '0 0 5 0',
						fieldDefaults: {labelSeparater: '' },
						items	: [
						{	fieldLabel	: Language.get('pric_dvcd', '단가구분'),
							xtype		: 'lookupfield',
							name		: 'pric_dvcd',
							width		: 160,
							labelWidth	: 80,
							readOnly	: true,
							lookupValue	: resource.lookup('pric_dvcd')
							}
						]
					}
				]
			}
		;
		return item;
	},

	createTab3 : function() {
		var  me = this;
		var item =
		{
			title	: Language.get( '' , '담당자'),
			xtype	: 'module-cstmlist-drtr-lister',
		};
		return item;
	},

	createTab4 : function() {
		var  me = this;
		var item =
		{
			title	: Language.get( '' , '배송처'),
			xtype	: 'module-cstmlist-deli-lister',
		};
		return item;
	}
});