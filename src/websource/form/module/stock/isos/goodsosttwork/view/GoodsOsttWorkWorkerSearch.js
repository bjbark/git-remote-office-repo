Ext.define('module.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerSearch',{ extend: 'Axt.form.Search',
	store		: 'module.stock.isos.goodsosttwork.store.GoodsOsttWorkInvoice',
	alias: 'widget.module-goodsosttwork-worker-search',
	style	: 'padding-left : 5px;' ,

	initComponent: function(){
		var me = this;
		me.items = [
			me.addonSearch()
		];
		me.callParent();
	},

	addonSearch : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '5 5 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
						{	fieldLabel	: Language.get('cstm_name','거래처'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true,
							name		: 'cstm_name',
							width		: 240,
							labelWidth	: 50,
							pair		: 'cstm_idcd',
							popup: {
								select : 'SINGLE',
								widget : 'lookup-cstm-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							},
						},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true,
							listeners	: {
								change	: function(){
									me.down('[name=item_name]').popup.params.cstm_idcd = this.getValue();
								}
							}
						},{	fieldLabel	: Language.get('acpt_numb','주문번호'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'invc_numb',
								width		: 250,
								labelWidth	: 60,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-ordr-popup',
									params : {
										stor_grp : _global.stor_grp ,
										line_stat : '0',
										cstm_idcd : Ext.ComponentQuery.query('module-goodsosttwork-worker-editor')[0].getValues().cstm_idcd,
										acpt_stat_dvcd : '0200'
									},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('invc_numb'));
									}
								}
							},{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								width		: 250,
								labelWidth	: 60,
								clearable	: true,
								pair		: 'item_idcd',
								finded		: false,
								popup: {
									select : 'MULTI',
									widget : 'lookup-item-popup-v4',
									params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd	: '제품' },
									result : function(records, nameField, pairField) {
										//2022.04.08 - 이강훈 - 제품출고 등록 시 품목을 1건 이상 받아서 조회할 수 있도록 변경
										//nameField.setValue(records[0].get('item_name'));
										//pairField.setValue(records[0].get('item_idcd'));

										var rtnItemIdcd = "", rtnItemName = "";
										Ext.each(records, function(record) {
											if (rtnItemIdcd.length > 0) {
												rtnItemIdcd += ",";
												rtnItemName += ",";
											}

											rtnItemIdcd += record.get("item_idcd");
											rtnItemName += record.get("item_name");
										});

										nameField.setValue(rtnItemName);
										pairField.setValue(rtnItemIdcd);
									}
								}
							},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('wrhs_name','창고'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wrhs_name',
								width		: 315,
								labelWidth	: 80,
								hidden		: true,
								pair		: 'wrhs_idcd',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wrhs-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wrhs_name'));
										pairField.setValue(records[0].get('wrhs_idcd'));
									}
								}
							},{	name : 'wrhs_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('deli_date1','납기일자'),
								xtype		: 'betweenfield',
								name		: 'deli_date1',
								pair		: 'deli_date2',
								width		: 161,
								labelWidth	: 60,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								root		: true
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'deli_date2',
								pair		: 'deli_date1',
								width		: 118,
								labelWidth	: 17,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: ''
							},{	xtype		: 'checkbox',
								boxLabel	: '수주에서 가져오기',
								name		: 'optn_1',
								width		: 120,
								margin		: '1 0 0 15',
								hidden		: _global.hqof_idcd.toUpperCase()=="N1000NBOLT"?true:false, // nbolt일때 수주에서 끌어다쓰게 처리한다.
								checked		: _global.hqof_idcd.toUpperCase()=="N1000NBOLT"?true:false,
								style		: { color: 'Black'},
							},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
								xtype		: 'button',
								width		: 80,
								height		: 25,
								margin		: '0 0 0 20',
								cls			: 'button-style',
								action		: 'selectAction2'
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: '비고사항' 		,
								name		: 'user_memo',
								xtype		: 'textarea',
//								emptyText	: '메모사항을 적어주십시오',
								width		: 250,
								labelWidth	: 60,
								height		: 50,
								hidden		: true
//								hidden		: (_global.stor_id.toUpperCase()!= 'N1000NBOLT1000'?true:false)
							}
						]
					}
				]
			};
		return line;
	}
});