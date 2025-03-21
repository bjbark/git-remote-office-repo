Ext.define('module.custom.wontc.prod.order.workbook.view.WorkBookSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-workbook-search',

	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(), me.createLine1()];
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
					{	xtype		: 'fieldset',
						border		: 3,
						flex		: 1,
						style		: { borderColor	: '#000081', borderStyle	: 'solid' },
						region		: 'center',
						height		: 34,
						margin 	: '3 0 0 0',
						defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout		: 'hbox',
						items		:[
							{	xtype	: 'label'			,
								fieldCls: 'requiredindex'	,
								text	: 'SEARCH  | '		,
								margin	: '5 10 0 0'		,
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '조회할 수주번호를 입력하세요...',
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
					items : [
						{	xtype : 'fieldset',
							layout: 'hbox',
							border: 0,
							margin: '0 0 5 0',
							items : [
								{	fieldLabel	: Language.get('','보고일자'),
									xtype		: 'betweenfield',
									name		: 'invc_date1',
									pair		: 'invc_date2',
									labelWidth	: 85,
									width		: 180,
									margin		: '0 0 0 10',
									root		: true,
									value		: Ext.Date.getFirstDateOfMonth(new Date()),
								},{	xtype		: 'betweenfield',
									fieldLabel	:'~',
									name		: 'invc_date2',
									pair		: 'invc_date1',
									labelWidth	: 15,
									width		: 110,
									value		: new Date()
								}
							]
						}
					]
				};
		return line;
	},
});