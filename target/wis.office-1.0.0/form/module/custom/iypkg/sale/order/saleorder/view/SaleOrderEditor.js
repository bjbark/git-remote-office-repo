Ext.define('module.custom.iypkg.sale.order.saleorder.view.SaleOrderEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-saleorder-editor',

	height : 430,
	layout : {
		type: 'border'
	},

	title			: '주문내역',
	collapsible 	: true,
	collapsed		: false,
	defaultFocus	: 'invc_numb',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createFabc()];
		me.items = me.createItem();
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				itemId: 'tool',
				dock  : 'bottom' ,
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' , hidden:true , itemId:'updateSale'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' , hidden:true , itemId:'cancelSale'}, '-'
				]
			}
		;
		return item;
	},

	createFabc : function () {
		var me = this,
		item = {
				xtype	: 'tabpanel',
				dock	: 'bottom'	,
				layout	: 'hbox',
				margin	: 0	,
				plain	: true,
				items	: [ me.createTab3()]
		}
		return item;
	},
	createItem : function () {
		var me = this,
		item = {xtype	: 'panel',
				region	: 'center'	,
				layout	: 'border',
				margin	: 0	,
				plain	: true,
				items	: [ me.createTab1(),me.createwest()]
		}
		return item;
	},
	createwest : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center'	,
				margin	: 0	,
				plain	: true,
				items	: [ me.createTab4(),me.createTab2()]
			}
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				xtype		: 'form-panel',
				layout		: 'hbox',
				region		: 'west'	,
				border		: 0	,
				bodyStyle	: { padding: '5px', margin : '5 0 5 0'},
				items		: [
					{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0, margin : '0 0 0 0',
						items		: [
							{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	: Language.get('invc_numb','수주번호'),
										name		: 'invc_numb',
										xtype		: 'textfield',
										allowBlank	: false,
										fieldCls	: 'requiredindex',
										emptyText	: Const.invalid.emptyValue,
										readOnly	: true,
										width		: 290,
										enableKeyEvents : true,
										listeners	: {
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
													me.down('[name=invc_date]').focus(true , 10);
												}
											},
										}
									},{	name		: 'line_stat',
										margin		: '0 0 0 2',
										width		: 68,
										xtype		: 'lookupfield',
										lookupValue	: resource.lookup('line_stat'),
										value		: '0'
									},
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	: Language.get('invc_date','수주일자'),
										name		: 'invc_date',
										xtype		: 'datefield',
										allowBlank	: false,
										fieldCls	: 'requiredindex',
										emptyText	: Const.invalid.emptyValue,
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										value		: new Date(),
										width		: 180,
										enableKeyEvents : true,
										listeners	:{
											change	: function(){
												//변경시마다 납기일자 minValue 적용해야함
											},
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
													me.down('[name=acpt_dvcd]').focus(true , 10)
												}

												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
																scope: this,
																key: Ext.EventObject.TAB,
																shift:true,
																fn: function () {
																	me.down('[name=invc_numb]').focus(true , 10)
																}
															});
											}
										}
									},{	fieldLabel	: Language.get('acpt_dvcd','수주구분'),
										xtype		: 'lookupfield',
										name		: 'acpt_dvcd',
										lookupValue	: resource.lookup('acpt_dvcd'),
										allowBlank	: false,
										editable	: false,
										fieldCls	: 'requiredindex',
										width		: 180,
										enableKeyEvents : true,
										listeners	:{
											change	: function(){
												//변경시마다 납기일자 minValue 적용해야함
											},
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
													me.down('[name=cstm_name]').focus(true , 10)
												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=invc_date]').focus(true , 10)
													}
												});
											}
										}
									},{	fieldLabel	: Language.get('drtr_name','담당자'),
										xtype		: 'popupfield',
										editable	: false,
										enableKeyEvents : true,
										name		: 'drtr_name',
										pair		: 'drtr_idcd',
										labelWidth	: 120,
										width		: 400,
										clearable	: true,
										hidden		: true,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-user-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' },
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('user_name'));
												pairField.setValue(records[0].get('user_idcd'));
											}
										},
										trigger1Cls : 'drtrTrigger0001 ',
										listeners	:{
											keydown : function(self, e) {
												if (e.keyCode == e.TAB) {
													me.down('[name=assi_cstm_name]').focus(true , 10)
												}
												if(e.keyCode==e.ENTER){
													var trigger1 = Ext.dom.Query.select('.drtrTrigger0001')[0];
													Ext.get(trigger1).dom.click();
												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=deli_date]').focus(true , 10)
													}
												});
											}
										}
									},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	: Language.get('cstm_name','거래처'),
										name		: 'cstm_idcd',
										xtype		: 'textfield',
										width		: 150,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										listeners	:{
											change:function(){
												var tvalue = this.getValue();
												var val = tvalue.substr(0,3);
												me.down('[name=prod_name]').popup.params = { stor_grp : _global.stor_grp , line_stat : '0' ,sale_cstm_yorn:'1',cstm_like: val };
												me.down('[name=assi_cstm_name]').popup.params = { stor_grp : _global.stor_grp , line_stat : '0' ,cstm_idcd: tvalue };
											}
										}
									},{xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'cstm_name',
										width		: 210,
										pair		: 'cstm_idcd',
										clearable	: true,
										allowBlank	: false,
										fieldCls	: 'requiredindex',
										emptyText	: Const.invalid.emptyValue,
										margin		: '1 0 0 0',
										popup: {
											select : 'SINGLE',
											widget : 'lookup-cstm-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0', sale_cstm_yorn:'1' },
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('cstm_name'));
												pairField.setValue(records[0].get('cstm_idcd'));
												me.down('[name=vatx_dvcd]').setValue(records[0].get('vatx_dvcd'))
												me.down('[name=assi_cstm_name]').setValue(records[0].get('cstm_name'))

												setTimeout(function(){
													me.down('[name=prod_name]').focus(true , 10)
												}, 50)
											}
										},
										trigger1Cls : 'cstmTrigger0001',
										listeners	:{
											keydown : function(self, e) {
												if (e.keyCode == e.TAB) {
													me.down('[name=prod_name]').focus(true , 10)
												}
												if(e.keyCode==e.ENTER){
													var trigger1 = Ext.dom.Query.select('.cstmTrigger0001')[0];
													Ext.get(trigger1).dom.click();
												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=acpt_dvcd]').focus(true , 10)
													}
												});
											}
										}
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	: Language.get('prod_name','수주품목'),
										name		: 'prod_code'		,
										xtype 		: 'textfield',
										width		: 150,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										listeners	: {
											change:function(){
												var val = this.getValue();
												me.down('[name=stok_qntt]').popup.params.prod_code = this.getValue();
												if(val == ""){
													me.down('[name=prod_code]').setValue(null);
													me.down('[name=stok_qntt]').popup.params.prod_code = null;
													me.down('[name=item_leng]').setValue("");
													me.down('[name=item_widh]').setValue("");
													me.down('[name=item_hght]').setValue("");
													me.down('[name=pqty_mxm2]').setValue("");
													me.down('[name=mxm2_pric]').setValue("");
													me.down('[name=pqty_pric]').setValue("");
													me.down('[name=bxty_name]').setValue("");
													me.down('[name=bxty_idcd]').setValue("");
													me.down('[name=user_memo]').setValue("");
													me.down('[name=pcod_numb]').setValue("");
													me.down('[name=scre_spec_frml]').setValue("");
													me.down('[name=scre_spec]').setValue("");
													me.down('[name=scre_dvcd]').setValue("");
													me.down('[name=stok_qntt]').setValue("");
													me.down('[name=sets_qntt]').setValue("");
													var	fabcCopy	= Ext.getStore('module.custom.iypkg.sale.order.saleorder.store.SaleOrderFabcCopy'),
														wkctCopy	= Ext.getStore('module.custom.iypkg.sale.order.saleorder.store.SaleOrderWkctCopy'),
														fabc = Ext.getStore('module.custom.iypkg.sale.order.saleorder.store.SaleOrderFabc'),
														wkct = Ext.getStore('module.custom.iypkg.sale.order.saleorder.store.SaleOrderWkct')
//														stok = Ext.getStore('lookup.popup.store.SaleOrderStokLister')

													;
													fabcCopy.clearData();
													fabcCopy.loadData([],false);
													wkctCopy.clearData();
													wkctCopy.loadData([],false);
													fabc.clearData();
													fabc.loadData([],false);
													wkct.clearData();
													wkct.loadData([],false);
//													stok.clearData();
//													stok.loadData([],false);

												}
											}
										}
									},{	xtype		: 'popupfield',
										editable	: true,
										width		: 210,
										name		: 'prod_name',
										pair		: 'prod_code',
										enableKeyEvents: true ,
										clearable	: true,
										allowBlank	: false,
										fieldCls	: 'requiredindex',
										emptyText	: Const.invalid.emptyValue,
										margin		: '1 0 0 0',
										popup: {
											select : 'SINGLE',
											widget : 'lookup-prod-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' ,sale_cstm_yorn:'1'},
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('prod_name'));
												pairField.setValue(records[0].get('prod_code'));
												me.down('[name=prod_idcd]').setValue(records[0].get('prod_idcd'));
												me.down('[name=item_leng]').setValue(records[0].get('prod_leng'));
												me.down('[name=item_widh]').setValue(records[0].get('prod_widh'));
												me.down('[name=item_hght]').setValue(records[0].get('prod_hght'));
												me.down('[name=pqty_mxm2]').setValue(records[0].get('pqty_mxm2'));
												me.down('[name=mxm2_pric]').setValue(records[0].get('mxm2_pric'));
												me.down('[name=pqty_pric]').setValue(records[0].get('pqty_pric'));
												me.down('[name=bxty_name]').setValue(records[0].get('bxty_name'));
												me.down('[name=bxty_idcd]').setValue(records[0].get('bxty_idcd'));
												me.down('[name=user_memo]').setValue(records[0].get('user_memo'));
												me.down('[name=pcod_numb]').setValue(records[0].get('pcod_numb'));
												me.down('[name=scre_spec_frml]').setValue(records[0].get('scre_spec_frml'));
												me.down('[name=scre_spec]').setValue(records[0].get('scre_spec'));
												me.down('[name=scre_dvcd]').setValue(records[0].get('scre_dvcd'));
												me.down('[name=wmld_numb]').setValue(records[0].get('wmld_numb'));
												me.down('[name=wmld_size]').setValue(records[0].get('wmld_size'));
												me.down('[name=cpst_numb]').setValue(records[0].get('cpst_numb'));
												me.down('[name=inkk_colr_name]').setValue(records[0].get('inkk_colr_name'));
												me.down('[name=sets_qntt]').setValue(records[0].get('sets_qntt'));
												me.down('[name=sgam_relx]').setValue(records[0].get('sgam_relx'));

												var	invc_numb	= me.down('[name=invc_numb]').getValue(),
													prod_qntt	= me.down('[name=prod_qntt]').getValue(),
													stok_qntt	= me.down('[name=stok_qntt]').getValue(),
													fabcCopy	= Ext.getStore('module.custom.iypkg.sale.order.saleorder.store.SaleOrderFabcCopy'),
													wkctCopy	= Ext.getStore('module.custom.iypkg.sale.order.saleorder.store.SaleOrderWkctCopy'),
													prod_idcd	= records[0].get('prod_idcd'),
													fabc = Ext.getStore('module.custom.iypkg.sale.order.saleorder.store.SaleOrderFabc'),
													wkct = Ext.getStore('module.custom.iypkg.sale.order.saleorder.store.SaleOrderWkct'),
													fabclister = Ext.ComponentQuery.query('module-saleorder-fabc-lister')[0]

												;
												fabclister.getSelectionModel().select(0);
												if(prod_qntt==null){
													prod_qntt = 0;
												}
												fabc.load({
													params:{
														param : JSON.stringify({
															invc_numb : invc_numb?invc_numb:'undefined',
															prod_idcd : prod_idcd,
														})
													},
													callback: function () {
														fabclister.getSelectionModel().select(0);
														setTimeout(function(){
															fabcCopy.load({
																params:{
																	param : JSON.stringify({
																		invc_numb : invc_numb,
																		prod_idcd : prod_idcd,
																		prod_qntt : prod_qntt
																	})
																},
																callback: function () {
																	fabclister.getSelectionModel().select(0);
																	fabc.remove(fabc.data.items);
																	fabcCopy.each(function(r){
																		if(r.data.fabc_idcd == '' || r.data.fabc_idcd == null){

																		}else{
																			r.data.invc_numb = invc_numb;
																			fabc.add(r.copy());
																			fabclister.getSelectionModel().select(0);
																		}
																	})
																}
															});
														}, 100)
													}
												});
