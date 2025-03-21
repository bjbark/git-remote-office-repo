Ext.define('module.custom.iypkg.eis.eisreport1.view.EisReport1Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-eisreport1-search',

	initComponent: function() {
		var me = this;
		me.items = [ me.searchBasic(),me.createLine1()];
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
							margin		: '3 0 0 0',
							defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
							layout		: 'hbox',
							items		: [
								{	xtype		: 'label',
									fieldCls	: 'requiredindex',
									text		: 'SEARCH  | ',
									margin		: '5 10 0 0',
									style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
								},{	name		: 'find_name',
									xtype		: 'searchfield',
									flex		: 4,
									emptyText	: '조회할 수주번호 또는 수주일자를 입력하세요...',
									enableKeyEvents : true,
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
						},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
							style	: 'background:url("../../../resource/img/btn_search_icon.png")'
						},{	xtype	: 'fieldset',border : 0 ,region : 'north',height : 34, width : 2
						}
					]
				};
		return line;
	},

	createLine1 : function(){
		var me = this,
			from_date = new Date(),
			to_date = new Date()
		;
		from_date.setDate(from_date.getDate()-8);
		to_date.setDate(to_date.getDate()-1);
		var	line =	{
			xtype		: 'fieldset',
			collapsible	: true,
			title		: '상세검색',
			layout		: 'hbox',
			defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '0 0 5 0', padding: '0', border: 0 , },
			fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
			items : [
				{	fieldLabel	: Language.get('','수주일자'),
					xtype		: 'betweenfield',
					name		: 'invc1_date',
					pair		: 'invc2_date',
					labelWidth	: 99,
					width		: 198,
					margin		: '0 0 0 0',
					root		: true,
					value		: Ext.Date.getFirstDateOfMonth(new Date())
				},{	fieldLabel	: Language.get('','수주일자'),
					name		: 'invc_numb',
				},{	xtype		: 'betweenfield',
					fieldLabel	:'~',
					name		: 'invc2_date',
					pair		: 'invc1_date',
					labelWidth	: 15,
					width		: 115,
					value		: new Date()
				},{	fieldLabel	: Language.get('line_clos','마감상태'),
					xtype		: 'lookupfield',
					name		: 'line_clos',
					lookupValue	: resource.lookup('line_clos'),
					editable	: false,
					value		: '0',
					labelWidth	: 80,
					width		: 180
				},{	xtype : 'fieldset',
					layout: 'hbox',
					border : 0,
					margin: '0 0 0 50',
					width : 200,
					items : [
						{	xtype		: 'checkbox',
							boxLabel	: 'C/T Box',
							name		: 'optn_3',
							labelWidth : 30,
							width : 80,
							style		: { color: 'Blue'},
							margin		: '0 0 0 15',
							value		: true,
//							listeners: {
//								change: function(chkbox,newVal,oldVal) {
//									var a = me.down('[name=optn_4]').getValue();
//									if(chkbox.getValue() == true && a == true){
//										me.down('[name=optn_4]').setValue(false);
//									}
//								}
//							}
						},{	xtype		: 'checkbox',
							boxLabel	: 'COL Box',
							name		: 'optn_4',
							labelWidth : 30,
							width : 80,
							style		: { color: 'Blue'},
							margin		: '0 0 0 20',
//							listeners: {
//								change: function(chkbox,newVal,oldVal) {
//									var a = me.down('[name=optn_3]').getValue();
//									if(chkbox.getValue() == true && a == true){
//										me.down('[name=optn_3]').setValue(false);
//									}
//								}
//							}
						}
					]
				}
			]
		};
		return line;
	}
});