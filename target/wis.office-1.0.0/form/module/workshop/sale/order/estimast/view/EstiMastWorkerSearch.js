Ext.define('module.workshop.sale.order.estimast.view.EstiMastWorkerSearch', { extend: 'Axt.form.Search',
	store	: 'module.workshop.sale.order.estimast.store.EstiMastInvoice',
	alias	: 'widget.module-estimast-worker-search',
	style	: 'padding-top : 1px;' ,

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.items = [me.createLine1()];
		me.callParent();
	},

	/**
	 * 라인1
	 */
	createLine1 : function(){
		var me   = this,
			line = {
				xtype		: 'fieldset' ,
				margin		: '0 0 0 0' ,
				autoScroll	: true,
				items		: [
					{	xtype : 'numericfield',	name : 'amnd_degr', hidden : true
					},
					{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  +   Const.borderLine.left,
						margin	: '3 0 3 0',
						width	: 170,
						items	: [
							,{	text		: '도번' , xtype : 'label',	style : 'text-align:center;',
							},{	xtype	: 'fieldcontainer',
								layout	: { type: 'hbox', align: 'stretch' },
								margin	: '2 2 2 2',
								items  : [
									{	xtype		: 'textfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'drwg_numb',
										width		: 120,
										listeners	: {
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER) {
													var panel = self.up('form');
													panel.down('[name=revs_numb]').focus(true, 10);
												} else if (e.keyCode == e.ESC) {
													me.attachItem({ clear : true });
												}
											}
										}
									},{	xtype		: 'textfield',
										editable	: true,
										enableKeyEvents : true,
										width		: 41,
										margin		: '0 0 0 3',
										name		: 'revs_numb',
										listeners	: {
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER) {
													var panel = self.up('form');
													panel.down('[name=item_name]').focus(true, 10);
												} else if (e.keyCode == e.ESC) {
													me.attachItem({ clear : true });
												}
											}
										}
									}
								]
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
											panel.down('[name=invc_qntt]').focus(true, 10);
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
						width	: 62,
						items	: [
							{	text		: '품목수주량' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'invc_qntt',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											me.appendItem({});
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 144 ,
						height	: 44,
						items	: [
							{	text		: '제품 SIZE' , xtype : 'label',	style : 'text-align:center;',
							},{	xtype	: 'fieldcontainer',
								layout	: { type: 'hbox', align: 'stretch' },
								margin	: '2 2 2 2',
								items  : [
									{	xtype		: 'numericfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'item_leng',
										width		: 62,
										height		: 22,
										listeners	: {
											blur	: function(){
												me.calculate();
											},
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER) {
													var panel = self.up('form');
													me.appendItem({});
												} else if (e.keyCode == e.ESC) {
													me.attachItem({ clear : true });
												}
											}
										}
									},{	text		: 'X' , xtype : 'label',	style : 'text-align:center;', margin : '4 1 1 3'
									},{	xtype		: 'numericfield',
										editable	: true,
										enableKeyEvents : true,
										margin		: '0 0 0 3',
										name		: 'item_widh',
										width		: 62,
										height		: 22,
										listeners	: {
											blur	: function(){
												me.calculate();
											},
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER) {
													var panel = self.up('form');
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
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 339,
						height	: 44,
						items	: [
							{	text		: '적용 원자재' , xtype : 'label',	style : 'text-align:center;',
								hight		: 22,
							},{	xtype	: 'fieldcontainer',
								layout	: { type: 'hbox', align: 'stretch' },
								margin	: '2 2 2 2',
								items  : [
									{	xtype		: 'popupfield',
										name		: 'mtrl_name',
										pair		: 'mtrl_idcd',
										id			: 'mtrl_name',
										editable	: true,
										width		: 183,
										height		: 22,
										enableKeyEvents : true,
										popup		: {
											select	: 'SINGLE',
											widget	: 'lookup-item-popup',
											params	: { stor_grp : _global.stor_grp, line_stat : '0', acct_bacd : '원재료', add : '1'},
											result	: function(records, nameField, pairField){
												nameField.setValue(records[0].get('item_name'));
												pairField.setValue(records[0].get('item_idcd'));
												me.down('[name=mtrl_spec]').setValue(records[0].get('item_spec'));
												me.down('[name=unit_wigt]').setValue(records[0].get('unit_wigt'));

												me.calculate();
											}
										},
										listeners	: {
											change	: function(){
												this.popup.params.find = this.getValue();
											},
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER) {
													var panel = self.up('form');
													me.appendItem({});
												} else if (e.keyCode == e.ESC) {
													me.attachItem({ clear : true });
												}
											}
										}
									},{	xtype		: 'textfield', name : 'mtrl_idcd', hidden : true
									},{	xtype		: 'textfield',
										name		: 'mtrl_spec',
										width		: 150,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
									}/*,{	xtype		: 'numericfield',
										readonly	: true,
										name		: 'mtrl_leng',
										width		: 62,
									},{	text		: 'X' , xtype : 'label',	style : 'text-align:center;', margin : '4 1 1 3'
									},{	xtype		: 'numericfield',
										readonly	: true,
										margin		: '0 0 0 3',
										name		: 'mtrl_widh',
										width		: 62,
									}*/
								]
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 80,
						items	: [
							{	text		: '제품수량/장당' , xtype : 'label',	style : 'text-align:center;',
							},{	xtype		: 'numericfield',
								margin		: '2 2 2 2',
								name		: 'mprq_qntt',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 105,
						items	: [
							{	text		: '원자재 소요량' , xtype : 'label',	style : 'text-align:center;',
							},{	xtype		: 'numericfield',
								margin		: '2 2 2 2',
								name		: 'mtrl_ndqt',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								listeners	: {
								}
							}
						]
					},{	xtype	: 'textfield', name : 'unit_wigt', hidden : true	}
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
			record	= config.record,
			html	= config.html || '',
			editor	= Ext.ComponentQuery.query('module-estimast-worker-editor')[0]
		;
		if (config.clear || !config.record) {
			html	= '';
			me.getForm().reset();
		} else {
			me.down('[name=invc_numb]'		).setValue(record.get('invc_numb' ));
			me.down('[name=amnd_degr]'		).setValue(record.get('amnd_degr' ));
			me.down('[name=drwg_numb]'		).setValue(record.get('drwg_numb' ));
			me.down('[name=revs_numb]'		).setValue(record.get('revs_numb' ));
			me.down('[name=item_name]'		).setValue(record.get('item_name' ));
			me.down('[name=item_leng]'		).setValue(record.get('item_leng' ));
			me.down('[name=item_widh]'		).setValue(record.get('item_widh' ));
			me.down('[name=item_tick]'		).setValue(record.get('item_tick' ));
			me.down('[name=mtrl_name]'		).setValue(record.get('mtrl_name' ));
			me.down('[name=mtrl_idcd]'		).setValue(record.get('mtrl_idcd' ));
			me.down('[name=mtrl_spec]'		).setValue(record.get('mtrl_spec' ));
			me.down('[name=invc_qntt]'		).setValue(record.get('invc_qntt' ));
			me.down('[name=mprq_qntt]'		).setValue(record.get('mprq_qntt' ));
			me.down('[name=mtrl_ndqt]'		).setValue(record.get('mtrl_ndqt' ));
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
		var invc_numb = editor.down('[name=invc_numb]').getValue();
		// 도번, 품명, 수량
		if(me.down('[name=drwg_numb]').getValue() == '' || me.down('[name=drwg_numb]').getValue() == null){
			Ext.Msg.alert("알림", "도번을 입력하여 주십시오.");
			return;
		}
		if(me.down('[name=item_name]').getValue() == '' || me.down('[name=item_name]').getValue() == null){
			Ext.Msg.alert("알림", "품명을 입력하여 주십시오.");
			return;
		}
		if(me.down('[name=invc_qntt]').getValue() == '' || me.down('[name=invc_qntt]').getValue() == null){
			Ext.Msg.alert("알림", "품목수주량을 입력하여 주십시오.");
			return;
		}
		if(me.down('[name=mtrl_name]').getValue() != ''){
			if(me.down('[name=mtrl_idcd]').getValue() == '' || me.down('[name=mtrl_idcd]').getValue() == null){
				Ext.Msg.alert("알림", "등록되지 않은 원자재입니다. 확인하여 주십시오.");
				return;
			}
		}

		record = Ext.create( store.model.modelName , {
			invc_numb		: invc_numb,
			line_seqn		: seq,
			amnd_degr		: me.down('[name=amnd_degr]').getValue(),
			drwg_numb		: me.down('[name=drwg_numb]').getValue(),
			revs_numb		: me.down('[name=revs_numb]').getValue(),
			item_name		: me.down('[name=item_name]').getValue(),
			item_leng		: me.down('[name=item_leng]').getValue(),
			item_widh		: me.down('[name=item_widh]').getValue(),
			mtrl_name		: me.down('[name=mtrl_name]').getValue(),
			mtrl_idcd		: me.down('[name=mtrl_idcd]').getValue(),
			mtrl_spec		: me.down('[name=mtrl_spec]').getValue(),
			invc_qntt		: me.down('[name=invc_qntt]').getValue(),
			mprq_qntt		: me.down('[name=mprq_qntt]').getValue(),
			mtrl_ndqt		: me.down('[name=mtrl_ndqt]').getValue(),
			check			: 'N',										//계획유무
			chk				: 'Y'										//품목여부
		});

		// 상품을 추가
		if (!is_equal) {
			store.add(record);
		}
		me.attachItem({ clear : true });
	},

	calculate : function(){
		var lister    = Ext.ComponentQuery.query('module-estimast-worker-lister')[0]
			search    = Ext.ComponentQuery.query('module-estimast-worker-search')[0],
			values    = search.getForm().getValues(),
//			store     = lister.getStore(),
//			selection = lister.getSelectionModel().getSelection()[0],
//			index     = store.indexOf(selection),
			item_leng = values.item_leng,
			item_widh = values.item_widh,
			mtrl_spec = values.mtrl_spec,
			check=0
		;

		if(check==0){
			param = JSON.stringify({
				item_leng	: item_leng,
				item_widh	: item_widh,
				mtrl_spec	: mtrl_spec
			});

			Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/custom/hjsys/sale/order/estimast/get/cal.do',
				method		: "POST",
				params		: {
					token	: _global.token_id,
					param	: Ext.encode({
						param			: param,
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd
					})
				},
				success : function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else{
						if(result.records.length >0){
							var item_qntt = result.records[0].mprq_qntt;
//
							search.down('[name=mprq_qntt]').setValue(item_qntt);

							var unit_wigt = search.down('[name=unit_wigt]').getValue();

							var acpt_qntt = Ext.ComponentQuery.query('module-estimast-worker-editor')[0].down('[name=acpt_qntt]').getValue();
							var cal       = unit_wigt /item_qntt // 원자재 소요량 계산
								total = 0;
							;
							if(!isNaN(cal)){
								total = String(cal).substring(0,String(cal).indexOf('.')+4);
							}
							search.down('[name=mtrl_ndqt]').setValue(total);
						}
					}
				},
				failure : function(response, request) {
					resource.httpError(response);
				},
				callback : function() {
				}
			});
		}
	},
});
