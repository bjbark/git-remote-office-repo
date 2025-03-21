Ext.define('module.custom.sjflv.sale.export.offermast.view.OfferMastWorkerSearch', { extend: 'Axt.form.Search',
	store	: 'module.custom.sjflv.sale.export.offermast.store.OfferMastInvoice',
	alias	: 'widget.module-offermast-worker-search',
	style	: 'padding-top : 1px;' ,

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.items = [me.createLine1(),me.createLine11() ];
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
						width	: 100,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left ,
						margin	: '3 0 3 3',
						items	: [
							{	text		: '품목코드' , xtype : 'label',	style : 'text-align:center;'
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'item_code',
								pair		: 'item_idcd',
								itemId		: 'initfocused' ,
								clearable	: true,
								editable	: true ,
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										consol.log(params.cstm_idcd);
										/* 엔터키 이벤트를 호출한다. */
										if (e.keyCode == e.ENTER ) {
											if(me.popup.params.cstm_idcd){
												console.log(me.popup.params.cstm_idcd);
												me.selectAction();
											}else{
												setTimeout(function() {
													Ext.Msg.alert("알림","거래처를 먼저 선택하여 주십시오.");
													me.close();
												}, 100);
											}
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
//									apiurl	: {
//										master : _global.api_host_info + '/system/item/itemmast/get/product.do'
//									},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_code'))
										pairField.setValue(records[0].get('item_idcd'))
										me.down('[name=item_name]').setValue(records[0].get('item_name'))
										me.down('[name=item_spec]').setValue(records[0].get('item_spec'))
										setTimeout(function(){
											panel.down('[name=item_clss_bacd_name]').focus(true , 10);
										},200);
									},
								}
							},{	name	: 'item_idcd'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left+Const.borderLine.right ,
						width	: 60 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '단위', xtype : 'label', itemId : 'unit_idcd', style : 'text-align:center;'
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'unit_name',
								pair		: 'unit_idcd',
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
									widget	: 'lookup-unit-popup',
									values	: { },
									option	: { direct_result : true },
									params : { stor_grp : _global.stor_grp , line_stat : '0'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('unit_name'));
										pairField.setValue(records[0].get('unit_idcd'));
										setTimeout(function(){
											panel.down('[name=qntt]').focus(true , 10);
										},200);
									}
								}
							},{	name	: 'unit_idcd'		, xtype : 'textfield', hidden : true
							}

						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right   ,
						margin	: '3 0 3 0',
						width	: 100,
						items	: [
							{	text		: '수량' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'qntt',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=exch_pric]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
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
							{	text		: '단가' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'exch_pric',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=krwn_pric]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
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
							{	text		: '판매금액' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'exch_amnt',
								margin		: '2 2 2 2',
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 100,
						items	: [
							{	text		: '원화단가' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'krwn_pric',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=deli_date]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
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
							{	text		: '원화금액' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'krwn_amnt',
								margin		: '2 2 2 2',
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
								value		: Ext.Date.add(new Date(),Ext.Date.DAY,+15),
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											self.up('form').down('[name=user_memo]').focus(true, 10);
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
						flex		: 1,

						items	: [
							{	text		: '비고' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'user_memo',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=deli_date]').focus(true, 10);
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
	/**
	 * 라인1
	 */
	createLine11 : function(){
		var me   = this,
			line = {
				xtype  : 'fieldset' ,
				margin : '0 0 0 0' ,
				itemId : 'fieldsetItems',
				items  : [
					{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right +  Const.borderLine.left  ,
						margin	: '3 0 3 2',
						width	: 160 ,
						items	: [
							{	text		: '품명', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'item_name',
								margin		: '2 2 2 2',
								readOnly	: true
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
								readOnly	: true
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 150 ,
						items	: [
							{	text		: 'HS Code', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: '',
								margin		: '2 2 2 2',
								readOnly	: true
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 100 ,
						items	: [
							{	text		: '현재고', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: '',
								margin		: '2 2 2 2',
								readOnly	: true
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						flex	: 1 ,
						height	:44,
						items	: [
							{	text		: '', xtype : 'label', style : 'text-align:center;'
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
			var cstm = Ext.ComponentQuery.query('module-offermast-worker-editor')[0].down('[name=cstm_idcd]').getValue(),
				val = [],
				result1 = []
			;
			if(cstm != '' && cstm != null){
				val.push({item_idcd : record.data.item_idcd, cstm_idcd : cstm})
				Ext.Ajax.request({
					url		: _global.location.http() + '/item/itemmast/get/itemacpt.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id			: _global.stor_id,
							hqof_idcd		: _global.hqof_idcd,
							records			: val
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
							result1.push(result);
							//품목군~ 레코드가 있는것만 들어가게
							console.log(result1);
							if(result1[0].records.length > 0){
//								me.down('[name=item_clss_bacd]').setValue(result1[0].records[0].item_clss_bacd);

//								if(result1[0].records[0].mtrl_bacd != ''){
//									me.down('[name=mtrl_bacd_name]').setValue(result1[0].records[0].mtrl_bacd_name);
//								}
//								if(result1[0].records[0].make_bacd != ''){
//									me.down('[name=make_bacd_name]').setValue(result1[0].records[0].make_bacd_name);
//								}
//								if(result1[0].records[0].item_bacd != ''){
//									me.down('[name=item_bacd_name]').setValue(result1[0].records[0].item_bacd_name);
//								}
								if(result1[0].records[0].item_clss_bacd != ''){
									me.down('[name=item_clss_bacd_name]').setValue(result1[0].records[0].item_clss_bacd_name);
								}
//								me.down('[name=emgc_yorn]'			).setValue(result1[0].records[0].emgc_yorn);
//								me.down('[name=srfc_proc_yorn]'		).setValue(result1[0].records[0].srfc_proc_yorn);
								me.down('[name=cont_pric]'			).setValue(result1[0].records[0].cont_pric);
							}
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			}
			me.down('[name=mast_item_idcd]'	).setValue(record.get('mast_item_idcd' ));
			me.down('[name=mast_item_code]'	).setValue(record.get('mast_item_code' ));
			me.down('[name=unit_idcd]'		).setValue(record.get('unit_idcd' ));
			me.down('[name=unit_name]'		).setValue(record.get('unit_name' ));
			me.down('[name=item_idcd]'		).setValue(record.get('item_idcd' ));
			me.down('[name=item_code]'		).setValue(record.get('item_code' ));
			me.down('[name=item_name]'		).setValue(record.get('item_name' ));
			me.down('[name=item_spec]'		).setValue(record.get('item_spec' ));
			me.down('[name=cont_pric]'		).setValue(record.get('cont_pric' ));
			me.down('[name=cstm_lott_numb]'	).setValue(record.get('cstm_lott_numb' ));
			me.down('[name=invc_qntt]'		).setValue('1');
			me.down('[name=user_memo]'		).setValue('');


			if (config.append) {
				me.appendItem( { panel : config.panel });
			} else {
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
		var srfc_proc_yorn = '';
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
//			cstm_lott_numb	: me.down('[name=cstm_lott_numb]').getValue(),
//			invc_qntt		: me.down('[name=invc_qntt]').getValue(),
//			cont_pric		: me.down('[name=cont_pric]').getValue(),
//			sply_amnt		: me.down('[name=sply_amnt]').getValue(),
//			vatx_amnt		: me.down('[name=vatx_amnt]').getValue(),
//			invc_amnt		: me.down('[name=invc_amnt]').getValue(),
//			deli_date2		: Ext.Date.format(me.down('[name=deli_date2]').getValue(),'Y-m-d'),
//			remk_text		: me.down('[name=user_memo]').getValue(),
//			mtrl_bacd		: me.down('[name=mtrl_bacd]').getValue(),
//			item_clss_bacd	: me.down('[name=item_clss_bacd]').getValue(),
//			item_bacd		: me.down('[name=item_bacd]').getValue(),
//			make_bacd		: me.down('[name=make_bacd]').getValue(),
//			srfc_proc_yorn	: srfc_proc_yorn,
//			emgc_yorn		: emgc_yorn,

			mtrl_bacd_name		: me.down('[name=mtrl_bacd_name]').getValue(),
			item_clss_bacd_name	: me.down('[name=item_clss_bacd_name]').getValue(),
			item_bacd_name		: me.down('[name=item_bacd_name]').getValue(),
			make_bacd_name		: me.down('[name=make_bacd_name]').getValue(),
		});
		if(_global.hq_id.toUpperCase() == "N1000NBOLT"){
			if (!is_equal) {
				store.add(record);
			}
		} else{
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
				store.commitChanges();
			}
		}
		me.attachItem({ clear : true });

	},
});
