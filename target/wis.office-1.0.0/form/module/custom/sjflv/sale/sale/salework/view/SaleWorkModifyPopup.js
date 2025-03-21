Ext.define('module.custom.sjflv.sale.sale.salework.view.SaleWorkModifyPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-salework-modify-popup',

	title		: '세금계산서 변경',
	closable	: true,
	autoShow	: true,
	width		: 1200 ,
	height		: 600,
	layout		: {
		type : 'border'
	},
	store	: 'module.custom.sjflv.sale.sale.salework.store.SaleWorkModifyPopup',
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;

		me.items = [ me.createForm()];
		me.callParent(arguments);

	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [

						'->' ,
						{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
//						{	text : '<span class="write-button">닫기</span>', scope: me, handler: me.close, cls: 'button-style', width: 80 , height	: 40,	} ,
					]
				}
			],
			dockedItems : [me.editorForm() ],
			items : [me.createGrid()]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'invc',
			store	: Ext.create(me.store),
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtpye	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	xtype	: 'panel',
							layout	: 'vbox',
							border	: 0,
							items	: [
								{	xtype	: 'panel',
									layout	: 'hbox',
									border	: 0,
									items	: [
										{	xtype		: 'textfield',
											name		: 'invc_numb',
											hidden		: true
										},{	xtype		: 'textfield',
											name		: 'new_invc_numb',
											hidden		: true
										},{	xtype		: 'textfield',
											name		: 'new_invc_numb2',
											hidden		: true
										},{	xtype		: 'textfield',
											name		: 'acpt_dvcd',
											hidden		: true
										},{	fieldLabel	: Language.get( 'change','change'),
											xtype		: 'textfield',
											name		: 'change',
											hidden		: true
										},{	fieldLabel	: Language.get('txbl_mdfy_dvcd','수정사유'),
											xtype		: 'lookupfield',
											editable	: false,
											name		: 'txbl_mdfy_dvcd',
											labelWidth	: 80,
											width		: 210,
											margin		: '0 0 0 20',
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,
											lookupValue	: resource.lookup('txbl_mdfy_dvcd'),
											listeners:{
												change:function(){
													var me = this,
														fm = me.up('form').up('form')
													;
													var val = me.getValue();
													fm.getForm().loadRecord(fm.ownerCt.params.select);

													var grid = fm.ownerCt.down('grid');
													grid.getStore().reload({
														callback:function(){
															if(val=='6'||val=='4'){
																var	sply_total = 0,
																	vatx_total = 0,
																	ttsm_total = 0
																;
																grid.getStore().each(function(records){
																	records.set('qntt',(records.get('qntt2')*-1));
																	records.set('sply_amnt',(records.get('sply_amnt2')*-1));
																	records.set('vatx_amnt',(records.get('vatx_amnt2')*-1));
																	records.set('ttsm_amnt',(records.get('ttsm_amnt2')*-1));
																	sply_total += (records.get('sply_amnt2')*-1);
																	vatx_total += (records.get('vatx_amnt2')*-1);
																	ttsm_total += (records.get('ttsm_amnt2')*-1);
																	console.log(sply_total);
																});
																fm.down('[name=sply_amnt_form]').setValue(sply_total);
																fm.down('[name=vatx_amnt_form]').setValue(vatx_total);
																fm.down('[name=ttsm_amnt_form]').setValue(ttsm_total);
															}else{
																var sply_total = 0,
																	vatx_total = 0,
																	ttsm_total = 0

																grid.getStore().each(function(records){
																	records.set('sply_amnt',(records.get('sply_amnt2')));
																	records.set('vatx_amnt',(records.get('vatx_amnt2')));
																	records.set('ttsm_amnt',(records.get('ttsm_amnt2')));
																	sply_total += (records.get('sply_amnt'));
																	vatx_total += (records.get('vatx_amnt'));
																	ttsm_total += (records.get('ttsm_amnt'));
																});
																fm.down('[name=sply_amnt_form]').setValue(sply_total);
																fm.down('[name=vatx_amnt_form]').setValue(vatx_total);
																fm.down('[name=ttsm_amnt_form]').setValue(ttsm_total);
															}
														}
													});




													if(val == '2' || val =='4' || val=='3'){
														fm.down('[name=publ_date]').setValue(new Date());
													}else{
														fm.down('[name=publ_date]').setValue(fm.ownerCt.params.select.get('publ_date'));
													}

													switch (val) {
														case '1':
															fm.down('[name=buss_numb]').setReadOnly(false);
															fm.down('[name=buss_numb]').fieldCls="";

															var arr, arr2,arr3;
															arr = fm.query('[cls=cust_field]');
															arr2 = fm.query('[cls=amnt_field]');
															arr3 = fm.query('[cls=amnt_field2]');

															Ext.each(arr,function(record){
																record.setReadOnly(false);
																record.fieldCls="";
															})
															Ext.each(arr2,function(record){
																if(record.name=="publ_date"){
																	record.setReadOnly(false);
																	record.fieldCls="";
																}else{
																	if(record.name=="qntt" || record.name=="sply_amnt" || record.name=="vatx_amnt" || record.name=="ttsm_amnt"){
																		record.setValue(0);
																	}
																	record.setReadOnly(true);
																	record.fieldCls="readonlyfield";
																}
															})
															Ext.each(arr3,function(record){
																record.setReadOnly(false);
																record.fieldCls="";
															})

															break;
														case '5':
															var arr, arr2,arr3;

															arr = fm.query('[cls=cust_field]');
															arr2 = fm.query('[cls=amnt_field]');
															arr3 = fm.query('[cls=amnt_field2]');

															Ext.each(arr,function(record){
																record.setReadOnly(false);
																record.fieldCls="";
															})
															Ext.each(arr2,function(record){
																if(record.name=="publ_date"){
																	record.setReadOnly(false);
																	record.fieldCls="";
																}else{
																	record.setReadOnly(true);
																	record.fieldCls="readonlyfield";
																}
															})
															Ext.each(arr3,function(record){
																record.setReadOnly(false);
																record.fieldCls="";
															})
															break;

														default:
															fm.down('[name=buss_numb]').setReadOnly(true);
															fm.down('[name=buss_numb]').fieldCls="readonlyfield";

															var arr, arr2,arr3;

															arr = fm.query('[cls=cust_field]');
															arr2 = fm.query('[cls=amnt_field]');
															arr3 = fm.query('[cls=amnt_field2]');

															Ext.each(arr,function(record){
																record.setReadOnly(true);
																record.fieldCls="readonlyfield";
															})
															Ext.each(arr2,function(record){
																if(record.name=="publ_date"){
																	if(val == '6'){

																		record.setReadOnly(true);
																		record.fieldCls="readonlyfield";
																	}else{
																		record.setReadOnly(false);
																		record.fieldCls="";
																	}
																}else{
																	if(val=='6' || val=='4'){
																		if(record.name=="qntt" || record.name=="sply_amnt" || record.name=="vatx_amnt" || record.name=="ttsm_amnt"){
																			var rec = (record.getValue() * -1);
																			record.setValue(rec);
																		}
																	}else{
																		record.setValue(0);
																	}
																	record.setReadOnly(true);
																	record.fieldCls="readonlyfield";
																}
															})
															Ext.each(arr3,function(record){

																if(val=='6' || val=='4'){
																	record.setReadOnly(true);
																	record.fieldCls="readonlyfield";
																}
																if(val == '2' || val=='3'){
																	record.setReadOnly(true);
																	record.fieldCls="readonlyfield";
																}
															})

															break;
													}
												}
											}
										},{	xtype		: 'textarea',
											width		: 340,
											height		: 22,
											margin		: '1 0 0 10',
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											value		: '공급자',
											fieldStyle	: 'text-align:center;',
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '10 0 0 0',
									items : [
										{	fieldLabel	: Language.get('buss_numb','사업자번호'),
											xtype		: 'popupfield',
											name		: 'bzpl_buss_numb',
											pair		: 'bzpl_idcd',
											clearable	: true,
											labelWidth	: 90,
											width		: 210,
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-bzpl-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0', sale_cstm_yorn : '1' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('buss_numb'));
													pairField.setValue(records[0].get('bzpl_idcd'));
													me.down('[name=bzpl_buss_name]').setValue(records[0].get('buss_name'));
													me.down('[name=bzpl_boss_name]').setValue(records[0].get('boss_name'));
													me.down('[name=bzpl_addr]').setValue(records[0].get('addr_1fst')+' '+(records[0].get('addr_2snd')?records[0].get('addr_2snd'):''));
													me.down('[name=bzpl_buss_type]').setValue(records[0].get('buss_type'));
													me.down('[name=bzpl_buss_kind]').setValue(records[0].get('buss_kind'));
													me.down('[name=bzpl_tele_numb]').setValue(records[0].get('tele_numb'));
													me.down('[name=bzpl_mail_addr]').setValue(records[0].get('mail_addr'));
												}
											}
										},{	xtype		: 'textfield', hidden:true, name : 'bzpl_idcd'
										},{	fieldLabel	: Language.get('','상호'),
											xtype		: 'textfield',
											name		: 'bzpl_buss_name',
											labelWidth	: 40,
											width		: 240,
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											cls			: 'cust_field',
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,
										},{	fieldLabel	: Language.get('','성명'),
											xtype		: 'textfield',
											name		: 'bzpl_boss_name',
											labelWidth	: 40,
											width		: 120,
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											cls			: 'cust_field',
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '10 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','사업장주소'),
											xtype		: 'textfield',
											name		: 'bzpl_addr',
											labelWidth	: 90,
											width		: 570,
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											cls			: 'cust_field',
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,

										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '10 0 0 0',
									items : [
										{	fieldLabel	: Language.get('buss_type','업태'),
											xtype		: 'textfield',
											name		: 'bzpl_buss_type',
											labelWidth	: 90,
											width		: 285,
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											cls			: 'cust_field',
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,
										},{	fieldLabel	: Language.get('buss_kind','종목'),
											xtype		: 'textfield',
											name		: 'bzpl_buss_kind',
											labelWidth	: 90,
											width		: 285,
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											cls			: 'cust_field',
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '10 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','담당자'),
											xtype		: 'popupfield',
											name		: 'bzpl_drtr_name',
											pair		: 'drtr_idcd',
											labelWidth	: 90,
											width		: 182,
											editable	: false,
											clearable	: true,
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-user-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0', sale_cstm_yorn : '1' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
													me.down('[name=bzpl_tele_numb]').setValue(records[0].get('hdph_numb'));
													me.down('[name=bzpl_mail_addr]').setValue(records[0].get('mail_addr'));
												}
											}
										},
										{ xtype		: 'textfield', name : 'lgin_idcd',value : me.popup.params.lgin_idcd
										},
										{ xtype		: 'textfield', name : 'drtr_idcd', hidden:true
										},{	fieldLabel	: Language.get('','연락처'),
											xtype		: 'textfield',
											name		: 'bzpl_tele_numb',
											labelWidth	: 45,
											width		: 143,
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,
										},{	fieldLabel	: Language.get('','이메일'),
											xtype		: 'textfield',
											name		: 'bzpl_mail_addr',
											labelWidth	: 50,
											width		: 245,
											allowBlank	: false,
//											emptyText	: Const.invalid.emptyValue,
										}
									]
								}
							]
						},{	xtype	: 'panel',
							layout	: 'vbox',
							border	: 0,
							items	: [
								{	xtype	: 'panel',
									layout	: 'hbox',
									border	: 0,
									items	: [
										{	fieldLabel	: ' ',
											xtype		: 'textarea',
											width		: 570,
											height		: 22,
											margin		: '1 0 0 10',
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											value		: '공급받는자',
											labelWidth	: 90,
											fieldStyle	: 'text-align:center;',
											readOnly	: true,
											fieldCls	: 'readonlyfield',
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '10 0 0 0',
									items : [
										{	fieldLabel	: Language.get('buss_numb','사업자번호'),
											xtype		: 'popupfield',
											name		: 'buss_numb',
											clearable	: true,
											labelWidth	: 90,
											width		: 210,
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											allowBlank	: false,
											editable	: false,
											emptyText	: Const.invalid.emptyValue,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-cstm-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0', sale_cstm_yorn : '1' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('buss_numb'));
													me.down('[name=buss_name]').setValue(records[0].get('cstm_name'));
													me.down('[name=boss_name]').setValue(records[0].get('boss_name'));
													me.down('[name=cstm_addr]').setValue(records[0].get('addr_1fst')+' '+(records[0].get('addr_2snd')?records[0].get('addr_2snd'):''));
												}
											}
										},{ xtype		: 'textfield', name : 'cstm_idcd', value : me.popup.params.select.cstm_idcd,hidden:true
//										},{ xtype		: 'textfield', name : 'acpt_dvcd', value : me.popup.params.select.acpt_dvcd,hidden:true
										},{ xtype		: 'textfield', name : 'item_idcd', value : me.popup.params.select.item_idcd,hidden:true
										},{ xtype		: 'textfield', name : 'item_name', value : me.popup.params.select.item_name,hidden:true
										},{	fieldLabel	: Language.get('','상호'),
											xtype		: 'textfield',
											name		: 'buss_name',
											labelWidth	: 40,
											width		: 240,
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											cls			: 'cust_field',
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,
										},{	fieldLabel	: Language.get('','성명'),
											xtype		: 'textfield',
											name		: 'boss_name',
											labelWidth	: 40,
											width		: 120,
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											cls			: 'cust_field',
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '10 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','사업장주소'),
											xtype		: 'textfield',
											name		: 'cstm_addr',
											labelWidth	: 90,
											width		: 570,
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											cls			: 'cust_field',
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '10 0 0 0',
									items : [
										{	fieldLabel	: Language.get('buss_type','업태'),
											xtype		: 'textfield',
											name		: 'buss_type',
											labelWidth	: 90,
											width		: 285,
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											cls			: 'cust_field',
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,
										},{	fieldLabel	: Language.get('buss_kind','종목'),
											xtype		: 'textfield',
											name		: 'buss_kind',
											labelWidth	: 90,
											width		: 285,
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											cls			: 'cust_field',
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '10 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','담당자'),
											xtype		: 'textfield',
											name		: 'drtr_name',
											labelWidth	: 90,
											width		: 182,
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,
										},{	fieldLabel	: Language.get('','연락처'),
											xtype		: 'textfield',
											name		: 'tele_numb',
											labelWidth	: 45,
											width		: 143,
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,
										},{	fieldLabel	: Language.get('','이메일'),
											xtype		: 'textfield',
											name		: 'mail_addr',
											labelWidth	: 50,
											width		: 245,
											allowBlank	: false,
											emptyText	: Const.invalid.emptyValue,
										}
									]
								}
							]
						}
					]
				},{	xtpye	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin		: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('','비고'),
							xtype		: 'textfield',
							name		: 'remk_text',
							labelWidth	: 100,
							width		: 1170,
							readOnly	: true,
							fieldCls	: 'readonlyfield',
						}
					]

				},{	xtpye	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 10 105',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right +  Const.borderLine.left ,
							width	: 100 ,
							items	: [
								{	text		: '작성일자', xtype : 'label', style : 'text-align:center; '
								},{	xtype		: 'datefield',
									name		: 'publ_date',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									editable	: false,
									value		: new Date(),
									readOnly	: true,
									fieldCls	: 'readonlyfield',
									cls			: 'amnt_field',
									allowBlank	: false,
									emptyText	: Const.invalid.emptyValue,
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
							width	: 280 ,
							items	: [
								{	text		: '공급가액', xtype : 'label', style : 'text-align:center;'
								},{	xtype		: 'numericfield',
									name		: 'sply_amnt_form',
									readOnly	: true,
									fieldCls	: 'readonlyfield',
									cls			: 'amnt_field'
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
							width	: 200 ,
							items	: [
								{	text		: '세액', xtype : 'label', style : 'text-align:center;'
								},{	xtype		: 'numericfield',
									name		: 'vatx_amnt_form',
									readOnly	: true,
									fieldCls	: 'readonlyfield',
									cls			: 'amnt_field'
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
							width	: 280 ,
							items	: [
								{	text		: '합계금액', xtype : 'label', style : 'text-align:center;'
								},{	xtype		: 'numericfield',
									name		: 'ttsm_amnt_form',
									readOnly	: true,
									fieldCls	: 'readonlyfield',
									cls			: 'amnt_field'
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top + Const.borderLine.bottom  +  Const.borderLine.right  ,
							width	: 105 ,
							items	: [
								{	text		: '영수/청구', xtype : 'label', style : 'text-align:center;'
								},{	xtype		: 'lookupfield',
									name		: 'rqod_rcvd_dvcd',
									editable	: false,
									lookupValue	: resource.lookup('rqod_rcvd_dvcd'),
									readOnly	: true,
									fieldCls	: 'readonlyfield',
									cls			: 'amnt_field2'
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top + Const.borderLine.bottom  +  Const.borderLine.right  ,
							width	: 100 ,
							items	: [
								{	text		: '자료구분', xtype : 'label', style : 'text-align:center;'
								},{	xtype		: 'lookupfield',
									name		: 'vatx_dvcd',
									editable	: false,
									lookupValue	: resource.lookup('vatx_dvcd'),
									readOnly	: true,
									fieldCls	: 'readonlyfield',
									cls			: 'amnt_field2',
									listeners	:{
										change:function(){
											var val = this.getValue();
											var store = me.down('grid').getStore();
											var	sply_amnt_field = me.down('[name=sply_amnt_form]'),
												vatx_amnt_field = me.down('[name=vatx_amnt_form]'),
												ttsm_amnt_field = me.down('[name=ttsm_amnt_form]')
											;
											if(val == '1'){
												store.each(function(record){
													record.set('vatx_amnt',Math.floor(record.get('sply_amnt')*0.1,0))

													vatx_amnt_field.setValue(Math.floor(sply_amnt_field.getValue()*0.1,0));
													ttsm_amnt_field.setValue(Math.floor(sply_amnt_field.getValue()*1.1,0));
												})
											}else{
												store.each(function(record){
													record.set('vatx_amnt',0)
												})
												vatx_amnt_field.setValue(0);
												ttsm_amnt_field.setValue(sply_amnt_field.getValue());
											}
										}
									}
								}
							]
						}
					]
				}
			]
		};
		return form;
	},
	createGrid: function(){
		var me = this,
		grid = {
			xtype		: 'grid-panel',
			header		: false,
			split		: true,
			region		: 'center',
			itemId	: 'grid2',
			name	: 'grid2',
			height		: 300 ,
			viewConfig	: {
				loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask }),
				markDirty: false,

			},
//			selModel: {	selType: 'checkboxmodel', mode : 'MULTI' },
			store	: Ext.create(me.store),
			plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1
					,listeners:{
						beforeedit:function(edit,e){
							var val = me.down('[name=txbl_mdfy_dvcd]').getValue();
							var bool = false;
							if(val =='1' ||val =='2'|| val == '3' || val == '5'){
								bool = true;
							}
							return bool;
						}
					}
				}
			],

			columns: [
			{	xtype: 'rownumberer'		, width:35 , hidden : true, align: 'center'
			},{	dataIndex:	'chk'			, text: Language.get('chk'			, '선택'		), width :  35 , align : 'center',xtype:'checkcolumn',/*, filter : 'disabled',*/
				listeners:{
					checkchange:function(element, rowindex, bool, rec) {
						var owner = Ext.ComponentQuery.query('module-salework-modify-popup')[0];
							grid2 =owner.down('[itemId=grid2]'),
							record = grid2.store.getAt(rowindex),
							rowIndexNum = rowindex
							qntt = record.get('qntt')
							pric = record.get('sply_pric')
							sply = qntt * pric
							vatx = sply * 0.1
						;
							if(bool){
								record.set('sply_amnt',sply);
								record.set('vatx_amnt',vatx);
							}else{
								record.set('sply_amnt','0');
								record.set('vatx_amnt','0');
							}
					},
				}
				},{	dataIndex: 'item_name'		, width: 150, align : 'left'	, text: Language.get('item_name'		, '품목'		)
				},{	dataIndex: 'item_spec'		, width: 150, align : 'left'	, text: Language.get('item_spec'		, '규격'		)
				},{	dataIndex: 'item_idcd'		, width: 150, align : 'left'	, text: Language.get('item_idcd'		, '규격'		)
				},{	dataIndex: 'qntt'			, width:  80, align : 'right'	, text: Language.get('qntt'				, '수량'		),xtype:'numericcolumn', summaryType: 'sum', format:  '#,##0.###',
					tdCls : 'editingcolumn',
					editor	: {
						xtype		:'numericfield',
						selectOnFocus: true,
						allowBlank	: false,
						enableKeyEvents : true,
						listeners:{
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = grid.getStore(),
										selection = grid.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									grid.plugins[0].startEdit(row, grid.columns[4]);
								}
							}
						}
					}
				},{	dataIndex: 'sply_pric'		, width:  80, align : 'right'	, text: Language.get('sply_pric'		, '단가'		),xtype:'numericcolumn',format:  '#,##0.##',
					tdCls : 'editingcolumn',
					editor	: {
						xtype		:'numericfield',
						selectOnFocus: true,
						allowBlank	: false,
						enableKeyEvents : true,
						listeners:{
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = grid.getStore(),
										selection = grid.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									grid.plugins[0].startEdit(row, grid.columns[3]);
								}
							}
						}
					}
				},{	dataIndex: 'sply_amnt'		, width: 120, align : 'right'	, text: Language.get('sply_amnt'		, '공급가액'	),xtype:'numericcolumn', summaryType: 'sum',format:  '#,##0.##',
				},{	dataIndex: 'vatx_amnt'		, width: 100, align : 'right'	, text: Language.get('vatx_amnt'		, '세액'		),xtype:'numericcolumn'
				},{	dataIndex: 'remk_text'		, flex : 100, align : 'left'	, text: Language.get('remk_text'		, '비고'		)
				}
			],
			cellEditAfter  : function (editor, context) {
				var me = this,
					owner = Ext.ComponentQuery.query('module-salework-modify-popup')[0],
					grid2 =owner.down('[itemId=grid2]'),
					models = grid2.getStore().getRange(),
					rowIndex	= context.rowIdx!=undefined?context.rowIdx:rowIndexNum,
					qntt	,
					pric	,
					amnt	,
					vatx	,
					ttsm	,
					form	= me.up('form'),
					popup	= form.ownerCt,
					vatx_dvcd = popup.down('[name=vatx_dvcd]').getValue(),
					sply_amnt_field = form.down('[name=sply_amnt_form]'),
					vatx_amnt_field = form.down('[name=vatx_amnt_form]'),
					ttsm_amnt_field = form.down('[name=ttsm_amnt_form]'),
					sply_total = 0,
					vatx_total = 0,
					ttsm_total = 0

				;
				if (vatx_dvcd == '2' && vatx_dvcd == '3'){
					var	sply_amnt_sum = 0,
						vatx_amnt_sum = 0
					;
					context.record.set('sply_amnt',Math.floor((qntt*sply_pric),0));
					context.record.set('vatx_amnt',0);
					sply_amnt_field.setValue(sply_amnt_field.getValue()+sum);
					ttsm_amnt_field.setValue(ttsm_amnt_field.getValue()+sum);
				}
					qntt	= grid2.getStore().getAt(rowIndex).get('qntt');			//수량
					pric	= grid2.getStore().getAt(rowIndex).get('sply_pric');	//단가
					amnt	= Math.floor(qntt*pric);								//공급가
					vatx	= Math.floor((qntt*pric)*0.1);							//부가세
					ttsm	= amnt+vatx;											//합계
					models	= grid2.getStore().getRange();
					models[rowIndex].set('sply_amnt',amnt);
					models[rowIndex].set('vatx_amnt',vatx);
					models[rowIndex].set('ttsm_amnt',ttsm);

				grid2.getStore().each(function(records){
					sply_total += (records.get('sply_amnt'));
					vatx_total += (records.get('vatx_amnt'));
					ttsm_total += (records.get('ttsm_amnt'));
					sply_amnt_field.setValue(sply_total);
					vatx_amnt_field.setValue(vatx_total);
					ttsm_amnt_field.setValue(ttsm_total);
				});
			},
			listeners: {
				render: function(){
					var me = this
					;
					var popup = me.up('form').ownerCt,
						form  = popup.down('[itemId=invc]')
					;
					form.getForm().loadRecord(popup.params.select);
					me.getStore().load({
						params : {param:JSON.stringify({invc_numb : popup.params.invc_numb})}
					});
				},
				validateedit : function (editor, context, eOpts ) {
					var me = this;
					var field = context.field;
					var value = context.value;
					return true;
				},
				edit : function(editor, context) {
					var me = this;
					me.cellEditAfter(editor, context);
				},
//				validateedit : function (editor, context, eOpts ,a,b,c,d , rowindex) {
//					var me        = this;
//						field     = context.field,
//						value     = context.value,
//						store     = me.getStore(),
//						selection = me.getSelectionModel().getSelection()[0],
//						row       = store.indexOf(selection),
//						form      = me.up('form'),
//						popup     = form.ownerCt,
//						vatx_dvcd = popup.down('[name=vatx_dvcd]').getValue(),
//						sply_amnt_field = form.down('[name=sply_amnt_form]'),
//						vatx_amnt_field = form.down('[name=vatx_amnt_form]'),
//						ttsm_amnt_field = form.down('[name=ttsm_amnt_form]'),
//						owner = Ext.ComponentQuery.query('module-salework-modify-popup')[0];
//						grid2 =owner.down('[itemId=grid2]'),
//						record = grid2.store.getAt(rowindex),
//						rowIndexNum = rowindex,
////						qntt = record.get('qntt'),
////						pric = record.get('sply_pric'),
//						sply = qntt * pric,
//						vatx = sply * 0.1,
//						sum = (qntt*sply_pric)
////						sply_pric = context.record.get('sply_pric'),
////						qntt = context.record.get('qntt'),
//					;
////					if(vatx_dvcd == '1'){
//////						record.set('sply_amnt',sply);
//////						record.set('vatx_amnt',vatx);
////						sply_amnt_field.setValue(sply_amnt_field.getValue()+(sum));
////						vatx_amnt_field.setValue(vatx_amnt_field.getValue()+Math.floor(sum*0.1,0));
////						ttsm_amnt_field.setValue(ttsm_amnt_field.getValue()+(sum+Math.floor(sum*0.1,0)));
////					}
////					else if (vatx_dvcd == '2' && vatx_dvcd == '3'){
////						var	sply_amnt_sum = 0,
////							vatx_amnt_sum = 0
////						;
////						context.record.set('sply_amnt',Math.floor((qntt*sply_pric),0));
////						context.record.set('vatx_amnt',0);
////						sply_amnt_field.setValue(sply_amnt_field.getValue()+sum);
////						ttsm_amnt_field.setValue(ttsm_amnt_field.getValue()+sum);
////					}
////
////					sply_amnt_field.setValue(sply_amnt_sum);
////					vatx_amnt_field.setValue(vatx_amnt_sum);
////					ttsm_amnt_field.setValue(sply_amnt_sum+vatx_amnt_sum);
//				}
			},
			paging	: {
				xtype	: 'grid-paging',
				items	: [
					{	xtype : 'button',text:'전체금액변경',
						handler:function(){
							var	grid = me.down('grid'),
								form = me.down('form'),
								values = form.getValues()
							;
							if(values.txbl_mdfy_dvcd){
								var	init       = 1,
									sply_total = 0,
									vatx_total = 0,
									ttsm_total = 0
								;
								if(values.txbl_mdfy_dvcd=='4' ||values.txbl_mdfy_dvcd=='6'){
									init = -1;
								}
								var mask = new Ext.LoadMask(grid, {msg: '변경중입니다.' });


								grid.getStore().each(function(records){
									mask.show();

									if(records.get('sply_amnt') == 0 ){
										records.set('qntt',(records.get('qntt2')*init));
										records.set('sply_amnt',(records.get('sply_amnt2')*init));
										records.set('vatx_amnt',(records.get('vatx_amnt2')*init));
										records.set('ttsm_amnt',(records.get('ttsm_amnt2')*init));
										sply_total += (records.get('sply_amnt2')*init);
										vatx_total += (records.get('vatx_amnt2')*init);
										ttsm_total += (records.get('ttsm_amnt2')*init);
										form.down('[name=sply_amnt_form]').setValue(sply_total);
										form.down('[name=vatx_amnt_form]').setValue(vatx_total);
										form.down('[name=ttsm_amnt_form]').setValue(ttsm_total);
									}else {
										records.set('qntt',0);
										records.set('sply_amnt',0);
										records.set('vatx_amnt',0);
										records.set('ttsm_amnt',0);
									}
								});
								form.down('[name=sply_amnt_form]').setValue(sply_total);
								form.down('[name=vatx_amnt_form]').setValue(vatx_total);
								form.down('[name=ttsm_amnt_form]').setValue(ttsm_total);

								mask.hide();
							}
						}
					},
					{	xtype : 'button',text:'품목추가',
						handler	: function (grid, rowIndex, colIndex, item, e, record) {
							var	grid = me.down('grid'),
							form = me.down('form'),
							values = form.getValues(),
							store = grid.getStore(),
							selection = grid.getSelectionModel().getSelection(),
							row = store.indexOf(selection[0])
						;

							resource.loadPopup({
							select	: 'MULTI',
							widget	: 'module-salework-item-popup',
							params:{
									cstm_idcd: values.cstm_idcd,
									invc_numb: values.invc_numb,
									acpt_dvcd: values.acpt_dvcd
								},
								result	: function(records) {
									store.each(function(record){
										line_seqn = record.get('line_seqn');
									});

									Ext.each(records, function(record, index) {
										var rec = Ext.create( store.model.modelName , {
											item_name	: record.data.item_name,
											item_idcd	: record.data.item_idcd,
											item_spec	: record.data.item_spec,
											qntt		: record.data.qntt,
											sply_pric	: record.data.sply_pric,
											sply_amnt	: record.data.sply_amnt,
											vatx_amnt	: record.data.vatx_amnt,
											invc_numb	: record.data.invc_numb,
										});
										store.add(rec);
										record.commit();
									});
								}
							})
						},
						scope : me

					},{	xtype : 'button',text:'삭제',
						handler	: function (grid, rowIndex, colIndex, item, e, record) {
							var	grid = me.down('grid'),
							form = me.down('form'),
							values = form.getValues(),
							store = grid.getStore(),
							selection = grid.getSelectionModel().getSelection(),
							row = store.indexOf(selection[0])
							;
							console.log(grid.getStore());

							var records = grid.getSelectionModel().getSelection();
							if (!records || records.length<1) {
								Ext.Msg.alert("알림", "삭제 할 품목을 선택해주십시오.");
								return;
							}
							Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
								fn : function (button) {
									if (button==='yes') {
										for (var i = 0; i < records.length; i++) {
											store.remove(records[i]);
										}
									}
									Ext.ComponentQuery.query('module-salework-modify-popup')[0].down('[name=change]').setValue('Y');
								}
							});
						},
					},
					'->' ,
					{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
					{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
				]
			},
		};
		return grid;
	},

