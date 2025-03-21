Ext.define('module.sale.salework.view.SaleWorkWorkerSearch', { extend: 'Axt.form.Search',

	alias   : 'widget.module-salework-worker-search',

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
			 		{	xtype  : 'fieldcontainer',
			 			layout : { type: 'vbox', align: 'stretch' },
			 			width  : 100,
			 			margin : '0 2 0 0',
			 			items  : [
			 			 	{   text: '품목코드' ,
			 			 		xtype : 'label'
			 			 	},
			 			 	{	xtype     : 'popupfield'  ,
			 			 		editable	: true,
								enableKeyEvents : true,
			 			 		name      : 'brcd'     ,
			 			 		pair      : 'item_name'     ,
			 			 		itemId    : 'initfocused' ,
			 			 		editable  : true          ,
			 			 		enableKeyEvents: true     ,
			 			 		listeners : {
			 			 			keydown:function(self,e){
			 			 		        /* 엔터키 이벤트를 호출한다. */
			 			 				if (e.keyCode ==  e.ENTER ){
			 			 					self.onTriggerClick(); /* 팝업창을 호출한다. */
			 			 				} else
			 			 				if (e.keyCode == e.ESC){
			 			 					me.attachItem({ clear : true });
			 			 				}
			 			 			}
			 			 		},
			 			 		popup     : {
			 			 			select : 'MULTI' ,
			 			 			widget : 'lookup-item-popup' ,
			 			 			values : { },
			 			 			option : { hq_itm_recv : true, direct_result : true }, /* 공통상품수신 버튼 사용 */
			 			 			params : { stor_id : _global.stor_id , line_stat : '0' } ,
			 						apiurl : {
			 							master : _global.api_host_info + '/system/item/itemstore/get/product/sale.do'
			 						},
			 			 			result : function(records, nameField, pairField) {
			 			 				var panel = nameField.up('form');
			 			 				me.selectItem( { records : records } );
			 			 				setTimeout(function(){
			 			 					panel.down('[name=qty]').focus(true , 10);
			 			 				},200);
			 			 			},
			 						create : function (self ) {
			 			 				Ext.merge( self.popup.values , {
			 			 					brcd : self.getValue()
			 			 				});
			 			 				var values = Ext.ComponentQuery.query('module-salework-worker-editor')[0].getForm().getRecord();
			 			 				if (values) {
			 			 					Ext.merge(self.popup.params, {
			 			 						stor_id : values.get('stor_id'),
			 			 						pri_no : values.get('pri_no'),
			 			 						cust_idcd  : values.get('cust_idcd'),
			 			 						chnl  : values.get('chnl')
			 			 					});
			 			 				}
			 			 			}
			 			 		}
			 			 	},
			 			 	{   name : 'item_idcd', xtype : 'textfield' , hidden : true },
			 			 	{   name : 'item_code', xtype : 'textfield' , hidden : true }
			 			]
			 		},
			 		{	xtype  : 'fieldcontainer',
			 			layout : { type: 'vbox', align: 'stretch' },
			 			width  : 200,
			 			margin : '0 2 0 0',
			 			items  : [
			 			 	{   text: '품명' ,
			 			 		xtype : 'label'
			 			 	},
			 			 	{	xtype     : 'popupfield'  ,
			 			 		editable	: true,
								enableKeyEvents : true,
			 			 		name      : 'item_name'     ,
			 			 		editable  : true          ,
			 			 		enableKeyEvents: true     ,
			 			 		listeners : {
			 			 			keydown:function(self,e){
			 			 		        /* 엔터키 이벤트를 호출한다. */
			 			 				if (e.keyCode ==  e.ENTER ){
			 			 					self.onTriggerClick(); /* 팝업창을 호출한다. */
			 			 				} else
			 			 				if (e.keyCode == e.ESC){
			 			 					me.attachItem({ clear : true });
			 			 				}
			 			 			}
			 			 		},
			 			 		popup     : {
			 			 			select : 'MULTI' ,
			 			 			widget : 'lookup-item-popup' ,
			 			 			values : { },
			 			 			option : { hq_itm_recv : true, direct_result : true }, /* 공통상품수신 버튼 사용 */
			 			 			params : { stor_id : _global.stor_id , line_stat : '0' } ,
			 						apiurl : {
			 							master : _global.api_host_info + '/system/item/itemstore/get/product/sale.do'
			 						},
			 			 			result : function(records, nameField, pairField) {
			 			 				var panel = nameField.up('form');
			 			 				me.selectItem( { records : records } );
			 			 				setTimeout(function(){
			 			 					panel.down('[name=qty]').focus(true , 10);
			 			 				},200);
			 			 			},
			 						create : function (self ) {
			 			 				Ext.merge( self.popup.values , {
			 			 					item_name : self.getValue()
			 			 				});
			 			 				var values = Ext.ComponentQuery.query('module-salework-worker-editor')[0].getForm().getRecord();
			 			 				if (values) {
			 			 					Ext.merge(self.popup.params, {
			 			 						stor_id : values.get('stor_id'),
			 			 						pri_no : values.get('pri_no'),
			 			 						cust_idcd  : values.get('cust_idcd'),
			 			 						chnl  : values.get('chnl')
			 			 					});
			 			 				}
			 			 			}
			 			 		}
			 			 	}
			 			]
			 		},
			 		{	xtype  : 'fieldcontainer' ,
		 			    layout : { type: 'vbox', align: 'stretch' } ,
		 			    width  : 150 ,
		 			    margin : '0 2 0 0' ,
		 			    items  : [
		 			 	    {   text   : '규격', xtype : 'label', margin : '0 0 0 3' },
		 			 	    {   xtype  : 'textfield',
		 			 		    name   : 'item_spec',
//		 			 		    label  : '규격',
//		 			 		    readOnly : true ,
			 			 		margin : '0 0 0 3',
		 			 		    enableKeyEvents: true,
		 			 		    listeners:{
		 			 			    keydown:function(self,e){
		 			 				    if (e.keyCode == e.ENTER){
		 			 					    var panel   = self.up('form');
		 			 					    panel.down('[name=qty]').focus(true , 10);
			 			 				} else
			 			 				if (e.keyCode == e.ESC){
			 			 					me.attachItem({ clear : true });
			 			 				}
		 			 			    }
		 			 		    }
		 			 	    }
		 			    ]
		 		    },
			 		{	xtype  : 'fieldcontainer' ,
		 			    layout : { type: 'vbox', align: 'stretch' } ,
		 			    width  : 50 ,
		 			    margin : '0 2 0 0' ,
		 			    items  : [
		 			 	    {   text   : '단위', xtype : 'label', itemId : 'unit_name' },
		 			 	    {   xtype  : 'textfield',
		 			 		    name   : 'unit_name',
		 			 		    label  : '단위',
		 			 		    fieldCls : 'readonlyfield',
		 			 		    readOnly : true,
		 			 		    enableKeyEvents: true,
		 			 		    listeners:{
		 			 			    keydown:function(self,e){
		 			 				    if (e.keyCode == e.ENTER ){
		 			 					    var panel   = self.up('form');
		 			 					    panel.down('[name=qty]').focus(true , 10);
		 			 			  	    }
		 			 			    }
		 			 		    }
		 			 	    }
		 			    ]
		 		    },
			 		{   xtype  : 'fieldcontainer' ,
			 			layout : { type: 'vbox', align: 'stretch' } ,
			 			width  : 55 ,
			 			margin : '0 2 0 0' ,
			 			items  : [
			 			 	{   text    : '수량', xtype : 'label', style: "text-align:right" } ,
			 			 	{   xtype   : 'numericfield' ,
			 			 		name    : 'qty'   ,
			 			 		enableKeyEvents : true ,
			 			 		listeners:{
			 			 			change :function( self , value ) {
			 			 				var panel   = self.up('form')
			 			 					inv_amt = Number( value) * Number( panel.down('[name=pri]').getValue())
			 			 				;
			 			 				panel.down('[name=inv_amt]').setValue( inv_amt );
			 			 			},
			 			 			keydown:function(self,e){
			 			 				if (e.keyCode == e.ENTER ){
			 			 					var qty = self.up('form').down('[name=qty]').getValue();
			 			 					if(qty > 999999){
			 			 						Ext.Msg.show({ title: '알림', msg: "수량은 999,999개 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
			 			 							fn : function (button) {
			 			 								self.up('form').down('[name=qty]').focus(true, 10);
			 			 							}
			 			 						});
			 			 						return;
			 			 					}
			 			 					self.up('form').down('[name=pri]').focus(true , 10);
			 			 				} else
			 			 				if (e.keyCode == e.ESC){
			 			 					me.attachItem({ clear : true });
			 			 				}

			 			 			}
			 			 		}
			 			 	}
			 			]
			 		},
			 		{	xtype  : 'fieldcontainer'  ,
			 			layout : { type: 'vbox', align: 'stretch' } ,
			 			margin : '0 2 0 0'  ,
			 			width  : 70    ,
			 			items  : [
			 			 	{   xtype : 'label', text: '단가', style: "text-align:right"} ,
			 			 	{	xtype : 'numericfield' ,
			 			 		name  : 'pri' ,
			 			 		label : '단가'  ,
			 			 		enableKeyEvents : true  ,
			 			 		listeners:{
			 			 			change : function( self , value ) {
			 			 			    var panel   = self.up('form')
			 			 					inv_amt = Number( value) * Number( panel.down('[name=qty]').getValue())
			 			 				;
			 			 				panel.down('[name=inv_amt]').setValue( inv_amt )
			 			 			},
			 			 			keydown : function(self,e){
			 			 				if (e.keyCode ==  e.ENTER ){
			 			 					var pri = self.up('form').down('[name=pri]').getValue();
			 			 					if(pri > 10000000){
			 			 						Ext.Msg.show({ title: '알림', msg: "단가는 10,000,000원 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
			 			 							fn : function (button) {
			 			 								self.up('form').down('[name=pri]').focus(true, 10);
			 			 							}
			 			 						});
			 			 						return;
			 			 					}
			 			 					var panel = self.up('form');
			 			 						value = panel.down('[name=item_idcd]' ).getValue()
			 			 					;
			 			 					if (value.trim() != '') {
			 			 						me.appendItem({});
			 			 					}
			 			 				} else
			 			 				if (e.keyCode == e.ESC){
			 			 					me.attachItem({ clear : true });
			 			 				}

			 			 			}
			 			 		}
			 			 	}
			 			]
			 		},
			 		{	xtype  : 'fieldcontainer' ,
			 			layout : { type : 'vbox', align: 'stretch' } ,
			 			width  : 80,
			 			margin : '0 2 0 0' ,
			 			items  : [
			 			 	{   xtype    : 'label', text : '금액', style: "text-align:right"},
			 			 	{   xtype    : 'numericfield',
			 			 		name     : 'inv_amt',
			 			 		fieldCls : 'readonlyfield',
			 			 		readOnly : true
			 			 	}
			 			]
			 		},
			 		{   name : 'mst_itm_id'      , xtype : 'textfield'    , hidden : true   },
			 		{   name : 'mst_itm_cd'      , xtype : 'textfield'    , hidden : true   },
			 		{   name : 'unit_idcd'      , xtype : 'textfield'    , hidden : true   },
			 		{   name : 'piece_qty'     , xtype : 'numericfield' , hidden : true   },
			 		{   name : 'brand_id'     , xtype : 'textfield'    , hidden : true   },
			 		{   name : 'brand_nm'     , xtype : 'textfield'    , hidden : true   },
			 		{   name : 'maker_id'       , xtype : 'textfield'    , hidden : true   },
			 		{   name : 'mfg_nm'       , xtype : 'textfield'    , hidden : true   },
			 		{   name : 'unt_pri'   , xtype : 'numericfield' , hidden : true   },
			 		{   name : 'cust_pri'   , xtype : 'numericfield' , hidden : true   },
			 		{   name : 'txfree_yn'     , xtype : 'textfield'    , hidden : true   },
			 		{   name : 'po_pri'     , xtype : 'textfield'    , hidden : true   },
			 		{   name : 'po_pri_type', xtype : 'textfield'    , hidden : true   },
			 		{   name : 'po_pri_rt', xtype : 'numericfield' , hidden : true   },
					{   xtype: 'tbseparator' , width : 35 },
					{
						xtype: 'button' ,
						text : '확인',
						width : 90,
						height : 35,
						scope: me,
						handler: function(self,e){ //me.appendItem

							var qty = self.up('form').down('[name=qty]').getValue();
		 					if(qty > 999999){
		 						Ext.Msg.show({ title: '알림', msg: "수량은 999,999개 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
		 							fn : function (button) {
		 								self.up('form').down('[name=qty]').focus(true, 10);
		 							}
		 						});
		 						return;
		 					}
		 					var panel = self.up('form');
								value = panel.down('[name=item_idcd]' ).getValue()
		 					;
		 					if (value.trim() != '') {
		 						me.appendItem({});
		 					}


		 					var pri = self.up('form').down('[name=pri]').getValue();
		 					if(pri > 10000000){
		 						Ext.Msg.show({ title: '알림', msg: "단가는 10,000,000원 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
		 							fn : function (button) {
		 								self.up('form').down('[name=pri]').focus(true, 10);
		 							}
		 						});
		 						return;
		 					}
		 					var panel = self.up('form');
		 						value = panel.down('[name=item_idcd]' ).getValue()
		 					;
		 					if (value.trim() != '') {
		 						me.appendItem({});
		 					}
	 					}
 					}
			 	]
			}
		;
		return line;
	},

	createLine2 : function () {
		var me = this,
			line = {
				xtype  : 'container'  ,
		 		margin : '0 0 0 0'    ,
		 		itemId : 'itemviewer' ,
				layout : 'border'     ,
				border : 1            ,
				style  : Const.borderLine.top +  Const.borderLine.bottom ,
				height : 35   ,
				html   : ''
			}
		;
		return line;
	},

	/**
	 * 품목 데이터를 조회한다.
	 */
	selectItem : function (config) {
		var me     = this,
			panel  = config.panel,
			length = config.records.length
		;
//		console.debug('selectItem config', config);
		Ext.each(config.records, function(record, index) {
			//http://www.sencha.com/forum/showthread.php?34047-Loop-Ext.Ajax.request
			me.attachItem( { panel : config.panel , record : record , append : (length > 1) } );
		});
	},

	/**
	 * 품목 정보를 첨부 시킨다.
	 */
	attachItem : function (config) {
		var me = this,
		 	clear  = config.clear,
		 	record = config.record,
		 	html   = config.html || ''
		;
//		console.debug('attachItem config', config);
		if (config.clear || !config.record) {
			html = '';
			me.getForm().reset();
			me.down('#itemviewer').update( html );
			me.down('[name=brcd]').focus(true , 10);
			me.down('[itemId=unit_name]'    ).update('단위')  ;
		} else {

			me.down('[name=brcd]'         ).setValue(record.get('item_code'        ));
			me.down('[name=mst_itm_id]'         ).setValue(record.get('mst_itm_id'        ));
			me.down('[name=mst_itm_cd]'         ).setValue(record.get('mst_itm_cd'        ));
			me.down('[name=unit_idcd]'         ).setValue(record.get('unit_idcd'        ));
			me.down('[name=unit_name]'         ).setValue(record.get('unit_name'        ));
			me.down('[name=piece_qty]'        ).setValue(record.get('piece_qty'       ));
			me.down('[name=item_idcd]'         ).setValue(record.get('item_idcd'        ));
			me.down('[name=item_code]'         ).setValue(record.get('item_code'        ));
			me.down('[name=item_name]'         ).setValue(record.get('item_name'        ));
			me.down('[name=item_spec]'         ).setValue(record.get('item_spec'        ));
			me.down('[name=qty]'             ).setValue('1');
			me.down('[name=pri]'           ).setValue(record.get('cust_pri'     ));
			me.down('[name=inv_amt]'          ).setValue(record.get('cust_pri'     ));
			me.down('[name=po_pri]'        ).setValue(record.get('po_pri'       ));
			me.down('[name=unt_pri]'      ).setValue(record.get('sale_pri'     ));
			me.down('[name=cust_pri]'      ).setValue(record.get('cust_pri'     ));
			me.down('[name=po_pri_type]'   ).setValue(record.get('po_pri_type'  ));
			me.down('[name=po_pri_rt]'   ).setValue(record.get('po_pri_rt'  ));
			me.down('[name=brand_id]'		 ).setValue(record.get('brand_id'   	));
			me.down('[name=brand_nm]'        ).setValue(record.get('brand_nm'   	));
			me.down('[name=maker_id]'      	 ).setValue(record.get('maker_id'     	));
			me.down('[name=mfg_nm]'      	 ).setValue(record.get('mfg_nm'     	));
			me.down('[name=txfree_yn]'      	 ).setValue(record.get('txfree_yn'     	));
			me.down('[itemId=unit_name]'    ).update('단위[' + record.get('piece_qty') + '] ')  ;

//			me.down('[name=safe_dt]'    ).setValue(new Date());
			if (config.append) {
				me.appendItem( { panel : config.panel });
			} else {
				html = '<div>'
					+ '  <div style = "width: 300;  float : left" >'
					+ '  	<div>품목분류</div><div>'+ record.get('clss_nm') +'</div> '
					+ '  </div> '
					+ '  <div style = "width: 150;  float : left" >'
					+ '  	<div>제조사명</div><div>'+ record.get('mfg_nm') +'</div> '
					+ '  </div> '
					+ '  <div style = "width: 150;  float : left" >'
					+ '  	<div>브랜드명</div><div>'+ record.get('brand_nm') +'</div> '
					+ '  </div> '
					+ '  <div style = "width: 80; float : left" >'
					+ '  	<div align=right>소비자가</div><div align=right>'+ Ext.util.Format.number(record.get('cst_pri'), '0,000') +'</div> '
					+ '  </div> '
					+ '  <div style = "width: 80; float : left" >'
					+ '  	<div align=right>납품단가</div><div align=right>'+ Ext.util.Format.number(record.get('cust_pri'), '0,000') +'</div> '
					+ '  </div> '
					+ '  <div style = "width: 80; float : left" >'
					+ '  	<div align=right>현재고</div><div align=right>'+ Ext.util.Format.number(record.get('stock'), '0,000') +'</div> '
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
		var  me     = this,
			store  = me.ownerCt.getStore(),
			editor = me.ownerCt.editor,
			record = undefined,
			findrecord = undefined,
			is_equal = false
		;
		var seq = editor.getSEQ();
		var dsp = editor.getDSP();

		record = Ext.create( store.model.modelName , {
			line_seqn       : seq ,
			seq_top       : seq ,
			seq_dsp       : dsp ,
			mst_itm_id       : me.down('[name=mst_itm_id]'         ).getValue(),
			mst_itm_cd       : me.down('[name=mst_itm_cd]'         ).getValue(),
			unit_idcd       : me.down('[name=unit_idcd]'         ).getValue(),
			unit_name       : me.down('[name=unit_name]'         ).getValue(),
			piece_qty      : me.down('[name=piece_qty]'        ).getValue(),
			item_idcd       : me.down('[name=item_idcd]'         ).getValue(),
			item_code       : me.down('[name=item_code]'         ).getValue(),
			item_name       : me.down('[name=item_name]'         ).getValue(),
			item_spec       : me.down('[name=item_spec]'         ).getValue(),
			po_pri      : me.down('[name=po_pri]'        ).getValue(),

			unt_pri    : me.down('[name=unt_pri]'      ).getValue(),
			cust_pri    : me.down('[name=cust_pri]'      ).getValue(),

			qty           : me.down('[name=qty]'             ).getValue(),
			pri         : me.down('[name=pri]'           ).getValue(),
			brand_id      : me.down('[name=brand_id]'        ).getValue(),
			brand_nm      : me.down('[name=brand_nm]'        ).getValue(),
			maker_id        : me.down('[name=maker_id]'          ).getValue(),
			mfg_nm        : me.down('[name=mfg_nm]'          ).getValue(),
			txfree_yn      : me.down('[name=txfree_yn]'        ).getValue(),
			po_pri_type : me.down('[name=po_pri_type]'   ).getValue(),
			po_pri_rt : me.down('[name=po_pri_rt]'   ).getValue()
		});

		store.each(function(findrecord) {
			if (findrecord.get('item_idcd') == record.get('item_idcd')
					&& findrecord.get('item_code') == record.get('item_code')
					&& findrecord.get('item_name') == record.get('item_name')
					&& findrecord.get('item_spec') == record.get('item_spec')
					&& findrecord.get('unit_name') == record.get('unit_name')
					&& findrecord.get('pri') == record.get('pri')) {
				is_equal = true;
				// 상품의 수량을 추가
				findrecord.set("qty", findrecord.get('qty') + record.get('qty'));
				findrecord.recalculation(editor.getRecord());
			}
		});
		// 상품을 추가
		if (!is_equal) {
			record.recalculation(editor.getRecord());
			store.add(record);
		}

		me.attachItem({ clear : true });
	}
});
