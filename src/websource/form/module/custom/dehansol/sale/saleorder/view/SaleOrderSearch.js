Ext.define('module.custom.dehansol.sale.saleorder.view.SaleOrderSearch', { extend: 'Axt.form.Search',


	alias: 'widget.module-saleorder-search',
	/**
	 *
	 */
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
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '조회할 수주번호 또는 TOOL번호를 입력하세요...',
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
							{	fieldLabel	: Language.get('acpt_date','수주일자'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								labelWidth	: 98,
								width		: 198,
								margin		: '0 0 0 2',
								root		: true,
								value		: new Date()
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								labelWidth	: 15,
								width		: 115,
								value		: new Date()
							},{	fieldLabel	: Language.get('deli_date','납기일자'),
								xtype		: 'betweenfield',
								name		: 'deli_date1',
								pair		: 'deli_date2',
								margin		: '0 0 0 2',
								labelWidth	: 96,
								width		: 198,
								root		: true,
								value		: ''
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'deli_date2',
								pair		: 'deli_date1',
								labelWidth	: 15,
								width		: 115,
								value		: ''
							},{	fieldLabel	: Language.get('','라벨발행'),
								name		: 'levl_publ_yorn',
								xtype		: 'lookupfield',
								value		: '2',
								labelWidth	: 99,
								width		: 180,
								lookupValue	: [['1','예'],['0','아니오'],['2','전체']]
							},{	fieldLabel	: Language.get('line_clos','마감상태'),
								xtype		: 'lookupfield',
								name		: 'line_clos',
								editable	: true,
								labelWidth	: 60,
								width		: 130,
								value		: '2',
								lookupValue	: [['1','마감'],['2','정상'],['3','전체']]
							},{	fieldLabel	: Language.get('','삭제여부'),
								xtype		: 'lookupfield',
								name		: 'line_stat',
								editable	: true,
								labelWidth	: 70,
								width		: 140,
								value		: '0',
								lookupValue	: [['0','아니오'],['2','예']]
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('','모델명'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								width		: 315,
								pair		: 'item_idcd',
								clearable	: true,
								editable	: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-item-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'item_idcd', xtype	: 'textfield', hidden : true
							},{	fieldLabel	: Language.get('cstm_name','거래처명'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								labelWidth	: 98,
								width		: 315,
								pair		: 'cstm_idcd',
								editable	: true ,
								clearable	: true,
								margin		: '0 0 0 0',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-dehan-cstm-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0',sale_cstm_yorn : '1'  },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
							},{	fieldLabel	: Language.get('acpt_stat_dvcd','진행상태'),
								xtype		: 'lookupfield',
								name		: 'acpt_stat_dvcd',
								editable	: true,
								labelWidth	: 99,
								width		: 180,
								lookupValue	: [['1','전체'],['2','승인완료'],['3','출고완료']]
							},{	fieldLabel	: Language.get('','총수량'),
								xtype		: 'numericfield',
								name		: 'sum_qntt',
								labelWidth	: 60,
								width		: 130,
								readOnly	: true,
							},{	fieldLabel	: Language.get('','총금액'),
								xtype		: 'numericfield',
								name		: 'sum_amnt',
								labelWidth	: 70,
								width		: 170,
								readOnly	: true,
							},{	xtype	: 'button',
								text	: '<span class="btnTemp" style="font-size:1.2em;font-weight: bold; color : black;">화면 활성화</span>',
								toggleGroup:'onoff',
								id : 'toggleonoff',
								width	: 100,
								height	: 28,
								margin : '0 0 0 10',
								cls		: 'toggleon btn btnTemp '+_global.options.work_book_tema+'button',
								listeners:{
									toggle:function(toggle){
										var master	= Ext.ComponentQuery.query('module-saleorder-lister-master')[0];
										if(window.stop == 0){
											this.setText('<span class="btnTemp" style="font-size:1.2em;font-weight: bold;color : black;">정지 해제</span>');
											clearInterval(window.settime);
											window.stop = 1;
										}else{
											this.setText('<span class="btnTemp" style="font-size:1.2em;font-weight: bold; color : black;">화면 정지</span>');
											clearInterval(window.settime);
											me.reload();
											window.stop = 0;
											window.settime = setInterval(function(){
												var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
												mask.show();
												master.getStore().reload();
											}, 100000)//1분40초
										}
									}
								}
							}
						]
					}
				]
			};
		return line;
	},

	reload : function(param){
		var me = this
			basefrom =me.down('form'),
			listermaster	= Ext.ComponentQuery.query('module-saleorder-lister-master')[0]
			search	= Ext.ComponentQuery.query('module-saleorder-search')[0],
			param	= search.getValues()
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			listermaster.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge( param,{ stor_grp : _global.stor_grp }) )
		}
});