Ext.define('module.custom.sjflv.sale.order.estimast.view.EstiMastWorkerSearch', { extend: 'Axt.form.Search',
	store	: 'module.custom.sjflv.sale.order.estimast.store.EstiMastInvoice',
	alias	: 'widget.module-sjflv-estimast-worker-search',
	style	: 'padding-top : 1px;' ,
	height	: 57,
	autoScroll:true,
	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.items = [me.createLine1()];
		me.callParent();
	},

	createLine1 : function(){
		var me   = this,
			line = {
				xtype  : 'fieldset' ,
				margin : '0 0 0 0' ,
				width : 819,
				items  : [{	xtype	: 'fieldcontainer',
					layout	: { type: 'vbox', align: 'stretch' },
//					width	: 120,
					hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
					style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
					margin	: '3 0 3 0',
					items	: [
//						{	text		: 'REV', xtype : 'label', style : 'text-align:center;'
//						},{	xtype		: 'numericfield',
//							name		: 'revs_numb',
//							margin		: '2 2 2 2',
//							width		: 50,
//							enableKeyEvents : true,
//							readOnly	: true,
//							fieldCls	: 'readonlyfield',
//						}
//						{	text		: '품목코드' , xtype : 'label',	style : 'text-align:center;',hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
//						},{	xtype		: 'popupfield',
//							editable	: true,
//							enableKeyEvents : true,
//							margin		: '2 2 2 2',
//							name		: 'item_code',
//							pair		: 'item_name',
//							itemId		: 'initfocused' ,
//							hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
//							clearable	: true,
//							editable	: true ,
//							enableKeyEvents: true ,
//							listeners	: {
//								keydown : function(self, e) {
//									/* 엔터키 이벤트를 호출한다. */
//									if (e.keyCode == e.ENTER ) {
//										/* 팝업창을 호출한다. */
//										self.onTriggerClick();
//									} else if (e.keyCode == e.ESC) {
//										me.attachItem({ clear : true });
//									}
//								},
//								change:function(){
//									var	lister = Ext.ComponentQuery.query('module-sjflv-estimast-worker-lister')[0]
//										lister2 = Ext.ComponentQuery.query('module-sjflv-estimast-worker-lister2')[0]
//									;
//									if(this.getValue()==""){
//
//										lister.getStore().clearData();
//										lister.getStore().loadData([],false);
//										lister2.getStore().clearData();
//										lister2.getStore().loadData([],false);
//
//										me.down('[name=item_name]').setValue("");
//										me.down('[name=item_spec]').setValue("");
//										me.down('[name=revs_numb]').setValue("");
//										me.down('[name=mtrl_yeld]').setValue(""),
//										me.down('[name=make_cost]').setValue("")
//										me.down('[name=yeld_add_pric]').setValue("");
//										me.down('[name=cost_pric]').setValue("");
//										me.down('[name=esti_pric]').setValue("");
//
//									}
//								}
//							},
//							popup		: {
//								select	: 'MULTI',
//								widget	: 'lookup-item-popup-sjung',
//								values	: { },
//								option	: { direct_result : true },
//								params	: {	stor_grp	: _global.stor_grp,
//											stor_id		: _global.stor_id,
//											line_stat	: '0',
//											acct_bacd	: '제품',
//											add			: '1'
//								},
////								apiurl	: {
////									master : _global.api_host_info + '/system/item/itemmast/get/product.do'
////								},
//								result	: function(records, nameField, pairField) {
//									var panel = nameField.up('form');
//									nameField.setValue(records[0].get('item_code'));
//									pairField.setValue(records[0].get('item_name'));
//									panel.down('[name=item_idcd]').setValue(records[0].get('item_idcd'));
//									panel.down('[name=revs_numb]').setValue(records[0].get('revs_numb'));
//									var	lister = Ext.ComponentQuery.query('module-sjflv-estimast-worker-lister')[0],
//										lister2 = Ext.ComponentQuery.query('module-sjflv-estimast-worker-lister2')[0],
//										editor = Ext.ComponentQuery.query('module-sjflv-estimast-worker-editor')[0]
//									;
//									lister.getStore().clearData();
//									lister.getStore().loadData([],false);
//									lister2.getStore().clearData();
//									lister2.getStore().loadData([],false);
//
//									Ext.Ajax.request({
//										url		: _global.location.http() + '/custom/sjflv/sale/order/estimast/get/bom.do',
//										params	: {
//											token : _global.token_id,
//											param : JSON.stringify({
//												item_idcd		: records[0].get('item_idcd'),
//												revs_numb		: records[0].get('revs_numb')
//											})
//										},
//										async	: false,
//										method	: 'POST',
//										success	: function(response, request) {
//											var result = Ext.decode(response.responseText);
//											if	(!result.success ){
//												Ext.Msg.error(result.message );
//												return;
//											} else {
//
//												Ext.each(result.records,function(record){
//													data = Ext.create(lister.getStore().model.modelName,record);
//													lister.getStore().add(data);
//												})
//											}
//										},
//										failure : function(result, request) {
//										},
//										callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//										}
//									});
//								},
//							}
//						},{	name	: 'item_idcd'		, xtype : 'textfield', hidden : true,
//						}
					]
				}
//				,{	xtype	: 'fieldcontainer',
//						layout	: { type: 'vbox', align: 'stretch' },
//						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
//						margin	: '3 0 3 0',
//						width	: 200,
//						items	: [
//							{	text		: '품명' , xtype : 'label', style : 'text-align:center;'
//							},{	xtype		: 'textfield',
//								name		: 'item_name',
//								margin		: '2 2 2 2',
//								enableKeyEvents : true,
//								readOnly	: true,
//								fieldCls	: 'readonlyfield',
//							}
//						]
//					}
//				,{
//						xtype	: 'fieldcontainer'  ,
//						layout	: { type: 'vbox', align: 'stretch' } ,
//						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
//						margin	: '3 0 3 0',
//						width	: 200 ,
//						items	: [
//							{	text		: '규격', xtype : 'label', style : 'text-align:center;'
//							},{	xtype		: 'textfield',
//								name		: 'item_spec',
//								margin		: '2 2 2 2',
//								enableKeyEvents : true,
//								readOnly	: true,
//								fieldCls	: 'readonlyfield',
//							}
//						]
//					},
					,{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 60 ,
						items	: [
							{	text		: '수율(%)', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'mtrl_yeld',
								margin		: '2 2 2 2',
								width		: 40,
								enableKeyEvents : true,
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right+  Const.borderLine.left  ,
						margin	: '3 0 3 0',
						width	: 100 ,
						items	: [
							{	text		: '가공비', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'make_cost',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
							}
						]
					},{	xtype		: 'button',
						text : '<span class="write-button" style="line-height: 35px;font-size:2em !important">계산</span>',
						cls			: 'button-style',
						height		: 45,
						margin		: '3 2 2 2',
						handler		: function(){
							var lister = Ext.ComponentQuery.query('module-sjflv-estimast-worker-lister')[0],
								val    = lister.getStore().sum('amnt'),
								mtrl_yeld = me.down('[name=mtrl_yeld]').getValue(),
								make_cost = me.down('[name=make_cost]').getValue()
							;
							if(val > 0 && mtrl_yeld >= 0 && make_cost >= 0 && mtrl_yeld != "" && make_cost != "" && mtrl_yeld != null && make_cost != null){
								var cost = val * (100/mtrl_yeld)+make_cost;
								me.down('[name=yeld_add_pric]').setValue(val * (100/mtrl_yeld));
								me.down('[name=cost_pric]').setValue(cost);

								if(me.down('[name=pfit_rate]').getValue() > 0 ){
									var	value = cost + (cost * (me.down('[name=pfit_rate]').getValue()* 0.01))
									;
									me.down('[name=esti_pric]').setValue(Math.ceil(value / 100)*100);
								}
								me.calc(cost);
							}else{
								Ext.Msg.alert('알림','제조원가(price), 수율, 가공비를 입력해주세요.');
								return;
							}
						}
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 100 ,
						items	: [
							{	text		: '수율반영가격', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'yeld_add_pric',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
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
							{	text		: '가공비+반영가격', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'cost_pric',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 60 ,
						items	: [
							{	text		: '마진', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'pfit_rate',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	:{
									change	: function(){
										var cost = me.down('[name=cost_pric]').getValue();
										if(cost >= 0){
											var	value = cost + (cost * (this.getValue()* 0.01));
											me.down('[name=esti_pric]').setValue(Math.ceil(value / 100)*100);
										}else{
											Ext.Msg.alert('알림','원가가 산정되지 않았습니다.');
											this.setValue(0);
											me.down('[name=esti_pric]').setValue("");
											return;
										}
									},
									blur	: function(){
										var cost = me.down('[name=cost_pric]').getValue();
										if(cost >= 0){
											var	value = cost + (cost * (this.getValue()* 0.01));
											me.down('[name=esti_pric]').setValue(Math.ceil(value / 100)*100);
										}else{
											Ext.Msg.alert('알림','원가가 산정되지 않았습니다.');
											this.setValue(0);
											me.down('[name=esti_pric]').setValue("");
											return;
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 100 ,
						items	: [
							{	text		: '마진반영가격', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'esti_pric',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
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
							{	text		: '최종선택가격', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'ttsm_amnt',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 110 ,
						items	: [
							{	text		: '비고', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'remk_text',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
							}
						]
					}
				]
			}
		;
		return line;
	},
	calc:function(cost){
		var	me = this,
			lister = Ext.ComponentQuery.query('module-sjflv-estimast-worker-lister2')[0]
		;
		lister.getStore().clearData();
		lister.getStore().loadData([],false);

		for (var i = 0; i < 7; i++) {
			record = Ext.create(lister.getStore().model.modelName,{
				margin : i*5,
				amnt   : Math.ceil( (cost + (cost * ( (i*5) * 0.01))) / 100 )*100
			});
			lister.getStore().add(record);
		}
	}

});
