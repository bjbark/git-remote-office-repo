Ext.define('module.stock.isos.goodsosttlist.view.GoodsOsttListSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-goodsosttlist-search',

	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
			me.addonSearch()
		];
		me.callParent();
	},
	searchBasic : function() {
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#000081', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin 	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label'			,
								fieldCls: 'requiredindex'	,
								text	: 'SEARCH  | '		,
								margin	: '5 10 0 0'		,
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name'		,
								xtype	: 'searchfield'	,
								flex	: 4				,
								emptyText: '조회할 품목코드 또는 품명을 입력하세요...',
								enableKeyEvents : true			,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //조회버튼클릭
										}
									}
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
				]
			};
		return line;
	},

	addonSearch : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				title			: '상세검색',
				collapsible		: true,
				collapsed		: false,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('inqy_term','출고일자'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								width		: 198,
								labelWidth	: 100,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								clearable	: true
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								clearable	: true
							},{	fieldLabel	: Language.get('acpt_numb','주문번호'),
								xtype		: 'popupfield',
								name		: 'invc_numb',
								width		: 315,
								editable	: true,
								clearable	: true,
								enableKeyEvents	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-ordr-popup',
									params	: {
										stor_grp	: _global.stor_grp ,
										line_stat	: '0',
										cstm_idcd	: '',
//										acpt_stat_dvcd : '0600',
									},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('invc_numb'));
									}
								}
							},{	fieldLabel	: Language.get('cstm','거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								width		: 370,
								pair		: 'cstm_idcd',
								editable	: true,
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-cstm-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' , acct_bacd : '제품', sale_cstm_yorn : '1'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name		: 'cstm_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('', '창고' ),
								name		: 'wrhs_name',
								pair		: 'wrhs_idcd',
								xtype		: 'popupfield',
								width		: 205,
								editable	: true,
								enableKeyEvents : true,
								emptyText	: '',
								clearable	: true,
								popup		: {
									widget	: 'lookup-wrhs-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('wrhs_name'));
										pairField.setValue(records[0].get('wrhs_idcd'));
									}
								},
								margin		: "0 0 0 10",
								hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
							},{	name	: 'wrhs_idcd', xtype	: 'textfield', hidden : true
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('deli_date','납기일자'),
								xtype		: 'betweenfield',
								name		: 'deli_date1',
								pair		: 'deli_date2',
								width		: 198,
								labelWidth	: 100,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.getFirstDateOfMonth(new Date()),
								clearable	: true,
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'deli_date2',
								pair		: 'deli_date1',
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date(),
								clearable	: true,
							},{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								width		: 315,
								pair		: 'item_idcd',
								editable	: true,
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-item-popup-v4',
									params	: { stor_grp : _global.stor_grp
											, line_stat : '0'
											, acct_bacd	: _global.options.mes_system_type=='SJFLV'?'삼정(제품출고)':'제품',
									},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								},
							},{	name		: 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('line_stat','상태'),
								xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('search_all').concat(resource.lookup('line_stat' )),
								value		: '0',
								width		: 170
							},{	fieldLabel	: Language.get('','합계구분'),
								xtype		: 'lookupfield',
								name		: 'chk',
								lookupValue	: [['1','소계'],['2','일계'],['3','월계'],['4','합계']],
								multiSelect	: true ,
								editable	: false,
								labelWidth	: 60,
								width		: 200,
								value		: ['4']
							},{	fieldLabel	: Language.get('acpt_dvcd','수주구분'),
								xtype		: 'lookupfield',
								name		: 'acpt_dvcd',
//								lookupValue	: resource.lookup('search_all').concat(resource.lookup('acpt_dvcd' )),
								lookupValue	: resource.lookup('acpt_dvcd' ),
								value		: '1000',
								labelWidth	: 60,
								width		: 165,
								hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
								margin		: "0 0 0 50"
							},{ xtype	: 'fieldcontainer',
								layout	: { type: 'hbox'},
								margin	: '0 0 0 40',
								items	:[
									,{	xtype	: 'label',
										text	: '이월',
										name	: 'optn_3',
										width	: 80,
										style	: { color: 'black', backgroundColor : 'Yellow', textAlign : 'center'},
										margin	: '8 0 8 0',
									},{	xtype	: 'label',
										text	: '반품처리',
										margin	: '8 0 8 0',
										style	: 'background-color:#cbffc8 !important; text-align:center;',
										width	: 80
									}
								]
							}
						]
					}
				]
			};
		return line;
	}
});