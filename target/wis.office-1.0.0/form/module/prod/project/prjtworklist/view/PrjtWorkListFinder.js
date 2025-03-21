Ext.define('module.prod.project.prjtworklist.view.PrjtWorkListFinder', { extend: 'Axt.form.Editor',

	alias: 'widget.module-prjtworklist-finder',
	height : 260,
	layout : {
		type: 'border'
	},

	title			: Language.get('prjt_info','수주 정보'),
	collapsible 	: true	,
	collapsed		: false	,
	defaultFocus	: 'prjt_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createwest()];
		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 400, labelWidth : 80, labelSeparator : '', readOnly:true},
				items			: [
					{	fieldLabel	: Language.get('acpt_case_name','금형명')	,
						xtype		: 'textfield'						,
						name		: 'item_name'
					},{	fieldLabel	: Language.get('item_spec','규격')	,
						xtype		: 'textfield'						,
						name		: 'item_spec'
					},{	fieldLabel	: Language.get('modl_name','모델명')	,
						xtype		: 'textfield'						,
						name		: 'modl_name'
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('regi_date','등록일자'),
								xtype		: 'datefield',
								name		: 'regi_date',
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
					},{	fieldLabel	: Language.get('cstm_name','거래처명')	,
						xtype		: 'textfield'						,
						name		: 'cstm_name',
					},{	fieldLabel	: Language.get('cstm','거래처')	,
						xtype		: 'textfield'						,
						name		: 'cstm_idcd',
						hidden		: true,
						listeners	:{
							change:function(){
								var cstm_idcd = this.getValue();
								var results;
								Ext.Ajax.request({
									url		: _global.location.http() + '/prod/project/prjtworklist/get/cstm.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id			: _global.stor_id,
											hqof_idcd		: _global.hqof_idcd,
											cstm_idcd		: cstm_idcd
										})
									},
									async	: false,
									method	: 'POST',
									success	: function(response, request) {
										var result = Ext.decode(response.responseText);
										if	(!result.success ){
											Ext.Msg.error(result.message );
											return;
										} else {
											results = result;
										}
									},
									failure : function(result, request) {
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});
								if(results){
									var tab1 = me.down('[title=거래처 정보]'),
										bzmn_name      = tab1.down('[name=bzmn_name]')
										buss_numb      = tab1.down('[name=buss_numb]')
										buss_kind      = tab1.down('[name=buss_kind]')
										buss_type      = tab1.down('[name=buss_type]')
										corp_dvcd      = tab1.down('[name=corp_dvcd]')
										boss_name      = tab1.down('[name=boss_name]')
										tele_numb      = tab1.down('[name=tele_numb]')
										faxi_numb      = tab1.down('[name=faxi_numb]')
										mail_addr      = tab1.down('[name=mail_addr]')
										hdph_numb      = tab1.down('[name=hdph_numb]')
										post_code      = tab1.down('[name=post_code]')
										addr_1fst      = tab1.down('[name=addr_1fst]')
										addr_2snd      = tab1.down('[name=addr_2snd]')
									;
									if(results.records.length){
										bzmn_name.setValue(results.records[0].buss_name);
										buss_numb.setValue(results.records[0].buss_numb);
										buss_kind.setValue(results.records[0].buss_kind);
										buss_type.setValue(results.records[0].buss_type);
										corp_dvcd.setValue(results.records[0].corp_dvcd);
										boss_name.setValue(results.records[0].boss_name);
										tele_numb.setValue(results.records[0].tele_numb);
										faxi_numb.setValue(results.records[0].faxi_numb);
										mail_addr.setValue(results.records[0].mail_addr);
										hdph_numb.setValue(results.records[0].hdph_numb);
										post_code.setValue(results.records[0].post_code);
										addr_1fst.setValue(results.records[0].addr_1fst);
										addr_2snd.setValue(results.records[0].addr_2snd);
									}
								}

							}
						}
					},{	fieldLabel	: '품목',
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
				fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '', readOnly:true},
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
										{	fieldLabel	: '사업자명'	, name : 'bzmn_name'	, xtype  : 'textfield'	, readOnly : true	, onwerEditing : true
										},{	fieldLabel	: '사업자번호'	, name : 'buss_numb'	, xtype  : 'textfield'	, readOnly : true	, onwerEditing : true , vtype : 'bizno'
										},{	fieldLabel	: '업태'		, name : 'buss_kind'	, xtype  : 'textfield'	, readOnly : true	, onwerEditing : true
										},{	fieldLabel	: '업종'		, name : 'buss_type'	, xtype  : 'textfield'	, readOnly : true	, onwerEditing : true }
									]
								},{	xtype		: 'form-panel',
									border		:   0,
									width		: 250,
									fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
									items		: [
										{ fieldLabel : '사업자 구분'	, name : 'corp_dvcd'	, xtype : 'lookupfield'	, lookupValue   : resource.lookup('corp_dvcd') , onwerEditing : true },
										{ fieldLabel : '대표자명'		, name : 'boss_name'	, xtype : 'textfield'	, readOnly : true	, onwerEditing : true },
										{ fieldLabel : '전화번호'		, name : 'tele_numb'	, xtype : 'textfield'	, vtype : 'phone'	, readOnly   : true , onwerEditing : true } ,
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
								{	fieldLabel : '계산서메일'	, name : 'mail_addr'	, xtype : 'textfield'	, vtype : 'email'	, width : 245, labelWidth : 70 , readOnly   : true , onwerEditing : true
								},{	fieldLabel : '휴대전화'	, name : 'hdph_numb'	, xtype : 'textfield'	, vtype : 'mobile'	, width : 250, labelWidth : 75, onwerEditing : true }  // width : 250,
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
							readOnly	: true,
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
				xtype	: 'common-project-paylister',
				hidden	: !_global.auth.auth_cost_1001
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
				fieldDefaults	: { width : 400, labelWidth : 80, labelSeparator : '', readOnly:true },
					items	: [
						{	xtype 	: 'panel',
							layout	: 'vbox',
							border	: 0,
							margin	: '5 0 0 0',
							items	: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
										items	: [
											{	fieldLabel	: Language.get('ppsl_deli_date','제안납기'),
												xtype		: 'datefield',
												name		: 'ppsl_deli_date',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
												width		: 200
											},{	fieldLabel	: Language.get('deli_date','확정납기'),
												xtype		: 'datefield',
												name		: 'deli_date',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
												width		: 200
											}
										]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('frst_exam_date','T0일자'),
											xtype		: 'datefield',
											name		: 'frst_exam_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										},{	fieldLabel	: Language.get('send_exam_date','T1일자'),
											xtype		: 'datefield',
											name		: 'send_exam_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
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
											width		: 200
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('cofm_date','확정일자'),
											xtype		: 'datefield',
											name		: 'cofm_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('','기타1'),
											xtype		: 'datefield',
											name		: '',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200,
											hidden		: true
										},{	fieldLabel	: Language.get('','기타2'),
											xtype		: 'datefield',
											name		: '',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200,
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
	}
});