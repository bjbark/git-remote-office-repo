Ext.define('module.custom.sjflv.sale.order.estimast2.view.EstiMast2WorkerSearch', { extend: 'Axt.form.Search',
	store	: 'module.custom.sjflv.sale.order.estimast2.store.EstiMast2Invoice',
	alias	: 'widget.module-estimast2-worker-search',
	style	: 'padding-top : 1px;' ,

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.items = [me.createLine1(), me.createLine2() ];
		me.callParent();
	},

	createLine1 : function(){
		var me   = this,
			line = {
				xtype  : 'fieldset' ,
				margin : '0 0 0 0' ,
				items  : [{	xtype	: 'fieldcontainer',
					layout	: { type: 'vbox', align: 'stretch' },
					width	: 120,
					hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
					style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
					margin	: '3 0 3 3',
					items	: [
						{	text		: '품목코드' , xtype : 'label',	style : 'text-align:center;',hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
						},{	xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							margin		: '2 2 2 2',
							name		: 'item_code',
							pair		: 'item_name',
							itemId		: 'initfocused' ,
							hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
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
											pric_dvcd	: '',
											add			: '1',
											mes_system_type	: _global.options.mes_system_type,
											menu_type	: 'saleOrdr'
								},
//								apiurl	: {
//									master : _global.api_host_info + '/system/item/itemmast/get/product.do'
//								},
								result	: function(records, nameField, pairField) {
									var panel = nameField.up('form');
									var searchForm = Ext.ComponentQuery.query('module-estimast2-worker-search')[0];
									me.selectItem( { records : records } );

									setTimeout(function(){
										panel.down('[name=esti_qntt]').focus(true , 10);
									},200);
								},
							create : function (self ) {
								editor = Ext.ComponentQuery.query('module-estimast2-worker-editor')[0];
								param = editor.getValues();
								if(!(param.acpt_dvcd =='1000' && param.prod_trst_dvcd == '2000') ) {
//									if(param.cstm_idcd== '' || param.cstm_idcd == null ){
//										Ext.Msg.alert("알림","거래처를 먼저 선택하여 주십시오.");
//										popup.close();
//										return;
//										}
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
											panel.down('[name=esti_qntt]').focus(true, 10);
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
											panel.down('[name=esti_qntt]').focus(true, 10);
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
											panel.down('[name=esti_qntt]').focus(true, 10);
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
								format	: '#,##0.##',
								name	: 'esti_qntt',
								enableKeyEvents : true,
								listeners: {
									change : function(self, value) {
										var panel = self.up('form')
										resId =  _global.options.mes_system_type?_global.options.mes_system_type.toUpperCase():_global.hq_id.toUpperCase()

											if(resId == 'SJFLV'){
												inv_amt = Math.round((Number(value) * Number(panel.down('[name=esti_pric]').getValue())))
											} else{
												inv_amt = Math.floor((Number(value) * Number(panel.down('[name=esti_pric]').getValue()))/10)*10
											}
										;
										panel.down('[name=sply_amnt]').setValue(inv_amt);
									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var qty = self.up('form').down('[name=esti_pric]').getValue();
											if(qty > 999999){
												Ext.Msg.show({ title: '알림', msg: "수량은 999,999개 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
													fn : function (button) {
														self.up('form').down('[name=esti_qntt]').focus(true, 10);
													}
												});
												return;
											}
											self.up('form').down('[name=esti_pric]').focus(true, 10);
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
								name	: 'esti_pric',
								margin	: '2 2 2 2',
								format	: '#,##0.##',
								enableKeyEvents : true,
								listeners : {
									change : function(self, value) {
										var panel = self.up('form')
											resId =  _global.options.mes_system_type?_global.options.mes_system_type.toUpperCase():_global.hq_id.toUpperCase()

											if(resId == 'SJFLV'){
												inv_amt = Math.round((Number(value) * Number(panel.down('[name=esti_qntt]').getValue())))
											} else{
												inv_amt = Math.floor((Number(value) * Number(panel.down('[name=esti_qntt]').getValue()))/10)*10
											}
										;
										panel.down('[name=sply_amnt]').setValue(inv_amt);
									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var pri = self.up('form').down('[name=esti_pric]').getValue();
											if(pri > 10000000){
												Ext.Msg.show({ title: '알림', msg: "단가는 10,000,000원 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
													fn : function (button) {
														self.up('form').down('[name=esti_pric]').focus(true, 10);
													}
												});
												return;
											}
											self.up('form').down('[name=user_memo]').focus(true, 10);
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
								margin		: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								enableKeyEvents : true,
								listeners: {
									change : function(self, value) {
										var panel = self.up('form')
											resId =  _global.options.mes_system_type?_global.options.mes_system_type.toUpperCase():_global.hq_id.toUpperCase()

//											if(resId == 'SJFLV'){
//												inv_vat = Math.trunc( Number(panel.down('[name=sply_amnt]').getValue())/(Number(_global.tax_rt)))
//											} else{
//												inv_vat = Math.floor((Number(_global.tax_rt) * Number(panel.down('[name=sply_amnt]').getValue()))/1000)*10
//											}
										;
									}
								}
							}
						]

					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						hidden	: _global.hq_id.toUpperCase() != 'N1000SJFLV'? true : false,
						width	: 80,
						items	: [
							{	text		: '패킹단위', xtype : 'label',style:  'text-align:center;',hidden		: _global.hq_id.toUpperCase() != 'N1000SJFLV'? true : false
							},{	xtype		: 'numericfield',
								name		: 'pack_qntt',
								margin		: '2 2 2 2',
								hidden		: _global.hq_id.toUpperCase() != 'N1000SJFLV'? true : false,
								listeners	: {
									change	: function(self, value) {

										;
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
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
//											if (value.trim() != '') {
												me.appendItem({});
//											}
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	name : 'deli_hidn'	, xtype	: 'textfield'    , hidden : true
					},{	name : 'prnt_idcd'	, xtype : 'textfield'    , hidden : true
					},{	name : 'unit_idcd'	, xtype : 'textfield'    , hidden : true
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
			console.log(record);

			me.down('[name=mast_item_idcd]'	).setValue(record.get('mast_item_idcd' ));
			me.down('[name=mast_item_code]'	).setValue(record.get('mast_item_code' ));
			me.down('[name=unit_idcd]'	).setValue(record.get('unit_idcd' ));
			me.down('[name=unit_name]'	).setValue(record.get('unit_name' ));
			me.down('[name=item_idcd]'	).setValue(record.get('item_idcd' ));
			me.down('[name=item_code]'	).setValue(record.get('item_code' ));
			me.down('[name=item_name]'	).setValue(record.get('item_name' ));
			me.down('[name=item_spec]'	).setValue(record.get('item_spec' ));
			me.down('[name=esti_qntt]'	).setValue('1');
			me.down('[name=esti_pric]'	).setValue(record.get('cont_pric'));
//			me.down('[name=sply_amnt]'	).setValue(record.get('sply_amnt'));
			me.down('[name=pack_qntt]'	).setValue(record.get('pack_qntt'));
			me.down('[name=user_memo]'	).setValue('');
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
//			item_idcd		: me.down('[name=item_idcd]').getValue(),
//			item_code		: me.down('[name=item_code]').getValue(),
			item_name		: me.down('[name=item_name]').getValue(),
			item_spec		: me.down('[name=item_spec]').getValue(),
			unit_idcd		: me.down('[name=unit_idcd]').getValue(),
			unit_name		: me.down('[name=unit_name]').getValue(),
			esti_qntt		: me.down('[name=esti_qntt]').getValue(),
			esti_pric		: me.down('[name=esti_pric]').getValue(),
			sply_amnt		: me.down('[name=sply_amnt]').getValue(),
			pack_qntt		: me.down('[name=pack_qntt]').getValue(),
			user_memo		: me.down('[name=user_memo]').getValue(),
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
				// 상품의 수량을
				findrecord.set("esti_qntt", findrecord.get('esti_qntt') + record.get('esti_qntt'));
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