//												stok.load({
//													params:{
//														param : JSON.stringify({
//															prod_idcd : prod_idcd,
//														})
//													},
//													callback: function () {
//														setTimeout(function(){
//															fabcCopy.load({
//																params:{
//																	param : JSON.stringify({
//																		item_idcd : item_idcd,
//																		prod_name : item_idcd,
//																	})
//																},
//																callback: function () {
//																	fabc.remove(fabc.data.items);
//
//																	fabcCopy.each(function(r){
//
//																		r.data.item_idcd = item_idcd;
//																		fabc.add(r.copy());
//																	})
//																}
//															});
//														}, 100)
//													}
//												});
												wkct.load({
													params:{
														param : JSON.stringify({
															invc_numb : invc_numb?invc_numb:'undefined',
															prod_idcd : prod_idcd
														})
													},
													callback: function () {
														setTimeout(function(){
															wkctCopy.load({
																params:{
																	param : JSON.stringify({
																		invc_numb : invc_numb,
																		prod_idcd : prod_idcd
																	})
																},
																callback: function () {
																	wkct.remove(wkct.data.items);
																	wkctCopy.each(function(r){
																		r.data.invc_numb = invc_numb;
																		r.data.plan_qntt = me.down('[name=prod_qntt]').getValue();
																		wkct.add(r.copy());
																		fabclister.getSelectionModel().select(0);

																	});
																	me.down('[name=acpt_qntt]').focus(true , 10);

																	wkct.on('load', function (store, records, successful) {
																		console.log(wkct.data.length);

																		if (successful && records.length > 0) {
																			var allFalse = true;

																			// Check if all records have rep_chek as false
																			for (var i = 0; i < records.length; i++) {
																				if (records[i].get('rep_chek') === true) {
																					allFalse = false;
																					break;
																				}
																			}

																			// If all records have rep_chek as false, set the first record's rep_chek to true
																			if (allFalse) {
																				var firstRecord = store.getAt(0);
																				if (firstRecord) {
																					firstRecord.set('rep_chek', true);
																				}
																			}
																		}
																	});
																}
															});
														}, 100)
													}
												});
												fabclister.getSelectionModel().select(0);
											}
										},
										trigger1Cls : 'itemTrigger0001',
										listeners	:{
											keydown : function(self, e) {
												if (e.keyCode == e.TAB) {
													me.down('[name=item_leng]').focus(true , 10)
												}
												if(e.keyCode==e.ENTER){
													var trigger1 = Ext.dom.Query.select('.itemTrigger0001')[0];
													Ext.get(trigger1).dom.click();
												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=cstm_name]').focus(true , 10)
													}
												});
											}
										}
									}
								]
							}
							,{	name : 'prod_idcd', xtype	: 'textfield', hidden : true,
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	: Language.get('bxty_name','상자형식'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										width		: 360,
										name		: 'bxty_name',
										pair		: 'bxty_idcd',
										enableKeyEvents: true ,
										clearable	: true,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-bxty-popup',
											params : { },
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('bxty_name'));
												pairField.setValue(records[0].get('bxty_idcd'));
											}
										},
										trigger1Cls : 'bxtyTrigger0001',
										listeners	:{
											keydown : function(self, e) {
												if (e.keyCode == e.TAB) {
													me.down('[name=acpt_qntt]').focus(true , 10)
												}
												if(e.keyCode==e.ENTER){
													var trigger1 = Ext.dom.Query.select('.bxtyTrigger0001')[0];
													Ext.get(trigger1).dom.click();
												}
											}
										}
									},{	name	: 'bxty_idcd'		, xtype : 'textfield', hidden : true
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	: Language.get('item_spec ','규격'),	//장
										name		: 'item_leng',
										xtype		: 'numericfield',
										width		: 135,
										listeners	:{
											keydown : function(self, e) {
												if (e.keyCode == e.TAB || e.keyCode==e.ENTER) {
													me.down('[name=item_widh]').focus(true , 10)
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
									},{	name		: 'item_widh',						//폭
										margin		: '1 0 0 6',
										xtype		: 'numericfield',
										width		: 60,
										listeners	:{
											keydown : function(self, e) {
												if (e.keyCode == e.TAB || e.keyCode==e.ENTER) {
													me.down('[name=item_hght]').focus(true , 10)
												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=item_leng]').focus(true , 10)
													}
												});
											}
										}
									},{	name		: 'item_hght',						//고
										margin		: '1 0 0 6',
										xtype		: 'numericfield',
										width		: 60,
										listeners	:{
											keydown : function(self, e) {
												if (e.keyCode == e.TAB || e.keyCode==e.ENTER) {
													me.down('[name=sgam_relx]').focus(true , 10)
												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=item_widh]').focus(true , 10)
													}
												});
											}
										}
									},{	fieldLabel	:  Language.get( 'sgam_relx' , 'loss'),
										name		: 'sgam_relx',
										xtype		: 'numericfield',
										labelWidth	: 30,
										width		: 87,
										allowBlank	: false,
										required	: true,
										enableKeyEvents : true,
										margin		: '0 0 0 6',
										listeners:{
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
													var	fabclister = Ext.ComponentQuery.query('module-saleorder-fabc-lister')[0],
														fabcStore   = fabclister.getStore(),
														record		= fabclister.getSelectionModel().getSelection()[0],
														scre_dvcd = me.down('[name=scre_dvcd]').getValue(),
														prod_leng = me.down('[name=item_leng]').getValue(),
														prod_widh = me.down('[name=item_widh]').getValue(),
														prod_hght = me.down('[name=item_hght]').getValue(),
														prod_qntt = me.down('[name=prod_qntt]').getValue(),
														msg       = ''
													;

													if(prod_leng==''&&prod_widh==''&&prod_hght==''){
														msg = '규격을 입력해주세요.';
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
																prod_leng : prod_leng,
																prod_widh : prod_widh,
																prod_hght : prod_hght,
																sgam_relx : me.down('[name=sgam_relx]').getValue()
															},
															result : function(records) {
																var	mxm2 = ((records.get('length')*record.get('item_leng')* eval(records.get('divs')))*0.000001),
																	pqty = (records.get('length')*record.get('item_leng')* eval(records.get('divs'))*0.000001)*record.get('mxm2_pric')
																	mxm2_pric = record.get('mxm2_pric')
																;
																var	mxm2_qntt = mxm2.toFixed(3),
																	pqty_pric = pqty.toFixed(3)
																;
																me.down('[name=scre_spec_frml]').setValue(records.get('result'));
																me.down('[name=scre_spec]').setValue(eval(records.get('result')));

																var	totl_pqty_mxm2 = 0,
																	totl_mxm2_pric = 0,
																	totl_pqty_pric = 0
																;
																fabcStore.each(function(rec){
																	rec.set('length',records.get('length'));
																	rec.set('item_fxqt',records.get('divs'));
																	rec.set('need_qntt',Math.ceil(prod_qntt*eval(records.get('divs')),0));
																	rec.set('fdat_spec',records.get('result'));
																	totl_pqty_mxm2 += Number(rec.get('mxm2_qntt')?rec.get('mxm2_qntt'):0);
																	totl_mxm2_pric += Number(rec.get('mxm2_pric')?rec.get('mxm2_pric'):0);
																	totl_pqty_pric += Number(rec.get('pqty_pric')?rec.get('pqty_pric'):0);
																});

																me.down('[name=pqty_mxm2]').setValue(totl_pqty_mxm2);
																me.down('[name=mxm2_pric]').setValue(totl_mxm2_pric);
																me.down('[name=pqty_pric]').setValue(totl_pqty_pric);

																me.down('[name=acpt_qntt]').focus(true , 10);
															}
														});
													}else{
														me.down('[name=acpt_qntt]').focus(true , 10);
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
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	: Language.get('scre_spec_frml','스코어규격'),
										xtype		: 'textfield',
										enableKeyEvents : true,
										width		: 220,
										name		: 'scre_spec_frml',
										clearable	: true,
										enableKeyEvents: true ,
										listeners	:{
											keydown : function(self, e) {
												if (e.keyCode == e.TAB || e.keyCode == e.ENTER) {
													me.down('[name=mxm2_pric]').focus(true , 10)
												}
											}
										}
									},{	name	: 'scre_spec'		, xtype : 'textfield', hidden : true
									},{	fieldLabel	:  Language.get( 'scre_dvcd' , '스코어구분'),
										name		: 'scre_dvcd',
										xtype		: 'lookupfield',
										editable	: false,
										lookupValue	: resource.lookup('scre_dvcd'),
										width		: 140,
										readOnly	: true,
										fieldCls	: 'readOnlyfield',
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	: Language.get('pqty_mxm2','m2/개'),
										name		: 'pqty_mxm2',
										xtype		: 'numericfield',
										width		: 135,
										minValue	: 0,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
									},{	fieldLabel	: Language.get('mxm2_pric','단가/m2'),
										name		: 'mxm2_pric',
										xtype		: 'numericfield',
										labelWidth	: 45,
										width		: 110,
										margin		: '0 0 0 5',
										minValue	: 0,
										enableKeyEvents: true ,
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
									},{	fieldLabel	: Language.get('pqty_pric','단가/개'),
										name		: 'pqty_pric',
										xtype		: 'numericfield',
										labelWidth	: 40,
										width		: 105,
										margin		: '0 0 0 5',
										minValue	: 0,
										enableKeyEvents: true ,
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
													me.down('[name=acpt_qntt]').focus(true , 10);
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
									},
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	: Language.get('acpt_qntt','수주량'),
										name		: 'acpt_qntt',
										xtype		: 'numericfield',
										width		: 135,
