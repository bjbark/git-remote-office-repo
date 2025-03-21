 Ext.define('module.custom.iypkg.item.productmast.view.ProductMastEditor', {extend  : 'Axt.form.Editor',
	alias		: 'widget.module-productmast-editor',
	height		: 375,
	layout		: { type: 'border' },
	title		: '제품코드 정보',
	collapsible	: true,
	collapsed	: false ,
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
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style',hidden:true,itemId:'updateProd'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style',hidden:true,itemId:'cancelProd'},
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
				width		: 450,
				fieldDefaults: { width : 370, labelWidth : 70, labelSeparator : '' },
				items		: [
					{	fieldLabel	: Language.get('cstm','거래처'),
						xtype		: 'popupfield',
						name		: 'cstm_name',
						pair		: 'cstm_idcd',
						editable	: true,
						clearable	: true,
						enableKeyEvents	: true,
						allowBlank	: true,
						readOnly	: true,
						required	: true,
						emptyText	: Const.invalid.emptyValue,
						fieldCls	: 'requiredindex',
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-cstm-popup',
							params	:{
								 sale_cstm_yorn:1
							},
							result : function(records, nameField, pairField) {
								var prod_code ,code = '';

								Ext.Ajax.request({
									url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/item/productmast/get/ProdCode.do',
									method		: "POST",
									async		: false,
									params		: {
									 	token	: _global.token_id,
										param	: Ext.encode({
											cstm_idcd	: records[0].get('cstm_idcd'),
											cstm_code	: records[0].get('cstm_code')
										})
									},
									success : function(response, request) {
										var object = response,
											result = Ext.decode(object.responseText)
										;
										if (result.success) {
											if(result.records[0]){
												var	etcc_cstm_yorn= result.records[0].etcc_cstm_yorn,
													otod_cstm_yorn= result.records[0].otod_cstm_yorn,
													puch_cstm_yorn= result.records[0].puch_cstm_yorn,
													sale_cstm_yorn= result.records[0].sale_cstm_yorn
												;
												prod_code = result.records[0].prod_code;

												if(_global.hq_id.toUpperCase()=='N1000LIEBE'){
													if(otod_cstm_yorn == 1 || puch_cstm_yorn == 1){
														code = '10';
													}else if(sale_cstm_yorn == 1){
														code = '30';
													}else if(etcc_cstm_yorn == 1){
														code = '30';
													}
												}
											}
										} else {
											Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
										}
									},
									failure : function(response, request) {
										resource.httpError(response);
									},
									callback : function() {
									}
								});
								me.down('[name=prod_code]').setValue(prod_code);

								nameField.setValue(records[0].get('cstm_name'));
								pairField.setValue(records[0].get('cstm_idcd'));
								if(code != ''){
									me.down('[name=pcod_numb]').setValue(code+prod_code.substr(0,3)+'-'+prod_code.substr(3,4));
								}

								setTimeout(function(){
									me.down('[name=prod_code]').focus(true , 10)
								}, 50)
							}
						},
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '4 0 5 0' ,
						items	: [
							{	fieldLabel	: Language.get( 'prod_code', '제품코드' ),
								name		: 'prod_code',
								xtype		: 'textfield',
								maxLength	: 50,
								width		: 295,
								allowBlank	: false,
								required	: true,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								enableKeyEvents : true,
								listeners	:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											me.down('[name=prod_name]').focus(true , 10)
										}
									},
									change	: function(){
										var	val = this.getValue(),
											pono = ''
										;
										pono = me.down('[name=pcod_numb]').getValue();
										if(val.length==7&&pono!=''){
											me.down('[name=pcod_numb]').setValue(pono.substr(0,2)+val.substr(0,3)+'-'+val.substr(3,4));
										}
									}
								}
							},{	name		: 'line_stat'  ,
								xtype		: 'lookupfield',
								lookupValue	: resource.lookup('line_stat'),
								width		: 70,
								margin		: '0 0 0 5',
							},{	name		: 'prod_idcd', xtype	: 'textfield', hidden	: true
							}
						]
					},{	fieldLabel	:  Language.get( 'prod_name' , '품명'),
						name		: 'prod_name',
						xtype		: 'textfield',
						allowBlank	: false,
						required	: true,
						emptyText	: Const.invalid.emptyValue,
						fieldCls	: 'requiredindex',
						enableKeyEvents : true,
						listeners	:{
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									me.down('[name=scre_dvcd]').focus(true , 10)
								}
								this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
									scope: this,
									key: Ext.EventObject.TAB,
									shift:true,
									fn: function () {
										me.down('[name=prod_code]').focus(true , 10)
									}
								});
							}
						}
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '0 0 5 0' ,
						items	: [
							{	fieldLabel	:  Language.get( 'scre_dvcd' , '스코어구분'),
								name		: 'scre_dvcd',
								xtype		: 'lookupfield',
								editable	: false,
								lookupValue	: resource.lookup('scre_dvcd'),
								labelWidth	: 70,
								width		: 140,
								enableKeyEvents : true,
								listeners	: {
									change	: function(){
										var val = this.getValue()
										var fabclister = Ext.ComponentQuery.query('module-productmast-editor-fabclister')[0]
										var bxty_name = me.down('[name=bxty_name]');
										bxty_name.popup.params = {scre_dvcd:this.getValue()};
										if (val == "2") {
											me.down('[name=scre_spec_frml]').hide();
											me.down('[name=scre_spec]').hide();
											me.down('[name=sgam_relx]').hide();
											fabclister.down('[dataIndex=item_fxqt]').show();
										}else{
											me.down('[name=scre_spec_frml]').show();
											me.down('[name=scre_spec]').show();
											me.down('[name=sgam_relx]').show();
											fabclister.down('[dataIndex=item_fxqt]').hide();
										}
									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											me.down('[name=bxty_name]').focus(true , 10)
										}
										this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
											scope: this,
											key: Ext.EventObject.TAB,
											shift:true,
											fn: function () {
												me.down('[name=prod_name]').focus(true , 10)
											}
										});
									}
								}
							},{	fieldLabel	: Language.get('bxty_name','상자형식'),
								xtype		: 'popupfield',
								name		: 'bxty_name',
								pair		: 'bxty_idcd',
								labelWidth	: 50,
								width		: 160,
								editable	: true,
								clearable	: true,
								enableKeyEvents	: true,
								allowBlank	: false,
								required	: true,
								emptyText	: Const.invalid.emptyValue,
								fieldCls	: 'requiredindex',
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-bxty-popup',
									params	:{

									},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('bxty_name'));
										pairField.setValue(records[0].get('bxty_idcd'));
										me.down('[name=sgam_relx]').setValue(records[0].get('sgam_relx'));
										setTimeout(function(){
											me.down('[name=sets_qntt]').focus(true , 10)
										}, 50)
									}
								}
							},{	fieldLabel	:  Language.get( 'sets_qntt' , '조/SET'),
								name		: 'sets_qntt',
								xtype		: 'numericfield',
								labelWidth	: 40,
								width		: 70,
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											me.down('[name=prod_leng]').focus(true , 10)
										}
										this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
											scope: this,
											key: Ext.EventObject.TAB,
											shift:true,
											fn: function () {
												me.down('[name=bxty_name]').focus(true , 10)
											}
										});
									}
								}
							}
						]
					},{	xtype:'hiddenfield', name:'bxty_idcd'
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '0 0 5 0' ,
						items	: [
							{	fieldLabel	:  Language.get( 'prod_spec' , '규격'),
								name		: 'prod_leng',
								xtype		: 'numericfield',
								width		: 130,
								labelWidth	: 70,
								margin		: '0 7 0 0',
								allowBlank	: false,
								required	: true,
								fieldCls	: 'requiredindex',
								enableKeyEvents : true,
								listeners	:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											me.down('[name=prod_widh]').focus(true , 10)
										}
										this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
											scope: this,
											key: Ext.EventObject.TAB,
											shift:true,
											fn: function () {
												me.down('[name=prod_name]').focus(true , 10)
											}
										});
									}
								}
							},{	name		: 'prod_widh',
								xtype		: 'numericfield',
								width		: 55,
								margin		: '1 7 0 0',
								allowBlank	: false,
								required	: true,
								fieldCls	: 'requiredindex',
								enableKeyEvents : true,
								listeners	:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											me.down('[name=prod_hght]').focus(true , 10)
										}
										this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
											scope: this,
											key: Ext.EventObject.TAB,
											shift:true,
											fn: function () {
												me.down('[name=prod_leng]').focus(true , 10)
											}
										});
									}
								}
							},{	name		: 'prod_hght',
								xtype		: 'numericfield',
								width		: 55,
								margin		: '1 7 0 0',
								allowBlank	: false,
								required	: true,
								fieldCls	: 'requiredindex',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											me.down('[name=sgam_relx]').focus(true , 10);
										}
										this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
											scope: this,
											key: Ext.EventObject.TAB,
											shift:true,
											fn: function () {
												me.down('[name=prod_widh]').focus(true , 10)
											}
										});
									}
								}
							},{	fieldLabel	:  Language.get( 'sgam_relx' , '외날개여유'),
								name		: 'sgam_relx',
								xtype		: 'numericfield',
								width		: 110,
								allowBlank	: false,
								required	: true,
								fieldCls	: 'requiredindex',
								enableKeyEvents : true,
								margin		: '1 7 0 0',
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											var	fabclister = Ext.ComponentQuery.query('module-productmast-editor-fabclister')[0]
												fabcStore   = fabclister.getStore(),
												record		= fabclister.getSelectionModel().getSelection()[0],
												scre_dvcd = me.down('[name=scre_dvcd]').getValue(),
												prod_leng = me.down('[name=prod_leng]').getValue(),
												prod_widh = me.down('[name=prod_widh]').getValue(),
												prod_hght = me.down('[name=prod_hght]').getValue(),
												msg       = '',
												tpanel		= this.up('form').up('form').down('#editortab')
											;
											if(prod_leng==''&&prod_widh==''&&prod_hght==''){
												msg = '규격을 입력해주세요.';
											}else if(!record){
												msg = '원단을 선택해주세요.';
												tpanel.setActiveTab(2);
											}
											if(msg !=''){
												Ext.Msg.alert('알림',msg);
												return;
											}
											if(scre_dvcd == '1' ){
												resource.loadPopup({
													select : 'SINGLE',
													widget : 'module-iypkg-productmast-calc-popup',
													params : {
														stor_id   : _global.stor_id ,
														bxty_idcd : me.down('[name=bxty_idcd]').getValue(),
														fabc_idcd : record.get('fabc_idcd'),
														prod_leng : me.down('[name=prod_leng]').getValue(),
														prod_widh : me.down('[name=prod_widh]').getValue(),
														prod_hght : me.down('[name=prod_hght]').getValue(),
														sgam_relx : me.down('[name=sgam_relx]').getValue()
													},
													apiurl : {
													},
													result : function(records) {
														var	mxm2 = ((records.get('length')*record.get('item_leng')*eval(records.get('divs')))*0.000001),
															pqty = (records.get('length')*record.get('item_leng')* eval(records.get('divs'))*0.000001)*record.get('mxm2_pric2')
															mxm2_pric = record.get('mxm2_pric2')
														;
														var	mxm2_qntt = mxm2.toFixed(3),
															pqty_pric = pqty.toFixed(3)


															record.set('item_widh',records.get('length'));
															record.set('item_fxqt',records.get('divs'));
															record.set('mxm2_qntt2',mxm2_qntt);
															record.set('pqty_pric2',pqty_pric);

															me.down('[name=scre_spec_frml]').setValue(records.get('result'));
															me.down('[name=scre_spec]').setValue(eval(records.get('result')));

															var	totl_pqty_mxm2 = 0,
																totl_mxm2_pric = 0,
																totl_pqty_pric = 0
															;
															fabcStore.each(function(rec){
																totl_pqty_mxm2 += Number(rec.get('mxm2_qntt2')?rec.get('mxm2_qntt2'):0);
																totl_mxm2_pric += Number(rec.get('mxm2_pric2')?rec.get('mxm2_pric2'):0);
																totl_pqty_pric += Number(rec.get('pqty_pric2')?rec.get('pqty_pric2'):0);
															});
															me.down('[name=pqty_mxm2]').setValue(totl_pqty_mxm2);
															me.down('[name=mxm2_pric]').setValue(totl_mxm2_pric);
															me.down('[name=pqty_pric]').setValue(totl_pqty_pric);
													}
												});
											}else{
												me.down('[name=cvic_name]').focus(true , 10);
											}
										}
										this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
											scope: this,
											key: Ext.EventObject.TAB,
											shift:true,
											fn: function () {
												me.down('[name=prod_hght]').focus(true , 10)
											}
										});
									}
								}
							}
						]
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '0 0 5 0' ,
						items	: [
							{	fieldLabel	: Language.get( 'scre_spec_frml', '스코어규격' ),
								name		: 'scre_spec_frml',
								xtype		: 'textfield',
								maxLength	: 50,
								width		: 280,
							},{	fieldLabel	: Language.get( '', '=' ),
								name		: 'scre_spec'  ,
								xtype		: 'numericfield',
								width		: 90,
								labelWidth	: 10,
							}
						]
					},{	fieldLabel	: Language.get('cvic_name','설비'),
						xtype		: 'popupfield',
						name		: 'cvic_name',
						pair		: 'cvic_idcd',
						editable	: true,
						clearable	: true,
//						allowBlank	: false,
//						required	: true,
						enableKeyEvents	: true,

//						emptyText	: Const.invalid.emptyValue,
//						fieldCls	: 'requiredindex',
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-cvic-popup',
							params	:{},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('cvic_name'));
								pairField.setValue(records[0].get('cvic_idcd'));
								setTimeout(function(){
									me.down('[name=pqty_mxm2]').focus(true , 10)
								}, 50)
							}
						}
					},{	xtype:'hiddenfield', name:'cvic_idcd'
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '0 0 5 0' ,
						items	: [
							{	fieldLabel	:  Language.get( 'pqty_mxm2' , 'm2/개'),
								name		: 'pqty_mxm2',
								xtype		: 'numericfield',
								width		: 185,
								labelWidth	: 70,
								enableKeyEvents : true,
								listeners:{
									blur:function(){
										var	pqty_pric = me.down('[name=pqty_pric]'),
											pqty_mxm2 = this.getValue(),
											mxm2_pric = me.down('[name=mxm2_pric]').getValue()
										;
										if(mxm2_pric != 0 && pqty_mxm2 != 0){
											pqty_pric.setValue(Math.round(mxm2_pric * pqty_mxm2));
										}
									},
									keydown : function(self, e) {
										var	pqty_pric = me.down('[name=pqty_pric]'),
											pqty_mxm2 = this.getValue(),
											mxm2_pric = me.down('[name=mxm2_pric]').getValue()
										;

										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											me.down('[name=mxm2_pric]').focus(true , 10);
											if(mxm2_pric != 0 && pqty_mxm2 != 0){
												pqty_pric.setValue(Math.round(mxm2_pric * pqty_mxm2));
											}
										}
										this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
											scope: this,
											key: Ext.EventObject.TAB,
											shift:true,
											fn: function () {
												me.down('[name=cvic_name]').focus(true , 10);
												if(pqty_pric != 0 && pqty_mxm2 != 0){
													pqty_pric.setValue(Math.round(pqty_pric * pqty_mxm2));
												}
											}
										});
									}
								}
							},{	fieldLabel	:  Language.get( 'mxm2_pric' , '단가/m2'),
								name		: 'mxm2_pric',
								xtype		: 'numericfield',
								width		: 185,
								labelWidth	: 70,
								enableKeyEvents : true,
								listeners:{
									blur:function(){
										var	pqty_pric = me.down('[name=pqty_pric]'),
											pqty_mxm2 = me.down('[name=pqty_mxm2]').getValue(),
											mxm2_pric = this.getValue()
										;
										if(mxm2_pric != 0 && pqty_mxm2 != 0){
											pqty_pric.setValue(Math.round(mxm2_pric * pqty_mxm2));
										}
									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											me.down('[name=pqty_pric]').focus(true , 10);

											var	pqty_pric = me.down('[name=pqty_pric]'),
												pqty_mxm2 = me.down('[name=pqty_mxm2]').getValue(),
												mxm2_pric = this.getValue()
											;
											if(mxm2_pric != 0 && pqty_mxm2 != 0){
												pqty_pric.setValue(Math.round(mxm2_pric * pqty_mxm2));
											}
										}
										this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
											scope: this,
											key: Ext.EventObject.TAB,
											shift:true,
											fn: function () {
												me.down('[name=pqty_mxm2]').focus(true , 10)
											}
										});
									}
								}
							}
						]
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '0 0 5 0' ,
						items	: [
							{	fieldLabel	:  Language.get( 'pqty_pric' , '단가/개'),
								name		: 'pqty_pric',
								xtype		: 'numericfield',
								width		: 185,
								labelWidth	: 70,
								enableKeyEvents : true,
								listeners:{
									blur:function(){
										var	pqty_mxm2 = me.down('[name=pqty_mxm2]').getValue(),
											pqty_pric = this.getValue(),
											mxm2_pric = me.down('[name=mxm2_pric]')
										;
										if(pqty_pric != 0 && pqty_mxm2 != 0){
											mxm2_pric.setValue(Math.round(pqty_pric / pqty_mxm2));
										}
									},
									keydown : function(self, e) {
										var	pqty_mxm2 = me.down('[name=pqty_mxm2]').getValue(),
											pqty_pric = this.getValue(),
											mxm2_pric = me.down('[name=mxm2_pric]')
										;

										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											me.down('[name=crny_dvcd]').focus(true , 10);
											if(pqty_pric != 0 && pqty_mxm2 != 0){
												mxm2_pric.setValue(Math.round(pqty_pric  / pqty_mxm2));
											}
										}
										this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
											scope: this,
											key: Ext.EventObject.TAB,
											shift:true,
											fn: function () {
												me.down('[name=mxm2_pric]').focus(true , 10);
												if(pqty_pric != 0 && pqty_mxm2 != 0){
													mxm2_pric.setValue(Math.round(pqty_pric / pqty_mxm2));
												}
											}
										});
									}
								}
							},{	fieldLabel	:  Language.get( 'crny_dvcd' , '통화'),
								name		: 'crny_dvcd',
								xtype		: 'lookupfield',
								width		: 185,
								labelWidth	: 70,
								editable	: false,
								lookupValue	: resource.lookup('crny_dvcd'),
								value		: '1000',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											me.down('[name=pcod_numb]').focus(true , 10)
										}
										this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
											scope: this,
											key: Ext.EventObject.TAB,
											shift:true,
											fn: function () {
												me.down('[name=mxm2_pric]').focus(true , 10)
											}
										});
									}
								}
							},
						]
					},{	fieldLabel	:  Language.get( 'pcod_numb' , 'PO No'),
						name		: 'pcod_numb',
						xtype		: 'textfield',
						enableKeyEvents : true,
						listeners:{
							keydown : function(self, e) {
//								if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
//									me.down('[name=cstm_name]').focus(true , 10)
//								}
								this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
									scope: this,
									key: Ext.EventObject.TAB,
									shift:true,
									fn: function () {
										me.down('[name=crny_dvcd]').focus(true , 10)
									}
								});
							}
						}
					},{	name : 'change'     , xtype : 'textfield', hidden : true
					},{	name : 'imge_chek1' , xtype : 'textfield', hidden : true
					},{	name : 'cstm_idcd'  , xtype : 'textfield', hidden : true,
						listeners:{
							change:function(){
								if(this.getValue()==''){
									me.down('[name=prod_code]').setValue('');
									me.down('[name=pcod_numb]').setValue('');
								}
							}
						}
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
				itemId : 'editortab',
				plain  : true,
				margin : 0 ,
				items  : [ me.createTab1(), me.createTab2(), me.createTab3(), me.createTab4() ]
			}
		;
		return tabs;
	},

	createTab1 : function() {
		var	me = this,
			wmld_widget
		;
		if(_global.hqof_idcd=="N1000IYPKG"){
			wmld_widget = 'lookup-asmt-popup';
		}else{
			wmld_widget = 'lookup-mold-popup';
		}
		var item ={
				title		: '기본정보',
				xtype		: 'form-panel',
				dock		: 'left',
				bodyStyle	: { padding: '5px' },
				width		: 330,
				fieldDefaults: { width : 315, labelWidth : 70, labelSeparator : '' },
				items		: [
					{	fieldLabel	: Language.get('wmld_numb','목형번호'),
						xtype		: 'popupfield',
						name		: 'wmld_numb',
						pair		: 'wmld_idcd',
						editable	: true,
						clearable	: true,
						enableKeyEvents	: true,
						popup		: {
							select	: 'SINGLE',
							widget	: wmld_widget,
							params	:{
								 asmt_dvcd:'02'
							},
							result : function(records, nameField, pairField) {
								if(_global.hqof_idcd=="N1000IYPKG"){
									nameField.setValue(records[0].get('asmt_name'));
									pairField.setValue(records[0].get('asmt_idcd'));
								}else{
									nameField.setValue(records[0].get('mold_name'));
									pairField.setValue(records[0].get('mold_idcd'));
									me.down('[name=wmld_size]').setValue(records[0].get('mold_spec'));
								}
							}
						}
					},{	name		: 'wmld_idcd', xtype: 'textfield' , hidden:true,
					},{	fieldLabel	:  Language.get( 'wmld_size' , '목형Size'),
						name		: 'wmld_size',
						xtype		: 'textfield',
					},{	fieldLabel	: Language.get('plmk_kind_name','조판번호'),
						xtype		: 'popupfield',
						name		: 'cpst_numb_name',
						pair		: 'cpst_numb_idcd',
						hidden		: (_global.stor_id.toUpperCase() != 'N1000LIEBE1000'?true:false),
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-cpst-popup',
							params	: { stor_grp : _global.stor_grp, line_stat : '0' , prnt_idcd : '9003'},
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].get('base_name'));
								pairField.setValue(records[0].get('base_code'));
							}
						}
					},{	name		: 'cpst_numb_idcd', xtype : 'textfield' , hidden : true
					}
					,{	fieldLabel	:  Language.get( 'cpst_numb' , '조판번호'),
						name		: 'cpst_numb',
						xtype		: 'textfield',
						hidden		: (_global.stor_id.toUpperCase() == 'N1000LIEBE1000'?true:false)
					}
					,{	fieldLabel	:  Language.get( 'inkk_colr_name' , '잉크색상'),
						name		: 'inkk_colr_name',
						xtype		: 'textfield',
					},{	fieldLabel	:  Language.get( 'user_memo' , '비고'),
						name		: 'user_memo',
						xtype		: 'textarea',
						height		: 135
					},{	fieldLabel	:  Language.get( 'sysm_memo' , '거래처품번'),
						name		: 'sysm_memo',
						xtype		: 'textfield',
						hidden		:  _global.hq_id.toUpperCase()!='N1000LIEBE',
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
		var  me = this;
		var item =
			{	title	: Language.get( '' , '작업공정'),
				xtype	: 'module-productmast-editor-wkctlister',
			}
		;
		return item;
	},
	createTab3 : function() {
		var  me = this;
		var item =
		{	title	: Language.get( '' , '원단투입'),
			xtype	: 'module-productmast-editor-fabclister',
		};
		return item;
	},

	createTab4 : function() {
		var  me = this;
		var item =
			{	title	: Language.get( '' , '인쇄사양'),
				xtype	: 'lookup-printspec-common',
				itemId	: 'printspec'
			}
		;
		return item;
	},

});

