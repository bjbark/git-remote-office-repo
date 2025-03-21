Ext.define('module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkWorkerSearch', { extend: 'Axt.form.Search',

	alias   : 'widget.module-etcisttwork-worker-search',
	style   : 'padding-top : 1px;' ,

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
				margin : '0 0 0 0'  ,
				items  : [
					{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 140,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						items	: [
							{	text		: '품목코드' , xtype : 'label',	style : 'text-align:center;'
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'item_code',
								pair		: 'item_name',
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
									widget	: 'lookup-item-popup',
									values	: { },
									option	: { direct_result : true },
									params	: {	stor_grp	: _global.stor_grp,
												stor_id		: _global.stor_id,
												line_stat	: '0',
//												acct_bacd	: '자재'  //  창고에 따라 계정구분을 달리해야 할 듯 함....
									},
//									apiurl	: {
//										master : _global.api_host_info + '/system/item/itemmast/get/product.do'
//									},
									result	: function(records, nameField, pairField) {
										var panel = nameField.up('form');
										me.selectItem( { records : records } );

										setTimeout(function(){
											panel.down('[name=lott_numb]').focus(true , 10);
										},200);
									},
									create : function (self ) {
										editor = Ext.ComponentQuery.query('module-etcisttwork-worker-editor')[0];
										param = editor.getValues()
										if(param.cstm_dvcd== '' || param.cstm_dvcd == null ){
											Ext.Msg.alert("알림","입고처구분을  먼저 선택하여 주십시오.");
											popup.close();
											return;
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
						width	: 180,
						items	: [
							{	text		: '품명' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'item_name',
								readOnly	: true,
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
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 160 ,
						items	: [
							{	text		: '규격', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'item_spec',
								margin		: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=lott_numb]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 50 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '단위', xtype : 'label', itemId : 'unit_name', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								margin		: '2 2 2 2',
								name		: 'unit_name',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=lott_numb]').focus(true, 10);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 180,
						items	: [
							{	text		: Language.get('lott_numb', 'Batch No') , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'lott_numb',
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=cstm_lott_numb]').focus(true, 10);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 120,
						items	: [
							{	text		: Language.get('cstm_lott_numb', 'Supplier No') , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'cstm_lott_numb',
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=make_natn]').focus(true, 10);
										}
									}
								}
							}
						]
					},
					{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 120 ,
						items	: [
							{	text		: '제조국', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'make_natn',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=make_cmpy_name]').focus(true, 10);
										} 
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 120,
						items	: [
							{	text		:  '제조회사' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'make_cmpy_name',
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=istt_qntt]').focus(true, 10);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer',
						hidden	: true,
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 90,
						items	: [
							{	text		: '제조일자' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'datefield',
								margin		: '2 2 2 2',
								name		: 'make_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								editable	: true ,
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										var panel = self.up('form');
										if (e.keyCode == e.ENTER) {
											var val = this.getValue();
											//alert("val -> " + val + " / " + typeof val);
											var a="";
											if((typeof val) == "object"){
												if (val != null) {
													var date1 = new Date(val);
													date2 = Ext.Date.format(date1,'Y-m-d'),
													a = date2;
												}
											}else{
												if(val.match(/[0-9]/)){
													a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
												}
											}
											if(a!=""){this.setValue(a);}
											panel.down('[name=rtil_ddln_date]').focus(true, 10);
										}
									}
								},
							},
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 90,
						hidden	: true,
						items	: [
							{	text		: '유통기한' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'datefield',
								margin		: '2 2 2 2',
								name		: 'rtil_ddln_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								editable	: true ,
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										var panel = self.up('form');
										if (e.keyCode == e.ENTER) {
											var val = this.getValue();
											var a="";
											if((typeof val) == "object"){
												if (val != null) {
													var date1 = new Date(val);
													date2 = Ext.Date.format(date1,'Y-m-d'),
													a = date2;
												}
											}else{
												if(val.match(/[0-9]/)){
													a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
												}
											}
											if(a!=""){this.setValue(a);}
											panel.down('[name=istt_qntt]').focus(true, 10);
										}
									}
								},
							},
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 55 ,
						hidden	: _global.hqof_idcd.toUpperCase()!= 'N1000SJFLV',
						margin	: '3 0 3 0',
						items	: [
							{	text	: '패킹단위', xtype : 'label',style:"text-align: right" , style : 'text-align:center;'
							},{	xtype	: 'numericfield',
								margin	: '2 2 2 2',
								name	: 'pack_qntt',
								hidden	: _global.hqof_idcd.toUpperCase()!= 'N1000SJFLV',
								enableKeyEvents : true,
								listeners: {
//									change : function(self, value) {
//										var panel = self.up('form')
//											inv_amt = Number(value) * Number(panel.down('[name=stnd_pric]').getValue())
//										;
//										panel.down('[name=amnt]').setValue(inv_amt);
//									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var qty = self.up('form').down('[name=pack_qntt]').getValue();
											if(qty > 999999){
												Ext.Msg.show({ title: '알림', msg: "수량은 999,999개 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
													fn : function (button) {
														self.up('form').down('[name=pack_qntt]').focus(true, 10);
													}
												});
												return;
											}
											self.up('form').down('[name=stnd_pric]').focus(true, 10);
											if (self.up('form').down('[name=item_idcd]').getValue().trim() != '') {
//												me.appendItem({});
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
						width	: 55 ,
						margin	: '3 0 3 0',
						items	: [
							{	text	: '수량', xtype : 'label',style:"text-align: right" , style : 'text-align:center;'
							},{	xtype	: 'numericfield',
								margin	: '2 2 2 2',
								name	: 'istt_qntt',
								enableKeyEvents : true,
								listeners: {
									change : function(self, value) {
										var panel = self.up('form')
											inv_amt = Number(value) * Number(panel.down('[name=stnd_pric]').getValue())
										;
										panel.down('[name=amnt]').setValue(inv_amt);
									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var qty = self.up('form').down('[name=istt_qntt]').getValue();
											if(qty > 999999){
												Ext.Msg.show({ title: '알림', msg: "수량은 999,999개 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
													fn : function (button) {
														self.up('form').down('[name=istt_qntt]').focus(true, 10);
													}
												});
												return;
											}
											self.up('form').down('[name=stnd_pric]').focus(true, 10);
											if (self.up('form').down('[name=item_idcd]').getValue().trim() != '') {
//												me.appendItem({});
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
						width	: 90,
						items	: [
							{	text	: '단가', xtype : 'label',style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'stnd_pric',
								margin	: '2 2 2 2',
								enableKeyEvents : true,
								listeners : {
									change : function(self, value) {
										var panel = self.up('form')
											inv_amt = Number(value) * Number(panel.down('[name=istt_qntt]').getValue())
										;
										panel.down('[name=amnt]').setValue(inv_amt)
									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var pri = self.up('form').down('[name=stnd_pric]').getValue();
											if(pri > 10000000){
												Ext.Msg.show({ title: '알림', msg: "단가는 10,000,000원 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
													fn : function (button) {
														self.up('form').down('[name=stnd_pric]').focus(true, 10);
													}
												});
												return;
											}
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
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 120,
						items	: [
							{	text		: '금액', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'amnt',
								margin		: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield'
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
					},{	name : 'prnt_idcd'	, xtype : 'textfield'    , hidden : true
					},{	name : 'unit_idcd'	, xtype : 'textfield'    , hidden : true
					},{	name : 'lott_numb'	, xtype : 'textfield'    , hidden : true
					},{	name : 'piece_qty'	, xtype : 'numericfield' , hidden : true
					},{	name : 'txfree_yn'	, xtype : 'textfield'    , hidden : true
					},{	name : 'stnd_pric'	, xtype : 'numericfield' , hidden : true
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
//			me.down('[name=brcd]').focus(true, 10);
			me.down('[itemId=unit_name]').update('단위');
		} else {
			me.down('[name=mast_item_idcd]'	).setValue(record.get('mast_item_idcd' ));
			me.down('[name=mast_item_code]'	).setValue(record.get('mast_item_code' ));
			me.down('[name=unit_idcd]'	).setValue(record.get('unit_idcd' ));
			me.down('[name=unit_name]'	).setValue(record.get('unit_name' ));
			me.down('[name=item_idcd]'	).setValue(record.get('item_idcd' ));
			me.down('[name=item_code]'	).setValue(record.get('item_code' ));
			me.down('[name=item_name]'	).setValue(record.get('item_name' ));
			me.down('[name=item_spec]'	).setValue(record.get('item_spec' ));
			me.down('[name=istt_qntt]'	).setValue('1');
			me.down('[name=stnd_pric]'	).setValue(record.get('stnd_pric'));
			me.down('[name=amnt]'		).setValue(record.get('amnt'));
			me.down('[name=user_memo]'  ).setValue('');
			me.down('[name=make_natn]'  ).setValue(record.get('make_natn'));
			me.down('[name=make_cmpy_name]'  ).setValue(record.get('make_cmpy_name2'));
			if (config.append) {
				me.appendItem( { panel : config.panel });
			} else {
				html = '<div>'
					 + '  <div style = "width: 100;  float : left" >'
					 + '  	<div>계정구분</div><div>'+ record.get('aset_clss_name') +'</div> '
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
			uper_seqn   = undefined
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
			unit_idcd		: me.down('[name=unit_idcd]').getValue(),
			unit_name		: me.down('[name=unit_name]').getValue(),
			istt_qntt		: me.down('[name=istt_qntt]').getValue(),
			stnd_pric		: me.down('[name=stnd_pric]').getValue(),
			lott_numb		: me.down('[name=lott_numb]').getValue(),
			cstm_lott_numb	: me.down('[name=cstm_lott_numb]').getValue(),
			make_natn		: me.down('[name=make_natn]').getValue(),
			pack_qntt		: me.down('[name=pack_qntt]').getValue(),
			make_cmpy_name	: me.down('[name=make_cmpy_name]').getValue(),
			make_natn		: me.down('[name=make_natn]').getValue(),
			make_date		: Ext.Date.format(me.down('[name=make_date]').getValue(),'Y-m-d'),
			rtil_ddln_date	: Ext.Date.format(me.down('[name=rtil_ddln_date]').getValue(),'Y-m-d'),
			amnt			: me.down('[name=amnt]').getValue(),
			remk_text		: me.down('[name=user_memo]').getValue(),
			istt_wrhs_idcd	: '',
			vatx_incl_yorn	: '',
			orig_invc_numb	: '',
			orig_seqn		: 0

		});
		if(_global.options.mes_system_type.toUpperCase() == 'SJFLV'){
			if (!is_equal) {
				console.log("품목 등록 store", store);
				store.add(record);
			}
		}else{
				store.each(function(findrecord) {
					if (   findrecord.get('item_idcd') == record.get('item_idcd')
						&& findrecord.get('item_code') == record.get('item_code')
						&& findrecord.get('item_name') == record.get('item_name')
						&& findrecord.get('item_spec') == record.get('item_spec')
						&& findrecord.get('unit_name') == record.get('unit_name')) {
						is_equal = true;
						// 상품의 수량을 추가
						findrecord.set("istt_qntt", findrecord.get('istt_qntt') + record.get('istt_qntt'));
					}
				});
			// 상품을 추가
			if (!is_equal) {
				store.add(record);
			}
		}
		me.attachItem({ clear : true });
	}
});
