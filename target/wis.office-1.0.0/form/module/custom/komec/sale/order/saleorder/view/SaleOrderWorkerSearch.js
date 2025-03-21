Ext.define('module.custom.komec.sale.order.saleorder.view.SaleOrderWorkerSearch', { extend: 'Axt.form.Search',
	store	: 'module.custom.komec.sale.order.saleorder.store.SaleOrderInvoice',
	alias	: 'widget.module-komec-saleorder-worker-search',
	style	: 'padding-top : 1px;' ,

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.items = [me.createLine1(), me.createLine2() ];
		me.callParent();
	},

	/**
	 * 라인1
	 */
	createLine1 : function(){
		var me   = this,
			line = {
				xtype  : 'fieldset' ,
				margin : '0 0 0 0' ,
				items  : [
					{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 120,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						items	: [
							{	text		: '품목코드' , xtype : 'label',	style : 'text-align:center;',
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'item_code',
								pair		: 'item_name',
								itemId		: 'initfocused' ,
								hidden		: false,
								clearable	: true,
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
									},
								},
								popup		: {
									select	: 'MULTI',
									widget	: 'lookup-item-popup',
									values	: { },
									option	: { direct_result : true },
									params	: {	stor_grp	: _global.stor_grp,
												stor_id		: _global.stor_id,
												line_stat	: '0',
												acct_bacd	: '삼정품목',
												add			: '1',
												mes_system_type	: _global.options.mes_system_type,
												menu_type	: 'saleOrdr'
									},
									result	: function(records, nameField, pairField) {
										var panel = nameField.up('form');
										var searchForm = Ext.ComponentQuery.query('module-komec-saleorder-worker-search')[0];
										me.selectItem( { records : records } );

										setTimeout(function(){
											panel.down('[name=cstm_lott_numb]').focus(true , 10);
										},200);
									},
								create : function (self ) {
									editor = Ext.ComponentQuery.query('module-komec-saleorder-worker-editor')[0];
									param = editor.getValues();
									if(!(param.acpt_dvcd =='1000' && param.prod_trst_dvcd == '2000') ) {
										if(param.cstm_idcd== '' || param.cstm_idcd == null ){
											Ext.Msg.alert("알림","거래처를 먼저 선택하여 주십시오.");
											popup.close();
											return;
											}
									}


									Ext.merge( self.popup.values , {
										brcd : self.getValue()
									});
								}
							}
							},{	name	: 'item_idcd'		, xtype : 'textfield', hidden : true
							},{	name	: 'item_code'		, xtype : 'textfield', hidden : true
							},{	name	: 'mast_item_idcd'	, xtype : 'textfield', hidden : true
							},{	name	: 'mast_item_code'	, xtype : 'textfield', hidden : true
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
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=offr_qntt]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 150 ,
						items	: [
							{	text		: '규격', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'item_spec',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=offr_qntt]').focus(true, 10);
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
						width	: 40 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '단위', xtype : 'label', itemId : 'unit_idcd', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								margin		: '2 2 2 2',
								name		: 'unit_name',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=invc_qntt]').focus(true, 10);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 150 ,
						items	: [
							{	text		: '고객LOT번호', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'cstm_lott_numb',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=invc_qntt]').focus(true, 10);
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
						width	: 60 ,
						margin	: '3 0 3 0',
						items	: [
							{	text	: '수량', xtype : 'label',style:"text-align: right" , style : 'text-align:center;'
							},{	xtype	: 'numericfield',
								margin	: '2 2 2 2',
								name	: 'invc_qntt',
								format	: '#,##0.###',
								enableKeyEvents : true,
								listeners: {
									change : function(self, value) {
										var panel = self.up('form')
										var	inv_amt = Math.round((Number(value) * Number(panel.down('[name=invc_pric]').getValue())))
										panel.down('[name=sply_amnt]').setValue(inv_amt);
									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var qty = self.up('form').down('[name=invc_pric]').getValue();
											if(qty > 999999){
												Ext.Msg.show({ title: '알림', msg: "수량은 999,999개 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
													fn : function (button) {
														self.up('form').down('[name=invc_qntt]').focus(true, 10);
													}
												});
												return;
											}
											self.up('form').down('[name=invc_pric]').focus(true, 10);
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
							{	text	: '단가', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'invc_pric',
								margin	: '2 2 2 2',
								format	: '#,##0.##',
								enableKeyEvents : true,
								listeners : {
									change : function(self, value) {
										var panel = self.up('form');
										var	inv_amt = Math.round((Number(value) * Number(panel.down('[name=invc_qntt]').getValue())));
										panel.down('[name=sply_amnt]').setValue(inv_amt)
									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											var pri = self.up('form').down('[name=invc_pric]').getValue();
											if(pri > 10000000){
												Ext.Msg.show({ title: '알림', msg: "단가는 10,000,000원 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
													fn : function (button) {
														self.up('form').down('[name=invc_pric]').focus(true, 10);
													}
												});
												return;
											}
											self.up('form').down('[name=deli_date2]').focus(true, 10);
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
							{	text		: '금액', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'sply_amnt',
								format		: '#,##0.##',
								margin		: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								enableKeyEvents : true,
								listeners: {
									change : function(self, value) {
										var panel = self.up('form'),
											inv_vat = 0;

										var vatx_incl_yorn =  me.down('[name=vatx_incl_yorn]').getValue();
										if (vatx_incl_yorn == "1") {
											inv_vat = Math.trunc( Number(panel.down('[name=sply_amnt]').getValue())/(Number(_global.tax_rt)))
										}
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
							{	text		: '부가세', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'vatx_amnt',
								margin		: '2 2 2 2',
								format	: '#,##0.##',
								readOnly	: _global.options.mes_system_type.toUpperCase() == 'SJFLV'?true : false,
								fieldCls	: _global.options.mes_system_type.toUpperCase() == 'SJFLV'?'readonlyfield' : '',
								listeners	: {
									change	: function(self, value) {
										var panel = self.up('form')
										var	inv_tot = Number(panel.down('[name=sply_amnt]').getValue()) + Number(panel.down('[name=vatx_amnt]').getValue())
										;
										panel.down('[name=invc_amnt]').setValue(inv_tot);
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
							{	text		: '합계금액', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'invc_amnt',
								margin		: '2 2 2 2',
								format	: '#,##0.##',
								readOnly	: true,
								fieldCls	: 'readonlyfield'
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						hidden	: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
						width	: 60,
						items	: [
							{	text		: '부가세포함', xtype : 'label',style:  'text-align:center;',
							},{	xtype		: 'lookupfield',
								name		: 'vatx_incl_yorn',
								margin		: '2 2 2 2',
								lookupValue	: resource.lookup('yorn'),
								hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
								listeners	: {
									change	: function(self, value) {
										var val = this.getValue(),
											panel = self.up('form')
										if(val == 0){
											inv_vatx = 0
										}else{
											inv_vatx = Math.trunc( Number(panel.down('[name=sply_amnt]').getValue())/(Number(_global.tax_rt)))
										}
										panel.down('[name=vatx_amnt]').setValue(inv_vatx);
										;
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 95,
						items	: [
							{	text		: '납기일자' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'datefield'  ,
								margin		: '2 2 2 2',
								name		: 'deli_date2',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								// minValue	: new Date(),
								editable	: true ,
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var qty = self.up('form').down('[name=invc_pric]').getValue();
											if(qty == 0 ){
												self.up('form').down('[name=invc_qntt]').focus(true, 10);
											}
											if ( Ext.isEmpty( self.up('form').down('[name=deli_date2]').getValue()) ){
												self.up('form').down('[name=deli_date2]').focus(true, 10);
											} else {
												if (self.up('form').down('[name=item_idcd]').getValue().trim() != '') {
													me.appendItem({});
												}
											}
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								},
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						hidden	: true,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 200,
						items	: [
							{	text		: '메모', xtype : 'label'	, style:  'text-align:center;'
							},{	xtype		: 'textfield',
								margin		: '2 2 2 2',
								name		: 'user_memo',
								maxLength	: 100,
								maxLengthText: '한글 100자 이내로 작성하여 주십시오.',
								enableKeyEvents: true  ,
								listeners	:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
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
					},{	name	: 'deli_hidn',
						xtype	: 'textfield',
						hidden	: true
					},{	name : 'prnt_idcd'	, xtype : 'textfield'    , hidden : true
					},{	name : 'unit_idcd'	, xtype : 'textfield'    , hidden : true
					},{	name : 'lott_numb'	, xtype : 'textfield'    , hidden : true
					},{	name : 'piece_qty'	, xtype : 'numericfield' , hidden : true
					},{	name : 'txfree_yn'	, xtype : 'textfield'    , hidden : true
					},{	name : 'offr_pric'	, xtype : 'numericfield' , hidden : true
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
				style	: Const.borderLine.top +  Const.borderLine.bottom ,
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
			me.down('[name=mast_item_idcd]'	).setValue(record.get('mast_item_idcd' ));
			me.down('[name=mast_item_code]'	).setValue(record.get('mast_item_code' ));
			me.down('[name=unit_idcd]'		).setValue(record.get('unit_idcd' ));
			me.down('[name=unit_name]'		).setValue(record.get('unit_name' ));
			me.down('[name=item_idcd]'		).setValue(record.get('item_idcd' ));
			me.down('[name=item_code]'		).setValue(record.get('item_code' ));
			me.down('[name=item_name]'		).setValue(record.get('item_name' ));
			me.down('[name=item_spec]'		).setValue(record.get('item_spec' ));
			me.down('[name=cstm_lott_numb]'	).setValue(record.get('cstm_lott_numb' ));
			me.down('[name=sply_amnt]'		).setValue(record.get('sply_amnt' ));
			me.down('[name=invc_qntt]'		).setValue('1');
			me.down('[name=invc_pric]'		).setValue(record.get('cont_pric'));
			me.down('[name=vatx_amnt]'		).setValue(record.get('vatx_amnt'));
			me.down('[name=invc_amnt]'		).setValue(record.get('invc_amnt'));
			me.down('[name=user_memo]'		).setValue('');
			me.down('[name=vatx_incl_yorn]'		).setValue(record.get('vatx_incl_yorn'));
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
		console.log(editor);
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
			unit_idcd		: me.down('[name=unit_idcd]').getValue(),
			unit_name		: me.down('[name=unit_name]').getValue(),
			cstm_lott_numb	: me.down('[name=cstm_lott_numb]').getValue(),
			invc_qntt		: me.down('[name=invc_qntt]').getValue(),
			invc_pric		: me.down('[name=invc_pric]').getValue(),
			sply_amnt		: me.down('[name=sply_amnt]').getValue(),
			vatx_amnt		: me.down('[name=vatx_amnt]').getValue(),
			invc_amnt		: me.down('[name=invc_amnt]').getValue(),
			deli_date2		: Ext.Date.format(me.down('[name=deli_date2]').getValue(),'Y-m-d'),
			remk_text		: me.down('[name=user_memo]').getValue(),
			istt_wrhs_idcd	: '',
			orig_invc_numb	: '',
			vatx_incl_yorn	: me.down('[name=vatx_incl_yorn]').getValue()
		});

		store.each(function(findrecord) {
			if (   findrecord.get('item_idcd') == record.get('item_idcd')
				&& findrecord.get('item_code') == record.get('item_code')
				&& findrecord.get('item_name') == record.get('item_name')
				&& findrecord.get('item_spec') == record.get('item_spec')
				&& findrecord.get('unit_idcd') == record.get('unit_idcd')
				&& findrecord.get('unit_name') == record.get('unit_name')
				&& findrecord.get('cstm_lott_numb') == record.get('cstm_lott_numb')
				&& findrecord.get('deli_date2') == record.get('deli_date2')) {
				is_equal = true;
				// 상품의 수량을 추가
				findrecord.set("vatx_amnt", findrecord.get('vatx_amnt') + record.get('vatx_amnt'));
				findrecord.set("invc_qntt", findrecord.get('invc_qntt') + record.get('invc_qntt'));
				findrecord.set("invc_amnt", findrecord.get('invc_amnt') + record.get('invc_amnt'));
				findrecord.set("sply_amnt", findrecord.get('sply_amnt') + record.get('sply_amnt'));
			}
		});
		// 상품을 추가
		if (!is_equal) {
			store.add(record);
		}

		me.attachItem({ clear : true });

	}
});
