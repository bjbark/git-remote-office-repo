Ext.define('module.custom.iypkg.sale.order.estimast1.view.EstiMast1WorkerSearch', { extend: 'Axt.form.Search',
	store	: 'module.custom.iypkg.sale.order.estimast1.store.EstiMast1Invoice',
	alias	: 'widget.module-estimast1-worker-search',
	style	: 'padding-top : 1px;' ,
	height	: 110,
	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.items = [me.createLine1(), me.createLine11(), me.createLine2() ];
		me.callParent();
	},

	createLine1 : function(){
		var me   = this,
			line = {
				xtype  : 'fieldset' ,
				margin : '0 0 0 0' ,
				border : 0,
				items  : [
					{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 120,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 0 3',
						items	: [
							{	text		: '품목코드' , xtype : 'label',	style : 'text-align:center;'
							},{	xtype		: 'popupfield',
								editable	: false,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'item_code',
								pair		: 'item_idcd',
								itemId		: 'initfocused' ,
								editable	: true ,
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										if (e.keyCode == e.ENTER ) {
											/* 팝업창을 호출한다. */
											self.onTriggerClick();
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								},
								popup		: {
									select	: 'MULTI',
									widget	: 'lookup-prod-popup',
									values	: { },
									option	: { direct_result : true },
									params	: {	stor_grp	: _global.stor_grp,
												stor_id		: _global.stor_id,
												line_stat	: '0',
												add			: '1'
									},
									apiurl	: {
										master : _global.api_host_info + '/system/item/itemmast/get/product.do'
									},
									result	: function(records, nameField, pairField) {
										var panel = nameField.up('form');
										var result2, a="";

										if(records.length > 0){
											for(var i =0; i< records.length ; i++){
												a += '\''+records[i].get('prod_idcd')+'\'';
												if(i != records.length -1){
													a += ",";
												}
											}
										}
										if(a != ''){
											Ext.Ajax.request({
												url		: _global.location.http() + '/custom/iypkg/sale/order/estimast1/get/fabc.do',
												params	: {
													token : _global.token_id,
													param : JSON.stringify({
														prod_idcd		: a,
													})
												},
												async	: false,
												method	: 'POST',
												success	: function(response, request) {
													result2 = Ext.decode(response.responseText);
													if	(!result2.success ){
														Ext.Msg.error(result2.message );
														return;
													} else {
														console.log(response,'test');
														console.log(request,'test');
														result2 = result2.records;
													}
												},
												failure : function(result2, request) {
												},
												callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
												}
											});
										}
										me.selectItem( { records : records, records2 : result2 } );

										setTimeout(function(){
											panel.down('[name=esti_qntt]').focus(true , 10);
										},200);
									},
									create : function (self ) {
										Ext.merge( self.popup.values , {
											brcd : self.getValue()
										});
									}
								}
							},{	name	: 'item_idcd'		, xtype : 'textfield', hidden : true
							},{	name	: 'item_spec'		, xtype : 'textfield', hidden : true
							},{	name	: 'prnt_idcd'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 200,
						items	: [
							{	text		: '품명' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'item_name',
								width		: 250,
								margin		: '2 2 2 2',
								editable	: false,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 150 ,
						items	: [
							{	text		: '원단명', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'mtrl_name',
								width		: 250,
								margin		: '2 2 2 2',
								editable	: false,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
//							}{	xtype		: 'popupfield',
//								editable	: true,
//								enableKeyEvents : true,
//								margin		: '2 2 2 2',
//								name		: 'mtrl_name',
//								pair		: 'mtrl_idcd',
//								editable	: true ,
//								enableKeyEvents: true ,
//								listeners	: {
//									keydown : function(self, e) {
//										/* 엔터키 이벤트를 호출한다. */
//										if (e.keyCode == e.ENTER ) {
//											/* 팝업창을 호출한다. */
//											self.onTriggerClick();
//										} else if (e.keyCode == e.ESC) {
//											me.attachItem({ clear : true });
//										}
//									}
//								},
//								popup: {
//									select : 'SINGLE',
//									widget : 'lookup-fabc-popup',
//									params : { stor_grp : _global.stor_grp},
//									result : function(records, nameField, pairField) {
//										var panel = nameField.up('form');
//										nameField.setValue(records[0].get('fabc_name'));
//										pairField.setValue(records[0].get('fabc_idcd'));
//										me.down('[name=item_line]').setValue(records[0].get('ppln_dvcd'));
//										me.down('[name=mxm2_qntt]').setValue(records[0].get('mxm2_qntt'));
//										me.down('[name=mxm2_pric]').setValue(records[0].get('mxm2_pric'));
//										me.down('[name=item_widh2]').setValue(records[0].get('item_widh2'));
//										me.down('[name=item_widh2]').setValue(records[0].get('item_leng2'));
//
//										setTimeout(function(){
//											panel.down('[name=item_line]').focus(true , 10);
//										},200);
//									}
//								}
							},{	name	: 'mtrl_idcd'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype : 'textfield' , name : 'fabc_idcd' , hidden : true
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 75 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '골', xtype : 'label', itemId : 'item_line', style : 'text-align:center;'
							},{	margin		: '2 2 2 2',
								xtype		: 'lookupfield',
								name		: 'item_line',
								editable	: false,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								lookupValue	: resource.lookup('line_dvcd'),
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 150 ,
						items	: [
							{	text		: '상자형식', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'popupfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'bxty_name',
								pair		: 'bxty_idcd',
								editable	: true ,
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										if (e.keyCode == e.ENTER ) {
											/* 팝업창을 호출한다. */
											self.onTriggerClick();
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								},
								popup: {
									select : 'SINGLE',
									widget : 'lookup-bxty-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										var panel = nameField.up('form');
										nameField.setValue(records[0].get('bxty_name'));
										pairField.setValue(records[0].get('bxty_idcd'));
										setTimeout(function(){
											panel.down('[name=esti_qntt]').focus(true , 10);
										},200);
									}
								}
							},{	name	: 'bxty_idcd'		, xtype : 'textfield', hidden : true
							},{	name	: 'unit_name'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 50 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '장', xtype : 'label', itemId : 'item_leng', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								margin		: '2 2 2 2',
								name		: 'item_leng',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 50 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '폭', xtype : 'label', itemId : 'item_widh', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								margin		: '2 2 2 2',
								name		: 'item_widh',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 50 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '고', xtype : 'label', itemId : 'item_hght', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								margin		: '2 2 2 2',
								name		: 'item_hght',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 85 ,
						margin	: '3 0 3 0',
						items	: [
							{	text	: '수량', xtype : 'label',style:"text-align: right" , style : 'text-align:center;'
							},{	xtype	: 'numericfield',
								margin	: '2 2 2 2',
								name	: 'esti_qntt',
								enableKeyEvents : true,
								listeners	: {
									change	: function(self, value) {
										var panel = self.up('form'),
										inv_amt = Math.floor((Number(value) * Number(panel.down('[name=pqty_pric]').getValue()))/10)*10
										;
										panel.down('[name=sply_amnt]').setValue(inv_amt);
									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											var qty = self.up('form').down('[name=esti_qntt]').getValue();
											if(qty > 999999){
												Ext.Msg.show({ title: '알림', msg: "수량은 999,999개 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
													fn : function (button) {
														self.up('form').down('[name=esti_qntt]').focus(true, 10);
													}
												});
												return;
											}
											self.up('form').down('[name=pqty_pric]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 80,
						items	: [
							{	text	: 'm2/개', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'mxm2_qntt',
								margin	: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 80,
						items	: [
							{	text	: '단가/m2', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'mxm2_pric',
								margin	: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 80,
						items	: [
							{	text	: '단가/개', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'pqty_pric',
								margin	: '2 2 2 2',
								editable	: true ,
								enableKeyEvents : true,
								listeners : {
									change : function(self, value) {
										var panel = self.up('form')
											inv_amt = Math.floor((Number(value) * Number(panel.down('[name=esti_qntt]').getValue()))/10)*10
										;
										panel.down('[name=sply_amnt]').setValue(inv_amt)
									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											var panel = self.up('form'),
												pri = self.up('form').down('[name=pqty_pric]').getValue(),
												value = panel.down('[name=item_idcd]').getValue()
											;
											if(pri > 10000000){
												Ext.Msg.show({ title: '알림', msg: "단가는 10,000,000원 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
													fn : function (button) {
														self.up('form').down('[name=pqty_pric]').focus(true, 10);
													}
												});
												return;
											}
											if (value.trim() != '') {
												me.appendItem({});
											}
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					}
				]
			}
		;
		return line;
	},

	createLine11 : function(){
		var me   = this,
			line = {
				xtype  : 'fieldset' ,
				margin : '0 0 0 0' ,
				border : 0,
				items  : [
					{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left,
						margin	: '3 0 3 3',
						width	: 80,
						items	: [
							{	text	: '공급가액', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'sply_amnt',
								margin	: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								enableKeyEvents : true,
								listeners: {
									change : function(self, value) {
										var panel = self.up('form')
											inv_vat = Math.floor((Number(_global.tax_rt) * Number(panel.down('[name=sply_amnt]').getValue()))/1000)*10
										;
										panel.down('[name=vatx_amnt]').setValue(inv_vat);
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 80,
						items	: [
							{	text: Language.get('vatx_amnt'	, '부가세액'	), xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'vatx_amnt',
								margin	: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								listeners	: {
									change	: function(self, value) {
										var panel = self.up('form')
											inv_tot = Number(panel.down('[name=sply_amnt]').getValue()) + Number(panel.down('[name=vatx_amnt]').getValue())
										;
										panel.down('[name=ttsm_amnt]').setValue(inv_tot);
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 85,
						items	: [
							{	text	: '합계금액', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'ttsm_amnt',
								margin	: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 80,
						items	: [
							{	text	: '원단장', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'item_leng2',
								margin	: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 80,
						items	: [
							{	text	: '원단폭', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'item_widh2',
								margin	: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 70,
						items	: [
							{	text	: '절수', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'textfield',
								name	: 'item_fxqt',
								margin	: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 80,
						items	: [
							{	text	: '원단표준단가', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'fabc_stnd_pric',
								margin	: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						flex	: 1,
						maxWidth: 330,
						items	: [
							{	text	: '비고', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'textfield',
								name	: 'user_memo',
								margin	: '2 2 2 2',
								editable	: true,
								enableKeyEvents : true,
								listeners : {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											var panel = self.up('form'),
												value = panel.down('[name=item_idcd]').getValue()
											;
											if (value.trim() != '') {
												me.appendItem({});
											}
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 205,
						items	: [
							{	text	: '매입처명', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'textfield',
								name	: 'ordr_cstm_name',
								margin	: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	xtype	: 'textfield',
								name	: 'ordr_cstm_idcd',
								margin	: '2 2 2 2',
								hidden	: true,
								editable	: false,
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 80,
						items	: [
							{	text	: '매입단가/m2', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'ordr_mxm2_pric',
								margin	: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					}
				]
			}
		;
		return line;
	},




	createLine2 : function () {
		var me = this,
			line = {
				xtype	: 'container',
				margin	: '0 0 0 0',
				itemId	: 'itemviewer',
				layout	: 'border',
				border	: 1,
				height	: 35,
				html	: ''
			}
		;
		return line;
	},

	/**
	 * 품목 데이터를 조회한다.
	 */
	selectItem : function (config) {
		var me		= this,
			panel	= config.panel,
			length	= config.records.length
		;
		Ext.each(config.records, function(record, index) {
			me.attachItem( { panel : config.panel , record : record , append : (length > 1) } );
		});
	},

	/**
	 * 품목 정보를 첨부 시킨다.
	 */
	attachItem : function (config) {
		var me = this,
			clear	= config.clear,
			record	= config.record,
			html	= config.html || ''
		;
		if (config.clear || !config.record) {
			html	= '';
			me.getForm().reset();
			me.down('#itemviewer').update( html );
		} else {
			// TODO
			me.getForm().reset();
			me.down('[name=item_idcd]'	).setValue(record.get('prod_idcd' ));
			me.down('[name=item_code]'	).setValue(record.get('prod_code' ));
			me.down('[name=item_name]'	).setValue(record.get('prod_name' ));
			me.down('[name=item_spec]'	).setValue(record.get('prod_spec' ));
			me.down('[name=bxty_idcd]'	).setValue(record.get('bxty_idcd' ));
			me.down('[name=bxty_name]'	).setValue(record.get('bxty_name' ));
			me.down('[name=mtrl_idcd]'	).setValue(record.get('fabc_idcd' ));
			me.down('[name=mtrl_name]'	).setValue(record.get('fabc_name' ));
			me.down('[name=item_line]'	).setValue(record.get('ppln_dvcd' ));
			me.down('[name=item_leng]'	).setValue(record.get('prod_leng' ));
			me.down('[name=item_widh]'	).setValue(record.get('prod_widh' ));
			me.down('[name=item_hght]'	).setValue(record.get('prod_hght' ));
			me.down('[name=mxm2_qntt]'	).setValue(record.get('pqty_mxm2' )); // 제곱미터개
			me.down('[name=mxm2_pric]'	).setValue(record.get('mxm2_pric' ));
			me.down('[name=esti_qntt]'	).setValue(record.get('esti_qntt' ));
			me.down('[name=item_fxqt]'	).setValue(record.get('item_fxqt' ));
			me.down('[name=item_widh2]'	).setValue(record.get('item_widh2' ));
			me.down('[name=item_leng2]'	).setValue(record.get('item_leng2' ));
			me.down('[name=pqty_pric]'	).setValue(record.get('pqty_pric' ));
			me.down('[name=ordr_cstm_name]'	).setValue(record.get('ordr_cstm_name' ));
			me.down('[name=ordr_cstm_idcd]'	).setValue(record.get('ordr_cstm_idcd' ));
			me.down('[name=fabc_stnd_pric]'	).setValue(record.get('fabc_stnd_pric' ));
			me.down('[name=ordr_mxm2_pric]'	).setValue(record.get('ordr_mxm2_pric' ));
			if (config.append) {
				me.appendItem( { panel : config.panel });
			} else {
				html = '<div>'
					 + '  <div style = "width: 100;  float : left" >'
					 + '  	<div>계정구분</div><div>'+ record.get('acct_bacd_name') +'</div> '
					 + '  </div> '
					 + '  <div style = "width: 300;  float : left" >'
					 + '  	<div>품목분류</div><div>'+ record.get('clss_name') +'</div> '
					 + '  </div> '
					 + '  <div style = "width: 150;  float : left" >'
					 + '  	<div>모델명</div><div>'+ record.get('modl_name') +'</div> '
					 + '  </div> '
					 + '  <div style = "width: 150;  float : left" >'
					 + '  	<div>입고창고</div><div>'+ record.get('istt_wrhs_name') +'</div> '
					 + '  </div> '
					 + '  <div style = "width: 150;  float : left" >'
					 + '  	<div>출고창고</div><div>'+ record.get('istt_wrhs_name') +'</div> '
					 + '  </div> '
					 + '</div>'
				;
				me.down('#itemviewer').update( html );
			}
		}
	},

	/**
	 * 입력된 상품을 등록한다.
	 */
	appendItem : function (config) {
		var me			= this,
			store		= me.ownerCt.getStore(),
			editor		= me.ownerCt.editor,
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			uper_seqn	= undefined
		;
		var seq = editor.getSEQ();
		var dsp = '';
		if(me.down('[name=prnt_idcd]').getValue() == '' || me.down('[name=prnt_idcd]').getValue() == '0') {
			dsp = editor.getDSP();
		}
		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = me.down('[name=prnt_idcd]').getValue();
		}
		record = Ext.create( store.model.modelName , {
			line_seqn		: seq,
			uper_seqn		: uper_seqn,
			disp_seqn		: dsp,
			prnt_idcd		: uper_seqn,
			item_idcd		: me.down('[name=item_idcd]').getValue(),
			item_code		: me.down('[name=item_code]').getValue(),
			item_name		: me.down('[name=item_name]').getValue(),
			item_spec		: me.down('[name=item_spec]').getValue(),
			esti_qntt		: me.down('[name=esti_qntt]').getValue(),
			bxty_idcd		: me.down('[name=bxty_idcd]').getValue(),
			bxty_name		: me.down('[name=bxty_name]').getValue(),
			mtrl_idcd		: me.down('[name=mtrl_idcd]').getValue(),
			mtrl_name		: me.down('[name=mtrl_name]').getValue(),
			item_line		: me.down('[name=item_line]').getValue(),
			item_leng		: me.down('[name=item_leng]').getValue(),
			item_widh		: me.down('[name=item_widh]').getValue(),
			item_hght		: me.down('[name=item_hght]').getValue(),
			mxm2_qntt		: me.down('[name=mxm2_qntt]').getValue(),
			mxm2_pric		: me.down('[name=mxm2_pric]').getValue(),
			esti_qntt		: me.down('[name=esti_qntt]').getValue(),
			pqty_pric		: me.down('[name=pqty_pric]').getValue(),
			item_fxqt		: me.down('[name=item_fxqt]').getValue(),
			item_widh2		: me.down('[name=item_widh2]').getValue(),
			item_leng2		: me.down('[name=item_leng2]').getValue(),
			sply_amnt		: me.down('[name=sply_amnt]').getValue(),
			vatx_amnt		: me.down('[name=vatx_amnt]').getValue(),
			ttsm_amnt		: me.down('[name=ttsm_amnt]').getValue(),
			user_memo		: me.down('[name=user_memo]').getValue(),
			fabc_stnd_pric	: me.down('[name=fabc_stnd_pric]').getValue(),
			ordr_mxm2_pric	: me.down('[name=ordr_mxm2_pric]').getValue(),
			ordr_cstm_name	: me.down('[name=ordr_cstm_name]').getValue(),
			ordr_cstm_idcd	: me.down('[name=ordr_cstm_idcd]').getValue(),
		});
		store.each(function(findrecord) {
			if (   findrecord.get('item_idcd') == record.get('item_idcd')
				&& findrecord.get('item_code') == record.get('item_code')
				&& findrecord.get('item_name') == record.get('item_name')
				&& findrecord.get('item_spec') == record.get('item_spec')
				&& findrecord.get('unit_idcd') == record.get('unit_idcd')
				&& findrecord.get('unit_name') == record.get('unit_name')
				&& findrecord.get('mtrl_idcd') == record.get('mtrl_idcd')
				&& findrecord.get('mtrl_name') == record.get('mtrl_name')
				&& findrecord.get('item_line') == record.get('item_line')
				&& findrecord.get('item_leng') == record.get('item_leng')
				&& findrecord.get('item_widh') == record.get('item_widh')
				&& findrecord.get('item_hght') == record.get('item_hght')
				&& findrecord.get('mxm2_pric') == record.get('mxm2_pric')
				&& findrecord.get('item_fxqt') == record.get('item_fxqt')
				&& findrecord.get('item_widh2') == record.get('item_widh2')
				&& findrecord.get('item_leng2') == record.get('item_leng2')
				&& findrecord.get('ordr_cstm_idcd') == record.get('ordr_cstm_idcd')
				&& findrecord.get('ordr_cstm_name') == record.get('ordr_cstm_name')
				&& findrecord.get('ordr_mxm2_pric') == record.get('ordr_mxm2_pric')
				&& findrecord.get('fabc_stnd_pric') == record.get('fabc_stnd_pric')){

				is_equal = true;
				// 상품의 수량을 추가
				findrecord.set("esti_qntt", findrecord.get('esti_qntt') + record.get('esti_qntt'));
			}
		});
		// 상품을 추가
		if (!is_equal) {
			store.add(record);

		}
		console.log(store,'상품을 추가');
		me.attachItem({ clear : true });

	}
});
