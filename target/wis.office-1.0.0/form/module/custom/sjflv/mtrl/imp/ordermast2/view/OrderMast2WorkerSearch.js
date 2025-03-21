Ext.define('module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2WorkerSearch', { extend: 'Axt.form.Search',
	store	: 'module.custom.sjflv.mtrl.imp.ordermast2.store.OrderMast2Invoice',
	alias	: 'widget.module-ordermast2-worker-search',
	style	: 'padding-top : 1px;' ,

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.items = [me.createLine1(),me.createLine11()];
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
												acct_bacd	: '자재',
												acct_bacd	: '삼정(구매발주)'
									},
//									apiurl	: {
//										master : _global.api_host_info + '/system/item/itemmast/get/product.do'
//									},
									result	: function(records, nameField, pairField) {
										var panel = nameField.up('form');
											searchForm = Ext.ComponentQuery.query('module-saleorder3-worker-search')[0];
											me.selectItem( { records : records } );

										setTimeout(function(){
											panel.down('[name=unit_name]').focus(true , 10);
										},200);
									},
								}
							},{	name	: 'item_idcd'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 80 ,
						items	: [
							{	text		: '단위', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'unit_name',
								pair		: 'unit_idcd',
								itemId		: '' ,
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
									params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '8002'},
									result	: function(records, nameField, pairField) {
										var panel = nameField.up('form');
											nameField.setValue(records[0].get('unit_name'));
											pairField.setValue(records[0].get('unit_idcd'));
										setTimeout(function(){
											panel.down('[name=each_qntt]').focus(true , 10);
										},200);
									}
								}
							},{	name	: 'unit_idcd'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 80,
						items	: [
							{	text	: 'Each', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'each_qntt',
								margin	: '2 2 2 2',
								enableKeyEvents : true,
								listeners : {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var pack = me.down('[name=pckg_size]').getValue(),
												val  = this.getValue()
											;
											if(val>0){
												me.down('[name=qntt]').setValue(val*(pack>0?pack:0));
											}
											me.down('[name=pckg_size]').focus(true , 10);
										}
									},
									blur:function(){
										var pack = me.down('[name=pckg_size]').getValue(),
											val  = this.getValue()
										;
										if(val>0){
											me.down('[name=qntt]').setValue(val*(pack>0?pack:0));
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
							{	text	: 'Pack Size', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'pckg_size',
								margin	: '2 2 2 2',
								enableKeyEvents : true,
								listeners : {
									keydown : function(self, e) {
											if (e.keyCode == e.ENTER) {
												var each = me.down('[name=each_qntt]').getValue(),
												val  = this.getValue()
											;
											if(val>0){
												me.down('[name=qntt]').setValue(val*(each>0?each:0));
											}
											me.down('[name=exch_pric]').focus(true , 10);
										}
									},
									blur:function(){
										var each = me.down('[name=each_qntt]').getValue(),
											val  = this.getValue()
										;
										if(val>0){
											me.down('[name=qntt]').setValue(val*(each>0?each:0));
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
							{	text	: '수량', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'qntt',
								margin	: '2 2 2 2',
								enableKeyEvents : true,
								listeners : {
									change : function(self, value) {
										var	val			= this.getValue(),
											exch_pric	= me.down('[name=exch_pric]').getValue(),
											invc_amnt	= (val?val:0) * (exch_pric?exch_pric:0)
										;
										var editor = Ext.ComponentQuery.query('module-ordermast2-worker-editor')[0]
										;
										var exrt = editor.down('[name=exrt]').getValue();
										me.down('[name=exch_amnt]').setValue(invc_amnt);
										me.down('[name=krwn_pric]').setValue(val * exrt);
										me.down('[name=krwn_amnt]').setValue(exrt * invc_amnt);
									},
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
							},{	xtype		: 'numericfield',
								name		: 'exch_pric',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners : {
									keydown : function(self, e) {
											if (e.keyCode == e.ENTER) {
												var	val			= this.getValue(),
												exch_pric	= me.down('[name=exch_pric]').getValue(),
												invc_amnt	= (val?val:0) * (exch_pric?exch_pric:0)
											;
											var editor = Ext.ComponentQuery.query('module-ordermast2-worker-editor')[0]
											;
											var exrt = editor.down('[name=exrt]').getValue();
											me.down('[name=exch_amnt]').setValue(invc_amnt);
											me.down('[name=krwn_pric]').setValue(val * exrt);
											me.down('[name=krwn_amnt]').setValue(exrt * invc_amnt);
											me.down('[name=user_memo]').focus(true , 10);
										}
									},
									blur:function(){
										var each = me.down('[name=each_qntt]').getValue(),
											val  = this.getValue()
										;
										if(val>0){
											me.down('[name=qntt]').setValue(val*(each>0?each:0));
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top + Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 110,
						items	: [
							{	text		: '금액', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'exch_amnt',
								margin		: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								enableKeyEvents : true,
								listeners: {
									change : function(self, value) {
									},
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 80,
						items	: [
							{	text	: '원화단가', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'krwn_pric',
								margin	: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 110,
						items	: [
							{	text		: '원화금액', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'krwn_amnt',
								margin		: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						hidden	: false,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 245,
						items	: [
							{	text		: '비고', xtype : 'label'	, style:  'text-align:center;'
							},{	xtype		: 'textfield',
								margin		: '2 2 2 2',
								name		: 'user_memo',
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
				items  : [
					{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						width	: 242 ,
						items	: [
							{	text		: '품명' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'item_name',
								margin		: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 200 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '규격', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'item_spec',
								margin		: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',

							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 190,
						items	: [
							{	text		: 'HS Code' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: '',
								margin		: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 100,
						items	: [
							{	text	: '유통기한', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: '',
								margin	: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',

							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 100,
						items	: [
							{	text	: '현재고', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: '',
								margin	: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 100,
						items	: [
							{	text	: '안전재고', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: '',
								margin	: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	name : 'prnt_idcd'	, xtype : 'textfield'    , hidden : true
					}
				]
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
			record	= config.record
		;
		if (config.clear || !config.record) {
			me.getForm().reset();
		} else {
			var val = [],
				result1 = []
			;
				me.down('[name=item_idcd]'		).setValue(record.get('item_idcd' ));
				me.down('[name=item_name]'		).setValue(record.get('item_name' ));
				me.down('[name=item_code]'		).setValue(record.get('item_code' ));
				me.down('[name=item_spec]'		).setValue(record.get('item_spec' ));
			if (config.append) {
				me.appendItem( { panel : config.panel });
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
		console.log(me.ownerCt.editor);
		var seq = editor.getSEQ();
		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = 0;
		}
		record = Ext.create( store.model.modelName , {
			line_seqn		: seq,
			uper_seqn		: uper_seqn,
			invc_numb		: editor.down('[name=invc_numb]').getValue(),
			item_idcd		: me.down('[name=item_idcd]').getValue(),
			item_code		: me.down('[name=item_code]').getValue(),
			item_name		: me.down('[name=item_name]').getValue(),
			item_spec		: me.down('[name=item_spec]').getValue(),
			unit_idcd		: me.down('[name=unit_idcd]').getValue(),
			unit_name		: me.down('[name=unit_name]').getValue(),
			each_qntt		: me.down('[name=each_qntt]').getValue(),
			pckg_size		: me.down('[name=pckg_size]').getValue(),
			qntt			: me.down('[name=qntt]').getValue(),
			exch_pric		: me.down('[name=exch_pric]').getValue(),
			exch_amnt		: me.down('[name=exch_amnt]').getValue(),
			krwn_pric		: me.down('[name=krwn_pric]').getValue(),
			krwn_amnt		: me.down('[name=krwn_amnt]').getValue(),
			user_memo		: me.down('[name=user_memo]').getValue(),
		});
		store.each(function(findrecord) {
			if (   findrecord.get('item_idcd') == record.get('item_idcd')
				&& findrecord.get('unit_idcd') == record.get('unit_idcd')) {
				console.log('?');
				is_equal = true;
				// 상품의 수량을 추가
				findrecord.set("qntt", findrecord.get('qntt') + record.get('qntt'));
				findrecord.set("exch_pric", findrecord.get('exch_pric') + record.get('exch_pric'));
				findrecord.set("exch_amnt", findrecord.get('exch_amnt') + record.get('exch_amnt'));
				findrecord.set("krwn_pric", findrecord.get('krwn_pric') + record.get('krwn_pric'));
				findrecord.set("krwn_amnt", findrecord.get('krwn_amnt') + record.get('krwn_amnt'));
				findrecord.set("each_qntt", findrecord.get('each_qntt') + record.get('each_qntt'));
				findrecord.set("pckg_size", findrecord.get('pckg_size') + record.get('pckg_size'));
			}
		});
		// 상품을 추가
		if (!is_equal) {
			store.add(record);
//			store.commitChanges();
		}
		me.attachItem({ clear : true });

	},
});