//	listeners: {
//		validateedit : function (editor, context, eOpts ) {
//			var me = this;
//			var field = context.field;
//			var value = context.value;
//			return true;
//		},
//		edit : function(editor, context) {
//			var me = this;
//			me.cellEditAfter(editor, context);
//		}
//	},



	/**
	 * 버튼 이벤트
	 */
	finishAction: function(){
		var	me    = this,
			form  = me.down('form'),
			grid  = form.down('grid'),
			store = grid.getStore(),
			rec   = form.getValues(),
			record = me.down('form').getValues(),
			master = Ext.ComponentQuery.query('module-sjflv-salework-lister-master')[0];

		;
		var code = "";
		var code2 = "";

		if(record.tele_numb==""){
			Ext.Msg.alert('알림','연락처를 작성해주십시요.');
			return;
		}
		if(record.bzpl_mail_addr==""){
			Ext.Msg.alert("알림", "이메일을 작성해주십시오.");
			return;
		}
		if(record.bzpl_tele_numb==""){
			Ext.Msg.alert("알림", "이메일을 작성해주십시오.");
			return;
		}

		if(record.txbl_mdfy_dvcd==""){
			Ext.Msg.alert("알림", "수정사유를 선택해주십시오.");
			return;
		}

		if(form.isValid()){
			Ext.Ajax.request({
				url			: _global.location.http() + '/listener/seq/maxid.do',
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'txbl_mast'
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					code = result.records[0].seq;
				}
			});
			if(rec.txbl_mdfy_dvcd=='1' || rec.txbl_mdfy_dvcd=='5' ){
				Ext.Ajax.request({
					url			: _global.location.http() + '/listener/seq/maxid.do',
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id	: _global.stor_id,
							table_nm: 'txbl_mast'
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						code2 = result.records[0].seq;
					}
				});
				form.down('[name=new_invc_numb2]').setValue(code2);
			}

			if(code){
				form.down('[name=new_invc_numb]').setValue(code);
			}
			var value = form.getValues();
			store.sync({
				success : function(operation){
					var response = Ext.decode(operation.operations[0].response.responseText);
					var msg = response.records[0].result;
					if(msg != "" && msg != "1"){
						Ext.Msg.alert('알림',msg);
						return;
					}else{
						master.getStore().reload();
						me.close();
					}
				},			// 저장 성공시
				failure : function(operation){ results.feedback({success : false }); },							// 저장 실패시 호출
				callback: function(operation){
//					results.callback({});
					store.clearData();
					store.loadData([],false);
					store.reload();
				}											// 성공 실패 관계 없이 호출된다.
			},{master : value});
		}
	},



});