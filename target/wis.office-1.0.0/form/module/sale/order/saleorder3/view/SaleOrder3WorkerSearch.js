Ext.define('module.sale.order.saleorder3.view.SaleOrder3WorkerSearch', { extend: 'Axt.form.Search',
	store	: 'module.sale.order.saleorder3.store.SaleOrder3Invoice',
	alias	: 'widget.module-saleorder3-worker-search',
	style	: 'padding-top : 1px;' ,

	/**
	 *.
	 */
	initComponent: function () {
		var me = this;
		me.items = [me.createLine1(),me.createLine11(), me.createLine2() ];
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
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left ,
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
								clearable	: true,
								editable	: true ,
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
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
										var panel = nameField.up('form');
											searchForm = Ext.ComponentQuery.query('module-saleorder3-worker-search')[0];
											me.selectItem( { records : records } );


										if (Ext.isEmpty(searchForm.down('[name=deli_date2]').getValue())){
											var date1	= searchForm.down('[name=deli_hidn]').getValue(),
												date	= Ext.Date.format(new Date(date1), 'Y-m-d')
											;
											searchForm.down('[name=deli_date2]').setValue(date);
										}

										setTimeout(function(){
											panel.down('[name=item_clss_bacd_name]').focus(true , 10);
										},200);
									},
									create : function (self ) {
										editor = Ext.ComponentQuery.query('module-saleorder3-worker-editor')[0];
										param = editor.getValues()
										if(param.cstm_idcd== '' || param.cstm_idcd == null ){
												Ext.Msg.alert("알림","거래처를 먼저 선택하여 주십시오.");
												popup.close();
												return;
										}
										else{
											Ext.merge( self.popup.values , {
												brcd : self.getValue()
											});
										}
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
							width	: 25,
							style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
							margin	: '3 0 3 0',
							items	: [
								{	text	: '＋',
									xtype	: 'button',
									margin	: '19 0 0 0',
									action	: 'inputAction',
									cls		: 'button1-style'
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
											panel.down('[name=offr_qntt]').focus(true, 10);
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
											panel.down('[name=invc_qntt]').focus(true, 10);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 140 ,
						hidden		: true,
						items	: [
							{	text		: '품목군', xtype : 'label', style : 'text-align:center;',hidden		: true,
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'item_clss_bacd_name',
								pair		: 'item_clss_bacd',
								hidden		: true,
								itemId		: 'item_clss_bacd_name' ,
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
									widget	: 'lookup-base-popup',
									values	: { },
									option	: { direct_result : true },
									params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '8001'},
									result	: function(records, nameField, pairField) {
										var panel = nameField.up('form');
										var	parent = records[0];
											panel.down('[name=item_clss_bacd]').setValue(parent.data.base_code);
											panel.down('[name=item_clss_bacd_name]').setValue(parent.data.base_name);
//										me.selectItem( { records : records } );
										setTimeout(function(){
											panel.down('[name=item_bacd_name]').focus(true , 10);
										},200);
									}
								}
							},{	name	: 'item_clss_bacd'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 140 ,
						items	: [
							{	text		: '품목구분', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'item_bacd_name',
								pair		: 'item_bacd',
								itemId		: 'item_bacd_name' ,
								value		: 'M/S 신규',
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
									widget	: 'lookup-base-popup',
									option	: { direct_result : true },
									params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '8002'},
									result	: function(records, nameField, pairField) {
										var panel = nameField.up('form');
										var	parent = records[0];
											panel.down('[name=item_bacd]').setValue(parent.data.base_code);
											panel.down('[name=item_bacd_name]').setValue(parent.data.base_name);
//										me.selectItem( { records : records } );
										setTimeout(function(){
											panel.down('[name=make_bacd_name]').focus(true , 10);
										},200);
									}
								}
							},{	name	: 'item_bacd'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 140 ,
						items	: [
							{	text		: '제조구분', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'make_bacd_name',
								pair		: 'make_bacd',
								itemId		: 'make_bacd_name' ,
								value		: '열후용',
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
									widget	: 'lookup-base-popup',
									values	: { },
									option	: { direct_result : true },
									params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '8003'},
									result	: function(records, nameField, pairField) {
										var panel = nameField.up('form');
										var	parent = records[0];
											panel.down('[name=make_bacd]').setValue(parent.data.base_code);
											panel.down('[name=make_bacd_name]').setValue(parent.data.base_name);
//										me.selectItem( { records : records } );
										setTimeout(function(){
											panel.down('[name=mtrl_bacd_name]').focus(true , 10);
										},200);
									}
								}
							},{	name	: 'make_bacd'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 140 ,
						items	: [
							{	text		: '재질구분', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'mtrl_bacd_name',
								pair		: 'mtrl_bacd',
								itemId		: 'mtrl_bacd_name' ,
								value		: 'SLD-10',
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
									widget	: 'lookup-base-popup',
									values	: { },
									option	: { direct_result : true },
									params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '3101'},
									result	: function(records, nameField, pairField) {
										var panel = nameField.up('form');
										var	parent = records[0];
											panel.down('[name=mtrl_bacd]').setValue(parent.data.base_code);
											panel.down('[name=mtrl_bacd_name]').setValue(parent.data.base_name);
//										me.selectItem( { records : records } );
										setTimeout(function(){
											panel.down('[name=emgc_yorn]').focus(true , 10);
										},200);
									}
								}
							},{	name	: 'mtrl_bacd'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 130 ,
						items	: [
							{	text		: '긴급여부', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
								items		: [
									{	xtype		: 'checkboxfield',
										boxLabel	: '예',
										name		: 'emgc_yorn1',
										style		: { color: 'Black'},
										margin		: '3 0 0 10',
										width		: 50,
										inputValue	: '0',
										listeners: {
											change: function(chkbox,newVal,oldVal){
												if(chkbox.getValue() == true){
													var a = me.down('[name=emgc_yorn0]').getValue();
													if(chkbox.getValue() == true && a == true){
														me.down('[name=emgc_yorn0]').setValue(false);
													}
												}
											}
										}
									},{	xtype		: 'checkboxfield',
										boxLabel	: '아니오',
										name		: 'emgc_yorn0',
										style		: { color: 'Black'},
										margin		: '3 0 0 10',
										width		: 70,
										inputValue	: '1',
										checked		: true,
										listeners: {
											change: function(chkbox,newVal,oldVal){
												if(chkbox.getValue() == true){
													var a = me.down('[name=emgc_yorn1]').getValue();
													if(chkbox.getValue() == true && a == true){
														me.down('[name=emgc_yorn1]').setValue(false);
													}
												}
											},
										}
									}
								]
							}

//							{	xtype		: 'lookupfield',
//								margin		: '2 2 2 2',
//								name		: 'emgc_yorn',
//								itemId		: 'emgc_yorn' ,
//								editable	: false,
//								lookupValue	: resource.lookup('yorn'),
//								editable	: true ,
//								enableKeyEvents: true ,
//								listeners	: {
//									keydown : function(self, e) {
//										/* 엔터키 이벤트를 호출한다. */
//										if (e.keyCode == e.ENTER ) {
//											/* 팝업창을 호출한다. */
//											self.onTriggerClick();
//										} else if (e.keyCode == e.ESC) {
//											me.attachItem({ clear : true });
//										}
//										setTimeout(function(){
//											panel.down('[name=srfc_proc_yorn]').focus(true , 10);
//										},200);
//									}
//								},
//							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 130 ,
						items	: [
							{	text		: '표면처리여부', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
								items		: [
									{	xtype		: 'checkboxfield',
										boxLabel	: '예',
										name		: 'srfc_proc_yorn1',
										itemId		: 'srfc_proc_yorn1' ,
										style		: { color: 'Black'},
										margin		: '3 0 0 10',
										width		: 50,
										inputValue	: '예',
										listeners: {
											change: function(chkbox,newVal,oldVal){
												if(chkbox.getValue() == true){
												var a = me.down('[name=srfc_proc_yorn0]').getValue();
												if(chkbox.getValue() == true && a == true){
													me.down('[name=srfc_proc_yorn0]').setValue(false);
												}
												var panel = this.up('form')
												var qty = panel.down('[name=srfc_proc_yorn1]').getValue();
													date = Ext.Date.add(new Date(),Ext.Date.DAY,+25)
													panel.down('[name=deli_date2]').setValue(date);
												}
											}
										}
									},{	xtype		: 'checkboxfield',
										boxLabel	: '아니오',
										name		: 'srfc_proc_yorn0',
										itemId		: 'srfc_proc_yorn0' ,
										style		: { color: 'Black'},
										margin		: '3 0 0 10',
										width		: 70,
										inputValue	: '아니오',
										checked		: true,
										listeners: {
											change: function(chkbox,newVal,oldVal){
												if(chkbox.getValue() == true){
												var a = me.down('[name=srfc_proc_yorn1]').getValue();
												if(chkbox.getValue() == true && a == true){
													me.down('[name=srfc_proc_yorn1]').setValue(false);
												}
												var panel = this.up('form')
												var qty = panel.down('[name=srfc_proc_yorn0]').getValue();
													date = Ext.Date.add(new Date(),Ext.Date.DAY,+15)
													panel.down('[name=deli_date2]').setValue(date);
												}
											}
										}
									}
								]
							}
//							,{	xtype		: 'lookupfield',
//								margin		: '2 2 2 2',
//								editable	: false,
//								name		: 'srfc_proc_yorn',
//								itemId		: 'srfc_proc_yorn' ,
//								lookupValue	: resource.lookup('yorn'),
//								editable	: true ,
//								enableKeyEvents: true ,
//								listeners	: {
//									change : function() {
//										var panel = this.up('form')
//										var qty = panel.down('[name=srfc_proc_yorn]').getValue();
//											if(qty == 0){
//												date = Ext.Date.add(new Date(),Ext.Date.DAY,+15)
//											}else{
//												date = Ext.Date.add(new Date(),Ext.Date.DAY,+25)
//											}
//											panel.down('[name=deli_date2]').setValue(date);
//									},
//									keydown : function(self, e) {
//										if (e.keyCode == e.ENTER) {
//											var panel = self.up('form');
//											panel.down('[name=cstm_lott_numb]').focus(true, 10);
//										} else if (e.keyCode == e.ESC) {
//											me.attachItem({ clear : true });
//										}
//									}
//								},
//							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 130 ,
						items	: [
							{	text		: '도면확인여부', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
								items		: [
									{	xtype		: 'checkboxfield',
										boxLabel	: '예',
										name		: 'drwg_yorn1',
										itemId		: 'drwg_yorn1' ,
										style		: { color: 'Black'},
										margin		: '3 0 0 10',
										width		: 50,
										inputValue	: '예',
										listeners: {
											change: function(chkbox,newVal,oldVal){
												if(chkbox.getValue() == true){
												var a = me.down('[name=drwg_yorn0]').getValue();
												if(chkbox.getValue() == true && a == true){
													me.down('[name=drwg_yorn0]').setValue(false);
												}
												var panel = this.up('form')
												var qty = panel.down('[name=drwg_yorn1]').getValue();
													date = Ext.Date.add(new Date(),Ext.Date.DAY,+25)
													panel.down('[name=deli_date2]').setValue(date);
												}
											}
										}
									},{	xtype		: 'checkboxfield',
										boxLabel	: '아니오',
										name		: 'drwg_yorn0',
										itemId		: 'drwg_yorn0' ,
										style		: { color: 'Black'},
										margin		: '3 0 0 10',
										width		: 70,
										inputValue	: '아니오',
										checked		: true,
										listeners: {
											change: function(chkbox,newVal,oldVal){
												if(chkbox.getValue() == true){
												var a = me.down('[name=drwg_yorn1]').getValue();
												if(chkbox.getValue() == true && a == true){
													me.down('[name=drwg_yorn1]').setValue(false);
												}
												var panel = this.up('form')
												var qty = panel.down('[name=drwg_yorn0]').getValue();
													date = Ext.Date.add(new Date(),Ext.Date.DAY,+15)
													panel.down('[name=deli_date2]').setValue(date);
												}
											}
										}
									}
								]
							}
//							,{	xtype		: 'lookupfield',
//								margin		: '2 2 2 2',
//								editable	: false,
//								name		: 'srfc_proc_yorn',
//								itemId		: 'srfc_proc_yorn' ,
//								lookupValue	: resource.lookup('yorn'),
//								editable	: true ,
//								enableKeyEvents: true ,
//								listeners	: {
//									change : function() {
//										var panel = this.up('form')
//										var qty = panel.down('[name=srfc_proc_yorn]').getValue();
//											if(qty == 0){
//												date = Ext.Date.add(new Date(),Ext.Date.DAY,+15)
//											}else{
//												date = Ext.Date.add(new Date(),Ext.Date.DAY,+25)
//											}
//											panel.down('[name=deli_date2]').setValue(date);
//									},
//									keydown : function(self, e) {
//										if (e.keyCode == e.ENTER) {
//											var panel = self.up('form');
//											panel.down('[name=cstm_lott_numb]').focus(true, 10);
//										} else if (e.keyCode == e.ESC) {
//											me.attachItem({ clear : true });
//										}
//									}
//								},
//							}
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
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left,
						margin	: '3 0 3 3',
						width	: 150 ,
						items	: [
							{	text		: 'LOT번호', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'cstm_lott_numb',
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
						width	: 70 ,
						margin	: '3 0 3 0',
						items	: [
							{	text	: '수량', xtype : 'label',style:"text-align: right" , style : 'text-align:center;'
							},{	xtype	: 'numericfield',
								margin	: '2 2 2 2',
								name	: 'invc_qntt',
								enableKeyEvents : true,
								listeners: {
									change : function(self, value) {
										var panel = self.up('form')
											inv_amt = Math.floor((Number(value) * Number(panel.down('[name=cont_pric]').getValue()))/10)*10
										;
										panel.down('[name=sply_amnt]').setValue(inv_amt);
									},
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
											self.up('form').down('[name=cont_pric]').focus(true, 10);
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
						width	: 70,
						items	: [
							{	text		: '현재고량', xtype : 'label',style:"text-align: right" , style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'stok_qntt',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners: {
									change : function(self, value) {
										var panel = self.up('form')
											inv_amt = Math.floor((Number(value) * Number(panel.down('[name=invc_qntt]').getValue()))/10)*10
										;
										panel.down('[name=sply_amnt]').setValue(inv_amt);
									},
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 70,
						items	: [
							{	text	: '계약단가', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'cont_pric',
								margin	: '2 2 2 2',
								enableKeyEvents : true,
								listeners : {
									change : function(self, value) {
										var panel = self.up('form')
											inv_amt = Math.floor((Number(value) * Number(panel.down('[name=invc_qntt]').getValue()))/10)*10
										;
										panel.down('[name=sply_amnt]').setValue(inv_amt);
									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											var pri = self.up('form').down('[name=cont_pric]').getValue();
											if(pri > 10000000){
												Ext.Msg.show({ title: '알림', msg: "단가는 10,000,000원 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
													fn : function (button) {
														self.up('form').down('[name=cont_pric]').focus(true, 10);
													}
												});
												return;
											}
											self.up('form').down('[name=deli_date2]').focus(true, 10);
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
						width	: 100,
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
											inv_vat = Math.floor((Number(_global.tax_rt) * Number(panel.down('[name=sply_amnt]').getValue()))/1000)*10
										;
										panel.down('[name=vatx_amnt]').setValue(inv_vat);
									},
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 100,
						items	: [
							{	text		: '부가세', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'vatx_amnt',
								margin		: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								listeners	: {
									change	: function(self, value) {
										var panel = self.up('form')
											inv_tot = Number(panel.down('[name=sply_amnt]').getValue()) + Number(panel.down('[name=vatx_amnt]').getValue())
										;
										panel.down('[name=invc_amnt]').setValue(inv_tot);
									}
								}
							}
						],
						hidden	: true
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 120,
						items	: [
							{	text		: '합계금액', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'invc_amnt',
								margin		: '2 2 2 2',
								readOnly	: true,
								fieldCls	: 'readonlyfield'
							}
						],
						hidden	: true
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 110,
						items	: [
							{	text		: '납기일자' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'datefield'  ,
								margin		: '2 2 2 2',
								name		: 'deli_date2',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								editable	: true ,
								value		: Ext.Date.add(new Date(),Ext.Date.DAY,+15),
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var qty = self.up('form').down('[name=cont_pric]').getValue();
											if(qty == 0 ){
												self.up('form').down('[name=invc_qntt]').focus(true, 10);
											}
											if ( Ext.isEmpty( self.up('form').down('[name=deli_date2]').getValue()) ){
												self.up('form').down('[name=deli_date2]').focus(true, 10);
											} else {
												self.up('form').down('[name=cstm_prcs_numb]').focus(true, 10);

//												if (self.up('form').down('[name=item_idcd]').getValue().trim() != '') {
//													me.appendItem({});
//												}
											}
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								},
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						hidden	: false,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 130,
						items	: [
							{	text		: '고객주문번호', xtype : 'label'	, style:  'text-align:center;'
							},{	xtype		: 'textfield',
								margin		: '2 2 2 2',
								name		: 'cstm_prcs_numb',
								maxLength	: 100,
								maxLengthText: '한글 100자 이내로 작성하여 주십시오.',
								enableKeyEvents: true  ,
								listeners	:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
												value = panel.down('[name=item_idcd]').getValue()
											;

											self.up('form').down('[name=cstm_mold_code]').focus(true, 10);

										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						hidden	: false,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 130,
						items	: [
							{	text		: '고객금형코드', xtype : 'label'	, style:  'text-align:center;'
							},{	xtype		: 'textfield',
								margin		: '2 2 2 2',
								name		: 'cstm_mold_code',
								maxLength	: 100,
								maxLengthText: '한글 100자 이내로 작성하여 주십시오.',
								enableKeyEvents: true  ,
								listeners	:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
												value = panel.down('[name=item_idcd]').getValue()
											;
												self.up('form').down('[name=user_memo]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						hidden	: false,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 130,
						items	: [
							{	text		: '도면번호', xtype : 'label'	, style:  'text-align:center;'
							},{	xtype		: 'textfield',
								margin		: '2 2 2 2',
								name		: 'drwg_numb',
								maxLength	: 70,
//								maxLengthText: '한글 100자 이내로 작성하여 주십시오.',
								enableKeyEvents: true  ,
//								listeners	:{
//									keydown : function(self, e) {
//										if (e.keyCode == e.ENTER) {
//											var panel = self.up('form');
//												value = panel.down('[name=item_idcd]').getValue()
//											;
//												self.up('form').down('[name=user_memo]').focus(true, 10);
//										} else if (e.keyCode == e.ESC) {
//											me.attachItem({ clear : true });
//										}
//									}
//								}
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						hidden	: false,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 385,
						items	: [
							{	text		: '비고', xtype : 'label'	, style:  'text-align:center;'
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
					},{	name : 'deli_hidn'	, xtype	: 'textfield'    , hidden : true
					},{	name : 'prnt_idcd'	, xtype : 'textfield'    , hidden : true
					},{	name : 'unit_idcd'	, xtype : 'textfield'    , hidden : true
					},{	name : 'lott_numb'	, xtype : 'textfield'    , hidden : true
					},{	name : 'piece_qty'	, xtype : 'numericfield' , hidden : true
					},{	name : 'txfree_yn'	, xtype : 'textfield'    , hidden : true
					},{	name : 'offr_pric'	, xtype : 'numericfield' , hidden : true
					},{	name : 'item_wigt'	, xtype : 'numericfield' , hidden : true
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
			var cstm = Ext.ComponentQuery.query('module-saleorder3-worker-editor')[0].down('[name=cstm_idcd]').getValue(),
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
								me.down('[name=mtrl_bacd]').setValue('0005');
								me.down('[name=make_bacd]').setValue('0005');
								me.down('[name=item_bacd]').setValue('0001');
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
			me.down('[name=item_wigt]'		).setValue(record.get('item_wigt' ));
			me.down('[name=stok_qntt]'		).setValue(record.get('stok_qntt' ));
			me.down('[name=cstm_lott_numb]'	).setValue(record.get('cstm_lott_numb' ));
			me.down('[name=invc_qntt]'		).setValue('1');
			me.down('[name=user_memo]'		).setValue('');
//			me.down('[name=deli_date2]'		).setValue(record.get('deli_date2'));
//			me.down('[name=sply_amnt]'		).setValue(record.get('sply_amnt' ));
//			me.down('[name=vatx_amnt]'		).setValue(record.get('vatx_amnt'));
//			me.down('[name=invc_amnt]'		).setValue(record.get('invc_amnt'));


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
		var srfc_proc_yorn = '';
		if(me.down('[name=prnt_idcd]').getValue() == '' || me.down('[name=prnt_idcd]').getValue() == '0') {
			dsp = editor.getDSP();
		}
		if(me.down('[name=srfc_proc_yorn1]').getValue() == false ) {
			srfc_proc_yorn = '0';
		}	else if(me.down('[name=srfc_proc_yorn0]').getValue() == false){
			srfc_proc_yorn = '1';
		}

		if(me.down('[name=emgc_yorn1]').getValue() == false ) {
			emgc_yorn = '0';
		}	else if(me.down('[name=emgc_yorn0]').getValue() == false){
			
			emgc_yorn = '1';
		}

		if(me.down('[name=drwg_yorn1]').getValue() == false ) {  
			drwg_yorn = '0';
		}	else if(me.down('[name=drwg_yorn0]').getValue() == false){
			drwg_yorn = '1';
		}

		console.log(me.down('[name=item_bacd]').getValue());
		console.log(me.down('[name=item_clss_bacd]').getValue());

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
			cstm_lott_numb	: me.down('[name=cstm_lott_numb]').getValue(),
			invc_qntt		: me.down('[name=invc_qntt]').getValue(),
			cont_pric		: me.down('[name=cont_pric]').getValue(),
			sply_amnt		: me.down('[name=sply_amnt]').getValue(),
			stok_qntt		: me.down('[name=stok_qntt]').getValue(),
			vatx_amnt		: me.down('[name=vatx_amnt]').getValue(),
			invc_amnt		: me.down('[name=invc_amnt]').getValue(),
			deli_date2		: Ext.Date.format(me.down('[name=deli_date2]').getValue(),'Y-m-d'),
//			remk_text		: me.down('[name=user_memo]').getValue(),
			user_memo		: me.down('[name=user_memo]').getValue(),
			mtrl_bacd		: me.down('[name=mtrl_bacd]').getValue(),
			item_clss_bacd	: me.down('[name=item_clss_bacd]').getValue(),
			item_bacd		: me.down('[name=item_bacd]').getValue(),
			make_bacd		: me.down('[name=make_bacd]').getValue(),
			cstm_prcs_numb	: me.down('[name=cstm_prcs_numb]').getValue(),
			cstm_mold_code	: me.down('[name=cstm_mold_code]').getValue(),
			drwg_numb		: me.down('[name=drwg_numb]').getValue(),
			item_wigt		: me.down('[name=item_wigt]').getValue(),
			srfc_proc_yorn	: srfc_proc_yorn,
			emgc_yorn		: emgc_yorn,
			drwg_yorn		: drwg_yorn,

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
					&& findrecord.get('item_wigt') == record.get('item_wigt')
					&& findrecord.get('unit_idcd') == record.get('unit_idcd')
					&& findrecord.get('unit_name') == record.get('unit_name')
					&& findrecord.get('cstm_lott_numb') == record.get('cstm_lott_numb')
					&& findrecord.get('cstm_prcs_numb') == record.get('cstm_prcs_numb')
					&& findrecord.get('cstm_mold_code') == record.get('cstm_mold_code')
					&& findrecord.get('drwg_numb') == record.get('drwg_numb')
					&& findrecord.get('deli_date2') == record.get('deli_date2')
					&& findrecord.get('user_memo') == record.get('user_memo')) {
					is_equal = true;
					// 상품의 수량을 추가
					findrecord.set("vatx_amnt", findrecord.get('vatx_amnt') + record.get('vatx_amnt'));
					findrecord.set("invc_qntt", findrecord.get('invc_qntt') + record.get('invc_qntt'));
					findrecord.set("invc_amnt", findrecord.get('invc_amnt') + record.get('invc_amnt'));
					findrecord.set("sply_amnt", findrecord.get('sply_amnt') + record.get('sply_amnt'));
					findrecord.set("stok_qntt", findrecord.get('stok_qntt') + record.get('stok_qntt'));
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
