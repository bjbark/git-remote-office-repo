Ext.define('module.item.ecomast.view.EcoMastWorkerSearch', { extend: 'Axt.form.Search',
	store	: 'module.item.ecomast.store.EcoMastInvoice',
	alias	: 'widget.module-ecomast-worker-search',
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
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'item_code',
								pair		: 'item_name',
								clearable	: false ,
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
												acct_bacd	: 'ECO'
									},
									apiurl	: {
										master : _global.api_host_info + '/system/item/itemmast/get/product.do'
									},
									result	: function(records, nameField, pairField) {
										var prnt_item_idcd = Ext.ComponentQuery.query('module-ecomast-worker-editor')[0].down('[name=prnt_item_idcd]').getValue();
										var panel = nameField.up('form');
										var item_idcd = records[0].get('item_idcd');
										if(prnt_item_idcd == '' || prnt_item_idcd == null){
											Ext.Msg.alert("알림","조립품목코드를 먼저 입력해주십시오.");
										}
										else if(prnt_item_idcd == item_idcd){
											Ext.Msg.alert("알림","조립품목과 같은 품목은 선택할 수 없습니다.");
										}else{
											me.selectItem( { records : records } );
											setTimeout(function(){
												panel.down('[name=unit_name]').focus(true , 10);
											},100);
										}
									},
									create : function (self ) {
										Ext.merge( self.popup.values , {
											brcd : self.getValue()
										});
									}
								}
							},{	name	: 'item_idcd'		, xtype : 'textfield', hidden : true
							},{	name	: 'mast_item_idcd'	, xtype : 'textfield', hidden : true
							},{	name	: 'mast_item_code'	, xtype : 'textfield', hidden : true
							},{	name	: 'bomt_seqn'	, xtype : 'textfield', hidden : true
							},{	name	: 'unit_idcd'	, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 400,
						items	: [
							{	text		: '품명' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'item_name',
								margin		: '2 2 2 2',
								readOnly	: true,
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
						width	: 300,
						items	: [
							{	text		: '규격', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'item_spec',
								margin		: '2 2 2 2',
								readOnly	: true,
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=unit_name]').focus(true, 10);
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
							{	text		: '투입단위' , xtype : 'label',	style : 'text-align:center;'
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								clearable	: false ,
								name		: 'unit_name',
								pair		: 'unit_idcd',
								itemId		: 'initfocused' ,
								enableKeyEvents: true ,
								width		: 310,
								listeners	: {
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										if (e.keyCode == e.ENTER ) {
											/* 팝업창을 호출한다. */
//											self.onTriggerClick();
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								},
								popup: {
									widget : 'lookup-unit-popup',
									select : 'SINGLE',
									option	: { direct_result : true },
									result : function(records, nameField, pairField ){

										nameField.setValue(records[0].get('unit_name'));
										pairField.setValue(records[0].get('unit_idcd'));

										var panel = nameField.up('form');
										setTimeout(function(){
											panel.down('[name=wkct_name]').focus(true , 10);
										},100);
									}
								}
							},{	name	: 'unit_idcd'		, xtype : 'textfield', hidden : true
							},{	name	: 'unit_name'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 150,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						items	: [
									{	text		: '투입공정' , xtype : 'label',	style : 'text-align:center;'
									},{	xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										margin		: '2 2 2 2',
										name		: 'wkct_name',
										pair		: 'wkct_idcd',
										clearable	: false ,
										itemId		: 'initfocused' ,
										enableKeyEvents: true ,
										width		: 310,
										listeners	: {
											keydown : function(self, e) {
												/* 엔터키 이벤트를 호출한다. */
												if (e.keyCode == e.ENTER ) {
													/* 팝업창을 호출한다. */
//													self.onTriggerClick();
												} else if (e.keyCode == e.ESC) {
													me.attachItem({ clear : true });
												}
											}
										},
										popup: {
											widget : 'lookup-wkct-popup',
											select : 'SINGLE',
											params	: {tema:''},
											option	: { direct_result : true },
											result : function(records, nameField, pairField ){

												nameField.setValue(records[0].get('wkct_name'));
												pairField.setValue(records[0].get('wkct_idcd'));
												var panel = nameField.up('form');
												setTimeout(function(){
													panel.down('[name=ndqt_nmrt]').focus(true , 10);
												},100);
											}
										}
									},{	name	: 'wkct_idcd'		, xtype : 'textfield', hidden : true
									},{	name	: 'wkct_name'		, xtype : 'textfield', hidden : true
									}
								]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 80,
						items	: [
							{	text		: '분자', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'ndqt_nmrt',
								margin		: '2 2 2 2',
								enforceMaxLength : true,
								maxLength	: 3,
								value		: 1,
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var	panel = self.up('form'),
												qty = self.up('form').down('[name=ndqt_nmrt]').getValue();
											if	(qty =='' || qty == null || qty == 0) {
												panel.down('[name=ndqt_nmrt]').focus(true,10);
											}else {
												panel.down('[name=ndqt_dnmn]').focus(true, 10);
											}
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
							{	text		: '분모', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'ndqt_dnmn',
								margin		: '2 2 2 2',
								value		: 1,
								enableKeyEvents : true,
								enforceMaxLength : true,
								maxLength	: 3,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var	panel = self.up('form'),
											qty = self.up('form').down('[name=ndqt_dnmn]').getValue();
											if	(qty =='' || qty == null || qty == 0) {
												panel.down('[name=ndqt_dnmn]').focus(true,10);
											}else{
												panel.down('[name=incm_loss_rate]').focus(true, 10);
											}
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
							{	text		: 'loss율', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'incm_loss_rate',
								enforceMaxLength : true,
								maxLength	: 3,
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var panel = self.up('form');
											qty = self.up('form').down('[name=incm_loss_rate]').getValue();
											if	(qty > 100){
												Ext.Msg.alert("알림","loss율을 100이하로 입력하여주십시오.");
												self.up('form').down('[name=incm_loss_rate]').setValue(0);
												panel.down('[name=incm_loss_rate]').focus(true,10);
											}
											else if	(qty =='' || qty == null || qty == 0) {
												panel.down('[name=incm_loss_rate]').focus(true,10);
											}else{
												panel.down('[name=user_memo]').focus(true, 10);
											}
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
							{	text		: '비고', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'user_memo',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var qty = self.up('form').down('[name=incm_loss_rate]').getValue();
											var t1 = self.up('form').down('[name=ndqt_dnmn]').getValue();
											var t2 = self.up('form').down('[name=ndqt_nmrt]').getValue();
											if(t2 == '' || t2 == null || t2 == 0){
												self.up('form').down('[name=ndqt_nmrt]').focus(true, 10);
												return;
											}
											if(t1 == '' || t1 == null || t1 == 0 ){
												self.up('form').down('[name=ndqt_dnmn]').focus(true, 10);
												return;
											}
											if(qty =='' || qty == null || qty == 0){
												self.up('form').down('[name=incm_loss_rate]').focus(true, 10);
												return;
											}
											if (self.up('form').down('[name=item_idcd]').getValue().trim() != ''
												&&self.up('form').down('[name=wkct_idcd]').getValue().trim() != ''
												&& self.up('form').down('[name=unit_idcd]').getValue().trim()!='') {
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
			me.down('[name=unit_idcd]'	).setValue(record.get('unit_idcd' ));
			me.down('[name=unit_name]'	).setValue(record.get('unit_name' ));
			me.down('[name=item_idcd]'	).setValue(record.get('item_idcd' ));
			me.down('[name=item_code]'	).setValue(record.get('item_code' ));
			me.down('[name=item_name]'	).setValue(record.get('item_name' ));
			me.down('[name=item_spec]'	).setValue(record.get('item_spec' ));
			me.down('[name=user_memo]'	).setValue(record.get('user_memo' ));

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
			uper_seqn   = undefined,
			temp		= me.ownerCt
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
			bomt_seqn		: seq,
			line_seqn		: seq,
			uper_seqn		: uper_seqn,
			disp_seqn		: dsp,
			prnt_idcd		: uper_seqn,
			prnt_item_idcd	: me.down('[name=item_idcd]').getValue(),
			item_idcd		: me.down('[name=item_idcd]').getValue(),
			item_code		: me.down('[name=item_code]').getValue(),
			item_name		: me.down('[name=item_name]').getValue(),
			item_spec		: me.down('[name=item_spec]').getValue(),
			unit_idcd		: me.down('[name=unit_idcd]').getValue(),
			unit_name		: me.down('[name=unit_name]').getValue(),
			wkct_name		: me.down('[name=wkct_name]').getValue(),
			ndqt_nmrt		: me.down('[name=ndqt_nmrt]').getValue(),
			ndqt_dnmn		: me.down('[name=ndqt_dnmn]').getValue(),
			incm_loss_rate	: me.down('[name=incm_loss_rate]').getValue(),
			user_memo		: me.down('[name=user_memo]').getValue(),
			istt_wrhs_idcd	: '',
			vatx_incl_yorn	: '',
			orig_invc_numb	: '',
			ivst_wkct_idcd	: me.down('[name=wkct_idcd]').getValue()

		});
		store.each(function(findrecord) {
			if (   findrecord.get('item_idcd') == record.get('item_idcd')
				&& findrecord.get('item_code') == record.get('item_code')
				&& findrecord.get('item_name') == record.get('item_name')
				&& findrecord.get('item_spec') == record.get('item_spec')
				&& findrecord.get('unit_idcd') == record.get('unit_idcd')
				&& findrecord.get('unit_name') == record.get('unit_name')) {
				is_equal = true;
				// 상품의 수량을 추가
				findrecord.set("ndqt_nmrt", findrecord.get('ndqt_nmrt') + record.get('ndqt_nmrt'));
				findrecord.set("ndqt_dnmn", findrecord.get('ndqt_dnmn') + record.get('ndqt_dnmn'));
				findrecord.set("incm_loss_rate", findrecord.get('incm_loss_rate') + record.get('incm_loss_rate'));
			}
		});

		// 상품을 추가
		if (!is_equal) {
			store.add(record);
		}
		me.attachItem({ clear : true });
	}
});
