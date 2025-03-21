Ext.define('module.item.itemmast3.view.ItemMast3Editor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-itemmast3-editor',

	height : 250,
	layout : {
	type: 'border'
	},

	title			: Language.get('item_info','품목코드 정보'),
	collapsible 	: true	,
	collapsed		: true	,
	defaultFocus	: 'item_idcd',

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
				itemId			: 'mainForm',
				width			: 360,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 65, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('item_code','품목코드'),
								name		: 'item_code',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 280
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								width		: 55,
								editable	: false,
								margin		: '0 0 0 5',
								lookupValue	: resource.lookup('line_stat')
							},{ fieldLabel	: Language.get('item_idcd','품목ID'),
								name		: 'item_idcd',
								xtype		: 'textfield',
								hidden		: true
							}
						]
					},{	fieldLabel	: Language.get('item_name','품명'),
						xtype		: 'textfield',
						name		: 'item_name',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						width		: 340,
						margin : '0 0 5 0'
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						hidden		: !(_global.options.item_size_used_yorn == 1),
						items	: [
							{	fieldLabel	: Language.get('','사이즈'),
								xtype		: 'textfield',
								name		: 'item_leng',
								width		: 120,
								value		: 0,
								minValue	: 0,
								regex: /^[0-9]+\.?[0-9]*$/,
								listeners	: {
									blur	: function(){
										var panel = this.up('form'),
											item_leng = panel.down('[name=item_leng]').getValue();
										if(isNaN(Number(item_leng))){
											Ext.Msg.alert("알림","숫자이외의 값이 들어간다면 규격에 입력하여 주십시오.");
											panel.down('[name=item_leng]').reset();
										}
									}
								}
							},{	fieldLabel	: 'X',
								xtype		: 'textfield',
								name		: 'item_widh',
								labelWidth	: 10,
								width		: 65,
								value		: 0,
								minValue	: 0,
								regex: /^[0-9]+\.?[0-9]*$/,
								listeners	: {
									blur	: function(){
										var panel = this.up('form'),
											item_widh = panel.down('[name=item_widh]').getValue();
										if(isNaN(Number(item_widh))){
											Ext.Msg.alert("알림","숫자이외의 값이 들어간다면 규격에 입력하여 주십시오.");
											panel.down('[name=item_widh]').reset();
										}
									}
								}
							}
							,{	fieldLabel	: Language.get('','두께'),
								xtype		: 'textfield',
								name		: 'item_tick',
								width		: 150,
								value		: 0,
								minValue	: 0,
								margin		: '0 0 0 5',
								regex: /^[0-9]+\.?[0-9]*$/,
								listeners	: {
									blur	: function(){
										var panel = this.up('form'),
											item_tick = panel.down('[name=item_tick]').getValue();
										if(isNaN(Number(item_tick))){
											Ext.Msg.alert("알림","숫자이외의 값이 들어간다면 규격에 입력하여 주십시오.");
											panel.down('[name=item_tick]').reset();
										}else{
											panel.down('[name=item_tick]').setValue(Ext.util.Format.number(item_tick, '0.0'));
										}
									}
								}
							}
						]
					},{	fieldLabel	: Language.get('item_spec','규격'),
						xtype		: 'textfield',
						name		: 'item_spec',
						width		: 340,
						margin : '0 0 5 0'
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('acct_bacd_name','계정구분'),
								width		: 185,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'acct_bacd_name',
								pair		: 'acct_bacd',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								clearable	: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-base-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '1102'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{	name : 'acct_bacd', xtype : 'textfield' , hidden : true,
//								listeners : {
//									change : function(val,code){
//										var purc    = me.down('[name=edit_tab1]');
//										var tabs    = me.down('[name=edit_tab1]').up('tabpanel');
//										var adon    = me.down('[name=edit_tab2]');
//										var hidden1 = false;
//										var hidden2 = false;
//
//										if(code=='2001'||code=='2002'||code=='3000'||code=='2003'){
//											if((_global.options.item_adon_disp_yorn==0)){
//												hidden2 = true;
//											}
//											hidden1 = true;
//										}
//										var a = code;
//										switch (a) {
//											case '1001' : {  /* 원재료  */
//												adon.tab.show();
//												purc.tab.hide();
//												tabs.setActiveTab(adon);
//												break;
//											};
//											case '1002' : {  /* 원재료  */
//												adon.tab.show();
//												purc.tab.hide();
//												tabs.setActiveTab(adon);
//												break;
//											};
//											case '2001': {	/* 제공품  */
//												adon.tab.show();
//												purc.tab.hide();
//												tabs.setActiveTab(adon);
//												break;
//											};
//											case '2002': {	/* 제품  */
//												purc.tab.show();
//												adon.tab.hide();
//												tabs.setActiveTab(purc);
//												break;
//											};
//											case '3000': {	/* 제품  */
//												purc.tab.show();
//												adon.tab.hide();
//												tabs.setActiveTab(purc);
//												break;
//											};
//											case '2003': {	/* 품목보고서  */
//												purc.tab.show();
//												adon.tab.hide();
//												tabs.setActiveTab(purc);
//												break;
//											};
//											default : {
//											}
//										};
//									}
//								}
							},{	fieldLabel	: '수불단위'/*Language.get('','수불단위')*/,
								xtype		: 'popupfield',
								width		: 150,
								margin		: '0 0 0 5',
								editable	: true,
								enableKeyEvents : true,
								name		: 'unit_name',
								pair		: 'unit_idcd',
								clearable	: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-unit-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('unit_name'));
										pairField.setValue(records[0].get('unit_idcd'));
									}
								}
							},{	name : 'unit_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	fieldLabel	: Language.get('clss_desc','품목분류'),
						width		: 340,
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'clss_desc',
						pair		: 'lcls_idcd',
						clearable	: true ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-item-clss-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0' },
							result : function(records, nameField, pairField) {
								me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
								me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
								me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
								nameField.setValue(records[0].get('clss_desc'));
							}
						}
					},{	name : 'lcls_idcd', xtype : 'textfield' , hidden : true
					},{	name : 'mcls_idcd', xtype : 'textfield' , hidden : true
					},{	name : 'scls_idcd', xtype : 'textfield' , hidden : true
					},{	name		: 'imge_chek1', xtype : 'textfield' , hidden : true
					},{	name		: 'imge_chek2', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('modify','수정'),
						xtype		: 'textfield',
						name		: 'modify',
						width		: 170,
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
				items	: [
					{title : '첨부파일',xtype: 'module-itemmast3-editorlister'},
					me.createTab5(),
				]
			}
		;
		return item;
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
											url		: 'system/item/itemmast/set/fileUpload.do',
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
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek1]').setValue('');
																form.down('[name=image]').setSrc('')
															}Ext.ComponentQuery.query('module-itemmast-editor')[0].down('[name=modify]').setValue('Y');
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
													width		: 350,
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
															}Ext.ComponentQuery.query('module-itemmast-editor')[0].down('[name=modify]').setValue('Y');
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
									width	: 195,
									height	: 260,
									margin	: '20 55',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image2',
									id		: 'prjt_work_imge2',
									src		: '',
									width	: 195,
									height	: 260,
									margin	: '20 55 0 160',
									hidden	: false
								}
							]
						},{	xtype		:'textfield',
							name		: 'item_imge',
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
							name		: 'item_imge2',
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
		form.down('[name=item_imge]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	},

	imgCancle2:function(){
		var form = this.up('form').up('[name=imge_info]');
		form.down('[name=image2]').setSrc('');
		form.down('[name=item_imge2]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	},
});