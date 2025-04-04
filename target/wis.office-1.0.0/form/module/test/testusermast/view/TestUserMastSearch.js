Ext.define('module.test.testusermast.view.TestUserMastSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-testusermast-search',
	/**
	 * 초기화 메소드
	 */
	initComponent: function(){
		var me = this;
		me.items = [me.searchBasic(),me.createLine1() ];
		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset'
				,border	: 0
				,style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' }
				,region	: 'center'
				,width	: '100%'
				,height  : 40
				,margin	: '0 40 0 40'
				,items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#263c63', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label',
								text	: 'SEARCH  | ',
								margin	: '7 10 0 0',
								style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_nm'     ,
								xtype	: 'searchfield',
								flex	: 4,
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
											searchButton.fireEvent('click', searchButton); /* 조회버튼 Click */
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
			}
		;
		return line;
	},
	/**
	 * 검색 조건 첫라인
	 */
	createLine1 : function() {
		var line = {
			xtype		: 'fieldset',
			title		: '상세검색',
			collapsible	: true,
			collapsed	: true,
			items		: [
				{	fieldLabel	: '조회일자',
					xtype		: 'betweenfield',
					name		: 'fr_dt',
					pair		: 'to_dt',
					width		: 170,
					margin		: '0 0 0 2',
					root		: true,
					value		: new Date(new Date().getFullYear(),new Date().getMonth(),1)
				},{	xtype		: 'betweenfield',
					fieldLabel	:'~',
					name		: 'to_dt',
					pair		: 'fr_dt',
					labelWidth	: 15,
					width		: 115,
					value		: new Date()
				}
			]
		};
		return line;
	},

	addonSearch : function(){
		var line = {
			xtype		: 'fieldset',
			layout		: 'vbox',
			defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '0 0 4 0', padding:'0', border: 0 },
			items		: [
				{	xtype	: 'fieldset',
					items	: [

					]
				}
			]
		};
		return line;
	}


});