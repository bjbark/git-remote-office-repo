Ext.define('module.custom.dhtec.sale.order.saleplanorder2.view.SalePlanOrder2Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-saleplanorder2-search',
	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(),me.createLine1(),];
		me.callParent();
	},

	searchBasic : function() {
		var me = this,
			line =
				{	xtype	: 'fieldset',
					border	: 0,
					style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
					region	: 'center',
					width	: '100%',
					height	: 40,
					margin	: '0 40 0 40',
					items	:[
						{	xtype		: 'fieldset',
							border		: 3,
							flex		: 1,
							style		: { borderColor : '#000081', borderStyle : 'solid' },
							region		: 'center',
							height		: 34,
							margin 	: '3 0 0 0',
							defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
							layout		: 'hbox',
							items		:[
								{	xtype		: 'label'			,
									fieldCls	: 'requiredindex'	,
									text		: 'SEARCH  | '		,
									margin		: '5 10 0 0'		,
									style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
								},{	name		: 'find_name'		,
									xtype		: 'searchfield'		,
									flex		: 4					,
									emptyText	: '',
									enableKeyEvents : true			,
									listeners:{
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || e.keyCode == 9) {
												var searchButton = self.up('form').down('[action=selectAction]');
												searchButton.fireEvent('click', searchButton); //조회버튼클릭
											}
										},
									}
								}
							]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width   : 40, height 	: 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
				]
			};
		return line;
	},

	createLine1 : function(){
		var	me	= this,
			line =
				{	xtype      : 'fieldset',
					title      : '상세검색',
					collapsible: true,
					collapsed  : false,
					layout     : 'vbox',
					defaults   : { xtype: 'fieldset', layout: 'hbox', margin : '0 0 4 25', padding:'0', border: 0 },
					items : [
						{	xtype : 'fieldset',
							items : [
								{	fieldLabel	: Language.get('inqy_date','계획년월'),
									xtype		: 'betweenfield',
									name		: 'invc1_date',
									pair		: 'invc2_date',
									value		: Ext.Date.getFirstDateOfMonth(new Date),
									labelWidth	: 99,
									width		: 198,
									margin		: '0 0 0 2',
									root		: true,
								},{	xtype		: 'betweenfield',
									fieldLabel	:'~',
									name		: 'invc2_date',
									pair		: 'invc1_date',
									labelWidth	: 15,
									width		: 115
								},{	fieldLabel	: Language.get('cstm','고객'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'cstm_name',
									width		: 180,
									pair		: 'cstm_idcd',
									clearable	: true,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-cstm-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' },
										result	: function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cstm_name'));
											pairField.setValue(records[0].get('cstm_idcd'));
										}
									}
								},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('sale_drtr_name','영업담당'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'drtr_name',
									width		: 180,
									pair		: 'drtr_idcd',
									clearable	: true,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-user-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' },
										result	: function(records, nameField, pairField) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
										}
									}
								},{	name		: 'drtr_idcd', xtype : 'textfield' , hidden : true
								}
							]
						}
					]
				};
		return line;
	},
});