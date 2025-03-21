Ext.define('module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerSearch2', { extend: 'Axt.form.Search',
	store	: 'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Invoice2',
	alias	: 'widget.module-estimast2-worker-search2',
	style	: 'padding-top : 1px;' ,
	height	: 55,
	/**
	 *
	 */

	initComponent: function () {
		var me = this;
		me.items = [me.createLine1(), me.createLine2()];
		me.callParent();
	},

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
							{	text		: '자재구분' , xtype : 'label',	style : 'text-align:center;'
							},{	xtype		: 'lookupfield',
								margin		: '2 2 2 2',
								name		: 'mtrl_clss_dvcd',
								lookupValue	: resource.lookup('mtrl_clss_dvcd'),
								editable	: true ,
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										if (e.keyCode == e.ENTER ) {
											var panel = self.up('form');
											panel.down('[name=item_name]').focus(true, 10);
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
						width	: 200,
						items	: [
							{	text		: '자재명' , xtype : 'label', style : 'text-align:center;'
							},{		xtype		: 'popupfield',
								editable	: true,
								margin		: '2 2 2 2',
								name		: 'item_name',
								pair		: 'item_idcd',
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
								popup: {
									select : 'SINGLE',
									widget : 'lookup-fabc-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd : '자재' },
									result : function(records, nameField, pairField) {
										var panel = nameField.up('form');
										nameField.setValue(records[0].get('fabc_name'));
										pairField.setValue(records[0].get('fabc_idcd'));
										me.down('[name=item_line]').setValue(records[0].get('ppln_dvcd'));
										setTimeout(function(){
											panel.down('[name=item_leng]').focus(true , 10);
										},200);
									}
								}
							},{	name	: 'item_idcd'		, xtype : 'textfield', hidden : true
							},{	name	: 'prnt_idcd'		, xtype : 'textfield', hidden : true
							},{	name	: 'item_name'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 150 ,
						items	: [
							{	text		: '평량/골', xtype : 'label', itemId : 'item_line', style : 'text-align:center;'
							},{	xtype		: 'lookupfield',
								name		: 'item_line',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								margin		: '2 2 2 2',
								lookupValue	: resource.lookup('line_dvcd'),
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=item_leng]').focus(true, 10);
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
						width	: 60 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '장', xtype : 'label', itemId : 'unit_idcd', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								margin		: '2 2 2 2',
								name		: 'item_leng',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=item_widh]').focus(true, 10);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 60 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '폭', xtype : 'label', itemId : 'unit_idcd', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								margin		: '2 2 2 2',
								name		: 'item_widh',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=item_fxqt]').focus(true, 10);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 60 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '절수', xtype : 'label', itemId : 'item_fxqt', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								margin		: '2 2 2 2',
								name		: 'item_fxqt',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=item_numb]').focus(true, 10);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 60 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '개수', xtype : 'label', itemId : 'unit_idcd', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								margin		: '2 2 2 2',
								name		: 'item_numb',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=qntt]').focus(true, 10);
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
							{	text		: '수량', xtype : 'label', itemId : 'unit_idcd', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								margin		: '2 2 2 2',
								name		: 'qntt',
								enableKeyEvents : true,
								listeners: {
									change : function(self, value) {
										var panel = self.up('form')
											inv_amt = Number(value) * Number(panel.down('[name=pric]').getValue())
										;
										panel.down('[name=amnt]').setValue(inv_amt);
									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var qty = self.up('form').down('[name=qntt]').getValue();
											if(qty > 999999){
												Ext.Msg.show({ title: '알림', msg: "수량은 999,999개 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
													fn : function (button) {
														self.up('form').down('[name=qntt]').focus(true, 10);
													}
												});
												return;
											}
											self.up('form').down('[name=pric]').focus(true, 10);
											if (self.up('form').down('[name=item_name]').getValue().trim() != '') {
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
						width	: 100 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '단가/R(개)', xtype : 'label', itemId : 'unit_idcd', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								margin		: '2 2 2 2',
								name		: 'pric',
								enableKeyEvents : true,
								listeners : {
									change : function(self, value) {
										var panel = self.up('form')
											inv_amt = Number(value) * Number(panel.down('[name=qntt]').getValue())
										;
										panel.down('[name=amnt]').setValue(inv_amt)
									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var pri = self.up('form').down('[name=pric]').getValue();
											if(pri > 10000000){
												Ext.Msg.show({ title: '알림', msg: "단가는 10,000,000원 이상 입력하실수 없습니다.", icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
													fn : function (button) {
														self.up('form').down('[name=pric]').focus(true, 10);
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
						width	: 100 ,
						margin	: '3 0 3 0',
						items	: [
							{	text	: '공급가', xtype : 'label',style:"text-align: right" , style : 'text-align:center;'
							},{	xtype	: 'numericfield',
								margin	: '2 2 2 2',
								name	: 'amnt',
								fieldCls	: 'readonlyfield',
								readOnly	: true,
								enableKeyEvents : true,
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
			// TODO
			me.down('[name=mtrl_clss_dvcd]'	).setValue(record.get('mtrl_clss_dvcd' ));
//			me.down('[name=mtrl_name]'		).setValue(record.get('mtrl_name' ));
			me.down('[name=item_idcd]'		).setValue(record.get('item_idcd' ));
			me.down('[name=item_name]'		).setValue(record.get('item_name' ));
//			me.down('[name=item_spec]'		).setValue(record.get('item_spec' ));
			me.down('[name=item_line]'		).setValue(record.get('item_line' ));
			me.down('[name=item_leng]'		).setValue(record.get('item_leng' ));
			me.down('[name=item_widh]'		).setValue(record.get('item_widh' ));
			me.down('[name=item_fxqt]'		).setValue(record.get('item_fxqt' ));
			me.down('[name=item_numb]'		).setValue(record.get('item_numb' ));
			me.down('[name=qntt]'			).setValue(record.get('qntt' ));
			me.down('[name=pric]'			).setValue(record.get('pric' ));
			me.down('[name=amnt]'			).setValue(record.get('amnt' ));
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
			editor		= Ext.ComponentQuery.query('module-estimast2-worker-editor2')[0],
			detail		= Ext.ComponentQuery.query('module-estimast2-lister-detail')[0],
			records		= detail.getSelectionModel().getSelection();
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			uper_seqn	= undefined,
			max_seq		= 0
		;

		var seq = editor.getSEQ();
		var dsp = '';
		if(me.down('[name=prnt_idcd]').getValue() == '' || me.down('[name=prnt_idcd]').getValue() == '0') {
			dsp = editor.getDSP();
		}
		store.each(function(findrecord) {
			if (findrecord.get('assi_seqn') > max_seq) {
				max_seq	= findrecord.get('assi_seqn');   // max값으로 마지막값을 찾음.
			}
		})
		store.each(function(record){
			uper_seqn = record.get('assi_seqn');

		})
		if (uper_seqn == undefined) {
			uper_seqn = me.down('[name=prnt_idcd]').getValue();
		}
		max_seq = max_seq + 1;
			record = Ext.create( store.model.modelName , {
				assi_seqn		: max_seq,
				uper_seqn		: uper_seqn,
				disp_seqn		: dsp,
				prnt_idcd		: uper_seqn,
				line_seqn		: seq,
//				line_seqn		: records[0].get('line_seqn'),
				mtrl_clss_dvcd	: me.down('[name=mtrl_clss_dvcd]').getValue(),
				item_idcd		: me.down('[name=item_idcd]').getValue(),
				item_name		: me.down('[name=item_name]').getValue(),
				item_line		: me.down('[name=item_line]').getValue(),
				item_leng		: me.down('[name=item_leng]').getValue(),
				item_widh		: me.down('[name=item_widh]').getValue(),
				item_fxqt		: me.down('[name=item_fxqt]').getValue(),
				item_numb		: me.down('[name=item_numb]').getValue(),
				qntt			: me.down('[name=qntt]').getValue(),
				pric			: me.down('[name=pric]').getValue(),
				amnt			: me.down('[name=amnt]').getValue(),
			});


		store.each(function(findrecord) {
			if (   findrecord.get('mtrl_clss_dvcd') == record.get('mtrl_clss_dvcd')
				&& findrecord.get('item_idcd') == record.get('item_idcd')
				&& findrecord.get('item_name') == record.get('item_name')
				&& findrecord.get('item_line') == record.get('item_line')
				&& findrecord.get('item_leng') == record.get('item_leng')
				&& findrecord.get('item_widh') == record.get('item_widh')
				&& findrecord.get('item_fxqt') == record.get('item_fxqt')
				&& findrecord.get('item_numb') == record.get('item_numb')
				&& findrecord.get('pric') == record.get('pric')
				&& findrecord.get('amnt') == record.get('amnt')) {
				is_equal = true;
				// 상품의 수량을 추가
				findrecord.set("qntt", findrecord.get('qntt') + record.get('qntt'));
			}
		});
		// 상품을 추가

		if (!is_equal) {
			store.add(record);
		}

		console.log(editor)
		me.attachItem({ clear : true });
	}
});
