Ext.define('module.basic.item.eco.ecomast.view.EcoMastPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-ecomast-popup',
//	store		: 'module.basic.item.eco.ecomast.store.EcoMastPopup',
	title		: 'ECO 복사',
	closable	: true,
	autoShow	: true,
	width		: 930 ,
	height		: 580 ,
	layout		: {
		type : 'border'
	},

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm() ];
//		me.dockedItems = [{xtype: 'module-ecomast-popup-search'}];
		me.callParent(arguments);

//		var param = Ext.merge( { ecod_idcd : me.popup.params.ecod_idcd}  );
	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
//						{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
						{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon ,  handler : me.UpdateAction, cls: 'button-style' },
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm(),{xtype:'module-ecomast-lister-detail2'},me.editorForm2() ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'plan',
			margin		: '0 0 0 -15',
			layout	: { type: 'vbox', align: 'stretch' } ,
			height		: 150 ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 1000,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '5 0 0 5',
							items : [
								{	fieldLabel	: Language.get('ecod_idcd', 'ECO no' ),
									xtype		: 'textfield',
									name		: 'ecod_idcd',
									width		: 290,
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									readOnly	: true
								},{	fieldLabel	: Language.get('ecod_date', '변경일자' ),
									name		: 'ecod_date',
									xtype		: 'datefield',
									margin		: '0 0 0 10',
									width		: 150,
									readOnly	: true,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								},{	fieldLabel	: Language.get('chge_resn', '변경사유' ),
									name		: 'chge_resn',
									xtype		: 'lookupfield',
									lookupValue	:  resource.lookup('chge_resn_dvcd' ),
									width		: 190,
									margin		: '0 0 0 150',
									readOnly	: true
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
							items : [
								{	fieldLabel	: Language.get('item_code', '조립품목' ),
									name		: 'item_code',
									pair		: 'prnt_item_idcd',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									fieldCls	: 'requiredindex',
									readOnly	: true,
									allowBlank	: false,
									emptyText	: Const.invalid.emptyValue,
									width		: 250,
									margin		: '0 0 0 0',
									clearable	: false ,
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
										widget	: 'lookup-item-popup-kortc',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, line_stat : '0',acct_bacd:'ECO품목'},
										result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get('item_code'));
												pairField.setValue(records[0].get('item_idcd'));
												var search = Ext.ComponentQuery.query('module-ecomast-popup')[0],
													item = search.down('[name=item_code]');
												;
										}
									},
								},{	name : 'prnt_item_idcd', xtype	: 'textfield', hidden : true
								},{ xtype		: 'numericfield',
									name		: 'cofm_degr',
									emptyText	: '1',
									readOnly	: true,
									hidden		: false,
									fieldCls	: 'readonlyfield',
									width		: 30,
									margin		: '1 0 0 10'
								},{	fieldLabel	: Language.get('dely_cstm_itid', '(납품처)품번' ),
											name		: 'dely_cstm_itid',
											xtype		: 'textfield',
											width		: 290,
											margin		: '0 0 0 10',
											readOnly	: true
										},{	fieldLabel	: Language.get('cstm_itid', '(고객)품번' ),
											name		: 'cstm_itid',
											xtype		: 'textfield',
											width		: 290,
											margin		: '0 0 0 10',
											readOnly	: true
										}
									]

								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
									items : [
										{	fieldLabel	: Language.get('item_name', '품명' ),
											name		: 'item_name',
											xtype		: 'textfield',
											width		: 290,
											readOnly	: true
										},{	fieldLabel	: Language.get('dely_cstm_item_name', '(납품처)품명' ),
											name		: 'dely_cstm_item_name',
											xtype		: 'textfield',
											width		: 290,
											margin		: '0 0 0 10',
											readOnly	: true
										},{	fieldLabel	: Language.get('cstm_item_name', '(고객)품명' ),
											name		: 'cstm_item_name',
											xtype		: 'textfield',
											width		: 290,
											margin		: '0 0 0 10',
											readOnly	: true
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
									items : [
										,{	fieldLabel	: Language.get('item_spec', '규격' ),
											name		: 'item_spec',
											xtype		: 'textfield',
											width		: 290,
											readOnly	: true
										},{	name : 'modi_yorn', xtype	: 'textfield', hidden : true, value : 'n'
										},{	fieldLabel	: Language.get('dely_cstm_spec', '(납품처)규격' ),
											name		: 'dely_cstm_spec',
											xtype		: 'textfield',
											width		: 290,
											margin		: '0 0 0 10',
											readOnly	: true
										},{	fieldLabel	: Language.get('cstm_spec', '(고객)규격' ),
											name		: 'cstm_spec',
											xtype		: 'textfield',
											width		: 290,
											margin		: '0 0 0 10',
											readOnly	: true,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '0 0 0 5',
									items : [
										,{	fieldLabel	: Language.get('crty_bacd', '차종' ),
											xtype		: 'textfield',
											allowBlank	: false,
											name		: 'crty_bacd_name',
											width		: 290,
											margin		: '5 0 5 0',
											readOnly	: true
										},{	fieldLabel	: Language.get('cofm_yorn', '승인' ),
											name		: 'cofm_yorn',
											xtype		: 'lookupfield',
											width		: 140,
											margin		: '5 0 0 10',
											lookupValue	:  resource.lookup('yorn' ),
											readOnly	: true
										},{	fieldLabel	: Language.get('dtrb_date', '배포일자' ),
											name		: 'dtrb_date',
											xtype		: 'datefield',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 150,
											margin		: '5 0 0 0',
											readOnly	: true
										},{	fieldLabel	: Language.get('prnt_date', '출력일자' ),
											name		: 'prnt_date',
											xtype		: 'datefield',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 150,
											margin		: '5 0 0 10',
											readOnly	: true
										}
									]
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

	editorForm2 : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'south',
				margin	: 0,
				plain	: true,
				items	: [ me.editorForm2() ]
			}
		;
		return item;
	},

	editorForm2 : function() {
		var me = this,
		form = {
				xtype		: 'panel',
				layout		: 'vbox',
				border		: 0,
				height		: 190 ,
//				name		: 'planform',
				bodyStyle	: { padding: '10px 0 0 0' , margin		: '0 0 0 -25',},
				items		: [
					{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '5 0 0 5',
							items : [
								{	fieldLabel	: Language.get('ecod_idcd', 'ECO no' ),
									xtype		: 'textfield',
									name		: 'ecod_idcd2',
									itemId		: 'ecod_idcd2',
									width		: 300,
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									readOnly	: true
								},{	fieldLabel	: Language.get('ecod_date', '변경일자' ),
									name		: 'ecod_date2',
									xtype		: 'datefield',
									width		: 160,
									readOnly	: false,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								},{	fieldLabel	: Language.get('chge_resn', '변경사유' ),
									name		: 'chge_resn2',
									xtype		: 'lookupfield',
									lookupValue	:  resource.lookup('chge_resn_dvcd' ),
									width		: 190,
									margin		: '0 0 0 140',
									readOnly	: false
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '5 0 0 5',
							items : [
								{	fieldLabel	: Language.get('item_code', '조립품목' ),
									name		: 'item_code2',
									pair		: 'prnt_item_idcd2',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									fieldCls	: 'requiredindex',
									allowBlank	: false,
									emptyText	: Const.invalid.emptyValue,
									width		: 260,
									margin		: '0 5 5 0',
									clearable	: true,
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
										widget	: 'lookup-item-popup-kortc',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, line_stat : '0',acct_bacd:'ECO품목'},
										result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get('item_code'));
												pairField.setValue(records[0].get('item_idcd'));
												var search = Ext.ComponentQuery.query('module-ecomast-popup')[0],
													item = search.down('[name=item_code]');
													;
												var panel = nameField.up('panel');
												panel.down('[name=item_name2]').setValue(records[0].get('item_name'));
												panel.down('[name=item_spec2]').setValue(records[0].get('item_spec'));
												panel.down('[name=crty_bacd_name2]').setValue(records[0].get('crty_bacd_name'));
												panel.down('[name=cstm_spec2]').setValue(records[0].get('cstm_spec'));
												panel.down('[name=cstm_itid2]').setValue(records[0].get('cstm_itid'));
												panel.down('[name=dely_cstm_itid2]').setValue(records[0].get('dely_cstm_itid'));
												panel.down('[name=dely_cstm_spec2]').setValue(records[0].get('dely_cstm_spec'));
												panel.down('[name=cstm_item_name2]').setValue(records[0].get('cstm_item_name'));
												panel.down('[name=dely_cstm_item_name2]').setValue(records[0].get('dely_cstm_item_name'));
										}
									},
								},{	name : 'prnt_item_idcd2', xtype	: 'textfield', hidden : true
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '1 0 0 -5',
							items : [
									{ xtype		: 'numericfield',
									name		: 'cofm_degr',
									emptyText	: '1',
									readOnly	: false,
									hidden		: false,
									fieldCls	: 'readonlyfield',
									width		: 30,
									margin		: '0 0 0 0'
								}
							]
								},{	fieldLabel	: Language.get('dely_cstm_itid', '(납품처)품번' ),
									name		: 'dely_cstm_itid2',
									xtype		: 'textfield',
									width		: 300,
									margin		: '0 0 0 -10',
									readOnly	: true,
								},{	fieldLabel	: Language.get('cstm_itid', '(고객)품번' ),
									name		: 'cstm_itid2',
									xtype		: 'textfield',
									width		: 300,
									readOnly	: true
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '0 0 0 5',
							items : [
								{	fieldLabel	: Language.get('item_name', '품명' ),
									name		: 'item_name2',
									xtype		: 'textfield',
									width		: 300,
									readOnly	: true
								},{	fieldLabel	: Language.get('dely_cstm_item_name', '(납품처)품명' ),
									name		: 'dely_cstm_item_name2',
									xtype		: 'textfield',
									width		: 300,
									margin		: '0 0 0 0',
									readOnly	: true
								},{	fieldLabel	: Language.get('cstm_item_name', '(고객)품명' ),
									name		: 'cstm_item_name2',
									xtype		: 'textfield',
									width		: 300,
									readOnly	: true
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
							items : [
								,{	fieldLabel	: Language.get('item_spec', '규격' ),
									name		: 'item_spec2',
									xtype		: 'textfield',
									width		: 300,
									readOnly	: true
								},{	name : 'modi_yorn', xtype	: 'textfield', hidden : true, value : 'n'
								},{	fieldLabel	: Language.get('dely_cstm_spec', '(납품처)규격' ),
									name		: 'dely_cstm_spec2',
									xtype		: 'textfield',
									width		: 300,
									readOnly	: true
								},{	fieldLabel	: Language.get('cstm_spec', '(고객)규격' ),
									name		: 'cstm_spec2',
									xtype		: 'textfield',
									width		: 300,
									readOnly	: true,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '0 0 0 5',
							items : [
								,{	fieldLabel	: Language.get('crty_bacd', '차종' ),
									xtype		: 'textfield',
									allowBlank	: false,
									name		: 'crty_bacd_name2',
									width		: 300,
									margin		: '5 0 5 0',
									readOnly	: true
								},{	fieldLabel	: Language.get('cofm_yorn', '승인' ),
									name		: 'cofm_yorn2',
									xtype		: 'lookupfield',
									lookupValue	: resource.lookup('yorn'),
									width		: 145,
									margin		: '5 0 0 0',
									readOnly	: false
								},{	fieldLabel	: Language.get('dtrb_date', '배포일자' ),
									name		: 'dtrb_date2',
									xtype		: 'datefield',
									width		: 162,
									margin		: '5 0 0 -6',
									readOnly	: false,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								},{	fieldLabel	: Language.get('prnt_date', '출력일자' ),
									name		: 'prnt_date2',
									xtype		: 'datefield',
									width		: 160,
									margin		: '5 0 0 0',
									readOnly	: false,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								}
							]
						}
				]
			}
		;
		return form;
},

	/**
	 * 확인 버튼 이벤트
	 */

	UpdateAction: function(){
		var me = this,
			baseform= me.down('form'),
			record = me.up('form').getValues()
		;


		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		Ext.Ajax.request({
			url		: _global.location.http() + '/basic/item/eco/set/Copy.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					ecod_idcd		: record.ecod_idcd2,
					ecod_idcd2		: record.ecod_idcd,
					dtrb_date		: record.dtrb_date2,
					crte_idcd		: _global.login_pk,
					ecod_date		: record.ecod_date2,
					chge_resn_dvcd	: record.chge_resn_dvcd2,
					prnt_date		: record.prnt_date2,
					prnt_item_idcd	: record.prnt_item_idcd2,
					prnt_item_idcd2	: record.prnt_item_idcd,
					cofm_yorn		: record.cofm_yorn2,
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
					me.up('form').ownerCt.close();
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				mask.hide();
//				Ext.getStore('search').reload();
			}
		});
	}
});
