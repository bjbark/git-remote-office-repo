Ext.define('module.sale.project.prjtlist.view.PrjtListEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-prjtlist-editor',

	height : 405,
	layout : {
		type: 'border'
	},

	title			: Language.get('pjod_info','주문 정보'),
	collapsible 	: true	,
	collapsed		: true	,
	getStore: function() {
		return Ext.getStore( 'module.sale.project.prjtlist.store.PrjtListInvoice' );
	},
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
							{	fieldLabel	: Language.get('pjod_idcd','금형번호'),
								name		: 'pjod_idcd',
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
					},{	fieldLabel	: '프로젝트',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'prjt_name',
						pair		: 'prjt_idcd',
						clearable	: false ,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-prjt-popup',
							params	: { stor_grp : _global.stor_grp, line_stat : '0' },
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].get('prjt_name'));
								pairField.setValue(records[0].get('prjt_idcd'));
							}
						},
						hidden		: true
					},{	name	: 'prjt_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('expt_dvcd','내수/수출'),
								xtype		: 'lookupfield',
								name		: 'expt_dvcd',
								lookupValue	: resource.lookup('expt_dvcd'),
								width		: 200
							},{	fieldLabel	: '영업담당',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'drtr_name',
								pair		: 'drtr_idcd',
								allowBlank	: true,
								clearable	: true ,
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
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('cofm_yorn','확정여부'),
								xtype		: 'lookupfield',
								name		: 'cofm_yorn',
								lookupValue	: resource.lookup('yorn'),
								width		: 200
							},{	fieldLabel	: '관련금형',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'rela_pjod_idcd',
								clearable	: true ,
								width		: 200,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-pjod-popup',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].get('pjod_idcd'));
									}
								}
							}
						]
					},{	fieldLabel	: '거래처',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'cstm_idcd',
						pair		: 'cstm_name',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						clearable	: false ,
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
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue
					},{	fieldLabel	: Language.get('acpt_numb', '금형코드'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'item_idcd',
						pair		: 'item_name',
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
						},
						hidden 		: true
					},{	name		: 'item_code', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('acpt_case_name','금형명'),
						xtype		: 'textfield',
						name		: 'item_name',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue
					},{	fieldLabel	: Language.get('item_spec','규격'),
						xtype		: 'textfield',
						name		: 'item_spec',
						fieldCls	: 'requiredindex',
						hidden		: true,
						emptyText	: Const.invalid.emptyValue
					},{	fieldLabel	: Language.get('modl_name','차종'),
						xtype		: 'textfield',
						name		: 'modl_name'
					},{	fieldLabel	: Language.get('cstm_item_code','고객품목코드'),
						xtype		: 'textfield',
						name		: 'cstm_item_code'
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('mold_size','금형크기'),
								xtype		: 'numericfield',
								name		: 'mold_size',
								width		: 200,
							},{	fieldLabel	: Language.get('cavity','CAVITY'),
								xtype		: 'textfield',
								name		: 'cavity',
								width		: 200
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('mold_wigt','금형중량'),
								xtype		: 'numericfield',
								name		: 'mold_wigt',
								width		: 200,
							},{	fieldLabel	: Language.get('used_mtrl_name','사용재료명'),
								xtype		: 'textfield',
								name		: 'used_mtrl_name',
								width		: 200
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('prod_wigt','제품중량'),
								xtype		: 'numericfield',
								name		: 'prod_wigt',
								width		: 200,
							},{	fieldLabel	: Language.get('used_tons','사용톤수'),
								xtype		: 'numericfield',
								name		: 'used_tons',
								width		: 200
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('shkg_text','수축율'),
								xtype		: 'textfield',
								name		: 'shkg_text',
								width		: 200,
							},{	fieldLabel	: Language.get('mold_mtrl','금형재질'),
								xtype		: 'textfield',
								name		: 'mold_mtrl',
								width		: 200
							}
						]
					},{	fieldLabel	: Language.get('imge_chek1','이미지확인1'),
						xtype		: 'textfield',
						name		: 'imge_chek1',
						width		: 200,
						hidden		: true
					},{	fieldLabel	: Language.get('imge_chek2','이미지확인1'),
						xtype		: 'textfield',
						name		: 'imge_chek2',
						width		: 200,
						hidden		: true
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
				items	: [ me.createTab2(),me.createTab1(),me.createTab3()]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title	: '결제일자 및 조건',
				xtype	: 'module-prjtlist-paylister',
				hidden	: !_global.auth.auth_cost_1001
			}
		;
	return item;
	},

	createTab2 : function() {
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
										},{	fieldLabel	: Language.get('cofm_date','확정일자'),
											xtype		: 'datefield',
											name		: 'cofm_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 201
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
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
										{	fieldLabel	: Language.get('dsig_rsps_name','설계책임'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'dsig_rsps_name',
											pair		: 'dsig_rsps_idcd',
											clearable	: true ,
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
										},{	name	: 'dsig_rsps_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('work_rsps_name','작업책임'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'work_rsps_name',
											pair		: 'work_rsps_idcd',
											clearable	: true ,
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
										},{	name	: 'work_rsps_idcd', xtype : 'textfield' , hidden : true
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('modl_rsps_name','모델링책임'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'modl_rsps_name',
											pair		: 'modl_rsps_idcd',
											clearable	: true ,
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
										},{	name	: 'modl_rsps_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('esti_amnt','견적금액'),
											xtype		: 'numericfield',
											name		: 'esti_amnt',
											width		: 200,
											margin		: '0 0 5 0',
											hidden		: !_global.auth.auth_cost_1001
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
										{	fieldLabel : '사업자 구분'	, name : 'corp_dvcd', xtype : 'lookupfield'	, lookupValue : resource.lookup('corp_dvcd') , onwerEditing : true ,readOnly	: true,},
										{	fieldLabel : '대표자명'	, name : 'boss_name'	, xtype : 'textfield'	, readOnly : true	, onwerEditing : true },
										{	fieldLabel : '전화번호'	, name : 'tele_numb'	, xtype : 'textfield'	, vtype : 'phone'	, readOnly   : true , onwerEditing : true } ,
										{	fieldLabel : '팩스번호'	, name : 'faxi_numb'	, xtype : 'textfield'	, vtype : 'fax'		, onwerEditing : true ,readOnly	: true,}  //, width : 250 , labelWidth : 70
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
								},{	fieldLabel : '휴대전화'	, name : 'hdph_numb'	, xtype : 'textfield'	, vtype : 'mobile'	, width : 250, labelWidth : 75, onwerEditing : true, readOnly	: true,}  // width : 250,
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
									readOnly	: true,
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
								},{	name	: 'addr_1fst' ,  xtype  : 'textfield' ,  margin : '0 0 2 2', width : 333, readOnly	: true,
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
//	createTab4 : function() {
//		var me = this,
//			item = {
//				title	: '이미지',
//				name	: 'imge_info',
//				xtype	: 'form-panel',
//				dock	:'left',
//				region	: 'center',
//				fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
//					items	: [
//						{	xtype 	: 'panel',
//							layout	: 'hbox',
//							border	: 0,
//							margin	: '5 0 0 0',
//							items	: [
//								{	xtype		: 'form-panel',
//									border		: 0,
//									fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
//									items		: [
//										{	xtype	: 'form-panel',
//											name	: 'uploadForm',
//											region	: 'center',
//											standardSubmit: false,
//											border	:  false,
//											url		: 'system/sale/project/prjtwork/set/fileUpload.do',
//											timeout	: 120000,
//											method	: 'POST',
//											layout	: { type: 'vbox', align: 'stretch' } ,
//											padding	: 10 ,
//											layout	: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
//											items	: [
//												{	xtype       : 'filefield',
//													name        : 'files',
//													fieldLabel  : '이미지1',
//													msgTarget   : 'side',
//													allowBlank  : true,
//													clearable	: true ,
//													anchor      : '100%',
//													margin		: '0 3 0 0 ',
//													width       : 350,
//													buttonText  : '선택',
//													regex       : new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
//													listeners: {
//														change: function (field) {
//															var file = field.fileInputEl.dom.files[0],
//																reader = new FileReader(),
//																form = this.up('form').up('form').up('panel').up('form')
//															;
//															if (file) {
//																reader.addEventListener('load', function (event) {
//																	me.down('[name=imge_chek1]').setValue('Y');
//																	console.log(me.down('[name=imge_chek1]').getValue('Y'));
//																	form.down('[name=image]').setSrc(event.target.result)
////																	Ext.get('prjt_work_imge').dom.src = event.target.result;
//																});
//																reader.readAsDataURL(file);
//															}else{
//																me.down('[name=imge_chek1]').setValue('');
//																form.down('[name=image]').setSrc('')
//															}
//														}
//													}
//												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle
//												},{	xtype       : 'filefield',
//													name        : 'files',
//													fieldLabel  : '이미지2',
//													msgTarget   : 'side',
//													allowBlank  : true,
//													clearable	: true ,
//													anchor      : '100%',
//													margin		: '0 3 0 0 ',
//													width       : 350,
//													buttonText  : '선택',
//													regex       : new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
//													listeners: {
//														change: function (field) {
//															var file = field.fileInputEl.dom.files[0],
//																reader = new FileReader()
//																form = this.up('form').up('form').up('panel').up('form')
//															;
//															if (file) {
//																reader.addEventListener('load', function (event) {
//																	me.down('[name=imge_chek2]').setValue('Y');
//																	form.down('[name=image2]').setSrc(event.target.result)
//																});
//																reader.readAsDataURL(file);
//															}else{
//																me.down('[name=imge_chek2]').setValue('');
//																form.down('[name=image2]').setSrc('');
//															}
//														}
//													}
//												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle2
//												},{xtype:'hiddenfield', name:'param', value:''
//												},{xtype:'hiddenfield', name:'token', value:_global.token_id }
//											]
//										}
//									]
//								}
//							]
//						},{	xtype 	: 'panel',
//							layout	: 'hbox',
//							border	: 0,
//							margin	: '5 0 0 0',
//							autoscroll : true,
//							items : [
//								{	xtype	: 'image',
//									name	: 'image',
//									id		: 'prjt_work_imge',
//									src		: '',
//									width	: 300,
//									height	: 200,
//									margin	: '20 55',
//									hidden	: false
//								},{	xtype	: 'image',
//									name	: 'image2',
//									id		: 'prjt_work_imge2',
//									src		: '',
//									width	: 300,
//									height	: 200,
//									margin	: '20 55',
//									hidden	: false
//								}
//							]
//						},{	xtype		:'textfield',
//							name		: 'item_imge',
//							hidden		: true,
//							listeners	: {
//								change:function(val){
//									if(val.getValue()){
//										img = new Uint8Array(val.getValue().split(","));
//										blob = new Blob([img],{type:'image/png'})
//										url = URL.createObjectURL(blob);
//										this.up('form').down('[name=image]').setSrc(url);
//									}else{
//										this.up('form').down('[name=image]').setSrc('');
//									}
//								}
//							}
//						},{	xtype		:'textfield',
//							name		: 'item_imge2',
//							hidden		: true,
//							listeners	: {
//								change:function(val){
//									if(val.getValue()){
//										img = new Uint8Array(val.getValue().split(","));
//										blob = new Blob([img],{type:'image/png'})
//										url = URL.createObjectURL(blob);
//										this.up('form').down('[name=image2]').setSrc(url);
//									}else{
//										this.up('form').down('[name=image2]').setSrc('');
//									}
//								}
//							}
//						}
//					]
//				}
//			;
//		return item;
//	},
	imgCancle:function(){
		var form = this.up('form').up('[title=이미지]');
		form.down('[name=image]').setSrc('');
		form.down('[name=item_imge]').setValue('');

		form.down('[name=files]').fileInputEl.dom.value = '';
	},
	imgCancle2:function(){
		var form = this.up('form').up('[title=이미지]');
		form.down('[name=image2]').setSrc('');
		form.down('[name=item_imge2]').setValue('');

		form.down('[name=files]').fileInputEl.dom.value = '';
	}
});