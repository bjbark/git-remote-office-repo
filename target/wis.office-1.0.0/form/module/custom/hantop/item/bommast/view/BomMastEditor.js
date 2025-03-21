Ext.define('module.custom.hantop.item.bommast.view.BomMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-bommast-editor',

	height : 340,
	layout : {
		type: 'border'
	},

	title			: Language.get('','BOM 정보'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: 'brnd_bacd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
		me.callParent(arguments);
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style'},
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 470,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 400, labelWidth : 80, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '10 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('brnd_bacd','브랜드'),
								xtype		: 'textfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								editable	: false,
								name		: 'brnd_name',
							},{	fieldLabel	: Language.get('wdgr_idcd','창호그룹'),
								xtype		: 'textfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								editable	: false,
								name		: 'wdgr_name',
							},{	fieldLabel	: Language.get('wndw_modl_idcd','모델명'),
								xtype		: 'textfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								editable	: false,
								name		: 'modl_name',
							}
						]
					},{	xtype	: 'fieldset', layout : 'hbox', padding : '0', border: 0 ,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('line_seqn','순번'),
								name		: 'line_seqn',
								xtype		: 'numericfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								editable	: false,
								hidden		: true,
								width		: 105,
								labelWidth	: 25,
								margin		: '0 0 0 75'
							}
						]
					},{	fieldLabel	: Language.get('wdmt_dvcd','창호자재'),
						xtype		: 'lookupfield',
						name		: 'wdmt_dvcd',
						editable	: false,
						hidden		: true,
						lookupValue	: resource.lookup('wdmt_dvcd'),
					},{	fieldLabel	: Language.get('bfsf_dvcd','틀.짝.망'),
						xtype		: 'lookupfield',
						name		: 'bfsf_dvcd',
						editable	: false,
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						lookupValue	: resource.lookup('bfsf_dvcd'),
					},{ xtype : 'numericfield', name : 'bttm_clmm'     , hidden : true
					},{ xtype : 'numericfield', name : 'glss_fixh_hght', hidden : true
					},{ xtype : 'numericfield', name : 'moss_rail_hght', hidden : true
					},{ xtype : 'numericfield', name : 'side_clmm'     , hidden : true
					},{ xtype : 'numericfield', name : 'ssbr_hght'     , hidden : true
					},{ xtype : 'numericfield', name : 'topp_clmm'     , hidden : true
					},{ xtype : 'numericfield', name : 'item_widh'     , hidden : true
					},{ xtype : 'numericfield', name : 'item_hght'     , hidden : true
					},{ xtype : 'numericfield', name : 'item_tick'     , hidden : true
					},{ xtype : 'numericfield', name : 'rail_hght'     , hidden : true
					},{ xtype : 'numericfield', name : 'auto_cutt_yorn', hidden : true
					},{ xtype : 'numericfield', name : 'auto_weld_yorn', hidden : true
					},{	fieldLabel	: Language.get('item_name','투입품목'),
						xtype		: 'popupfield',
						name		: 'item_name',
						pair		: 'item_idcd',
						editable	: false,
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						popup: {
							select : 'SINGLE',
							widget : 'lookup-clor-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0', find : ''},
							result : function(records, nameField, pairField) {
								var panel1 = nameField.up('form');
								var store  = Ext.ComponentQuery.query('module-bommast-detail3')[0];
								var count  = 1;
								console.log(records);
								me.down('[name=colr_name]').setValue(records[0].get('colr_name'));
								me.down('[name=cstm_name]').setValue(records[0].get('cstm_name'));
								me.down('[name=stnd_pric]').setValue(records[0].get('stnd_pric'));
								me.down('[name=cont_date]').setValue(records[0].get('cont_date'));

								store.getRootNode().cascade(function(node){
									if(node.get('item_code') == records[0].get('item_code')){
										Ext.Msg.alert("알림","이미 추가된 품목입니다.");
										count = 0;
										return;
									}
								});

								if(count == 1){
									panel1.down('[name=item_code]').setValue(records[0].get('item_code'));
									nameField.setValue(records[0].get('item_name'));
									pairField.setValue(records[0].get('item_idcd'));
									me.down('[name=item_spec]').setValue(records[0].get('item_spec'));
									me.down('[name=acct_bacd]').setValue(records[0].get('acct_bacd'));
								}
							}
						},
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('colr_name','색상'),
								xtype		: 'textfield',
								name		: 'colr_name',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								editable	: false,
								width		: 200,
							},{	fieldLabel	: Language.get('cstm_name','거래처'),
								xtype		: 'textfield',
								name		: 'cstm_name',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								editable	: false,
								width		: 200,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
						items	: [
									{	fieldLabel	: Language.get('cont_date','계약일자'),
										xtype		: 'textfield',
										name		: 'cont_date',
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										editable	: false,
										width		: 200,
									},{	fieldLabel	: Language.get('stnd_pric','구매단가'),
										xtype		: 'numericfield',
										name		: 'stnd_pric',
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										editable	: false,
										width		: 200,
									}
								]
							},{	xtype		: 'textfield', name		: 'item_spec', hidden : true
					},{	xtype	: 'fieldset', layout : 'hbox', padding : '0', border: 0, margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','계산공식'),
								xtype		: 'textfield',
								name		: 'calc_frml',
								width		: 320
							},{ xtype		: 'button',
								text		: '공식 입력',
								width		: 75,
								margin		: '0 0 0 5',
								handler		: function(){
									//팝업 부르기
									me.popup()
								}
							}
						]
					},{	xtype	: 'fieldset', layout : 'hbox', padding : '0', border: 0, margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('need_qntt','소요량'),
								name		: 'need_qntt',
								xtype		: 'numericfield',
								width		: 200,
								minValue	: 1,
							},{	fieldLabel	: Language.get('unit_idcd','단위'),
								width		: 130,
								labelWidth	: 70,
								hidden		: true,
								xtype		: 'popupfield',
								name		: 'unit_name',
								pair		: 'unit_idcd',
								margin		: '0 0 0 5',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-unit-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('unit_name'));
										pairField.setValue(records[0].get('unit_idcd'));
									}
								}
							},{	fieldLabel	: Language.get('','필수'),
								xtype		: 'lookupfield',
								name		: 'esnt_yorn',
								editable	: false,
								labelWidth	: 70,
								width		: 200,
								value		: '0',
								lookupValue	: resource.lookup('yorn'),
							}
						]
					}
					,{	name : 'modify'   ,xtype : 'textfield', hidden : true}
					,{	xtype : 'textfield', name : 'brnd_bacd',hidden : true,}	// 브랜드ID
					,{	xtype : 'textfield', name : 'wdgr_idcd',hidden : true,}	// 창호그룹ID
					,{	xtype : 'textfield', name : 'wndw_modl_idcd',hidden : true,}	// 창호모델ID
					,{	xtype : 'textfield', name : 'wdtp_idcd',hidden : true,}	// 창호타입ID
					,{	xtype : 'textfield', name : 'unit_idcd',hidden : true,}	// 단위ID
					,{	xtype : 'textfield', name : 'item_idcd',hidden : true,}	// 품목ID
					,{	xtype : 'textfield', name : 'item_code',hidden : true,}	// 품목코드
					,{	xtype : 'textfield', name : 'line_levl',hidden : true,}
					,{	xtype : 'textfield', name : 'prnt_idcd',hidden : true,}
					,{	xtype : 'textfield', name : 'wndw_itid',hidden : true,}
					,{	xtype : 'textfield', name : 'acct_bacd',hidden : true,}
					,{	xtype : 'textfield', name : 'uper_seqn',hidden : true,}
					,{	xtype : 'textfield', name : '_set'     ,hidden : true,}
				]
			}
		;
		return item;
	},
	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center'	,
				margin	: 0	,
				plain	: true,
				items	: [
				     	   me.createTab1(),
						]
		}
		;
		return item;
	},

	// 메모 Tab
	createTab1 : function() {
		var me = this,
			item = {
				title		: Language.get('user_memo','메모사항'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0	,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '',
						name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '메모사항을 적어주십시오',
						height		: 245,
						flex		: 1
					},{	fieldLabel	: '',
						name		: 'lookup_val',
						xtype		: 'textarea',
						readOnly	: true,
						hidden		: true
					}
				]
			}
		;
		return item;
	},

	popup : function(){
		var me = this
		;

		var a = resource.loadPopup({
			widget : 'lookup-hntop-keypad-popup',
			param  : {
				result : me.down('[name=calc_frml]').getValue()
			},
			result : function(records) {
				me.down('[name=calc_frml]').setValue(records[0].result);
			}
		});
		a.tools.close.hide ();

	}
});