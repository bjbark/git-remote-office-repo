Ext.define('module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerSearch3', { extend: 'Axt.form.Search',
	store	: 'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Invoice3',
	alias	: 'widget.module-estimast2-worker-search3',
	style	: 'padding-top : 1px;' ,
	height	: 55,
	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.items = [me.createLine1() ,  me.createLine2()];
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
						width	: 180,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						items	: [
							{	text		: '작업공정' , xtype : 'label',	style : 'text-align:center;'
							},{	xtype		: 'popupfield',
								editable	: true,
								margin		: '2 2 2 2',
								name		: 'wkct_name',
								pair		: 'wkct_idcd',
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
									widget : 'lookup-wkct-popup',
									option	: { direct_result : true },
									params : { stor_grp : _global.stor_grp , line_stat : '0'},
									result : function(records, nameField, pairField) {
										var panel = nameField.up('form');
										nameField.setValue(records[0].get('wkct_name'));
										pairField.setValue(records[0].get('wkct_idcd'));
										setTimeout(function(){
											panel.down('[name=unit_name]').focus(true , 10);
										},200);
									}
								}
							},{	name	: 'wkct_idcd', xtype : 'textfield' , hidden : true
							},{	name	: 'prnt_idcd', xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 100,
						items	: [
							{	text		: '작업단위' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'lookupfield',
								name		: 'work_unit',
								itemId		: 'initfocused' ,
								lookupValue	: resource.lookup('wkun_dvcd'),
								width		: 250,
								margin		: '2 2 2 2',
								editable	: true ,
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										if (e.keyCode == e.ENTER ) {
											var panel = self.up('form');
											panel.down('[name=qntt]').focus(true, 10);
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
							{	text		: '수량', xtype : 'label',  style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								margin		: '2 2 2 2',
								name		: 'qntt',
								enableKeyEvents : true,
								listeners: {
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
											self.up('form').down('[name=unit_name2]').focus(true, 10);
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
							{	text		: '수량단위', xtype : 'label', itemId : 'unit_idcd', style : 'text-align:center;'
							},{	xtype		: 'popupfield',
								margin		: '2 2 2 2',
								itemId		: 'initfocused' ,
								name		: 'unit_name2',
								pair		: 'qntt_unit',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
										}
									}
								},
								popup: {
									select : 'SINGLE',
									widget : 'lookup-unit-popup',
									option	: { direct_result : true },
									params : { stor_grp : _global.stor_grp , line_stat : '0'},
									result : function(records, nameField, pairField) {
										var panel = nameField.up('form');
										nameField.setValue(records[0].get('unit_name'));
										pairField.setValue(records[0].get('unit_code'));
										setTimeout(function(){
											panel.down('[name=pric]').focus(true, 10);
										},200);
									}
								}
							},{	name	: 'qntt_unit', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 100 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '단가', xtype : 'label', itemId : 'unit_idcd', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								margin		: '2 2 2 2',
								name		: 'pric',
								enableKeyEvents : true,
								listeners	: {
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
											}else{
												if (self.up('form').down('[name=wkct_idcd]').getValue().trim() != '') {
													me.appendItem({});
												}
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
						width	: 130 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '금액', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								margin		: '2 2 2 2',
								name		: 'amnt',
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
			console.log(record.get('wkct_name' ));
			me.down('[name=wkct_idcd]'	).setValue(record.get('wkct_idcd' ));
			me.down('[name=wkct_name]'	).setValue(record.get('wkct_name' ));
			me.down('[name=work_unit]'	).setValue(record.get('work_unit' ));
			me.down('[name=qntt]'		).setValue(record.get('qntt' ));
			me.down('[name=qntt_unit]'	).setValue(record.get('qntt_unit' ));
			me.down('[name=pric]'		).setValue(record.get('pric' ));
			me.down('[name=amnt]'		).setValue(record.get('amnt' ));
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
			editor		= Ext.ComponentQuery.query('module-estimast2-worker-editor3')[0],
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
//			line_seqn		: records[0].get('line_seqn'),
			line_seqn		: seq,
			uper_seqn		: uper_seqn,
			disp_seqn		: dsp,
			prnt_idcd		: uper_seqn,
			wkct_idcd		: me.down('[name=wkct_idcd]').getValue(),
			wkct_name		: me.down('[name=wkct_name]').getValue(),
			work_unit		: me.down('[name=work_unit]').getValue(),
			qntt			: me.down('[name=qntt]').getValue(),
			qntt_unit		: me.down('[name=unit_name2]').getValue(),
			pric			: me.down('[name=pric]').getValue(),
			amnt			: me.down('[name=amnt]').getValue(),
		});

		store.each(function(findrecord) {
			if (   findrecord.get('wkct_idcd') == record.get('wkct_idcd')
				&& findrecord.get('wkct_name') == record.get('wkct_name')
				&& findrecord.get('work_unit') == record.get('work_unit')
				&& findrecord.get('unit_name') == record.get('unit_name')
				&& findrecord.get('qntt_unit') == record.get('qntt_unit')
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

		me.attachItem({ clear : true });

	}
});
