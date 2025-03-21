Ext.define('module.custom.sjflv.sale.export.ordermast2.view.OrderMast2WorkerSearch', { extend: 'Axt.form.Search',
	store	: 'module.custom.sjflv.sale.export.ordermast2.store.OrderMast2Invoice',
	alias	: 'widget.module-sjflv-export-ordermast2-worker-search',
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
//									apiurl	: {
//										master : _global.api_host_info + '/system/item/itemmast/get/product.do'
//									},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_code'));
										pairField.setValue(records[0].get('item_idcd'));
										me.down('[name=item_name]').setValue(records[0].get('item_name'));
										me.down('[name=item_spec]').setValue(records[0].get('item_spec'));
										me.selectItem( { records : records } );
										setTimeout(function(){
											me.down('[name=unit_name]').focus(true , 10);
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
											me.down('[name=qntt]').focus(true , 10);
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
											var	val			= this.getValue(),
											exch_pric	= me.down('[name=exch_pric]').getValue(),
											editor		= Ext.ComponentQuery.query('module-sjflv-export-ordermast2-worker-editor')[0]
											;
											var exrt = editor.down('[name=exrt]').getValue()
											;
											if(val > 0 && exch_pric > 0 ){
												var exch_amnt = Math.round((val * exch_pric) * 100) / 100.0;
												var krwn_pric = Math.round(Number(exch_pric?exch_pric:0) * Number(exrt?exrt:0));
												var krwn_amnt = Math.round(val * krwn_pric);

												me.down('[name=exch_amnt]').setValue(exch_amnt);
												me.down('[name=krwn_pric]').setValue(krwn_pric);
												me.down('[name=krwn_amnt]').setValue(krwn_amnt);
											}

											me.down('[name=exch_pric]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									},
									blur:function(){
										var	val			= this.getValue(),
											exch_pric	= me.down('[name=exch_pric]').getValue(),
											editor		= Ext.ComponentQuery.query('module-sjflv-export-ordermast2-worker-editor')[0]
										;
										var exrt = editor.down('[name=exrt]').getValue()
										;
										if(val > 0 && exch_pric > 0 ){
											var exch_amnt = Math.round((val * exch_pric) * 100) / 100.0;
											var krwn_pric = Math.round(Number(exch_pric?exch_pric:0) * Number(exrt?exrt:0));
											var krwn_amnt = Math.round(val * krwn_pric);

											me.down('[name=exch_amnt]').setValue(exch_amnt);
											me.down('[name=krwn_pric]').setValue(krwn_pric);
											me.down('[name=krwn_amnt]').setValue(krwn_amnt);
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
							{	text		: '판매단가' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'exch_pric',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var	val			= this.getValue(),
												qntt		= me.down('[name=qntt]').getValue(),
												editor		= Ext.ComponentQuery.query('module-sjflv-export-ordermast2-worker-editor')[0]
											;
											var exrt = editor.down('[name=exrt]').getValue()
											;
											if(val > 0 && qntt > 0 ){
												var exch_amnt = Math.round((val * qntt) * 100) / 100.0;
												var krwn_pric = Math.round(Number(val?val:0) * Number(exrt?exrt:0));
												var krwn_amnt = Math.round(qntt * krwn_pric);

												me.down('[name=exch_amnt]').setValue(exch_amnt);
												me.down('[name=krwn_pric]').setValue(krwn_pric);
												me.down('[name=krwn_amnt]').setValue(krwn_amnt);
											}
											me.down('[name=hala_yorn]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									},
									blur:function(){
										var	val			= this.getValue(),
											qntt		= me.down('[name=qntt]').getValue(),
											editor		= Ext.ComponentQuery.query('module-sjflv-export-ordermast2-worker-editor')[0]
										;
										var exrt = editor.down('[name=exrt]').getValue()
										;
										if(val > 0 && qntt > 0 ){
											var exch_amnt = Math.round((val * qntt) * 100) / 100.0;
											var krwn_pric = Math.round(Number(val?val:0) * Number(exrt?exrt:0));
											var krwn_amnt = Math.round(qntt * krwn_pric);

											me.down('[name=exch_amnt]').setValue(exch_amnt);
											me.down('[name=krwn_pric]').setValue(krwn_pric);
											me.down('[name=krwn_amnt]').setValue(krwn_amnt);
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
								readOnly	: true,
								fieldCls	: 'readonlyfield'
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
								readOnly	: true,
								fieldCls	: 'readonlyfield',
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
								readOnly	: true,
								fieldCls	: 'readonlyfield'

							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 100,
						items	: [
							{	text		: '할랄여부' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'lookupfield'  ,
								margin		: '2 2 2 2',
								name		: 'hala_yorn',
								editable	: true ,
								enableKeyEvents: true ,
								lookupValue	: resource.lookup('yorn'),
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
								name		: 'remk_text',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											me.appendItem({});
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
							{	text		: '규격', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'item_spec',
								margin		: '2 2 2 2',
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
							{	text		: 'HS Code', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: '',
								margin		: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
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
								readOnly	: true,
								fieldCls	: 'readonlyfield',
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
		} else {
				me.down('[name=unit_idcd]'		).setValue(record.get('unit_idcd' ));
				me.down('[name=unit_name]'		).setValue(record.get('unit_name' ));
				me.down('[name=item_idcd]'		).setValue(record.get('item_idcd' ));
				me.down('[name=item_code]'		).setValue(record.get('item_code' ));
				me.down('[name=item_name]'		).setValue(record.get('item_name' ));
				me.down('[name=item_spec]'		).setValue(record.get('item_spec' ));
				me.down('[name=qntt]'			).setValue(record.get('qntt' ));
				me.down('[name=exch_pric]'		).setValue(record.get('exch_pric' ));
				me.down('[name=exch_amnt]'		).setValue(record.get('exch_amnt' ));
				me.down('[name=krwn_pric]'		).setValue(record.get('krwn_pric' ));
				me.down('[name=krwn_amnt]'		).setValue(record.get('krwn_amnt' ));
				me.down('[name=hala_yorn]'		).setValue(record.get('hala_yorn' ));
				me.down('[name=remk_text]'		).setValue(record.get('remk_text' ));
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
			editor		=  me.ownerCt.editor,
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false
		;
		var seq = editor.getSEQ();
		var hala_yorn = '';
		if(me.down('[name=hala_yorn]').getValue() == false ) {
			hala_yorn = '0';
		}	else if(me.down('[name=hala_yorn]').getValue() == false){
			hala_yorn = '1';
		}
		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		record = Ext.create( store.model.modelName , {
			line_seqn		: seq,
			item_idcd		: me.down('[name=item_idcd]').getValue(),
			item_code		: me.down('[name=item_code]').getValue(),
			item_name		: me.down('[name=item_name]').getValue(),
			item_spec		: me.down('[name=item_spec]').getValue(),
			unit_idcd		: me.down('[name=unit_idcd]').getValue(),
			unit_name		: me.down('[name=unit_name]').getValue(),
			qntt			: me.down('[name=qntt]').getValue(),
			exch_pric		: me.down('[name=exch_pric]').getValue(),
			exch_amnt		: me.down('[name=exch_amnt]').getValue(),
			krwn_pric		: me.down('[name=krwn_pric]').getValue(),
			krwn_amnt		: me.down('[name=krwn_amnt]').getValue(),
			hala_yorn		: me.down('[name=hala_yorn]').getValue(),
			remk_text		: me.down('[name=remk_text]').getValue(),
		});
		// 상품을 추가
		if (!is_equal) {
			store.add(record);
		}
		console.log(store);
		me.attachItem({ clear : true });

	},
});
