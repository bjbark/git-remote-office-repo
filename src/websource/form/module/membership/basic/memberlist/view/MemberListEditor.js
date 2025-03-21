Ext.define('module.membership.basic.memberlist.view.MemberListEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-memberlist-editor',

	height : 440,
	layout : {
	type: 'border'
	},

	title			: Language.get('item_info','회원 정보'),
	collapsible 	: true	,
	collapsed		: true	,
	defaultFocus	: 'mmbr_code',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = [me.createTabs()];
		console.log(_global.options.item_spec_disp_yorn);
		me.callParent(arguments)  ;
	},

	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',
//				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
//				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
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
				itemId			: 'mainForm',
//				width			: 400,
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 65, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('mmbr_code','회원코드'),
								name		: 'mmbr_code',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 300
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								width		: 75,
								editable	: false,
								margin		: '0 0 0 5',
								lookupValue	: resource.lookup('line_stat')
							},{ fieldLabel	: Language.get('mmbr_idcd','회원ID'),
								name		: 'mmbr_idcd',
								xtype		: 'textfield',
								hidden		: true
							}
						]
					},{	fieldLabel	: Language.get('mmbr_name','회원명'),
						xtype		: 'textfield',
						name		: 'mmbr_name',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						width		: 380,
						margin		: '0 0 5 0'
					},{	fieldLabel	: Language.get('alis_name','닉네임'),
						xtype		: 'textfield',
						name		: 'alis_name',
						allowBlank	: true,
						width		: 380,
						margin		: '0 0 5 0'
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('gndr_dvcd','성별'),
								xtype		: 'lookupfield',
								name		: 'gndr_dvcd',
								width		: 190,
								editable	: false,
								lookupValue	: resource.lookup('gndr_dvcd')
							},{	fieldLabel	: Language.get('mmbr_stat_dvcd','등록구분'),
								xtype		: 'lookupfield',
								name		: 'mmbr_stat_dvcd',
								width		: 190,
								labelWidth	: 70,
								editable	: false,
								lookupValue	: resource.lookup('mmbr_stat_dvcd')
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('entr_date', '가입일자' ),
								name		: 'entr_date',
								xtype		: 'datefield',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 190,
								labelWidth	: 65 ,
							},{	fieldLabel	: Language.get('scsn_date', '탈퇴일자' ),
								name		: 'scsn_date',
								xtype		: 'datefield',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 190,
								labelWidth	: 70 ,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('hdph_numb', '연락처' ),
								name		: 'hdph_numb'	,
								xtype		: 'textfield'	,
								vtype		: 'mobile'	,
								width		: 190,
								onwerEditing: true
							},{	fieldLabel	: Language.get('brth_date', '생년월일' ),
								name		: 'brth_date',
								xtype		: 'datefield',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 190,
								labelWidth	: 70 ,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('lssn_type_dvcd','레슨형태'),
								xtype		: 'lookupfield',
								name		: 'lssn_type_dvcd',
								width		: 190,
								editable	: false,
								lookupValue	: resource.lookup('lssn_type_dvcd')
							},{	fieldLabel	: Language.get('lssn_ccle_dvcd','레슨주기'),
								xtype		: 'lookupfield',
								name		: 'lssn_ccle_dvcd',
								width		: 190,
								labelWidth	: 70,
								editable	: false,
								lookupValue	: resource.lookup('lssn_ccle_dvcd')
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('amtm_yorn','오전'),
								xtype		: 'lookupfield',
								name		: 'amtm_yorn',
								margin		: '0 0 0 0',
								width		: 130,
								lookupValue	: resource.lookup('yorn'),
							},{	name		: 'amtm_sttm',
								xtype		: 'timefield',
								format		: 'H:i',
								submitFormat: 'Hi',
								minValue	: '06:00',
								maxValue	: '22:30',
								increment	: 30,
								width		: 60,
								margin		: '1 0 0 0',
							},{	fieldLabel	: Language.get('pmtm_yorn','오후'),
								xtype		: 'lookupfield',
								name		: 'pmtm_yorn',
								margin		: '0 0 0 0',
								width		: 130,
								labelWidth	: 70,
								lookupValue	: resource.lookup('yorn'),
							},{	name		: 'pmtm_sttm',
								xtype		: 'timefield',
								format		: 'H:i',
								submitFormat: 'Hi',
								minValue	: '06:00',
								maxValue	: '22:30',
								increment	: 30,
								width		: 60,
								margin		: '1 0 0 0',
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 1 0',
						items	: [
							{	fieldLabel	: Language.get('','월'),
								xtype		: 'lookupfield',
								name		: 'mond_time_dvcd',
								width		: 60,
								labelWidth	: 10,
								margin		: '0 0 1 55',
								editable	: true,
								lookupValue	: resource.lookup('ampm_dvcd'),
								listeners	: {
									change	: function() {
										var panel	= this.up('form'),
											tt		= '0',
											yorn	= this.getValue();
											if(yorn	== 'AM' || yorn=='PM'){
												tt	= '1';
											};
											panel.down('[name=mond_yorn]').setValue(tt);
									}
								}

							},{	fieldLabel	: Language.get('','화'),
								xtype		: 'lookupfield',
								name		: 'tued_time_dvcd',
								width		: 60,
								labelWidth	: 10,
								margin		: '0 0 0 6',
								editable	: false,
								lookupValue	: resource.lookup('ampm_dvcd'),
								listeners	: {
									change	: function() {
										var panel	= this.up('form'),
											tt		= '0',
											yorn	= this.getValue();
											if(yorn	== 'AM' || yorn=='PM'){
												tt	= '1';
											};
											panel.down('[name=tued_yorn]').setValue(tt);
									}
								}
							},{	fieldLabel	: Language.get('','수'),
								xtype		: 'lookupfield',
								name		: 'wedd_time_dvcd',
								width		: 60,
								labelWidth	: 10,
								margin		: '0 0 0 6',
								editable	: false,
								lookupValue	: resource.lookup('ampm_dvcd'),
								listeners	: {
									change : function() {
										var panel	= this.up('form'),
											tt		= '0',
											yorn	= this.getValue();
											if(yorn	== 'AM' || yorn=='PM'){
												tt	= '1';
											};
											panel.down('[name=webd_yorn]').setValue(tt);
									}
								}
							},{	fieldLabel	: Language.get('','목'),
								xtype		: 'lookupfield',
								name		: 'thud_time_dvcd',
								width		: 60,
								labelWidth	: 10,
								margin		: '0 0 0 6',
								editable	: false,
								lookupValue	: resource.lookup('ampm_dvcd'),
								listeners	: {
									change	: function() {
										var panel	= this.up('form'),
											tt		= '0',
											yorn	= this.getValue();
											if(yorn	== 'AM' || yorn=='PM'){
												tt	= '1';
											};
											panel.down('[name=thud_yorn]').setValue(tt);
									}
								}
							},{	fieldLabel	: Language.get('','금'),
								xtype		: 'lookupfield',
								name		: 'frid_time_dvcd',
								width		: 60,
								labelWidth	: 10,
								margin		: '0 0 0 6',
								editable	: false,
								lookupValue	: resource.lookup('ampm_dvcd'),
								listeners	: {
									change	: function() {
										var panel	= this.up('form'),
											tt		= '0',
											yorn	= this.getValue();
											if(yorn	== 'AM' || yorn=='PM'){
												tt	= '1';
											};
											panel.down('[name=frid_yorn]').setValue(tt);
									}
								}

							},{ name		: 'mond_yorn',xtype		: 'textfield', hidden		: true
							},{ name		: 'tued_yorn',xtype		: 'textfield', hidden		: true
							},{ name		: 'webd_yorn',xtype		: 'textfield', hidden		: true
							},{ name		: 'thud_yorn',xtype		: 'textfield', hidden		: true
							},{ name		: 'frid_yorn',xtype		: 'textfield', hidden		: true
							}
						]

					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','토'),
								xtype		: 'lookupfield',
								name		: 'satd_time_dvcd',
								width		: 60,
								labelWidth	: 10,
								margin		: '0 0 1 55',
								editable	: false,
								lookupValue	: resource.lookup('ampm_dvcd'),
								listeners	: {
									change	: function() {
										var panel	= this.up('form'),
											tt		= '0',
											yorn	= this.getValue();
											if(yorn	== 'AM' || yorn=='PM'){
												tt	= '1';
											};
											panel.down('[name=satd_yorn]').setValue(tt);
									}
								}
							},{	fieldLabel	: Language.get('','일'),
								xtype		: 'lookupfield',
								name		: 'sund_time_dvcd',
								width		: 60,
								labelWidth	: 10,
								margin		: '0 0 0 6',
								editable	: false,
								lookupValue	: resource.lookup('ampm_dvcd'),
								listeners	: {
									change	: function() {
										var panel	= this.up('form'),
											tt		= '0',
											yorn	= this.getValue();
											if(yorn	== 'AM' || yorn=='PM'){
												tt	= '1';
											};
											panel.down('[name=sund_yorn]').setValue(tt);
									}
								}
							},{ name		: 'satd_yorn',xtype		: 'textfield', hidden		: true
							},{ name		: 'sund_yorn',xtype		: 'textfield', hidden		: true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('', '레슨시작일' ),
								name		: '',
								xtype		: 'datefield',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 190,
							}
						]
					},{	fieldLabel	: '기타사항',
						name		: 'scrt_offr_aman',
						xtype		: 'textarea',
						width		: 380,
//						hight		: 40,

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
				items	: [
					me.createTab1(),
					me.createTab5(),
					{title : '첨부파일'	, xtype: 'module-memberlist-editorlister'},
					{title : '메모'		, xtype: 'module-memberlist-memolister'},
					{title : '관리항목'	, xtype: 'module-memberlist-mngtlister'},
				]
			}
		;
		return item;
	},
	createTab1 : function() {
		var me = this,
			item = {
				title	: '추가정보',
				name	: 'adon_info',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				layout	: 'vbox',
				autoScroll:true,
				fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
							items	: [
								{	fieldLabel	: '담당코치',
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
								},{	name		: 'drtr_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('cont_pric','회당레슨비'),
									xtype		: 'numericfield',
									name		: 'cont_pric',
									width		: 200,
									labelWidth	: 80
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
							items	: [
								{	fieldLabel	: '추천인',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'rcom_name',
									pair		: 'rcom_idcd',
									allowBlank	: true,
									clearable	: false ,
									width		: 200,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-member-popup',
										params	: { stor_grp : _global.stor_grp, line_stat : '0' },
										result	: function(records, nameField, pairField){
											nameField.setValue(records[0].get('mmbr_name'));
											pairField.setValue(records[0].get('mmbr_idcd'));
										}
									}
								},{	name		: 'rcom_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('cars_numb','차량번호'),
									xtype		: 'textfield',
									name		: 'cars_numb',
									allowBlank	: true,
									width		: 200,
									labelWidth	: 80,
									margin		: '0 0 5 0'
								}
							]
						}
					]
				}
			;
		return item;
	},
	createTab5 : function() {
		var me = this,
			item = {
				title	: '회원사진',
				name	: 'imge_info',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				layout	: 'vbox',
				autoScroll:true,
				fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	xtype 	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '5 0 0 0',
							items	: [
								{	xtype		: 'form-panel',
									border		: 0,
									fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
									items		: [
										{	xtype	: 'form-panel',
											name	: 'uploadForm',
											region	: 'center',
											standardSubmit: false,
											border	:  false,
											url		: 'system/item/itemmast/set/fileUpload.do',
											timeout	: 120000,
											method	: 'POST',
											layout	: { type: 'vbox', align: 'stretch' } ,
											padding	: 10 ,
											layout	: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
											items	:[
												{	xtype		: 'filefield',
													name		: 'files',
													fieldLabel	: '회원사진',
													itemId		: 'files1',
													msgTarget	: 'side',
													allowBlank	: true,
													clearable	: true ,
													anchor		: '100%',
													margin		: '0 3 0 0 ',
													width		: 350,
													buttonText	: '선택',
													regex		: new RegExp('\.(jpg|gif|png|jpeg)', 'i'), // 확장자 제한 정규식
													listeners	: {
														change	: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader(),
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	me.down('[name=imge_chek1]').setValue('Y');
																	form.down('[name=image]').setSrc(event.target.result)
//																	Ext.get('prjt_work_imge').dom.src = event.target.result;
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek1]').setValue('');
																form.down('[name=image]').setSrc('')
															}Ext.ComponentQuery.query('module-memberlist-editor')[0].down('[name=modify]').setValue('Y');
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle
												},{xtype:'hiddenfield', name:'param', value:''
												},{xtype:'hiddenfield', name:'token', value:_global.token_id }
											]
										}
									]
								}
							]
						},{	xtype 	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 0 45',
							autoscroll : true,
							items : [
								{	xtype	: 'image',
									name	: 'image',
									id		: 'prjt_work_imge',
									src		: '',
									width	: 195,
									height	: 260,
									margin	: '20 55',
									hidden	: false
								}
							]
						},{	xtype		:'textfield',
							name		: 'mmbr_imge',
							hidden		: true,
							listeners	: {
								change:function(val){
									if(val.getValue()){
										img	= new Uint8Array(val.getValue().split(","));
										blob= new Blob([img],{type:'image/png'})
										url	= URL.createObjectURL(blob);
										this.up('form').down('[name=image]').setSrc(url);
									}else{
										this.up('form').down('[name=image]').setSrc('');
									}
								}
							}
						},{	xtype		:'textfield',
							name		: 'imge_chek1',
							hidden		: true
						}
					]
				}
			;
		return item;
	},
	imgCancle:function(){
		var form = this.up('form').up('[name=imge_info]');
		form.down('[name=image]').setSrc('');
		form.down('[name=item_imge]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	},
});