Ext.define('module.custom.kortc.prod.rsvdorder.view.RsvdOrderWorkerSearch', { extend: 'Axt.form.Search',
	store	: 'module.custom.kortc.prod.rsvdorder.store.RsvdOrderInvoice',
	alias	: 'widget.module-rsvdorder-worker-search',
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
						width	: 150,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						items	: [
									{	text		: '품목코드' , xtype : 'label',	style : 'text-align:center;'
									},{	xtype		: 'popupfield',
										editable	: true,
										clearable	: true,
										enableKeyEvents : true,
										margin		: '2 2 2 2',
										name		: 'item_code',
										pair		: 'item_name',
										itemId		: 'initfocused' ,
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
														acct_bacd	: '제품'
											},
											apiurl	: {
												master : _global.api_host_info + '/system/item/itemmast/get/product.do'
											},
											result	: function(records, nameField, pairField) {
												var panel = nameField.up('form');
												me.selectItem( { records : records } );
												setTimeout(function(){
													panel.down('[name=invc_qntt]').focus(true , 10);
												},200);
											},
											create : function (self ) {
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
						width	: 280,
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
											panel.down('[name=item_spec]').focus(true, 10);
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
						width	: 100 ,
						margin	: '3 0 3 0',
						items	: [
							{	text	: '수량', xtype : 'label',style:"text-align: right" , style : 'text-align:center;'
							},{	xtype	: 'numericfield',
								margin	: '2 2 2 2',
								name	: 'invc_qntt',
								enableKeyEvents : true,
								listeners: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var qty = self.up('form').down('[name=invc_qntt]').getValue();
											if(qty > 999999){
												Ext.Msg.show({ title: '알림', msg: "수량은 999,999개 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
													fn : function (button) {
														self.up('form').down('[name=invc_qntt]').focus(true, 10);
													}
												});
												return;
											}
											self.up('form').down('[name=unit_name]').focus(true, 10);
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
						width	: 100 ,
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
											panel.down('[name=deli_date]').focus(true, 10);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 100,
						items	: [
							{	text		: '납기일자' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'datefield'  ,
								margin		: '2 2 2 2',
								name		: 'deli_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								editable	: true ,
								minValue	: new Date(),
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											self.up('form').down('[name=cstm_lott_numb]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								},
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 220,
						items	: [
							{	text		: 'LOT번호' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								margin		: '2 2 2 2',
								name		: 'cstm_lott_numb',
								editable	: true ,
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var qty = self.up('form').down('[name=invc_qntt]').getValue();
											if(qty == 0 ){
												self.up('form').down('[name=invc_qntt]').focus(true, 10);
											}
											if ( Ext.isEmpty( self.up('form').down('[name=deli_date]').getValue()) ){
												self.up('form').down('[name=deli_date]').focus(true, 10);
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
			me.down('[name=deli_date]'		).setValue(record.get('deli_date' ));
			me.down('[name=cstm_lott_numb]'	).setValue(record.get('cstm_lott_numb' ));
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
			deli_date		: me.down('[name=deli_date]').getValue(),
			cstm_lott_numb	: me.down('[name=cstm_lott_numb]').getValue(),
			deli_date		: Ext.Date.format(me.down('[name=deli_date]').getValue(),'Y-m-d'),
			istt_wrhs_idcd	: '',
			vatx_incl_yorn	: '',
			orig_invc_numb	: ''
		});
//		store.each(function(findrecord) {
//			if (   findrecord.get('item_idcd') == record.get('item_idcd')
//				&& findrecord.get('item_code') == record.get('item_code')
//				&& findrecord.get('item_name') == record.get('item_name')
//				&& findrecord.get('item_spec') == record.get('item_spec')
//				&& findrecord.get('unit_idcd') == record.get('unit_idcd')
//				&& findrecord.get('unit_name') == record.get('unit_name')
//				&& findrecord.get('deli_date') == record.get('deli_date')) {
//				is_equal = true;
//				// 상품의 수량을 추가
//				findrecord.set("vatx_amnt", findrecord.get('vatx_amnt') + record.get('vatx_amnt'));
//				findrecord.set("invc_qntt", findrecord.get('invc_qntt') + record.get('invc_qntt'));
//				findrecord.set("invc_amnt", findrecord.get('invc_amnt') + record.get('invc_amnt'));
//				findrecord.set("sply_amnt", findrecord.get('sply_amnt') + record.get('sply_amnt'));
//			}
//		});
		// 상품을 추가
		if (!is_equal) {
			store.add(record);
		}

		me.attachItem({ clear : true });
	}
});
