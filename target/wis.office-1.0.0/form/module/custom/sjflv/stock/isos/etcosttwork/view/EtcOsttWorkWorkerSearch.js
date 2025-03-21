Ext.define('module.custom.sjflv. stock.isos.etcosttwork.view.EtcOsttWorkWorkerSearch', { extend: 'Axt.form.Search',

	alias   : 'widget.module-etcosttwork-worker-search',
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
						width	: 150,
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
												menu_type	: 'esttOstt'
//												acct_bacd	: '자재'  // 창고 구분에 따라 계정을 변경해 줘야 할 듯.....
									},
									apiurl	: {
										master : _global.api_host_info + '/system/item/itemmast/get/product.do'
									},
									result	: function(records, nameField, pairField) {
										var panel = nameField.up('form');
										me.selectItem( { records : records } );
										setTimeout(function(){
											panel.down('[name=lott_numb]').focus(true , 10);
										},200);
									},
									create : function (self ) {
										Ext.merge( self.popup.values , {
											item_code : self.getValue()
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
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'item_name',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
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
									values	: {	},
									option	: {	direct_result : true },
									params	: {	stor_grp	: _global.stor_grp,
												stor_id		: _global.stor_id,
												line_stat	: '0',
												acct_bacd	: '자재'
									},
									apiurl	: {
										master : _global.api_host_info + '/system/item/itemmast/get/product.do'
									},
									result	: function(records, nameField, pairField) {
										var panel = nameField.up('form');
										me.selectItem( { records : records } );
										setTimeout(function(){
											panel.down('[name=ostt_qntt]').focus(true , 10);
										},200);
									},
									create : function (self ) {
										Ext.merge( self.popup.values , {
											item_name : self.getValue()
										});
									}
								}
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
											panel.down('[name=ostt_qntt]').focus(true, 10);
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
											panel.down('[name=unit_idcd]').focus(true, 10);
										}
									}
								}
							},{	xtype : 'textfield', name : 'unit_idcd', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 200,
						items	: [
							{	text		: Language.get('lott_numb', 'LOT번호') , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'lott_numb',
								editable	: true ,
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										var panel = self.up('form');
										panel.down('[name=ostt_qntt]').focus(true, 10);
									}
								},
								popup 		: {
									widget	: 'lookup-lott-popup',
									select	: 'MULTI',
									params	: {	stor_grp	: _global.stor_grp,
												stor_id		: _global.stor_id,
												line_stat	: '0'
									},
									apiurl	: {
										master : _global.api_host_info + '/system/stock/lottwork/get/lookup.do'
									},
									result	: function(records, nameField ){
										var panel = nameField.up('form');
											parent = records[0];
										panel.down('[name=stnd_pric]').setValue(parent.data.pric);
										nameField.setValue(records[0].get('lott_numb'));
										panel.down('[name=make_date]').setValue(records[0].get('make_date'));
									},
									create : function (self ) {
										var	panel		= self.up('form'),
											item_idcd	= panel.down('[name=item_idcd]').getValue();
										Ext.merge(self.popup.params, {
											item_idcd : item_idcd
										});
									}
								}
							},{	name	: 'lott_numb'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 80,
						items	: [
							{	text		: '제조일자', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'datefield',
								name		: 'make_date',
								margin		: '2 2 2 2',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},

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
								name	: 'ostt_qntt',
								format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
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
											var qty = self.up('form').down('[name=ostt_qntt]').getValue();
											if(qty > 999999){
												Ext.Msg.show({ title: '알림', msg: "수량은 999,999개 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
													fn : function (button) {
														self.up('form').down('[name=ostt_qntt]').focus(true, 10);
													}
												});
												return;
											}
											self.up('form').down('[name=stnd_pric]').focus(true, 10);
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
						width	: 60,
						items	: [
							{	text	: '단가', xtype : 'label',style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'stnd_pric',
								margin	: '2 2 2 2',
								enableKeyEvents : true,
								listeners : {
									change : function(self, value) {
										var panel = self.up('form')
											inv_amt = Number(value) * Number(panel.down('[name=ostt_qntt]').getValue())
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
						width	: 80,
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
		console.debug('record is : ',record)
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
			me.down('[name=ostt_qntt]'	).setValue('1');
			me.down('[name=stnd_pric]'	).setValue(record.get('stnd_pric'));
			me.down('[name=amnt]'		).setValue(record.get('amnt'));
			me.down('[name=user_memo]'  ).setValue('');
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
					 + '  	<div>출고창고</div><div>'+ record.get('ostt_wrhs_name') +'</div> '
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
			ostt_qntt		: me.down('[name=ostt_qntt]').getValue(),
			stnd_pric		: me.down('[name=stnd_pric]').getValue(),
			amnt			: me.down('[name=amnt]').getValue(),
			lott_numb		: me.down('[name=lott_numb]').getValue(),
			make_date		: Ext.Date.format(me.down('[name=make_date]').getValue(),'Y-m-d'),
			remk_text		: me.down('[name=user_memo]').getValue(),
			ostt_wrhs_idcd	: '',
			vatx_incl_yorn	: '',
			orig_invc_numb	: '',
			orig_seqn		: 0

		});
		if(_global.options.mes_system_type.toUpperCase() == 'SJFLV'){
			if (!is_equal) {
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
					findrecord.set("ostt_qntt", findrecord.get('ostt_qntt') + record.get('ostt_qntt'));
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
