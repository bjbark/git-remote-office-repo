Ext.define('module.prod.cvic.cvicmast.view.CvicMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-cvicmast-editor',

	height : 410,
	layout : {
	type: 'border'
	},

	title			: Language.get('cvic_idcd','설비코드 정보'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: 'cvic_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			cvic = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
					'->', '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return cvic;
	},

	createwest : function () {
		var me = this,
			cvic = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 80, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('cvic_code','설비코드'),
								name		: 'cvic_code',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 280
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								width		: 55,
								margin		: '0 0 0 5',
								lookupValue	: resource.lookup('line_stat')
							},{	name		: 'cvic_idcd',
								hidden		: true,
								xtype		: 'textfield',
							}
						]
					},{	fieldLabel	: Language.get('cvic_name','설비명'),
						xtype		: 'textfield',
						name		: 'cvic_name',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						width		: 340
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('modl_name','모델명'),
								xtype		: 'textfield',
								name		: 'modl_name',
								width		: 340
							}
						]
					},{	fieldLabel	: Language.get('cvic_spec','설비규격'),
						xtype		: 'textfield',
						name		: 'cvic_spec',
						width		: 340
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('cvic_stnm','설비약칭'),
								xtype		: 'textfield',
								name		: 'cvic_stnm',
								width		: 170
							},{	fieldLabel	: Language.get('mngt_drtr_name','관리담당자'),
								width		: 170,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'mngt_drtr_name',
								pair		: 'mngt_drtr_idcd',
								clearable	: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-user-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name : 'mngt_drtr_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('cvic_kind_dvcd','설비종류'),
								xtype		: 'lookupfield',
								name		: 'cvic_kind_dvcd',
								width		: 170,
								editable	: false,
								lookupValue	: resource.lookup('cvic_kind_dvcd')
							},{	fieldLabel	: Language.get('cvic_stat_dvcd','운전상태'),
								width		: 170,
								xtype		: 'lookupfield',
								name		: 'cvic_stat_dvcd',
								editable	: false,
								width		: 170,
								lookupValue	: resource.lookup('cvic_stat_dvcd')
							}
						]
					},{	fieldLabel	: Language.get('wkct_name','설치공정'),
						width		: 340,
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wkct_name',
						pair		: 'wkct_idcd',
						clearable	: true ,
						popup : {
							select : 'SINGLE',
							widget : 'lookup-wkct-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('wkct_name'));
								pairField.setValue(records[0].get('wkct_idcd'));
							}
						}
					},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('istl_loct','설치장소'),
						width		: 340,
						xtype		: 'textarea',
						name		: 'istl_loct',
						height		: 35
					},{	fieldLabel	: Language.get('dept_name','관리부서'),
						width		: 340,
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'dept_name',
						pair		: 'mngt_dept_idcd',
						clearable	: true ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-dept-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('dept_name'));
								pairField.setValue(records[0].get('dept_idcd'));
							}
						}
					},{	name : 'mngt_dept_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('mchn_numb','관리번호'),
						xtype		: 'textfield',
						name		: 'mchn_numb'
					},{	fieldLabel	: Language.get('chek_type_name','점검유형'),
						width		: 340,
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'chek_type_name',
						pair		: 'chek_type_idcd',
						clearable	: true ,
						popup : {
							select : 'SINGLE',
							widget : 'lookup-cvic-chck-type-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('chek_type_name'));
								pairField.setValue(records[0].get('chek_type_idcd'));
							}
						}
					},{	name : 'chek_type_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('chek_ccle_dvcd','점검주기'),
								xtype		: 'lookupfield',
								name		: 'chek_ccle_dvcd',
								width		: 170,
								lookupValue	: resource.lookup('chek_ccle_dvcd'),
							},{	fieldLabel	: Language.get('sral_numb','시리얼번호'),
								xtype		: 'textfield',
								name		: 'sral_numb',
								width		: 170
							},{	xtype		: 'textfield',
								name		: 'modify',
								hidden		: true
							}
						]
					},{	name		: 'imge_chek1', xtype : 'textfield' , hidden : true
					},{	name		: 'imge_chek2', xtype : 'textfield' , hidden : true
					}
				]
			}
		;
		return cvic;
	},

	createTabs : function () {
		var me = this,
			cvic = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1(), me.createTab2(), me.createTab3(), me.createTab4(),me.createTab5(),{title : '첨부파일',xtype: 'module-cvicmast-editorlister'}]
			}
		;
		return cvic;
	},

	createTab1 : function() {
		var me = this,
			cvic = {
				title	: '구매.제조사',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0 ,margin : '10 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('puch_cstm_name','구매거래처'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'cstm_name',
									pair		: 'puch_cstm_idcd',
									clearable	: false ,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-cstm-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cstm_name'));
											pairField.setValue(records[0].get('cstm_idcd'));
										}
									}
								},{	name : 'puch_cstm_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('puch_cstm_name','구매거래처명'),
									xtype		: 'textfield',
									name		: 'puch_cstm_name'
								},{	fieldLabel	: Language.get('vend_tele_numb','거래처전화번호'),
									xtype		: 'textfield',
									name		: 'vend_tele_numb'
								},{	fieldLabel	: Language.get('afsv_tele_numb','AS전화번호'),
									xtype		: 'textfield',
									name		: 'afsv_tele_numb'
								},{	fieldLabel	: Language.get('make_natn_name','제조국가'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'make_natn_name',
									pair		: 'make_natn_bacd',
									clearable	: false ,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-base-popup',
										params : { prnt_idcd : '1202', stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('base_name'));
											pairField.setValue(records[0].get('base_code'));
										}
									}
								},{	name : 'make_natn_bacd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('make_cmpy_name','제조사명'),
									xtype		: 'textfield',
									name		: 'make_cmpy_name'
								},{	fieldLabel	: Language.get('puch_amnt','구매금액'),
									xtype		: 'numericfield',
									name		: 'puch_amnt'
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('puch_date','구매일자'),
											xtype		: 'datefield',
											name		: 'puch_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										},{	fieldLabel	: Language.get('used_year','사용년한'),
											labelWidth	: 50,
											xtype		: 'textfield',
											name		: 'used_year',
											width		: 140,
											fieldStyle	: 'text-align:right;',
											listeners	: {
												change	: function(){
													var val = this.getValue();
													if(isNaN(val)){
														Ext.Msg.alert("알림","숫자만 입력하여 주시기 바랍니다.");
														me.down('[name=used_year]').setValue('0');
													}
												}
											}
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('cvic_usge','용도'),
											xtype		: 'textarea',
											name		: 'cvic_usge',
											width		: 340,
											height		: 60
										}
									]
								}
							]
						}
					]
			}
		;
		return cvic;
	},
	createTab2 : function() {
		var me = this,
			cvic = {
				title	: '추가정보',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0 , margin : '10 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('norm_ivst_date','양산투입일자'),
									xtype		: 'datefield',
									name		: 'norm_ivst_date',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									width		: 200
								},{	fieldLabel	: Language.get('aset_idcd','자산번호'),
									xtype		: 'textfield',
									name		: 'aset_idcd'
								},{	fieldLabel	: Language.get('cvic_type','설비형식'),
									xtype		: 'textfield',
									name		: 'cvic_type'
								},{	fieldLabel	: Language.get('prod_abty','설비능력'),
									xtype		: 'numericfield',
									name		: 'prod_abty'
								},{	fieldLabel	: Language.get( 'labo_rate_name','임율'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'labo_rate_name',
									pair		: 'labo_rate_idcd',
									clearable	: false,
									width		: 341,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-laborate-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' },
										result	: function(records, nameField, pairField) {
											me.down('[name=labo_rate_idcd]').setValue(records[0].get('labo_rate_idcd'));
											nameField.setValue(records[0].get('labo_rate_name'));
											pairField.setValue(records[0].get('labo_rate_idcd'));
										}
									}
								},{	name : 'labo_rate_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: '설비분류',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'clss_desc',
									pair		: 'lcls_idcd',
									clearable	: true ,
									width		: 341,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-clss-mast-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0', search_code : '3000'},
										result	: function(records, nameField, pairField) {
											me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
											me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
											me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
											nameField.setValue(records[0].get('clss_desc'));
										}
									}
								},{	name		: 'lcls_idcd', xtype : 'textfield' , hidden : true
								},{	name		: 'mcls_idcd', xtype : 'textfield' , hidden : true
								},{	name		: 'scls_idcd', xtype : 'textfield' , hidden : true
								}
							]
						}
					]
			}
		;
		return cvic;
	},

	createTab3 : function() {
		var me = this,
			cvic = {
				title	: '생산품목',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				hidden	: true,
				fieldDefaults	: { width : 200, labelWidth : 80, labelSeparator : '' },
					items	: [
					]
				}
		;
		return cvic;
	},

	createTab4 : function() {
		var me = this,
			cvic = {
				title	: '부속설비',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				hidden	: true,
				fieldDefaults	: { width : 200, labelWidth : 80, labelSeparator : '' },
					items	: [
					]
				}
		;
		return cvic;
	},
	createTab5 : function() {
		var me = this,
			item = {
				title	: '이미지',
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
										url		: 'system/prod/cvic/cvicmast/set/fileUpload.do',
										timeout	: 120000,
										method	: 'POST',
										layout	: { type: 'vbox', align: 'stretch' } ,
										padding	: 10 ,
										layout	: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
										items	:[
											{	xtype		: 'filefield',
												name		: 'files',
												fieldLabel	: '이미지1',
												itemId		: 'files1',
												msgTarget	: 'side',
												allowBlank	: true,
												clearable	: true ,
												anchor		: '100%',
												margin		: '0 3 0 0 ',
												width		: 330,
												buttonText	: '선택',
												regex		: new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
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
														}Ext.ComponentQuery.query('module-cvicmast-editor')[0].down('[name=modify]').setValue('Y');
													}
												}
											},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle
											},{	xtype		: 'filefield',
												name		: 'files',
												fieldLabel	: '이미지2',
												msgTarget	: 'side',
												itemId		: 'files2',
												allowBlank	: true,
												clearable	: true ,
												anchor		: '100%',
												margin		: '0 3 0 0 ',
												width		: 330,
												buttonText	: '선택',
												regex		: new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
												listeners	: {
													change	: function (field) {
														var file = field.fileInputEl.dom.files[0],
															reader = new FileReader()
															form = this.up('form').up('form').up('panel').up('form')
														;
														if (file) {
															reader.addEventListener('load', function (event) {
																me.down('[name=imge_chek2]').setValue('Y');
																form.down('[name=image2]').setSrc(event.target.result)
															});
															reader.readAsDataURL(file);
														}else{
															me.down('[name=imge_chek2]').setValue('');
															form.down('[name=image2]').setSrc('');
														}Ext.ComponentQuery.query('module-cvicmast-editor')[0].down('[name=modify]').setValue('Y');
													}
												}
											},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle2
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
								width	: 210,
								height	: 180,
								margin	: '20 55',
								hidden	: false
							},{	xtype	: 'image',
								name	: 'image2',
								id		: 'prjt_work_imge2',
								src		: '',
								width	: 210,
								height	: 180,
								margin	: '20 55 0 160',
								hidden	: false
							}
						]
					},{	xtype		:'textfield',
						name		: 'cvic_imge_1fst',
						hidden		: true,
						listeners	: {
							change:function(val){
								if(val.getValue()){
									img = new Uint8Array(val.getValue().split(","));
									blob = new Blob([img],{type:'image/png'})
									url = URL.createObjectURL(blob);
									this.up('form').down('[name=image]').setSrc(url);
								}else{
									this.up('form').down('[name=image]').setSrc('');
								}
							}
						}
					},{	xtype		:'textfield',
						name		: 'cvic_imge_2snd',
						hidden		: true,
						listeners	: {
							change:function(val){
								if(val.getValue()){
									img = new Uint8Array(val.getValue().split(","));
									blob = new Blob([img],{type:'image/png'})
									url = URL.createObjectURL(blob);
									this.up('form').down('[name=image2]').setSrc(url);
								}else{
									this.up('form').down('[name=image2]').setSrc('');
								}
							}
						}
					}
				]
			}
		;
		return item;
	},
	imgCancle:function(){
		var form = this.up('form').up('[name=imge_info]');
		form.down('[name=image]').setSrc('');
		form.down('[name=cvic_imge_1fst]').setValue('');

		form.down('[name=files]').fileInputEl.dom.value = '';
	},
	imgCancle2:function(){
		var form = this.up('form').up('[name=imge_info]');
		form.down('[name=image2]').setSrc('');
		form.down('[name=cvic_imge_2snd]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	},
});