 Ext.define('module.sale.sale.salelist1.view.SaleList1Editor', {extend  : 'Axt.form.Editor',
	alias		: 'widget.module-salelist1-editor',
	height		: 374,
	layout		: { type: 'border' },
	title		: '거래처 정보',
	collapsible	: true,
	collapsed	: true ,
	defaultFocus : 'cust_nm',
	//64 +
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
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style'},
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
				width		: 330,
				fieldDefaults: { width : 315, labelWidth : 70, labelSeparator : '' },
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
								emptyText	: Const.invalid.emptyValue
							},{	name		: 'line_stat'  ,
								xtype		: 'lookupfield',
								lookupValue	: resource.lookup('line_stat'),
								width		: 70,
								margin		: '0 0 0 5'
							}
						]
					},{	fieldLabel	:  Language.get( '' , '거래처명'),
						name		: 'cstm_name',
						xtype		: 'textfield',
						maxLength	: 200,
						allowBlank	: false,
						onwerEditing: true,
						emptyText	: Const.invalid.emptyValue
					},{	fieldLabel	:  Language.get( '' , '약칭'),
						name		: 'cstm_stnm_1fst',
						xtype		: 'textfield',
						maxLength	: 200,
						allowBlank	: true,
						onwerEditing: true,
					},{	fieldLabel	:  Language.get( '' , '영문명'),
						name		: 'engl_name',
						xtype		: 'textfield',
						maxLength	: 200,
						allowBlank	: true,
						onwerEditing: true
					},{	fieldLabel	:  Language.get( '' , '영문약칭'),
						name		: 'engl_stnm',
						xtype		: 'textfield',
						maxLength	: 200,
						allowBlank	: true,
						onwerEditing: true        ,
					},{	fieldLabel	: Language.get('','분류정보'),
						maxLength	: 200,
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'clss_desc',
						pair		: 'lcls_idcd',
						clearable	: false ,
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
								Ext.ComponentQuery.query('module-salelist1-editor')[0].down('[name=change]').setValue('Y');
							}
						}
					},{	fieldLabel	: Language.get( '' , '관리사업장'),
						xtype		: 'popupfield', editable : true, enableKeyEvents : true,
						name		: 'mngt_bzpl_name',
						pair		: 'mngt_bzpl_idcd',
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
					},{	name		: 'mngt_bzpl_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: '영업담당',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'sale_drtr_name',
						pair		: 'sale_drtr_idcd',
						allowBlank	: true,
						clearable	: false ,
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
								lookupValue	: resource.lookup('yorn')
							},{	fieldLabel	: Language.get('puch_cstm_yorn','구매'),
								xtype		: 'lookupfield',
								name		: 'puch_cstm_yorn',
								width		: 90,
								labelWidth	: 26,
								lookupValue	: resource.lookup('yorn')
							},{	fieldLabel	: Language.get('etcc_cstm_yorn','기타'),
								xtype		: 'lookupfield',
								name		: 'etcc_cstm_yorn',
								width		: 90,
								labelWidth	: 26,
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
								lookupValue	: resource.lookup('yorn')
							},{	fieldLabel	: Language.get('incm_cstm_yorn','수입'),
								xtype		: 'lookupfield',
								name		: 'incm_cstm_yorn',
								width		: 90,
								labelWidth	: 26,
								lookupValue	: resource.lookup('yorn')
							},{	fieldLabel	: Language.get( 'otod_cstm_yorn','외주'),
								xtype		: 'lookupfield',
								name		: 'otod_cstm_yorn',
								lookupValue	: resource.lookup('yorn'),
								width		: 90,
								labelWidth	: 26,
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
				items  : [ me.createTab1(), me.createTab2(), me.createTab3(), me.createTab4(),{title : '첨부파일',xtype: 'module-salelist1-editorlister'},  me.createTab5() ]
			}
		;
		return tabs;
	},

	createTab1 : function() {
		var item = {
				title		: '사업장정보',
				layout		: 'vbox',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				region		: 'center',
				fieldDefaults: { labelWidth : 70, labelSeparator : '' },
				items		: [
					{	xtype 	: 'panel',
						layout	: 'hbox',
						border	: 0,
						items	: [
							{	xtype		: 'form-panel',
								border		: 0,
								width		: 250,
								fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
								items		: [
									{	fieldLabel	: '사업자명'		, name : 'buss_name'	, xtype  : 'textfield'	, readOnly : false	, onwerEditing : true
									},{	fieldLabel	: '사업자번호'	, name : 'buss_numb'	, xtype  : 'textfield'	, readOnly : false	, onwerEditing : true , vtype : 'bizno'
									},{	fieldLabel	: '업태'			, name : 'buss_kind'	, xtype  : 'textfield'	, readOnly : false	, onwerEditing : true
									},{	fieldLabel	: '업종'			, name : 'buss_type'	, xtype  : 'textfield'	, readOnly : false	, onwerEditing : true }
								]
							},{	xtype		: 'form-panel',
								border		:   0,
								width		: 250,
								fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
								items		: [
									{ fieldLabel : '사업자 구분'		, name : 'corp_dvcd'	, xtype : 'lookupfield'	, lookupValue   : resource.lookup('corp_dvcd') , onwerEditing : true },
									{ fieldLabel : '대표자명'		, name : 'boss_name'	, xtype : 'textfield'	, readOnly      : false		, onwerEditing     : true },
									{ fieldLabel : '전화번호'		, name : 'tele_numb'	, xtype : 'textfield'	, vtype         : 'phone'	, readOnly     : false , onwerEditing : true } ,
									{ fieldLabel : '팩스번호'		, name : 'faxi_numb'	, xtype : 'textfield'	, vtype         : 'fax'		, onwerEditing : true }
								]
							}
						]
					},{	layout		: 'hbox',
						border		: 0,
						region		: 'center',
						margin		: '0 0 5 0',
						fieldDefaults: { labelSeparator : '' },
						items		: [
							{	fieldLabel : '계산서메일'	, name : 'mail_addr'	, xtype : 'textfield'	, width : 245, labelWidth : 70 , readOnly     : false , onwerEditing : true,
								listeners	: {
									blur	: function(){
										var val = this.getValue(),
											reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

										if(!val == '' || !val == null){
											if(!reg_email.test(val)) {
												Ext.Msg.alert("알림","이메일 형식에 맞게 작성하여 주십시오. (띄어쓰기 확인필요)");
												this.reset();
											}
										}
									}
								}
							},{	fieldLabel : '휴대전화'	, name : 'hdph_numb'	, xtype : 'textfield'	, vtype : 'mobile'	, width : 250, labelWidth : 75 , onwerEditing : true }
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
								hidden		: false,
								width		: 160,
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
										Ext.ComponentQuery.query('module-salelist1-editor')[0].down('[name=change]').setValue('Y');
									}
								}
							},{	name	: 'addr_1fst' ,  xtype  : 'textfield' ,  margin : '0 0 2 2', width : 333,hidden		: false,
							}
						]
					},{	xtype		: 'textfield',
						name		: 'addr_2snd',
						width		: 420,
						readOnly	: false,
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
							{	xtype		: 'textfield',
								fieldLabel	: '즐겨찾기',
								name		: 'favo_numb',
								width		: 235,
								value		: null,
								lalelWidth	: 70,
								fieldStyle	: 'text-align:right;',
								readOnly	: false,
								hidden		: false,
								margin		: '0 0 0 10',
								listeners	: {
									blur	: function(){
										var fav = this.getValue(),
											val = Number(fav),
											check = 0;
										;
										if(!(fav == null|| fav == '')){
											if(isNaN(val)){
												check = 1;
											}else{
												if(val>99999 || val < 1){
													check = 1;
												}
											}
										}

										if(check != 0){
											Ext.Msg.alert("알림","1~99999 까지의 숫자만 입력하여 주십시오.");
											this.reset();
										}
									}
								}
							},{ fieldLabel	: '운송지역',
								xtype		: 'popupfield',
								 width		: 250,
								labelWidth	: 75,
								hidden		: _global.hq_id == 'N1000IYPKG'? false : true,
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
	createTab2 : function() {
		var item ={
				title		: Language.get( '' , '신용 및 단가 정보'),
				layout		: 'vbox',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				region		: 'center',
				fieldDefaults: { labelWidth : 70, labelSeparator : '' },
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
								lookupValue	: resource.lookup('scrt_sett_dvcd')
							},{	fieldLabel	: Language.get('scrt_sett_amnt','담보금액'),
								xtype		: 'numericfield',
								name		: 'scrt_sett_amnt',
								width		: 160,
								labelWidth	: 80
							}
						]
					},{	fieldLabel	: '담보제공자',
						name		: 'scrt_offr_aman',
						xtype		: 'textfield',
						width		: 320,
						labelWidth	: 80
					},{	fieldLabel	: Language.get('scrt_mltl','담보물건'),
						name		: 'scrt_mltl',
						xtype		: 'textfield',
						hight		: 100,
						width		: 320,
						labelWidth	: 80
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
								labelWidth	: 80
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
							lookupValue	: resource.lookup('pric_dvcd')
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
	createTab3 : function() {
		var  me = this;
		var item =
		{
			title	: Language.get( '' , '담당자'),
			xtype	: 'module-salelist1-drtr-lister',
		};
		return item;
	},
	/**
	 *
	 */
	createTab4 : function() {
		var  me = this;
		var item =
		{
			title	: Language.get( '' , '배송처'),
			xtype	: 'module-salelist1-deli-lister',
		};
		return item;
	},

	createTab5 : function() {
		var me = this,
		item ={
				title		: Language.get( '' , '거래종목 및 계산기준'),
				layout		: 'vbox',
				border		: 0,
				hidden		: _global.hq_id == 'N1000IYPKG'? false : true,
				bodyStyle	: { padding: '5px' },
				region		: 'left',
				fieldDefaults: { labelWidth : 100, labelSeparator : '' },
				items		: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 -10 0',
						items		: [
							{	fieldLabel	: '거래품목',
								xtype		: 'checkboxgroup',
								name		: '',
								width		: 80,
								labelWidth	: 55,
							},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0, margin : '0 0 0 0',
								items		: [
									{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
										items		: [
												{	xtype	: 'checkboxfield',
													labelSeparator: '',
													allowBlank: true,
													boxLabel: 'C/T Box' ,
													name : 'pric_burd_dvcd1',
													margin : '0 0 -5 0',
													inputValue: 1,
													width : 100 ,
													listeners: {
														change: function(chkbox,newVal,oldVal) {
															var a = me.down('[name=pric_burd_dvcd2]').getValue();
															var b = me.down('[name=pric_burd_dvcd3]').getValue();
															var c = me.down('[name=pric_burd_dvcd4]').getValue();
															if(chkbox.getValue() == true && a == true){
																me.down('[name=pric_burd_dvcd2]').setValue(false);
															}
															if(chkbox.getValue() == true && b == true){
																me.down('[name=pric_burd_dvcd3]').setValue(false);
															}
															if(chkbox.getValue() == true && c == true){
																me.down('[name=pric_burd_dvcd4]').setValue(false);
															}
														}
													}
												},{	xtype	: 'checkboxfield',
													labelSeparator: '',
													allowBlank: true,
													boxLabel: 'Shop Bag',
													margin : '0 0 -5 0',
													name : 'pric_burd_dvcd2',
													inputValue: 2,
													width : 100 ,
													listeners: {
														change: function(chkbox,newVal,oldVal) {
															var a = me.down('[name=pric_burd_dvcd1]').getValue();
															var b = me.down('[name=pric_burd_dvcd3]').getValue();
															var c = me.down('[name=pric_burd_dvcd4]').getValue();
															if(chkbox.getValue() == true && a == true){
																me.down('[name=pric_burd_dvcd1]').setValue(false);
															}
															if(chkbox.getValue() == true && b == true){
																me.down('[name=pric_burd_dvcd3]').setValue(false);
															}
															if(chkbox.getValue() == true && c == true){
																me.down('[name=pric_burd_dvcd4]').setValue(false);
															}
														}
													}
												}
											]
										},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
											items		: [
											{	xtype	: 'checkboxfield',
												labelSeparator: '',
												allowBlank: true,
												boxLabel: 'Col Box' ,
												margin : '-5 0 0 0',
												name : 'pric_burd_dvcd3',
												inputValue: 1,
												width : 100 ,
												listeners: {
													change: function(chkbox,newVal,oldVal) {
														var a = me.down('[name=pric_burd_dvcd2]').getValue();
														var b = me.down('[name=pric_burd_dvcd1]').getValue();
														var c = me.down('[name=pric_burd_dvcd4]').getValue();
														if(chkbox.getValue() == true && a == true){
															me.down('[name=pric_burd_dvcd2]').setValue(false);
														}
														if(chkbox.getValue() == true && b == true){
															me.down('[name=pric_burd_dvcd1]').setValue(false);
														}
														if(chkbox.getValue() == true && c == true){
															me.down('[name=pric_burd_dvcd4]').setValue(false);
														}
													}
												}
											},{	xtype	: 'checkboxfield',
												labelSeparator: '',
												allowBlank: true,
												boxLabel: 'Sheet',
												margin : '-5 0 0 0',
												name : 'pric_burd_dvcd4',
												inputValue: 2,
												width : 100 ,
												listeners: {
													change: function(chkbox,newVal,oldVal) {
														var a = me.down('[name=pric_burd_dvcd2]').getValue();
														var b = me.down('[name=pric_burd_dvcd3]').getValue();
														var c = me.down('[name=pric_burd_dvcd1]').getValue();
														if(chkbox.getValue() == true && a == true){
															me.down('[name=pric_burd_dvcd2]').setValue(false);
														}
														if(chkbox.getValue() == true && b == true){
															me.down('[name=pric_burd_dvcd3]').setValue(false);
														}
														if(chkbox.getValue() == true && c == true){
															me.down('[name=pric_burd_dvcd1]').setValue(false);
														}
													}
												}
											}
										]
									}
								]
							},
						]
					},{	xtype : 'fieldset',
						layout: 'vbox',
						title : '계약정보',
						items : [
							{	layout		: 'hbox', border		: 0, region		: 'left', margin		: '0 0 5 0',
								items		: [
									{	fieldLabel	: Language.get('','M2자릿수'),
										xtype		: 'numericfield',
										name		: 'scrt_sett_amnt',
										width		: 140,
										labelWidth	: 60
									},{	xtype		: 'lookupfield',
										name		: '',
										width		: 70,
										margin		: '0 0 0 5',
										value		: '반올림',
										lookupValue	: resource.lookup('')
									},{	fieldLabel	: Language.get('','='),
										xtype		: 'numericfield',
										name		: 'scrt_sett_amnt',
										width		: 70,
										labelWidth	: 10
									}
								]
							},{	layout		: 'hbox',
								border		: 0,
								region		: 'left',
								margin		: '0 0 5 0',
								fieldDefaults: {labelSeparater: '' },
								items		: [
									{	fieldLabel	: Language.get('','단가자릿수'),
										xtype		: 'numericfield',
										name		: 'scrt_sett_amnt',
										width		: 140,
										labelWidth	: 60
									},{	xtype		: 'lookupfield',
										name		: '',
										width		: 70,
										margin		: '0 0 0 5',
										value		: '반올림',
										lookupValue	: resource.lookup('')
									},{	fieldLabel	: Language.get('','='),
										xtype		: 'numericfield',
										name		: 'scrt_sett_amnt',
										width		: 70,
										labelWidth	: 10
									}
								]
							},{	layout		: 'hbox',
								border		: 0,
								region		: 'left',
								margin		: '0 0 5 0',
								fieldDefaults: {labelSeparater: '' },
								items		: [
									{	fieldLabel	: Language.get('','금액자릿수'),
										xtype		: 'numericfield',
										name		: 'scrt_sett_amnt',
										width		: 140,
										labelWidth	: 60
									},{	xtype		: 'lookupfield',
										name		: '',
										width		: 70,
										margin		: '0 0 0 5',
										value		: '반올림',
										lookupValue	: resource.lookup('')
									},{	fieldLabel	: Language.get('','='),
										xtype		: 'numericfield',
										name		: 'scrt_sett_amnt',
										width		: 70,
										labelWidth	: 10
									}
								]
							}
						]
					},{	fieldLabel	: '비고',
						name		: 'scrt_offr_aman',
						xtype		: 'textarea',
						width		: 295,
						labelWidth	: 70
					},
				]
			}
		;
		return item;
	},
});

