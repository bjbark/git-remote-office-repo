Ext.define('module.custom.aone.item.itemgroup.view.ItemMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-itemmast-editor',

	height : 450,
	layout : {
		type : 'border'
	},

	title			: Language.get('item_info','품목코드 정보'),
	collapsible 	: true	,
	collapsed		: true	,
	defaultFocus	: 'item_idcd',

	initComponent: function(config){
		var me = this;
		me.selectedAcctBacd = "";
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
						{	name : 'item_code', xtype : 'textfield' , hidden : true
						},{	name : 'lcls_idcd', xtype : 'textfield' , hidden : true
						},{	name : 'mcls_idcd', xtype : 'textfield' , hidden : true
						},{	name : 'scls_idcd', xtype : 'textfield' , hidden : true
						},{	name : 'lcls_code', xtype : 'textfield' , hidden : true
						},{	name : 'mcls_code', xtype : 'textfield' , hidden : true
						},{	name : 'scls_code', xtype : 'textfield' , hidden : true
						},{	name : 'lcls_name', xtype : 'textfield' , hidden : true
						},{	name : 'mcls_name', xtype : 'textfield' , hidden : true
						},{	name : 'scls_name', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('_name','계정구분'),
							xtype		: 'popupfield',
							itemID		: 'acct_bacd_name',
							name		: 'acct_bacd_name',
							pair		: 'acct_bacd',
							width		: 185,
							editable	: false,
							clearable	: true,
							allowBlank	: false,
							enableKeyEvents : true,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							listeners	: {
								change : function(self, value){
									if(value == "부품"){
										me.down('[name=prts_type_name]').show();
										me.down('[name=mker_name]').show();
									}else{
										me.down('[name=prts_type_name]').hide();
										me.down('[name=mker_name]').hide();
									}

									if (!value) {
										me.selectedAcctBacd = "";
										var acctBacdField = me.down('[name=acct_bacd]');
										if (acctBacdField) {
											acctBacdField.setValue("");
										}
										 var clssDescField = me.down('[name=clss_desc]');
										if (clssDescField) {
											clssDescField.popup.params.acct_bacd = "";
										}
									}
								}
							},
							popup: {
								select : 'SINGLE',
								widget : 'lookup-base-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '1102'},
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('base_name'));
									pairField.setValue(records[0].get('base_code'));
									me.selectedAcctBacd = records[0].get('base_code');
									me.down('[name=acct_bacd]').setValue(me.selectedAcctBacd);

									var clssDescField = me.down('[name=clss_desc]');
									if (clssDescField) {
										clssDescField.popup.params.acct_bacd = me.selectedAcctBacd;
									}
								}
							},
						},{	name : 'acct_bacd', xtype : 'textfield' , hidden : true,
						},{	fieldLabel	: Language.get('clss_desc','품목분류'),
							xtype		: 'popupfield',
							name		: 'clss_desc',
							pair		: 'lcls_idcd',
							width		: 340,
							fieldCls	: 'requiredindex',
							editable	: false,
							clearable	: true,
							allowBlank	: false,
							emptyText	: Const.invalid.emptyValue,
							enableKeyEvents : true,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-item-clss-popup5',
								params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd : me.selectedAcctBacd},
								result : function(records, nameField, pairField) {
									me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
									me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
									me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
									me.down('[name=lcls_code]').setValue(records[0].get('lcls_code'));
									me.down('[name=mcls_code]').setValue(records[0].get('mcls_code'));
									me.down('[name=scls_code]').setValue(records[0].get('scls_code'));
									me.down('[name=lcls_name]').setValue(records[0].get('lcls_name'));
									me.down('[name=mcls_name]').setValue(records[0].get('mcls_name'));
									me.down('[name=scls_name]').setValue(records[0].get('scls_name'));
									me.down('[name=item_name]').setValue(records[0].get('mcls_name'));
									me.down('[name=item_spec]').setValue(records[0].get('scls_name'));
									me.down('[name=item_code_prefix]').setValue(records[0].get('lcls_code')+records[0].get('mcls_code')+records[0].get('scls_code'));
									nameField.setValue(records[0].get('clss_desc'));
								},
							},
							listeners	: {
								change : function(self, value, value2){
									var panel = this.up('form'),
										item_code = panel.down('[name=item_code]').getValue(),
										item_code_prefix = panel.down('[name=item_code_prefix]').getValue(),
										item_code_subfix = '',
										item_name = ''
									;

									if(value == ''){
										var panel = this.up('form');
										panel.down('[name=item_name]').setValue(null);
										panel.down('[name=item_spec]').setValue(null);
										panel.down('[name=clss_desc]').setValue(null);
										panel.down('[name=item_code_prefix]').setValue(null);
										panel.down('[name=item_code_subfix]').setValue(null);
									}

									if(value != '' && item_code_prefix != '' && item_code == ''){
										Ext.Ajax.request({
											url    : _global.location.href + '/system/custom/aone/item/itemmast/get/maxCodeInfo.do',
											params : {
												token : _global.token_id,
												param : JSON.stringify({
													item_code : item_code_prefix
												})
											},
											method : 'POST',
											success:function(response, records){
												var result = Ext.decode(response.responseText);
												if (result.success) {
													item_code_subfix = panel.down('[name=item_code_subfix]').setValue(result.records.seqn);
													panel.down('[name=item_code]').setValue(item_code_prefix+result.records.seqn);
												}
											},
											failure:function(result, request){
											}
										});
									}
								}
							},
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
							items	: [
								{	name : 'item_idcd', xtype : 'textfield' , hidden : true,
								},{	fieldLabel	: Language.get('item_code','품목코드'),
									name		: 'item_code_prefix',
									xtype		: 'textfield',
									allowBlank	: false,
									readOnly	: true,
									value		: '',
									fieldCls	: 'requiredindex',
									width		: 197
								},{	name		: 'item_code_subfix',
									xtype		: 'textfield',
									allowBlank	: false,
									readOnly	: true,
									value		: '',
									fieldCls	: 'requiredindex',
									margin		: '1 0 0 4',
									width		: 80
								},{	xtype		: 'lookupfield',
									name		: 'line_stat',
									width		: 55,
									editable	: false,
									margin		: '1 0 0 4',
									lookupValue	: resource.lookup('line_stat')
								}
							]
						},{	fieldLabel	: Language.get('item_name','품명'),
							xtype		: 'textfield',
							name		: 'item_name',
							value		: '',
							width		: 340,
							margin		: '0 0 5 0',
							allowBlank	: false,
							emptyText	: Const.invalid.emptyValue,
							fieldCls	: 'requiredindex'
						},{	fieldLabel	: Language.get('item_spec','규격'),
							xtype		: 'textfield',
							name		: 'item_spec',
							width		: 340,
							margin		: '0 0 5 0',
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
						},{	fieldLabel	: Language.get('prts_type_name','TYPE'),
							xtype		: 'textfield',
							name		: 'prts_type_name',
							itemId		: 'prts_type_name',
							width		: 340,
							margin		: '0 0 5 0',
							enableKeyEvents : true,
							hidden		: true
						},{	fieldLabel	: Language.get('mker_name','MAKER'),
							xtype		: 'textfield',
							name		: 'mker_name',
							itemId		: 'mker_name',
							clearable	: true ,
							width		: 340,
							enableKeyEvents : true,
							hidden		: true
						},{	fieldLabel	: Language.get('','보관창고'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'istt_wrhs_name',
							width		: 340,
							pair		: 'istt_wrhs_idcd',
							clearable	: true,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-wrhs-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0'},
								result : function(records, nameField, pairField) {
									var panel1 = nameField.up('form');
									panel1.down('[name=bzpl_idcd]').setValue(records[0].get('bzpl_idcd'));
									nameField.setValue(records[0].get('wrhs_name'));
									pairField.setValue(records[0].get('wrhs_idcd'));
								}
							}
						},{	name : 'istt_wrhs_idcd', xtype : 'textfield' , hidden : true,
							listeners	: {
								change	: function(){
									var form = this.up('form'); // 필드의 상위 폼
									form.down('[name=zone_name]').popup.params.wrhs_idcd = this.getValue(); //아래 팝업 창고 id로 보관장소 불러오기
								}
							}
						},{	fieldLabel	: Language.get('','사업장'),
							xtype		: 'textfield',
							name		: 'bzpl_idcd',
							hidden		: true
						},{	fieldLabel	: Language.get('','보관장소'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'zone_name',
							width		: 340,
							pair		: 'zone_idcd',
							clearable	: true,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-wrhs-zone-popup',
								params:{
									prnt_idcd : '3300',
									wrhs_idcd : '',
								},
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('zone_name'));
									pairField.setValue(records[0].get('zone_idcd'));
								},
							},
						},{	name : 'zone_idcd', xtype : 'textfield' , hidden : true
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
							items	: [
								{	fieldLabel	: '수불단위'/*Language.get('','수불단위')*/,
									xtype		: 'popupfield',
									width		: 155,
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
					},{	name	: 'colr_bacd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('yorn','재고관리'),
								xtype		: 'lookupfield',
								name		: 'stok_mngt_yorn',
								width		: 185,
								lookupValue	: resource.lookup('yorn'),
								hidden		: _global.options.mes_system_type =='Frame',
							},{	fieldLabel	: Language.get('yorn','인수검사'),
								xtype		: 'lookupfield',
								name		: 'rcpt_insp_yorn',
								width		: 155,
								labelWidth	: 65,
								lookupValue	: resource.lookup('yorn'),
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('supl_dvcd','조달방법'),
								xtype		: 'lookupfield',
								name		: 'supl_dvcd',
								width		: 185,
								lookupValue	: resource.lookup('supl_dvcd'),
							},{	fieldLabel	: Language.get('safe_stok','안전재고'),
								xtype		: 'numericfield',
								name		: 'safe_stok',
								width		: 155,
								labelWidth	: 65,
							}
						]
					},{	name		: 'wkfw_idcd', xtype : 'textfield' , hidden : true
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('cstm_name','거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								clearable	: true ,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-cstm-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name	: 'cstm_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	name		: 'imge_chek1', xtype : 'textfield' , hidden : true
					},{	name		: 'imge_chek2', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('modify','수정'),
						xtype		: 'textfield',
						name		: 'modify',
						width		: 170,
						hidden		: true
					},{	name : 'dvrs_item_idcd', xtype : 'textfield' , hidden : true
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
					{title : '첨부파일',xtype: 'module-itemmast-editorlister'},
					me.createTab5(),
					{title : '관리항목',xtype: 'module-itemmast-mngtlister'},
					{title : '메모',xtype: 'module-itemmast-memolister'},
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
													clearable	: true ,
													anchor		: '100%',
													margin		: '0 3 0 0 ',
													width		: 350,
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
						},{	xtype		: 'textfield',
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