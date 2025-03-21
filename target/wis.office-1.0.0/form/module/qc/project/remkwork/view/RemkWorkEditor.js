Ext.define('module.qc.project.remkwork.view.RemkWorkEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-remkwork-editor',

	height : 360,
	layout : {
	type: 'border'
	},

	title			: Language.get('pjod_test_insp','검사내역 정보'),
	collapsible 	: true			,
	collapsed		: true			,
	defaultFocus	: 'pjod_idcd'	,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
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
				fieldDefaults	: { width : 355, labelWidth : 80, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('pjod_idcd','프로젝트ID'),
								name		: 'pjod_idcd',
								xtype		: 'textfield',
								hidden		: true
							},{	fieldLabel	: Language.get('line_seqn','순번'),
								name		: 'line_seqn',
								xtype		: 'numericfield',
								hidden		: true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('poor_seqn','순번'),
								name		: 'poor_seqn',
								xtype		: 'numericfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								width		: 147,
								readOnly	: true
							},{	fieldLabel	: Language.get('trtm_date','조치일자'),
								name		: 'trtm_date',
								xtype		: 'datefield',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 208,
								labelWidth	: 100
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('poor_name','불량유형'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'poor_name',
								pair		: 'poor_bacd',
								clearable	: true ,
								width		: 188,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '6000' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{	name : 'poor_bacd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('drtr_name','담당자'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'drtr_name',
								pair		: 'drtr_idcd',
								clearable	: false ,
								width		: 167,
								labelWidth	: 60,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('prod_qntt','생산수량'),
								name		: 'prod_qntt',
								xtype		: 'numericfield',
								width		: 188,
								readOnly	: true
							},{	fieldLabel	: Language.get('poor_qntt','불량수량'),
								name		: 'poor_qntt',
								xtype		: 'numericfield',
								width		: 167,
								labelWidth	: 60,
								listeners	: {
									blur: function() {
										var panel = this.up('form'),
											qntt = panel.down('[name=prod_qntt]').getValue();
											qntt2 = Number(qntt)-Number(this.getValue());
										if(qntt < this.getValue()){
											this.setValue(qntt);
										}
									}
								}
							}
						]
					},{	fieldLabel	: Language.get('poor_cont','문제점'),
						name		: 'poor_cont',
						xtype		: 'textarea',
						height		: 100
					},{	fieldLabel	: Language.get('trtm_cont','대책'),
						name		: 'trtm_cont',
						xtype		: 'textarea',
						height		: 100
					},{	xtype : 'textfield', name : 'imge_chek1', hidden:true
					},{	xtype : 'textfield', name : 'imge_chek2', hidden:true
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
				items	: [ me.createTab1() ]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title	: '이미지',
				name	: 'imge_info',
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
									fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
									items		: [
										{	xtype   : 'form-panel',
											name    : 'uploadForm',
											region  : 'center',
											standardSubmit: false,
											border :  false,
											url     : 'system/qc/project/remkwork/set/fileUpload.do',
											timeout : 120000,
											method  : 'POST',
											layout : { type: 'vbox', align: 'stretch' } ,
											padding : 10 ,
											layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
											items:
											[
												{	xtype       : 'filefield',
													name        : 'files',
													fieldLabel  : '이미지1',
													msgTarget   : 'side',
													allowBlank  : true,
													clearable	: true ,
													anchor      : '100%',
													margin		: '0 3 0 0 ',
													width       : 350,
													buttonText  : '선택',
													regex       : new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
													listeners: {
														change: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader(),
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	me.down('[name=imge_chek1]').setValue('Y');
																	form.down('[name=image]').setSrc(event.target.result)
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek1]').setValue('');
																form.down('[name=image]').setSrc('')
															}
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: function(){me.imgCancle(me)}
												},{	xtype       : 'filefield',
													name        : 'files',
													fieldLabel  : '이미지2',
													msgTarget   : 'side',
													allowBlank  : true,
													clearable	: true ,
													anchor      : '100%',
													margin		: '0 3 0 0 ',
													width       : 350,
													buttonText  : '선택',
													regex       : new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
													listeners: {
														change: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader()
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	me.down('[name=imge_chek2]').setValue('Y');
																	form.down('[name=image2]').setSrc(event.target.result);
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek2]').setValue('');
																form.down('[name=image2]').setSrc('');
															}
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: function(){me.imgCancle2(me)}
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
							margin	: '5 0 0 0',
							autoscroll : true,
							items : [
								{	xtype	: 'image',
									name	: 'image',
//									id		: 'prjt_work_imge',
									src		: '',
									width	: 300,
									height	: 200,
									margin	: '20 55',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image2',
//									id		: 'prjt_work_imge2',
									src		: '',
									width	: 300,
									height	: 200,
									margin	: '20 55',
									hidden	: false
								}
							]
						},{	xtype		:'textfield',
							name		: 'imge_1fst',
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
							name		: 'imge_2snd',
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
	imgCancle:function(me){
		var form = this.down('[title=이미지]');
		form.down('[name=image]').setSrc('');
		form.down('[name=imge_1fst]').setValue('');
		me.down('[name=imge_chek1]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	},
	imgCancle2:function(me){
		var form = this.down('[title=이미지]');
		form.down('[name=image2]').setSrc('');
		form.down('[name=imge_2snd]').setValue('');
		me.down('[name=imge_chek2]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	}
});