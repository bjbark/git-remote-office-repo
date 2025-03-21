Ext.define('module.basic.item.eco.ecomast.view.EcoMastWorkerSearch', { extend: 'Axt.form.Search',
	store	: 'module.basic.item.eco.ecomast.store.EcoMastInvoice',
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
					{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 3',
						width	: 50,
						hidden	: true,
						items	: [
							{	text	: '순서', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: '',
								margin	: '2 2 2 2',
								enableKeyEvents : true,
								listeners : {
									change : function(self, value) {
										var panel = self.up('form'),
											inv_amt = 0,
											resId = _global.options.mes_system_type?_global.options.mes_system_type.toUpperCase():_global.hq_id.toUpperCase()
										;
										if(resId == 'SJFLV') {
											inv_amt = Math.round((Number(value) * Number(panel.down('[name=reqt_pric]').getValue())))
										}else{
											inv_amt = Math.floor((Number(value)       * Number(panel.down('[name=reqt_pric]').getValue())) / 10) * 10;
										}
										;
										panel.down('[name=reqt_amnt]').setValue(inv_amt);
									},
									keydown : function(self, e) {

									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 100,
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
												acct_bacd	: 'BOM',
									},
									apiurl	: {
										master : _global.api_host_info + '/system/custom/kortc/item/itemmast/get/product.do'
									},
									result	: function(records, nameField, pairField) {
										var panel = nameField.up('form');
										var searchForm = Ext.ComponentQuery.query('module-ecomast-worker-search')[0];
										me.selectItem( { records : records } );
									},
									create : function (self ) {
										editor = Ext.ComponentQuery.query('module-ecomast-worker-editor')[0];
										param = editor.getValues()
										if(param.prnt_item_idcd== '' || param.prnt_item_idcd == null ){
												Ext.Msg.alert("알림","조립품목 먼저 선택하여 주세요.");
												self.popup.close();
												return;
										}else{
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
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						width	: 300 ,
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
											panel.down('[name=ivst_qntt]').focus(true, 10);
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
						width	: 210 ,
						margin	: '3 0 3 0',
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
						margin	: '3 0 3 0',
						width	: 70,
						items	: [
							{	text	: '수량', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'ndqt_dnmn',
								margin	: '2 2 2 2',
								format	: '#,##0.##',
								enableKeyEvents : true,
								listeners : {
//									change : function(self, value) {
//										var panel = self.up('form'),
//											inv_amt = 0,
//											resId = _global.options.mes_system_type?_global.options.mes_system_type.toUpperCase():_global.hq_id.toUpperCase()
//										;
//										if(resId == 'SJFLV') {
//											inv_amt = Math.round((Number(value) * Number(panel.down('[name=reqt_qntt]').getValue())))
//										}else{
//											inv_amt = Math.floor((Number(value)       * Number(panel.down('[name=reqt_qntt]').getValue())) / 10) * 10;
//										}
//										;
//										panel.down('[name=reqt_amnt]').setValue(inv_amt);
//									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER){
											var panel = self.up('form');
											panel.down('[name=unit_name]').focus(true, 10);
										} else if (e.keyCode == e.ESC){
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
						width	: 75 ,
						items	: [
							{	text		: '단위', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'popupfield',
								editable	: true,
								readOnly	: true,
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
										},200);
									}
								}
							},{	name	: 'unit_idcd'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						hidden	: false,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 150,
						items	: [
							{	text		: '공정흐름', xtype : 'label'	, style:  'text-align:center;'
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'wkfw_name',
								pair		: 'wkfw_idcd',
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
									widget	: 'lookup-wkfw-popup',
									values	: { },
									option	: { direct_result : true },
									params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '3101'},
									result	: function(records, nameField, pairField) {
										var panel = nameField.up('form');
										var	parent = records[0];
											panel.down('[name=wkfw_idcd]').setValue(parent.data.wkfw_idcd);
											panel.down('[name=wkfw_name]').setValue(parent.data.wkfw_name);
									}
								}
							},{	name	: 'wkfw_idcd'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						hidden	: false,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 160,
						items	: [
							{	text		: '부품위치', xtype : 'label'	, style:  'text-align:center;'
							},{	xtype		: 'textfield',
								margin		: '2 2 2 2',
								name		: '',
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
	createLine2 : function(){
		var me   = this,
			line = {
				xtype  : 'fieldset' ,
				margin : '0 0 0 0' ,
				itemId	: 'itemviewer',
				items  : [
					{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 130,
						items	: [
							{	text		: '표면처리' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'srfc_proc',
								readOnly	: true,
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
//											panel.down('[name=offr_qntt]').focus(true, 10);
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
						width	: 130,
						items	: [
							{	text	: '색상', xtype : 'label', style:'text-align:center;'
							},{	xtype		: 'popupfield',
								readOnly	: true,
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'colr_bacd_name2',
								pair		: 'colr_bacd2',
								editable	: true ,
								enableKeyEvents: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-base-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd  : '3104'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{	name	: 'colr_bacd2'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 100,
						items	: [
							{	text	: '재질', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'textfield',
								name	: 'item_mtrl',
								margin	: '2 2 2 2',
								readOnly	: true,
								enableKeyEvents : true,

							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 100,
						items	: [
							{	text	: 'MSL', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'textfield',
								name	: 'msll_valu',
								margin	: '2 2 2 2',
								readOnly	: true,
								enableKeyEvents : true,

							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 130,
						items	: [
							{	text	: '제조업체', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'textfield',
								name	: 'mker_name',
								margin	: '2 2 2 2',
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 190,
						items	: [
							{	text	: '2D도면번호', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'textfield',
								name	: 'flat_drwg_numb',
								margin	: '2 2 2 2',
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 190,
						items	: [
							{	text	: '3D도면번호', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'textfield',
								name	: 'sold_drwg_numb',
								margin	: '2 2 2 2',
								readOnly	: true,

							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 100,
						items	: [
							{	text	: '차종', xtype : 'label', style:'text-align:center;'
							},{	xtype		: 'popupfield',
								readOnly	: true,
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'crty_bacd_name',
								pair		: 'crty_bacd',
								editable	: true ,
								enableKeyEvents: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-base-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd  : '9001'},
									result : function(records, nameField, pairField) {
										var panel = nameField.up('form');
										nameField.setValue(records[0].get('crty_bacd_name'));
										pairField.setValue(records[0].get('crty_bacd'));
									}
								}
							},{	name	: 'crty_bacd'		, xtype : 'textfield', hidden : true
							}
						]
					},{	name : 'deli_hidn'	, xtype	: 'textfield'    , hidden : true
					},{	name : 'prnt_idcd'	, xtype : 'textfield'    , hidden : true
					},{	name : 'unit_idcd'	, xtype : 'textfield'    , hidden : true
					},{	name : 'lott_numb'	, xtype : 'textfield'    , hidden : true
					},{	name : 'piece_qty'	, xtype : 'numericfield' , hidden : true
					},{	name : 'txfree_yn'	, xtype : 'textfield'    , hidden : true
					},{	name : 'offr_pric'	, xtype : 'numericfield' , hidden : true
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
			record	= config.record,
//			editor	= Ext.ComponentQuery.query('module-ecomast-worker-editor')[0],
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
			me.down('[name=ndqt_dnmn]'	).setValue('1');
			me.down('[name=mker_name]'	).setValue(record.get('mker_name' ));
			me.down('[name=srfc_proc]'	).setValue(record.get('srfc_proc' ));
			me.down('[name=colr_bacd2]'	).setValue(record.get('colr_bacd2' ));
			me.down('[name=colr_bacd_name2]'	).setValue(record.get('colr_bacd_name2' ));
			me.down('[name=crty_bacd]'	).setValue(record.get('crty_bacd' ));
			me.down('[name=crty_bacd_name]'	).setValue(record.get('crty_bacd_name' ));
			me.down('[name=msll_valu]'	).setValue(record.get('msll_valu' ));
			me.down('[name=item_mtrl]'	).setValue(record.get('item_mtrl' ));
			me.down('[name=flat_drwg_numb]'	).setValue(record.get('flat_drwg_numb' ));
			me.down('[name=sold_drwg_numb]'	).setValue(record.get('sold_drwg_numb' ));
			if (config.append) {

				me.appendItem( { panel : config.panel });
			} else {
				html = '';
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
			editor		= Ext.ComponentQuery.query('module-ecomast-worker-editor')[0],
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			uper_seqn   = undefined,
			temp		= me.ownerCt
		;
		console.log(me.ownerCt);
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
			prnt_item_idcd	: editor.down('[name=prnt_item_idcd]').getValue(),
			item_idcd		: me.down('[name=item_idcd]').getValue(),
			item_code		: me.down('[name=item_code]').getValue(),
			item_name		: me.down('[name=item_name]').getValue(),
			item_spec		: me.down('[name=item_spec]').getValue(),
			unit_idcd		: me.down('[name=unit_idcd]').getValue(),
			unit_name		: me.down('[name=unit_name]').getValue(),
			ndqt_dnmn		: me.down('[name=ndqt_dnmn]').getValue(),
			msll_valu		: me.down('[name=msll_valu]').getValue(),
			mker_name		: me.down('[name=mker_name]').getValue(),
			flat_drwg_numb	: me.down('[name=flat_drwg_numb]').getValue(),
			sold_drwg_numb	: me.down('[name=sold_drwg_numb]').getValue(),
			crty_bacd		: me.down('[name=crty_bacd]').getValue(),
			item_mtrl		: me.down('[name=item_mtrl]').getValue(),
			crty_bacd_name	: me.down('[name=crty_bacd_name]').getValue(),
			colr_bacd2		: me.down('[name=colr_bacd2]').getValue(),
			colr_bacd_name2	: me.down('[name=colr_bacd_name2]').getValue(),
			wkfw_idcd		: me.down('[name=wkfw_idcd]').getValue(),
			wkfw_name		: me.down('[name=wkfw_name]').getValue(),
		});
		store.each(function(findrecord) {
			if (   findrecord.get('item_idcd') == record.get('item_idcd')
				&& findrecord.get('item_code') == record.get('item_code')
				&& findrecord.get('item_name') == record.get('item_name')
				&& findrecord.get('item_spec') == record.get('item_spec')
				&& findrecord.get('unit_idcd') == record.get('unit_idcd')
				&& findrecord.get('unit_name') == record.get('unit_name')
				&& findrecord.get('msll_valu') == record.get('msll_valu')
				&& findrecord.get('item_mtrl') == record.get('item_mtrl')
				&& findrecord.get('mker_name') == record.get('mker_name')
				&& findrecord.get('flat_drwg_numb') == record.get('flat_drwg_numb')
				&& findrecord.get('sold_drwg_numb') == record.get('sold_drwg_numb')
				&& findrecord.get('unit_name') == record.get('unit_name')) {
				is_equal = true;
				// 상품의 수량을 추가
			}
		});

		// 상품을 추가
		if (!is_equal) {
			store.add(record);
		}
		me.attachItem({ clear : true });
	}
});