//										minValue	: 1,
										enableKeyEvents : true,
										lookupValue:resource.lookup('line_dvcd'),
										listeners	: {
											blur:function(field){
												//공급가 = 개당단가 * 수주량
												var pric = me.down('[name=pqty_pric]').getValue(),
													qntt = field.getValue(),
													amnt = pric*qntt
													result = 0,
													vatx_dvcd = me.down('[name=vatx_dvcd]').getValue()
												;
												if(vatx_dvcd == '2' || vatx_dvcd == '3'){
													me.down('[name=sply_amnt]').setValue(amnt);
													me.down('[name=vatx_amnt]').setValue(0);
													me.down('[name=ttsm_amnt]').setValue(amnt);

												}else{
													me.down('[name=sply_amnt]').setValue(amnt);

													if(amnt>0){
														result = Math.trunc(amnt*((Number(_global.tax_rt)/100)));
													}
													me.down('[name=vatx_amnt]').setValue(Math.round(result));
													me.down('[name=ttsm_amnt]').setValue(Math.round(amnt+result));
												}
												me.down('[name=prod_qntt]').setValue(qntt);
											},
											specialkey : function(self, e) {
												if (e.getKey() == e.ENTER || e.getKey() == e.TAB) {
													me.down('[name=prod_qntt]').focus(true , 10)
													self.blur();

												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														el.blur();
														me.down('[name=prod_name]').focus(true , 10)
													}
												});
											}
										}
									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
										items	: [
											{	fieldLabel	: Language.get('stok_qntt','재고수량'),
												xtype		: 'popupfield',
												editable	: true,
												name		: 'stok_qntt',
												pair		: 'stok_qntt',
												labelWidth	: 50,
												width		: 115,
												clearable	: true,
												value		: '0',
												trigger1Cls : 'stok_qnttTrigger0001 ',
												enableKeyEvents : true,
												listeners	: {
													keydown : function(el,e){
														if(e.keyCode == e.ENTER){
															if(_global.hqof_idcd.toUpperCase() == "N1000DAE-A"){
																me.down('[name=prod_qntt]').focus(true , 10);
															}else{
																var trigger1 = Ext.dom.Query.select('.stok_qnttTrigger0001')[0];
																Ext.get(trigger1).dom.click();
															}
														}
													},
													change:function(){
														if(this.getValue()==''){
															this.setValue('0');
														}else{
															var acpt_qntt = me.down('[name=acpt_qntt]').getValue();
															me.down('[name=prod_qntt]').setValue(acpt_qntt - Number(this.getValue()));
														}
													}
												},
												popup: {
													select : 'MULTI',
													widget : 'lookup-saleorder-stok-popup',
													params : {
														stor_id		: _global.stor_id,
														stor_grp	: _global.stor_grp ,
														line_stat	: '0',
													},
													result : function(records, nameField, pairField) {
														nameField.setValue(records[0].get('stok_qntt'));
													}
												},
											},
										]
									},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
										name		: 'prod_qntt',
										xtype		: 'numericfield',
										labelWidth	: 45,
										width		: 110,
										minValue	: 0,
										enableKeyEvents : true,
										listeners	: {
											specialkey : function(self, e) {
												if (e.getKey() == e.ENTER || e.getKey() == e.TAB) {
													me.down('[name=deli_date]').focus(true , 10);
													if(e.getKey() == e.ENTER){
														self.blur();
													}
												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=stok_qntt]').focus(true , 10);
														el.blur();
													}
												});
											},
											blur:function(){
												var fabcCopy	= Ext.getStore('module.custom.iypkg.sale.order.saleorder.store.SaleOrderFabcCopy'),
													invc_numb	= me.down('[name=invc_numb]').getValue(),
													prod_idcd	= me.down('[name=prod_idcd]').getValue(),
													fabc = Ext.getStore('module.custom.iypkg.sale.order.saleorder.store.SaleOrderFabc'),
													wkctCopy	= Ext.getStore('module.custom.iypkg.sale.order.saleorder.store.SaleOrderWkctCopy'),
													wkct = Ext.getStore('module.custom.iypkg.sale.order.saleorder.store.SaleOrderWkct'),
													val = this.getValue(),
													acpt = me.down('[name=acpt_qntt]').getValue(),
													chkFabc = false,
													chkWkct = false
												;
												if(val != null){
													if(prod_idcd){
														if(fabc.getCount()>0){
															fabc.each(function(rec){
																var item_fxqt = rec.get('item_fxqt');
																rec.set('need_qntt',Math.ceil(val*eval(item_fxqt),0));
															})
														}else{
															fabc.load({
																params:{
																	param : JSON.stringify({
																		invc_numb : invc_numb?invc_numb:'undefined',
																		prod_idcd : prod_idcd,
																		prod_qntt : val
																	})
																},
																callback: function () {
																}
															});
															chkFabc = true;
														}
														if(wkct.getCount()>0){
															wkct.each(function(rec){
																rec.set('plan_qntt',val)
															})
														}else{
															wkct.load({
																params:{
																	param : JSON.stringify({
																		invc_numb : invc_numb?invc_numb:'undefined',
																		prod_idcd : prod_idcd
																	})
																},
																callback: function () {
																}
															});
															chkWkct = true;
														}
														setTimeout(function(){
															if(chkFabc){
																fabcCopy.load({
																	params:{
																		param : JSON.stringify({
																			invc_numb : invc_numb,
																			prod_idcd : prod_idcd,
																			prod_qntt : val
																		})
																	},
																	callback: function () {
																		fabc.remove(fabc.data.items);

																		fabcCopy.each(function(r){
																			if(r.data.fabc_idcd == '' || r.data.fabc_idcd == null){

																			}else{
																				r.data.invc_numb = invc_numb;
																				fabc.add(r.copy());
																			}
																		})
																	}
																});
															}
															if(chkWkct){
																wkctCopy.load({
																	params:{
																		param : JSON.stringify({
																			invc_numb : invc_numb,
																			prod_idcd : prod_idcd
																		})
																	},
																	callback: function () {
																		wkct.remove(wkct.data.items);

																		wkctCopy.each(function(r){
																			r.data.invc_numb = invc_numb;
																			r.data.plan_qntt = val;
																			wkct.add(r.copy());
																		})
																	}
																});
															}
														}, 100);
													}
													var acpt_qntt = me.down('[name=acpt_qntt]').getValue();
													me.down('[name=stok_qntt]').setValue(acpt_qntt - this.getValue());
												}
											}
										}
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	: Language.get('deli_date','납기일자'),
										allowBlank	: false,
										clearable	: true,
										fieldCls	: 'requiredindex',
										emptyText	: Const.invalid.emptyValue,
										name		: 'deli_date',
										xtype		: 'datefield',
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										width		: 180,
										enableKeyEvents : true,
										trigger1Cls : 'deliTrigger0001',
										value		: '',
										listeners	:{
											keydown : function(self, e) {
												if(e.keyCode==e.ENTER || e.keyCode == e.TAB){
													me.down('[name=stat_dvcd]').focus(true , 10)
//													me.down('[name=stat_dvcd]').focus(true , 10);
//													var val = this.getValue();
//													var a = "";
//													if(val){
//														if(val.match(/[^0-9]/)){
//															var date1 = new Date(val);
//															date2 = Ext.Date.format(date1,'Y-m-d'),
//															a = date2
//															;
//														}else{
//															a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
//														}
//													}
//													this.setValue(a);
												}
//												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
//													scope: this,
//													key: Ext.EventObject.TAB,
//													shift:true,
//													fn: function () {
//														me.down('[name=prod_qntt]').focus(true , 10)
//													}
//												});
											}
										}
									},{	fieldLabel	: Language.get('stat_dvcd','상태구분'),
										xtype		: 'lookupfield',
										name		: 'stat_dvcd',
										value: '1',
										lookupValue	: [['1','기존'],['2','신규'],['3','변경']],
										allowBlank	: false,
										editable	: false,
										fieldCls	: 'requiredindex',
										width		: 180,
										enableKeyEvents : true,
										listeners	:{
											change	: function(){
												//변경시마다 납기일자 minValue 적용해야함
											},
											keydown : function(self, e) {
												if (e.keyCode==e.ENTER||e.keyCode == e.TAB) {
													me.down('[name=pcod_numb]').focus(true , 10)
												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=deli_date]').focus(true , 10)
													}
												});
											}
										}
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	: Language.get('assi_cstm_idcd','납품처'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'assi_cstm_name',
										pair		: 'assi_cstm_idcd',
										width		: 360,
										clearable	: true,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-cstm-deli-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' , cstm_idcd : '000010' },
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('dlvy_drtr_name'));
												pairField.setValue(records[0].get('dlvy_cstm_idcd'));
											}
										},
										trigger1Cls : 'assiTrigger0001',
										listeners	:{
											keydown : function(self, e) {
												if (e.keyCode == e.TAB) {
													me.down('[name=pcod_numb]').focus(true , 10)
												}
												if(e.keyCode==e.ENTER){
													var trigger1 = Ext.dom.Query.select('.assiTrigger0001')[0];
													Ext.get(trigger1).dom.click();
												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=stat_dvcd]').focus(true , 10)
													}
												});
											}
										}
									},{	name : 'assi_cstm_idcd', xtype : 'textfield' , hidden : true
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	: Language.get('pcod_numb','고객주문번호'),
										name		: 'pcod_numb',
										xtype		: 'textfield',
										width		: 360,
										enableKeyEvents : true,
										listeners	: {
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
													me.down('[name=crny_dvcd]').focus(true , 10);
												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=assi_cstm_name]').focus(true , 10)
													}
												});
											}
										}
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	: Language.get('crny_dvcd','통화'),			//부가세구분코드
										name		: 'crny_dvcd',
										xtype		: 'lookupfield',
										lookupValue	: resource.lookup('crny_dvcd'),
										width		: 180,
										enableKeyEvents : true,
										listeners	: {
											keydown : function(self, e) {
												if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
													me.down('[name=vatx_dvcd]').focus(true , 10)
												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=pcod_numb]').focus(true , 10)
													}
												});
											}
										}
									},{	fieldLabel	: Language.get('vatx_dvcd','자료구분'),			//부가세구분코드
										name		: 'vatx_dvcd',
										xtype		: 'lookupfield',
										lookupValue	: resource.lookup('vatx_dvcd'),
										width		: 180,
										enableKeyEvents : true,
										listeners	: {
											keydown : function(self, e) {
												if ( e.keyCode == e.ENTER||e.keyCode == e.TAB) {
													me.down('[name=sply_amnt]').focus(true , 10)
												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=crny_dvcd]').focus(true , 10)
													}
												});
											},
											change:function(){
												var pric = me.down('[name=pqty_pric]').getValue(),
													qntt =  me.down('[name=acpt_qntt]').getValue(),
													amnt = pric*qntt,
													result = 0,
													vatx_dvcd = this.getValue()
												;
												if(vatx_dvcd == '2' || vatx_dvcd == '3'){
													me.down('[name=sply_amnt]').setValue(amnt);
													me.down('[name=vatx_amnt]').setValue(0);
													me.down('[name=ttsm_amnt]').setValue(amnt);

												}else{
													me.down('[name=sply_amnt]').setValue(amnt);

													if(amnt>0){
														result = Math.trunc(amnt*((Number(_global.tax_rt)/100)));
													}
													me.down('[name=vatx_amnt]').setValue(Math.round(result));
													me.down('[name=ttsm_amnt]').setValue(Math.round(amnt+result));
												}
											}
										}
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	: Language.get('sply_amnt','공급가'),
										name		: 'sply_amnt',
										xtype		: 'numericfield',
										width		: 180,
										minValue	: 0,
										enableKeyEvents : true,
										listeners	: {
											blur:function(field){
												var	val		= this.getValue(),
													result	= 0
												;
												if(val>0){
													result = Math.trunc(val*((Number(_global.tax_rt)/100)));
												}
												me.down('[name=vatx_amnt]').setValue(Math.round(result));
												me.down('[name=ttsm_amnt]').setValue(Math.round(val+result));
											},
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
													var	val		= this.getValue(),
														result	= 0
													;
													if(val>0){
														result = Math.trunc(val*((Number(_global.tax_rt)/100)));
													}
													me.down('[name=vatx_amnt]').setValue(Math.round(result));
													me.down('[name=ttsm_amnt]').setValue(Math.round(val+result));
													me.down('[name=ttsm_amnt]').focus(true , 10)

												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=vatx_dvcd]').focus(true , 10)
													}
												});
											}
										}
									},{	fieldLabel	: Language.get('vatx_amnt','부가세'),
										xtype		: 'numericfield',
										name		: 'vatx_amnt',
										width		: 180,
										minValue	: 0,
										enableKeyEvents : true,
										listeners	: {
											blur:function(field){
												var	val			= this.getValue(),
													sply_amnt	= me.down('[name=sply_amnt]').getValue()
												;
												me.down('[name=ttsm_amnt]').setValue(sply_amnt+val);
											},
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
													var	val			= this.getValue(),
														sply_amnt	= me.down('[name=sply_amnt]').getValue()
													;
													me.down('[name=ttsm_amnt]').setValue(sply_amnt+val);
												}
											}
										}
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	: Language.get('ttsm_amnt','합계금액'),
										name		: 'ttsm_amnt',
										xtype		: 'numericfield',
										width		: 180,
										minValue	: 0,
										enableKeyEvents : true,
										listeners	: {
											blur:function(field){
												var	val		= field.getValue(),
													result	= 0
												;
												if(val>0){
													result = Math.trunc(val/(Number(_global.tax_rt)+1));
												}
												me.down('[name=vatx_amnt]').setValue(Math.round(result));
												me.down('[name=sply_amnt]').setValue(Math.round(val-result));
											},
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
													var	val		= this.getValue(),
														result	= 0
													;
													if(val>0){
														result = Math.trunc(val/(Number(_global.tax_rt)+1));
													}
													me.down('[name=vatx_amnt]').setValue(Math.round(result));
													me.down('[name=sply_amnt]').setValue(Math.round(val-result));
													me.down('[name=user_memo]').focus(true , 10);

												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=sply_amnt]').focus(true , 10)
													}
												});
											}
										}
									},{	fieldLabel	: Language.get('sets_qntt','조/SET'),
										xtype		: 'numericfield',
										name		: 'sets_qntt',
										width		: 180,
										minValue	: 0,
										enableKeyEvents : true,
										listeners	: {
											change:function(field,val){
												var	acpt_qntt	= me.down('[name=acpt_qntt]').getValue(),
													lister		= Ext.ComponentQuery.query('module-saleorder-lister')[0],
													select		= lister.getSelectionModel().getSelection()[0]
												;
												if(select){
													if(acpt_qntt > 0 && val > 0){
														var	div = acpt_qntt/(select.get('sets_qntt')?select.get('sets_qntt'):1);
															qntt = div * val;
														me.down('[name=acpt_qntt]').setValue(qntt);
													}
												}
											},
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
													var	val			= this.getValue();
													me.down('[name=acpt_qntt]').focus(true , 10);
												}
											}
										}
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	: Language.get('wmld_numb','목형번호'),
										xtype		: 'popupfield',
										name		: 'wmld_numb',
										pair		: 'wmld_idcd',
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										width		: 180,
										editable	: true,
										clearable	: true,
										enableKeyEvents	: true,
										popup		: {
											select	: 'SINGLE',
//											widget	: wmld_widget,
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
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										width		: 180,
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
									{	fieldLabel	:  Language.get( 'cpst_numb' , '조판번호'),
										name		: 'cpst_numb',
										xtype		: 'textfield',
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										width		: 180,
									},{	fieldLabel	:  Language.get( 'inkk_colr_name' , '잉크색상'),
										name		: 'inkk_colr_name',
										xtype		: 'textfield',
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										width		: 180,
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
								items	: [
											{	fieldLabel	: '비고',
												xtype		: 'textarea',
												name		: 'user_memo',
												width		: 360,
												height		: 45,
												readOnly	: false,
												enableKeyEvents: true ,
												listeners	:{
													keydown : function(self, e) {
														if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
															var button = me.down('[itemId=updateSale]');
															if(button){
																if(button.hidden==false){
																	button.fireEvent('click');
																}
															}
														}
														this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
															scope: this,
															key: Ext.EventObject.TAB,
															shift:true,
															fn: function () {
																me.down('[name=ttsm_amnt]').focus(true , 10)
															}
														});
													}
												}
											}
										]
									},{	fieldLabel	: Language.get('modify','수정'),
								xtype		: 'textfield',
								name		: 'modify',
								width		: 170,
								hidden		: true
							},{	fieldLabel	: Language.get( 'change','change'),
								xtype		: 'textfield',
								name		: 'change',
								hidden		: true
							},{	fieldLabel	: Language.get( 'change','부모'),
								xtype		: 'textfield',
								name		: 'child_change',
								hidden		: true
							},{	name		: 'imge_chek1', xtype : 'textfield' , hidden : true
							},{	name		: 'imge_chek2', xtype : 'textfield' , hidden : true
							}
						]
					}
				]
			}
		;
		return item;
	},

	createTab2 : function() {
		var me = this,
			item = {
				title	: '제품사진',
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
											url		: 'system/custom/iypkg/sale/order/saleorder/set/imageupload.do',
											timeout	: 120000,
											method	: 'POST',
											layout	: { type: 'vbox', align: 'stretch' } ,
											padding	: 10 ,
											layout	: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
											items	:[
												{	xtype		: 'filefield',
													name		: 'files',
													itemId		: 'files1',
													buttonOnly	: true,
													buttonText	: '이미지불러오기',
													allowBlank	: true,
													clearable	: true ,
													anchor		: '100%',
													margin		: '0 3 0 125 ',
													width		: 350,
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
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek1]').setValue('');
																form.down('[name=image]').setSrc(null)
															}Ext.ComponentQuery.query('module-saleorder-editor')[0].down('[name=modify]').setValue('Y');
														}
													}
												},{	xtype		: 'filefield',
													name		: 'files',
													itemId		: 'files2',
													buttonOnly	: true,
													buttonText	: '이미지불러오기',
													allowBlank	: true,
													clearable	: true ,
													anchor		: '100%',
													margin		: '0 3 0 0',
													width		: 350,
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
																form.down('[name=image2]').setSrc(null);
															}Ext.ComponentQuery.query('module-saleorder-editor')[0].down('[name=modify]').setValue('Y');
														}
													}
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
							margin	: '0 0 0 15',
							autoscroll : true,
							items : [
								{	xtype	: 'image',
									name	: 'image',
									src		: '',
									width	: 210,
									height	: 200,
									margin	: '20 55 20 48',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image2',
									src		: '',
									width	: 210,
									height	: 200,
									margin	: '20 55 20 88',
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

	imgCancle:function(){
		var form = this.up('form').up('[name=imge_info]');
		form.down('[name=image]').setSrc('');
		form.down('[name=imge_1fst]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	},
	imgCancle2:function(){
		var form = this.up('form').up('[name=imge_info]');
		form.down('[name=image2]').setSrc('');
		form.down('[name=imge_2snd]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	},

	createTab3 : function() {
		var  me = this;
		var item =
		{
			title	: Language.get( '' , '원단'),
			xtype	: 'module-saleorder-fabc-lister',
			height	: 150
		};
		return item;
	},

	createTab4 : function() {
		var  me = this;
		var item =
		{
			title	: Language.get( '' , '가공 공정'),
			xtype	: 'module-saleorder-wkct-lister',
		};
		return item;
	},
	isos_load : function(){ //TODO 지워야함.
		var	me		= this,
			param	= me.getValues();
		if(param.prod_idcd!=''){
			Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/sale/order/saleorder/get/isos_load.do',
				method		: "POST",
				params		: {
					token	: _global.token_id,
					param	: Ext.encode({
						prod_idcd	: param.prod_idcd
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
						if(result.records[0]){
							stok_qntt = result.records[0].base_qntt;
							me.down('[name=stok_qntt]').setValue(stok_qntt);
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}else{
			Ext.Msg.alert('알림','수주품목이 없습니다. 수주품목을 확인해주세요.');
		}
	},
});

